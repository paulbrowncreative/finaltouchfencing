// Browser test of the quote forms against tests/e2e/server.mjs.
// Run: npm run build && node tests/e2e/server.mjs & node tests/e2e/form.e2e.mjs
import { chromium } from 'playwright';
import assert from 'node:assert/strict';

const BASE = process.env.BASE || 'http://localhost:4321';
const outbox = async () => (await fetch(`${BASE}/__outbox`)).json();
const results = [];
const step = async (name, fn) => {
  try { await fn(); results.push(['PASS', name]); } catch (e) { results.push(['FAIL', name, e.message]); }
};

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 390, height: 844 } });
const page = await ctx.newPage();
const consoleErrors = [];
page.on('console', (m) => m.type() === 'error' && consoleErrors.push(m.text()));
page.on('pageerror', (e) => consoleErrors.push(e.message));

await step('empty submit shows inline errors and sends nothing', async () => {
  await page.goto(`${BASE}/contact/?utm_source=google&utm_medium=cpc&utm_campaign=e2e&utm_term=fence+company&utm_content=v1`);
  const before = (await outbox()).length;
  await page.click('#contact-quote button[type=submit]');
  for (const f of ['name', 'phone', 'zip']) {
    assert.equal(await page.getAttribute(`#contact-quote-${f}`, 'aria-invalid'), 'true', `${f} not flagged`);
    assert.ok((await page.textContent(`#contact-quote-${f}-error`)).length > 5, `${f} has no message`);
  }
  assert.equal(await page.evaluate(() => document.activeElement.id), 'contact-quote-name', 'focus not moved to first invalid field');
  assert.equal((await outbox()).length, before);
});

await step('bad phone / ZIP / email messages', async () => {
  await page.fill('#contact-quote-name', 'E2E Tester');
  await page.fill('#contact-quote-phone', '555-12');
  await page.fill('#contact-quote-zip', '480');
  await page.fill('#contact-quote-email', 'not-an-email');
  await page.click('#contact-quote button[type=submit]');
  assert.match(await page.textContent('#contact-quote-phone-error'), /10-digit/);
  assert.match(await page.textContent('#contact-quote-zip-error'), /5-digit/);
  assert.match(await page.textContent('#contact-quote-email-error'), /valid email/);
});

await step('valid submission shows success and delivers a complete email', async () => {
  await page.fill('#contact-quote-phone', '(586) 555-0199');
  await page.fill('#contact-quote-zip', '48080');
  await page.fill('#contact-quote-email', 'e2e@example.com');
  await page.click('#contact-quote label:has-text("Replace a fence")');
  await page.selectOption('#contact-quote-fence_type', 'Vinyl');
  await page.fill('#contact-quote-details', 'Replace 120 ft of old wood with white vinyl.');
  await page.click('#contact-quote summary');
  await page.fill('#contact-quote-address', '1 Test St');
  await page.fill('#contact-quote-city', 'St. Clair Shores');
  await page.fill('#contact-quote-length', '120 ft');
  await page.selectOption('#contact-quote-gate', 'Yes, walk gate');
  await page.selectOption('#contact-quote-timeline', 'As soon as possible');
  await page.waitForTimeout(2700); // the time trap rejects sub-2.5s submissions
  const before = (await outbox()).length;
  await Promise.all([page.waitForURL('**/thank-you/', { timeout: 8000 }), page.click('#contact-quote button[type=submit]')]);
  assert.match(await page.textContent('h1'), /Thank You — Your Quote Request Is In/);
  const mails = await outbox();
  assert.equal(mails.length, before + 1, 'no email captured');
  const m = mails.at(-1).fields;
  assert.equal(mails.at(-1).path, '/');
  const expect = { 'form-name': 'quote', subject: 'New quote request — Final Touch Fencing website', name: 'E2E Tester', phone: '(586) 555-0199',
    email: 'e2e@example.com', address: '1 Test St', city: 'St. Clair Shores', zip: '48080', project_type: 'Replace a fence', fence_type: 'Vinyl',
    length: '120 ft', gate: 'Yes, walk gate', timeline: 'As soon as possible', details: 'Replace 120 ft of old wood with white vinyl.',
    utm_source: 'google', utm_medium: 'cpc', utm_campaign: 'e2e', utm_term: 'fence company', utm_content: 'v1' };
  for (const [k, v] of Object.entries(expect)) assert.equal(m[k], v, `submitted field ${k}`);
  assert.ok(m.source_page.startsWith(`${BASE}/contact/`), 'source page missing');
  assert.ok(m.landing_page.startsWith(`${BASE}/contact/?utm_source=google`), 'landing page missing');
  const events = await page.evaluate(() => window.dataLayer.map((e) => e.event));
  assert.ok(events.includes('generate_lead'), 'generate_lead not tracked on the confirmation page');
  await page.reload();
  const again = await page.evaluate(() => window.dataLayer.filter((e) => e.event === 'generate_lead').length);
  assert.equal(again, 0, 'reloading the confirmation page must not count another lead');
});

await step('first-touch UTM persists to a form on another page (service page)', async () => {
  await page.goto(`${BASE}/services/gates/`);
  assert.equal(await page.inputValue('#quote-form input[name=utm_campaign]'), 'e2e');
  assert.equal(await page.isChecked('#quote-form input[value="Gate"]'), true, 'gate service not preselected');
  await page.fill('#quote-form-name', 'Second Form');
  await page.fill('#quote-form-phone', '8105550100');
  await page.fill('#quote-form-zip', '48047');
  await page.waitForTimeout(2700);
  const before = (await outbox()).length;
  await Promise.all([page.waitForURL('**/thank-you/', { timeout: 8000 }), page.click('#quote-form button[type=submit]')]);
  const m = (await outbox()).at(-1).fields;
  assert.equal((await outbox()).length, before + 1);
  assert.equal(m.source_page, `${BASE}/services/gates/`);
  assert.equal(m.project_type, 'Gate');
});

await step('honeypot-filled submission shows success to the bot but sends nothing', async () => {
  await page.goto(`${BASE}/`);
  await page.fill('#quote-form-name', 'Spam Bot');
  await page.fill('#quote-form-phone', '8105550101');
  await page.fill('#quote-form-zip', '48080');
  await page.evaluate(() => { document.querySelector('#quote-form input[name=company]').value = 'http://spam'; });
  await page.waitForTimeout(2700);
  const before = (await outbox()).length;
  await Promise.all([page.waitForURL('**/thank-you/', { timeout: 8000 }), page.click('#quote-form button[type=submit]')]);
  assert.equal((await outbox()).length, before);
});

await step('server error shows a visible, recoverable error state', async () => {
  await page.goto(`${BASE}/contact/`);
  const failPost = (r) => (r.request().method() === 'POST' ? r.fulfill({ status: 500, body: 'error' }) : r.continue());
  await page.route(`${BASE}/`, failPost);
  await page.fill('#contact-quote-name', 'Err Test');
  await page.fill('#contact-quote-phone', '8105550102');
  await page.fill('#contact-quote-zip', '48080');
  await page.click('#contact-quote button[type=submit]');
  await page.waitForSelector('[data-form-status][data-state=error]');
  assert.match(await page.textContent('[data-form-status]'), /couldn’t send.*\(810\) 614-4181/);
  assert.equal(await page.isVisible('#contact-quote'), true, 'form should stay visible for retry');
  await page.unroute(`${BASE}/`, failPost);
});

await step('works without JavaScript (303 → thank-you page)', async () => {
  const noJs = await browser.newContext({ javaScriptEnabled: false });
  const p = await noJs.newPage();
  await p.goto(`${BASE}/contact/`);
  await p.fill('#contact-quote-name', 'No JS');
  await p.fill('#contact-quote-phone', '8105550103');
  await p.fill('#contact-quote-zip', '48080');
  const before = (await outbox()).length;
  await Promise.all([p.waitForURL('**/thank-you/'), p.click('#contact-quote button[type=submit]')]);
  assert.match(await p.textContent('h1'), /Thank You — Your Quote Request Is In/);
  assert.equal((await outbox()).length, before + 1);
  await noJs.close();
});

await step('no unexpected console errors', async () => { assert.deepEqual(consoleErrors.filter((e) => !/500 \(Internal Server Error\)/.test(e)), []); });

await browser.close();
for (const r of results) console.log(r.join(' | '));
const failed = results.filter((r) => r[0] === 'FAIL').length;
console.log(`\n${results.length - failed}/${results.length} passed`);
process.exit(failed ? 1 : 0);
