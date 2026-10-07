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
  await page.click('#contact-quote button[type=submit]');
  await page.waitForSelector('[data-form-success][data-visible=true]', { timeout: 8000 });
  assert.match(await page.textContent('[data-form-success]'), /Thank you! Your quote request has been received\./);
  const mails = await outbox();
  assert.equal(mails.length, before + 1, 'no email captured');
  const m = mails.at(-1);
  assert.deepEqual(m.to, ['finaltouchfencing@gmail.com']);
  assert.equal(m.reply_to, 'e2e@example.com');
  for (const s of ['Name: E2E Tester', 'Phone: (586) 555-0199', 'Email: e2e@example.com', 'Address: 1 Test St', 'City: St. Clair Shores', 'ZIP: 48080',
    'Project Type: Replace a fence', 'Fence Type: Vinyl', 'Approximate Length: 120 ft', 'Gate Needed: Yes, walk gate', 'Timeline: As soon as possible',
    'Additional Details: Replace 120 ft', `Source Page: ${BASE}/contact/`, 'utm_source: google', 'utm_medium: cpc', 'utm_campaign: e2e',
    'utm_term: fence company', 'utm_content: v1', `Landing Page: ${BASE}/contact/?utm_source=google`])
    assert.ok(m.text.includes(s), `email missing "${s}"`);
  const events = await page.evaluate(() => window.dataLayer.map((e) => e.event));
  assert.ok(events.includes('quote_form_start'), 'quote_form_start not tracked');
  assert.ok(events.includes('generate_lead'), 'generate_lead not tracked');
});

await step('first-touch UTM persists to a form on another page (service page)', async () => {
  await page.goto(`${BASE}/services/gates/`);
  assert.equal(await page.inputValue('#quote input[name=utm_campaign]'), 'e2e');
  assert.equal(await page.isChecked('#quote input[value="Gate"]'), true, 'gate service not preselected');
  await page.fill('#quote-name', 'Second Form');
  await page.fill('#quote-phone', '8105550100');
  await page.fill('#quote-zip', '48047');
  await page.waitForTimeout(2700);
  const before = (await outbox()).length;
  await page.click('#quote button[type=submit]');
  await page.waitForSelector('#quote-band-h ~ * [data-form-success][data-visible=true], [data-form-success][data-visible=true]', { timeout: 8000 });
  const m = (await outbox()).at(-1);
  assert.equal((await outbox()).length, before + 1);
  assert.ok(m.text.includes(`Source Page: ${BASE}/services/gates/`));
  assert.ok(m.text.includes('Project Type: Gate'));
});

await step('honeypot-filled submission shows success to the bot but sends nothing', async () => {
  await page.goto(`${BASE}/`);
  await page.fill('#quote-name', 'Spam Bot');
  await page.fill('#quote-phone', '8105550101');
  await page.fill('#quote-zip', '48080');
  await page.evaluate(() => { document.querySelector('#quote input[name=company]').value = 'http://spam'; });
  await page.waitForTimeout(2700);
  const before = (await outbox()).length;
  await page.click('#quote button[type=submit]');
  await page.waitForSelector('[data-form-success][data-visible=true]', { timeout: 8000 });
  assert.equal((await outbox()).length, before);
});

await step('server error shows a visible, recoverable error state', async () => {
  await page.goto(`${BASE}/contact/`);
  await page.route('**/api/quote', (r) => r.fulfill({ status: 502, contentType: 'application/json', body: JSON.stringify({ ok: false, message: 'We couldn’t send your request right now.' }) }));
  await page.fill('#contact-quote-name', 'Err Test');
  await page.fill('#contact-quote-phone', '8105550102');
  await page.fill('#contact-quote-zip', '48080');
  await page.click('#contact-quote button[type=submit]');
  await page.waitForSelector('[data-form-status][data-state=error]');
  assert.match(await page.textContent('[data-form-status]'), /couldn’t send.*\(810\) 614-4181/);
  assert.equal(await page.isVisible('#contact-quote'), true, 'form should stay visible for retry');
  await page.unroute('**/api/quote');
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
  assert.match(await p.textContent('h1'), /Thank you/);
  assert.equal((await outbox()).length, before + 1);
  await noJs.close();
});

await step('no unexpected console errors', async () => { assert.deepEqual(consoleErrors.filter((e) => !/502 \(Bad Gateway\)/.test(e)), []); });

await browser.close();
for (const r of results) console.log(r.join(' | '));
const failed = results.filter((r) => r[0] === 'FAIL').length;
console.log(`\n${results.length - failed}/${results.length} passed`);
process.exit(failed ? 1 : 0);
