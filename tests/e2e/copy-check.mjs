// Copy QA: headings in AP title case, questions end with "?", no stray spacing or straight quotes.
// Run against tests/e2e/server.mjs after a build: node tests/e2e/copy-check.mjs
import { chromium } from 'playwright';
import fs from 'node:fs';
import { titleCase } from '../../src/lib/titlecase.js';

const BASE = process.env.BASE || 'http://localhost:4321';
const urls = [...fs.readFileSync('dist/sitemap-0.xml', 'utf8').matchAll(/<loc>([^<]+)<\/loc>/g)]
  .map((m) => new URL(m[1]).pathname)
  .concat(['/thank-you/', '/quote-error/', '/404/']);
// A heading is a question when a question word is followed by an inverted verb ("Who issues them", "Can I").
const QUESTION = /^(?:(?:who|what|which)\s+(?:issues|is|are|does|do|can|should)|(?:how|when|where|why)\s+(?:is|are|do|does|can|should|much|long|tall|far|deep|often\s+should)|(?:can|do|does|did|is|are|should|will|would|could)\s)\b/i;

const browser = await chromium.launch();
const page = await browser.newPage();
const issues = [];
for (const u of urls) {
  await page.goto(BASE + u);
  const { heads, text } = await page.evaluate(() => ({
    heads: [...document.querySelectorAll('h1,h2,h3,h4,h5,h6,dt,.faq summary')].map((h) => {
      const c = h.cloneNode(true);
      c.querySelectorAll('.eyebrow').forEach((e) => e.remove());
      return c.textContent.replace(/\s+/g, ' ').trim();
    }).filter(Boolean),
    text: [...document.querySelectorAll('main p, main li, main td, main th, main figcaption, footer p, footer li')]
      .map((e) => e.textContent.replace(/\s+/g, ' ').trim()),
  }));
  for (const h of heads) {
    if (titleCase(h) !== h) issues.push(`${u} heading case: "${h}" → "${titleCase(h)}"`);
    for (const clause of h.split(/(?<!\b(?:St|vs|Mt|Ch|Art)\.)(?<=[:.!?])\s+/)) {
      if (QUESTION.test(clause) && !clause.endsWith('?')) issues.push(`${u} question missing "?": "${h}"`);
    }
    if (/\.$/.test(h) && !/Received\.$/.test(h)) issues.push(`${u} heading ends with a period: "${h}"`);
  }
  for (const t of text) {
    if (/ {2,}| ,| \.(?!\d)| \?|,,|\.\.(?!\.)/.test(t)) issues.push(`${u} spacing/punctuation: "${t.slice(0, 100)}"`);
    if (/[A-Za-z]'[A-Za-z]|(?:^|\s)"[A-Za-z]|[A-Za-z]"(?:\s|$)/.test(t)) issues.push(`${u} straight quote: "${t.slice(0, 100)}"`);
    if (/\w - \w/.test(t)) issues.push(`${u} hyphen used as a dash: "${t.slice(0, 100)}"`);
  }
}
await browser.close();
const unique = [...new Set(issues)];
console.log(unique.length ? unique.join('\n') : `Copy check: ${urls.length} pages, no issues found.`);
process.exit(unique.length ? 1 : 0);
