// Quote email fields, shared by the browser (direct FormSubmit delivery) and the Netlify function
// (fallback), so every lead email lists the same fields in the same order however it was sent.

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

export function formatPhone(raw) {
  const d = (raw || '').replace(/\D/g, '').replace(/^1(?=\d{10}$)/, '');
  return d.length === 10 ? `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}` : raw;
}

export const submittedAt = (now = new Date()) =>
  now.toLocaleString('en-US', { timeZone: 'America/Detroit', dateStyle: 'full', timeStyle: 'short' });

export function quoteSubject(v) {
  const bits = [v.project_type, v.fence_type, v.city || v.zip].filter(Boolean).join(' · ');
  return `New quote request: ${v.name}${bits ? ` — ${bits}` : ''}`.slice(0, 180);
}

/** Ordered [label, value] rows for the lead email. `data` holds the raw form values. */
export function quoteRows(data, now = new Date()) {
  const v = { ...data, phone: formatPhone(data.phone) };
  return [
    ...FIELD_LABELS.map(([k, l]) => [l, v[k] || '—']),
    ['Submission Date/Time', `${submittedAt(now)} (Eastern)`],
    ...TRACKING_LABELS.map(([k, l]) => [l, v[k] || '—']),
  ];
}

/** FormSubmit.co JSON body: control fields first, then the lead in form order. */
export function formSubmitPayload(data, now = new Date()) {
  return {
    _subject: quoteSubject({ ...data, phone: formatPhone(data.phone) }),
    _template: 'table',
    _captcha: 'false',
    ...(data.email ? { _replyto: data.email } : {}),
    ...Object.fromEntries(quoteRows(data, now)),
  };
}
