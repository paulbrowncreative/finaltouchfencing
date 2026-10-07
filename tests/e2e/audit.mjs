// Site audit: crawls every page in the sitemap (+ 404) on the local test server and checks
// SEO basics, internal links, images, structured data and WCAG (axe-core).
import { chromium } from 'playwright';
import { AxeBuilder } from '@axe-core/playwright';
import fs from 'node:fs';

const BASE = process.env.BASE || 'http://localhost:4321';
const SITE = 'https://www.finaltouchfencing.com';
const sitemap = fs.readFileSync('dist/sitemap-0.xml', 'utf8');
const paths = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1].replace(SITE, ''));
const issues = [];
const warn = (p, msg) => issues.push(`${p}: ${msg}`);
const titles = new Map();
const descs = new Map();
const linked = new Set();

const browser = await chromium.launch();
const page = await (await browser.newContext({ viewport: { width: 1280, height: 900 } })).newPage();
let axeViolations = 0;

for (const p of [...paths, '/404/']) {
  const res = await page.goto(BASE + p, { waitUntil: 'load' });
  if (p !== '/404/' && res.status() !== 200) warn(p, `status ${res.status()}`);
  const info = await page.evaluate(() => ({
    title: document.title,
    desc: document.querySelector('meta[name=description]')?.content || '',
    canonical: document.querySelector('link[rel=canonical]')?.href || '',
    robots: document.querySelector('meta[name=robots]')?.content || '',
    h1: [...document.querySelectorAll('h1')].map((h) => h.textContent.trim()),
    headings: [...document.querySelectorAll('h1,h2,h3,h4')].map((h) => +h.tagName[1]),
    imgsNoAlt: [...document.querySelectorAll('img:not([alt])')].length,
    imgsNoSize: [...document.querySelectorAll('img')].filter((i) => !i.getAttribute('width') || !i.getAttribute('height')).length,
    links: [...document.querySelectorAll('a[href]')].map((a) => a.getAttribute('href')),
    ld: [...document.querySelectorAll('script[type="application/ld+json"]')].map((s) => s.textContent),
    og: ['og:title', 'og:description', 'og:image', 'og:url'].filter((k) => !document.querySelector(`meta[property="${k}"]`)),
  }));
  if (p === '/404/') { if (!info.robots.includes('noindex')) warn(p, '404 should be noindex'); }
  else {
    if (!info.title || info.title.length > 70) warn(p, `title length ${info.title.length}: ${info.title}`);
    if (info.desc.length < 70 || info.desc.length > 170) warn(p, `description length ${info.desc.length}`);
    if (info.canonical !== SITE + p) warn(p, `canonical ${info.canonical}`);
    if (info.robots.includes('noindex')) warn(p, 'noindex page is in sitemap');
    titles.set(info.title, [...(titles.get(info.title) || []), p]);
    descs.set(info.desc, [...(descs.get(info.desc) || []), p]);
  }
  if (info.h1.length !== 1) warn(p, `${info.h1.length} h1 elements`);
  for (let i = 1; i < info.headings.length; i++) if (info.headings[i] - info.headings[i - 1] > 1) { warn(p, `heading level skip h${info.headings[i - 1]}→h${info.headings[i]}`); break; }
  if (info.imgsNoAlt) warn(p, `${info.imgsNoAlt} images without alt`);
  if (info.imgsNoSize) warn(p, `${info.imgsNoSize} images without width/height`);
  if (info.og.length) warn(p, `missing ${info.og.join(', ')}`);
  for (const l of info.links) if (l.startsWith('/') && !l.startsWith('//')) linked.add(l.split('#')[0]);
  for (const j of info.ld) { try { JSON.parse(j); } catch { warn(p, 'invalid JSON-LD'); } }

  const axe = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa']).analyze();
  for (const v of axe.violations) {
    axeViolations++;
    warn(p, `AXE ${v.impact} ${v.id}: ${v.help} — ${v.nodes.slice(0, 2).map((n) => n.target.join(' ')).join(' | ')}`);
  }
}

for (const [t, ps] of titles) if (ps.length > 1) warn(ps.join(', '), `duplicate title "${t}"`);
for (const [d, ps] of descs) if (ps.length > 1) warn(ps.join(', '), `duplicate description`);

// Internal link check
for (const l of linked) {
  const r = await fetch(BASE + l);
  if (r.status !== 200) warn('LINK', `${l} → ${r.status}`);
}
// Orphan check: every sitemap page should be linked from somewhere
for (const p of paths) if (p !== '/' && !linked.has(p)) warn(p, 'orphan page (no internal links)');

await browser.close();
console.log(`Audited ${paths.length} sitemap pages + 404, ${linked.size} internal link targets.`);
console.log(issues.length ? issues.join('\n') : 'No issues found.');
console.log(`axe violations: ${axeViolations}`);
process.exit(issues.length ? 1 : 0);
