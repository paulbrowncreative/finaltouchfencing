import { test } from 'node:test';
import assert from 'node:assert/strict';
import { handleQuote, composeEmail, normalize, validate, isSpam } from '../netlify/lib/quote-core.mjs';

const NOW = Date.parse('2026-10-07T15:30:00Z');
const env = { RESEND_API_KEY: 'test_key' };
const good = {
  name: 'Jane Homeowner',
  phone: '586-555-0142',
  email: 'jane@example.com',
  zip: '48080',
  address: '123 Lakeview St',
  city: 'St. Clair Shores',
  project_type: 'New fence',
  fence_type: 'Wood privacy',
  length: '150 ft',
  gate: 'Yes, walk gate',
  timeline: 'Within 1–3 months',
  details: 'Back yard, remove old wood fence.\nDog in yard.',
  company: '',
  started_at: String(NOW - 60_000),
  source_page: 'https://finaltouchfencing.com/services/wood-fencing/',
  landing_page: 'https://finaltouchfencing.com/?utm_source=google&utm_medium=cpc',
  referrer: 'https://www.google.com/',
  utm_source: 'google',
  utm_medium: 'cpc',
  utm_campaign: 'fence-scs',
  utm_term: 'fence company st clair shores',
  utm_content: 'ad-a',
  gclid: 'abc123',
};

function mockFetch() {
  const calls = [];
  const fn = async (url, init) => {
    calls.push({ url, init, body: init.body instanceof URLSearchParams ? init.body : JSON.parse(init.body) });
    return new Response(JSON.stringify({ id: 'email_1' }), { status: 200 });
  };
  fn.calls = calls;
  return fn;
}
const post = (data, { json = true, ct = 'application/x-www-form-urlencoded' } = {}) => ({
  method: 'POST',
  headers: { 'content-type': ct, accept: json ? 'application/json' : 'text/html' },
  bodyText: ct.includes('json') ? JSON.stringify(data) : new URLSearchParams(data).toString(),
});

test('valid submission emails finaltouchfencing@gmail.com with every field', async () => {
  const f = mockFetch();
  const res = await handleQuote(post(good), env, { fetchImpl: f, now: NOW });
  assert.equal(res.status, 200);
  assert.deepEqual(JSON.parse(res.body), { ok: true });
  assert.equal(f.calls.length, 1);
  const { url, init, body } = f.calls[0];
  assert.equal(url, 'https://api.resend.com/emails');
  assert.equal(init.headers.Authorization, 'Bearer test_key');
  assert.deepEqual(body.to, ['finaltouchfencing@gmail.com']);
  assert.equal(body.reply_to, 'jane@example.com');
  assert.match(body.subject, /Jane Homeowner/);
  for (const needle of [
    'NEW FINAL TOUCH FENCING QUOTE REQUEST', 'Name: Jane Homeowner', 'Phone: (586) 555-0142', 'Email: jane@example.com',
    'Address: 123 Lakeview St', 'City: St. Clair Shores', 'ZIP: 48080', 'Project Type: New fence', 'Fence Type: Wood privacy',
    'Approximate Length: 150 ft', 'Gate Needed: Yes, walk gate', 'Timeline: Within 1–3 months', 'Additional Details: Back yard',
    'Source Page: https://finaltouchfencing.com/services/wood-fencing/', 'Landing Page: https://finaltouchfencing.com/?utm_source=google',
    'utm_source: google', 'utm_medium: cpc', 'utm_campaign: fence-scs', 'utm_term: fence company st clair shores', 'utm_content: ad-a',
    'gclid: abc123', 'Submission Date/Time: Wednesday, October 7, 2026',
  ]) assert.ok(body.text.includes(needle), `email text missing: ${needle}`);
  assert.match(body.html, /Dog in yard/);
});

test('QUOTE_TO_EMAIL override and verified from-address are respected', async () => {
  const f = mockFetch();
  await handleQuote(post(good), { ...env, QUOTE_TO_EMAIL: 'a@x.com, b@x.com', QUOTE_FROM_EMAIL: 'Site <q@finaltouchfencing.com>' }, { fetchImpl: f, now: NOW });
  assert.deepEqual(f.calls[0].body.to, ['a@x.com', 'b@x.com']);
  assert.equal(f.calls[0].body.from, 'Site <q@finaltouchfencing.com>');
});

test('required fields are enforced server-side', async () => {
  const f = mockFetch();
  const res = await handleQuote(post({ ...good, name: '', phone: '123', zip: 'abc', email: 'nope' }), env, { fetchImpl: f, now: NOW });
  assert.equal(res.status, 422);
  const body = JSON.parse(res.body);
  assert.equal(body.ok, false);
  assert.deepEqual(Object.keys(body.errors).sort(), ['email', 'name', 'phone', 'zip']);
  assert.equal(f.calls.length, 0);
});

test('email is optional; 11-digit US phone accepted', () => {
  assert.deepEqual(validate(normalize({ ...good, email: '', phone: '+1 (810) 614-4181' })), {});
});

test('honeypot submissions are silently dropped', async () => {
  const f = mockFetch();
  const res = await handleQuote(post({ ...good, company: 'Acme SEO' }), env, { fetchImpl: f, now: NOW });
  assert.equal(res.status, 200);
  assert.equal(f.calls.length, 0);
});

test('too-fast submissions are dropped', async () => {
  const f = mockFetch();
  await handleQuote(post({ ...good, started_at: String(NOW - 800) }), env, { fetchImpl: f, now: NOW });
  assert.equal(f.calls.length, 0);
  assert.equal(isSpam({ details: 'http://a http://b http://c' }, NOW), 'links');
});

test('no-JS form post gets a 303 redirect to the thank-you page', async () => {
  const f = mockFetch();
  const res = await handleQuote(post(good, { json: false }), env, { fetchImpl: f, now: NOW });
  assert.equal(res.status, 303);
  assert.equal(res.headers.Location, '/thank-you/');
  const bad = await handleQuote(post({ ...good, phone: '' }, { json: false }), env, { fetchImpl: f, now: NOW });
  assert.equal(bad.headers.Location, '/quote-error/');
});

test('JSON bodies are accepted', async () => {
  const f = mockFetch();
  const res = await handleQuote(post(good, { ct: 'application/json' }), env, { fetchImpl: f, now: NOW });
  assert.equal(res.status, 200);
  assert.equal(f.calls.length, 1);
});

test('provider failure returns a 502 error the form can show', async () => {
  const failing = async () => new Response('{"message":"invalid key"}', { status: 401 });
  const res = await handleQuote(post(good), env, { fetchImpl: failing, now: NOW });
  assert.equal(res.status, 502);
  assert.equal(JSON.parse(res.body).ok, false);
});

// FormSubmit is the default (no key needed); Resend is used only when RESEND_API_KEY is set.
const formSubmitFetch = (reply = { success: 'true', message: 'The form was submitted successfully.' }, status = 200) => {
  const calls = [];
  const fn = async (url, init) => {
    calls.push({ url, init, body: JSON.parse(init.body) });
    return new Response(JSON.stringify(reply), { status });
  };
  fn.calls = calls;
  return fn;
};

test('with no Resend key, leads go to finaltouchfencing@gmail.com through FormSubmit server-side', async () => {
  const f = formSubmitFetch();
  const res = await handleQuote(post(good), {}, { fetchImpl: f, now: NOW });
  assert.equal(res.status, 200);
  assert.equal(f.calls.length, 1);
  const { url, init, body } = f.calls[0];
  assert.equal(url, 'https://formsubmit.co/ajax/finaltouchfencing%40gmail.com');
  assert.equal(init.headers.Referer, 'https://finaltouchfencing.com/');
  assert.equal(init.headers.Origin, 'https://finaltouchfencing.com');
  assert.equal(body._captcha, 'false');
  assert.equal(body._template, 'table');
  assert.equal(body._replyto, 'jane@example.com');
  assert.match(body._subject, /^New quote request: Jane Homeowner/);
  assert.equal(body.Name, 'Jane Homeowner');
  assert.equal(body.Phone, '(586) 555-0142');
  assert.equal(body['Additional Details'], 'Back yard, remove old wood fence.\nDog in yard.');
  assert.match(body['Submission Date/Time'], /2026.*\(Eastern\)$/);
  assert.equal(body.utm_campaign, 'fence-scs');
  assert.equal(body.gclid, 'abc123');
  // Field order in the email matches the form.
  assert.deepEqual(Object.keys(body).slice(4, 7), ['Name', 'Phone', 'Email']);
});

test('FormSubmit alias replaces the address, and blanks show as a dash', async () => {
  const f = formSubmitFetch();
  await handleQuote(post({ ...good, email: '', fence_type: '' }), { FORMSUBMIT_ALIAS: 'a1b2c3d4e5' }, { fetchImpl: f, now: NOW });
  assert.equal(f.calls[0].url, 'https://formsubmit.co/ajax/a1b2c3d4e5');
  assert.equal(f.calls[0].body._replyto, undefined);
  assert.equal(f.calls[0].body['Fence Type'], '—');
});

test('FormSubmit "needs activation" is a failure, never reported as delivered', async () => {
  const f = formSubmitFetch({ success: 'false', message: 'This form needs Activation.' });
  const res = await handleQuote(post(good), {}, { fetchImpl: f, now: NOW });
  assert.equal(res.status, 502);
  assert.equal(JSON.parse(res.body).ok, false);
  const down = await handleQuote(post(good), {}, { fetchImpl: formSubmitFetch({}, 500), now: NOW });
  assert.equal(down.status, 502);
});

test('Turnstile is enforced when a secret is configured', async () => {
  const calls = [];
  const f = async (url, init) => {
    calls.push(url);
    if (url.includes('turnstile')) return new Response(JSON.stringify({ success: init.body.get('response') === 'good-token' }));
    return new Response('{}', { status: 200 });
  };
  const e2 = { ...env, TURNSTILE_SECRET_KEY: 's' };
  assert.equal((await handleQuote(post(good), e2, { fetchImpl: f, now: NOW })).status, 403);
  assert.equal((await handleQuote(post({ ...good, 'cf-turnstile-response': 'bad' }), e2, { fetchImpl: f, now: NOW })).status, 403);
  assert.equal((await handleQuote(post({ ...good, 'cf-turnstile-response': 'good-token' }), e2, { fetchImpl: f, now: NOW })).status, 200);
});

test('HTML is escaped and header injection is neutralized', () => {
  const data = normalize({ ...good, name: 'Bob <script>alert(1)</script>\r\nBcc: evil@x.com', details: '<img src=x onerror=alert(1)>' });
  assert.ok(!data.name.includes('\n'));
  const mail = composeEmail(data, { now: new Date(NOW) });
  assert.ok(!mail.html.includes('<script>'));
  assert.ok(!mail.html.includes('<img src=x'));
  assert.ok(!mail.subject.includes('\n'));
});

test('non-POST and oversized requests are rejected', async () => {
  assert.equal((await handleQuote({ method: 'GET', headers: {}, bodyText: '' }, env)).status, 405);
  const big = await handleQuote({ ...post(good), bodyText: 'x'.repeat(25_000) }, env, { fetchImpl: mockFetch(), now: NOW });
  assert.equal(big.status, 413);
});
