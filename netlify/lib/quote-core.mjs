// Quote request processing: parsing, spam checks, validation, email composition and delivery.
// Pure functions + an injectable `fetch` so everything here is unit-testable without network access.

export const FIELD_LABELS = [
  ['name', 'Name'],
  ['phone', 'Phone'],
  ['email', 'Email'],
  ['address', 'Address'],
  ['city', 'City'],
  ['zip', 'ZIP'],
  ['project_type', 'Project Type'],
  ['fence_type', 'Fence Type'],
  ['length', 'Approximate Length'],
  ['gate', 'Gate Needed'],
  ['timeline', 'Timeline'],
  ['details', 'Additional Details'],
];
export const TRACKING_LABELS = [
  ['source_page', 'Source Page'],
  ['landing_page', 'Landing Page'],
  ['referrer', 'Referrer'],
  ['utm_source', 'utm_source'],
  ['utm_medium', 'utm_medium'],
  ['utm_campaign', 'utm_campaign'],
  ['utm_term', 'utm_term'],
  ['utm_content', 'utm_content'],
  ['gclid', 'gclid'],
];
const MAX_LEN = { details: 3000, default: 300 };
const MIN_FILL_MS = 2500; // humans don't complete the form in under 2.5s
const MAX_BODY_BYTES = 20_000;

/** Normalize a submission (URLSearchParams | object) into trimmed strings with length caps. */
export function normalize(input) {
  const entries = input instanceof URLSearchParams ? [...input.entries()] : Object.entries(input || {});
  const out = {};
  for (const [k, v] of entries) {
    if (typeof v !== 'string') continue;
    // Strip control characters (keeps newlines/tabs in details) to prevent header/format injection.
    const clean = v.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '').trim();
    out[k] = clean.slice(0, MAX_LEN[k] ?? MAX_LEN.default);
  }
  // Single-line fields: collapse any newlines.
  for (const k of Object.keys(out)) if (k !== 'details') out[k] = out[k].replace(/[\r\n]+/g, ' ');
  return out;
}

export function isSpam(data, now = Date.now()) {
  if (data.company) return 'honeypot';
  const started = Number(data.started_at);
  if (started && now - started < MIN_FILL_MS) return 'too-fast';
  const linkCount = (data.details?.match(/https?:\/\//gi) || []).length;
  if (linkCount > 2) return 'links';
  return null;
}

export function validate(data) {
  const errors = {};
  if (!data.name || data.name.length < 2) errors.name = 'Please enter your name.';
  const digits = (data.phone || '').replace(/\D/g, '');
  if (!(digits.length === 10 || (digits.length === 11 && digits[0] === '1'))) errors.phone = 'Please enter a 10-digit phone number.';
  if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(data.email)) errors.email = 'Please enter a valid email address, or leave it blank.';
  if (!/^\d{5}(-\d{4})?$/.test(data.zip || '')) errors.zip = 'Please enter a 5-digit ZIP code.';
  return errors;
}

export function formatPhone(raw) {
  const d = (raw || '').replace(/\D/g, '').replace(/^1(?=\d{10}$)/, '');
  return d.length === 10 ? `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}` : raw;
}

const escapeHtml = (s) =>
  String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

export function composeEmail(data, { now = new Date(), timeZone = 'America/Detroit' } = {}) {
  const submitted = now.toLocaleString('en-US', { timeZone, dateStyle: 'full', timeStyle: 'short' });
  const v = { ...data, phone: formatPhone(data.phone) };
  const line = (label, key) => `${label}: ${v[key] || '—'}`;
  const text = [
    'NEW FINAL TOUCH FENCING QUOTE REQUEST',
    '',
    ...FIELD_LABELS.map(([k, l]) => line(l, k)),
    '',
    `Submission Date/Time: ${submitted} (Eastern)`,
    ...TRACKING_LABELS.map(([k, l]) => line(l, k)),
  ].join('\n');

  const row = (label, value) =>
    `<tr><th align="left" style="padding:6px 12px 6px 0;vertical-align:top;color:#545b62;font-weight:600;white-space:nowrap">${escapeHtml(label)}</th><td style="padding:6px 0;vertical-align:top;word-break:break-word;overflow-wrap:anywhere">${value ? escapeHtml(value).replace(/\n/g, '<br>') : '<span style="color:#9aa0a6">—</span>'}</td></tr>`;
  const tel = (v.phone || '').replace(/[^\d+]/g, '');
  const html = `<!doctype html><html><body style="margin:0;padding:24px;background:#f6f3ee;font-family:Arial,Helvetica,sans-serif;color:#15181b">
<div style="max-width:640px;margin:0 auto;background:#fff;border-top:6px solid #e21e26;padding:24px">
<h1 style="margin:0 0 4px;font-size:20px;letter-spacing:.02em">NEW FINAL TOUCH FENCING QUOTE REQUEST</h1>
<p style="margin:0 0 20px;color:#545b62;font-size:14px">${escapeHtml(submitted)} (Eastern)</p>
<p style="margin:0 0 20px"><a href="tel:${escapeHtml(tel)}" style="display:inline-block;background:#c41e28;color:#fff;padding:10px 16px;text-decoration:none;font-weight:bold">Call ${escapeHtml(v.name || 'customer')}: ${escapeHtml(v.phone || '')}</a></p>
<table style="border-collapse:collapse;font-size:15px;width:100%">${FIELD_LABELS.map(([k, l]) => row(l, v[k])).join('')}</table>
<h2 style="font-size:13px;letter-spacing:.1em;text-transform:uppercase;color:#545b62;margin:24px 0 8px">Source &amp; tracking</h2>
<table style="border-collapse:collapse;font-size:13px;width:100%">${row('Submission Date/Time', submitted)}${TRACKING_LABELS.map(([k, l]) => row(l, v[k])).join('')}</table>
</div></body></html>`;

  const subjectBits = [v.project_type, v.fence_type, v.city || v.zip].filter(Boolean).join(' · ');
  const subject = `New quote request: ${v.name}${subjectBits ? ` — ${subjectBits}` : ''}`.slice(0, 180);
  return { subject, text, html };
}

export async function verifyTurnstile(token, { secret, ip, fetchImpl = fetch }) {
  if (!secret) return true; // Turnstile not configured
  if (!token) return false;
  const body = new URLSearchParams({ secret, response: token, ...(ip ? { remoteip: ip } : {}) });
  const res = await fetchImpl('https://challenges.cloudflare.com/turnstile/v0/siteverify', { method: 'POST', body });
  const json = await res.json().catch(() => ({}));
  return Boolean(json.success);
}

export async function sendEmail({ subject, text, html, replyTo }, env, fetchImpl = fetch) {
  const apiKey = env.RESEND_API_KEY;
  if (!apiKey) throw new Error('Email delivery is not configured (missing RESEND_API_KEY).');
  const res = await fetchImpl(env.RESEND_API_URL || 'https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: env.QUOTE_FROM_EMAIL || 'Final Touch Fencing Website <onboarding@resend.dev>',
      to: (env.QUOTE_TO_EMAIL || 'finaltouchfencing@gmail.com').split(',').map((s) => s.trim()),
      ...(replyTo ? { reply_to: replyTo } : {}),
      subject,
      text,
      html,
    }),
  });
  if (!res.ok) {
    const detail = await res.text().catch(() => '');
    throw new Error(`Email provider error ${res.status}: ${detail.slice(0, 200)}`);
  }
  return res.json().catch(() => ({}));
}

/**
 * Handle a quote submission. Returns { status, body, headers } so the Netlify adapter stays thin.
 * JSON clients (fetch with Accept: application/json) get JSON; plain form posts get a 303 redirect.
 */
export async function handleQuote({ method, headers, bodyText, ip }, env, { fetchImpl = fetch, now = Date.now() } = {}) {
  const wantsJson = (headers['accept'] || '').includes('application/json');
  const respond = (status, payload, redirectTo) =>
    wantsJson || !redirectTo
      ? { status, headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' }, body: JSON.stringify(payload) }
      : { status: 303, headers: { Location: redirectTo, 'Cache-Control': 'no-store' }, body: '' };

  if (method !== 'POST') return { status: 405, headers: { Allow: 'POST' }, body: 'Method Not Allowed' };
  if (bodyText.length > MAX_BODY_BYTES) return respond(413, { ok: false, message: 'Submission too large.' }, '/quote-error/');

  const type = headers['content-type'] || '';
  let raw;
  try {
    raw = type.includes('application/json') ? JSON.parse(bodyText) : new URLSearchParams(bodyText);
  } catch {
    return respond(400, { ok: false, message: 'Invalid submission.' }, '/quote-error/');
  }
  const data = normalize(raw);

  const spam = isSpam(data, now);
  if (spam) {
    // Pretend success so bots get no signal; nothing is sent.
    console.warn(`quote: dropped spam submission (${spam})`);
    return respond(200, { ok: true }, '/thank-you/');
  }

  const errors = validate(data);
  if (Object.keys(errors).length) return respond(422, { ok: false, message: 'Please check the highlighted fields.', errors }, '/quote-error/');

  const human = await verifyTurnstile(data['cf-turnstile-response'], { secret: env.TURNSTILE_SECRET_KEY, ip, fetchImpl });
  if (!human) return respond(403, { ok: false, message: 'Spam check failed. Please reload the page and try again.' }, '/quote-error/');

  try {
    const mail = composeEmail(data, { now: new Date(now) });
    await sendEmail({ ...mail, replyTo: data.email || undefined }, env, fetchImpl);
  } catch (err) {
    console.error('quote: email delivery failed', err);
    return respond(502, { ok: false, message: 'We couldn’t send your request right now.' }, '/quote-error/');
  }
  return respond(200, { ok: true }, '/thank-you/');
}
