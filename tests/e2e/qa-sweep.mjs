// Full-site browser QA sweep (run with tests/e2e/server.mjs serving dist/).
import { chromium } from 'playwright';
import { AxeBuilder } from '@axe-core/playwright';
import fs from 'node:fs';
import path from 'node:path';

const BASE = process.env.BASE || 'http://localhost:4321';
const walk = (d) => fs.readdirSync(d, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? walk(path.join(d, e.name)) : e.name === 'index.html' ? [path.join(d, e.name)] : []));
const pages = walk('dist').map((f) => '/' + path.relative('dist', path.dirname(f)).replace(/\\/g, '/') + '/').map((p) => p.replace('//', '/'));
const issues = [];
const add = (p, m) => issues.push(`${p}: ${m}`);
const WIDTHS = [320, 390, 768, 1024, 1440, 1920];

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 });
const page = await ctx.newPage();
let current = '';
page.on('console', (m) => m.type() === 'error' && add(current, `console: ${m.text().slice(0, 120)}`));
page.on('pageerror', (e) => add(current, `pageerror: ${e.message.slice(0, 120)}`));
page.on('response', (r) => { if (r.status() >= 400 && r.url().startsWith(BASE)) add(current, `HTTP ${r.status()} ${r.url().replace(BASE, '')}`); });

for (const p of pages) {
  current = p;
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(BASE + p, { waitUntil: 'networkidle' });
  await page.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 700) { scrollTo(0, y); await new Promise((r) => setTimeout(r, 40)); } });
  await page.waitForTimeout(300);
  const r = await page.evaluate(() => {
    const ids = [...document.querySelectorAll('[id]')].map((e) => e.id);
    const dup = ids.filter((id, i) => ids.indexOf(id) !== i);
    const badAnchors = [...document.querySelectorAll('a[href^="#"]')].map((a) => a.getAttribute('href').slice(1)).filter((h) => h && !document.getElementById(h));
    const imgs = [...document.querySelectorAll('img')];
    const broken = imgs.filter((i) => i.complete && i.naturalWidth === 0).map((i) => i.currentSrc || i.src);
    const oversized = imgs.filter((i) => i.naturalWidth && i.clientWidth && i.naturalWidth > i.clientWidth * 2 * 1.6).map((i) => `${(i.currentSrc || i.src).split('/').pop().slice(0, 40)} ${i.naturalWidth}px→${i.clientWidth}px`);
    const ld = [...document.querySelectorAll('script[type="application/ld+json"]')].map((s) => { try { return JSON.parse(s.textContent); } catch { return 'INVALID'; } });
    const og = document.querySelector('meta[property="og:image"]')?.content || '';
    const smallTargets = [...document.querySelectorAll('a,button,input,select,textarea,summary')].filter((e) => { const b = e.getBoundingClientRect(); const s = getComputedStyle(e); return b.width > 0 && s.visibility !== 'hidden' && !e.closest('p,li,dd,td,figcaption,.breadcrumbs,.source,.fine,.hp-field') && (b.height < 24 || b.width < 24); }).map((e) => (e.textContent || e.name || e.tagName).trim().slice(0, 30));
    return { dup, badAnchors, broken, oversized, ld, og, smallTargets };
  });
  if (r.dup.length) add(p, `duplicate ids: ${[...new Set(r.dup)].join(', ')}`);
  if (r.badAnchors.length) add(p, `in-page links with no target: ${[...new Set(r.badAnchors)].join(', ')}`);
  if (r.broken.length) add(p, `broken images: ${r.broken.join(', ')}`);
  if (r.oversized.length) add(p, `oversized images (mobile): ${r.oversized.slice(0, 3).join('; ')}`);
  if (r.smallTargets.length) add(p, `tap targets under 24px: ${r.smallTargets.slice(0, 4).join(' | ')}`);
  if (r.ld.includes('INVALID')) add(p, 'invalid JSON-LD');
  const graph = r.ld.flatMap((x) => x['@graph'] || [x]);
  const biz = graph.find((n) => n['@type'] === 'HomeAndConstructionBusiness');
  if (!biz || !biz.telephone || !biz.address?.addressLocality) add(p, 'LocalBusiness schema incomplete');
  const ogPath = r.og.replace(/^https?:\/\/[^/]+/, '');
  if (ogPath && (await fetch(BASE + ogPath)).status !== 200) add(p, `og:image missing: ${ogPath}`);
  // horizontal overflow at each width
  for (const w of WIDTHS) {
    await page.setViewportSize({ width: w, height: 900 });
    const ov = await page.evaluate(() => document.documentElement.scrollWidth - innerWidth);
    if (ov > 0) add(p, `horizontal overflow ${ov}px at ${w}px`);
  }
  // accessibility at phone width
  await page.setViewportSize({ width: 390, height: 844 });
  const axe = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa']).analyze();
  for (const v of axe.violations) add(p, `axe(mobile) ${v.id}: ${v.nodes.slice(0, 2).map((n) => n.target.join(' ')).join(' | ')}`);
}
// redirects pages & feeds
for (const u of ['/robots.txt', '/sitemap-index.xml', '/sitemap-0.xml', '/blog/rss.xml', '/site.webmanifest', '/favicon.ico', '/favicon.svg', '/apple-touch-icon.png', '/og-default.jpg']) {
  const s = (await fetch(BASE + u)).status; if (s !== 200) add(u, `status ${s}`);
}
await browser.close();
console.log(`Swept ${pages.length} pages × ${WIDTHS.length} widths.`);
console.log(issues.length ? [...new Set(issues)].join('\n') : 'No issues found.');
process.exit(issues.length ? 1 : 0);
