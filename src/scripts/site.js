// Site-wide behavior: mobile nav, attribution capture, quote form submit, analytics events.
// Analytics events go to window.dataLayer (GTM / GA4 / Ads read from it). No-op if no tag manager is loaded.

const dl = (window.dataLayer = window.dataLayer || []);
const track = (event, params = {}) => dl.push({ event, ...params });

const store = {
  get(k) { try { return JSON.parse(localStorage.getItem(k)); } catch { return null; } },
  set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch { /* storage unavailable */ } },
};

/* ---------------- mobile navigation ---------------- */
const toggle = document.querySelector('.menu-toggle');
const nav = document.getElementById('primary-nav');
if (toggle && nav) {
  const setOpen = (open) => {
    toggle.setAttribute('aria-expanded', String(open));
    nav.classList.toggle('is-open', open);
    document.body.classList.toggle('nav-open', open);
  };
  toggle.addEventListener('click', () => setOpen(toggle.getAttribute('aria-expanded') !== 'true'));
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') { setOpen(false); toggle.focus(); }
  });
  window.matchMedia('(min-width: 60rem)').addEventListener('change', (m) => m.matches && setOpen(false));
}

/* ---------------- attribution (first touch, 30 days) ---------------- */
const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'gclid'];
const params = new URLSearchParams(location.search);
let attribution = store.get('ftf_attr');
const hasNewCampaign = UTM_KEYS.some((k) => params.get(k));
if (!attribution || hasNewCampaign || Date.now() - (attribution.ts || 0) > 30 * 864e5) {
  attribution = {
    ts: Date.now(),
    landing_page: location.href,
    referrer: document.referrer && !document.referrer.startsWith(location.origin) ? document.referrer : '',
    ...Object.fromEntries(UTM_KEYS.map((k) => [k, params.get(k) || ''])),
  };
  store.set('ftf_attr', attribution);
}

/* ---------------- click tracking ---------------- */
document.addEventListener('click', (e) => {
  const a = e.target.closest('a, button');
  if (!a) return;
  const href = a.getAttribute('href') || '';
  if (href.startsWith('tel:')) track('phone_click', { link_location: a.dataset.cta || a.closest('[class]')?.className.split(' ')[0] || '', page_path: location.pathname });
  else if (href.startsWith('mailto:')) track('email_click', { page_path: location.pathname });
  else if (a.dataset.cta) track('cta_click', { cta_id: a.dataset.cta, cta_text: a.textContent.trim().slice(0, 60), page_path: location.pathname });
});

/* ---------------- scroll depth (service / area / article pages) ---------------- */
if (document.querySelector('[data-track-scroll]')) {
  const marks = [50, 90];
  const seen = new Set();
  const onScroll = () => {
    const h = document.documentElement;
    const pct = ((h.scrollTop + innerHeight) / h.scrollHeight) * 100;
    for (const m of marks) if (pct >= m && !seen.has(m)) { seen.add(m); track('scroll_depth', { percent: m, page_path: location.pathname }); }
    if (seen.size === marks.length) removeEventListener('scroll', onScroll);
  };
  addEventListener('scroll', onScroll, { passive: true });
}

/* ---------------- quote forms ---------------- */
const digits = (s) => (s || '').replace(/\D/g, '');
const validators = {
  name: (v) => (v.trim().length >= 2 ? '' : 'Please enter your name.'),
  phone: (v) => { const d = digits(v); return d.length === 10 || (d.length === 11 && d[0] === '1') ? '' : 'Please enter a 10-digit phone number.'; },
  email: (v) => (!v.trim() || /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) ? '' : 'Please enter a valid email address, or leave it blank.'),
  zip: (v) => (/^\d{5}(-\d{4})?$/.test(v.trim()) ? '' : 'Please enter a 5-digit ZIP code.'),
};

function showError(form, name, msg) {
  const input = form.elements[name];
  if (!input) return;
  const err = document.getElementById(input.getAttribute('aria-describedby'));
  input.setAttribute('aria-invalid', msg ? 'true' : 'false');
  if (err) err.textContent = msg;
}

function validate(form) {
  let first = null;
  for (const [name, fn] of Object.entries(validators)) {
    const msg = fn(form.elements[name]?.value || '');
    showError(form, name, msg);
    if (msg && !first) first = form.elements[name];
  }
  return first;
}

document.querySelectorAll('[data-quote-form]').forEach((form) => {
  const wrap = form.closest('[data-quote-form-wrap]');
  const status = form.querySelector('[data-form-status]');
  const success = wrap.querySelector('[data-form-success]');
  const button = form.querySelector('button[type="submit"]');
  let started = false;

  form.elements.started_at.value = String(Date.now());
  form.elements.source_page.value = location.href;
  form.elements.landing_page.value = attribution.landing_page || '';
  form.elements.referrer.value = attribution.referrer || '';
  for (const k of UTM_KEYS) if (form.elements[k]) form.elements[k].value = attribution[k] || '';

  form.addEventListener('focusin', () => {
    if (!started) { started = true; track('quote_form_start', { form_id: form.id, page_path: location.pathname }); }
  });
  // Validate a field when the user leaves it (only once they've typed something), re-validate as they fix it.
  form.addEventListener('focusout', (e) => {
    const n = e.target.name;
    if (validators[n] && e.target.value) showError(form, n, validators[n](e.target.value));
  });
  form.addEventListener('input', (e) => {
    const n = e.target.name;
    if (validators[n] && e.target.getAttribute('aria-invalid') === 'true') showError(form, n, validators[n](e.target.value));
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    status.removeAttribute('data-state');
    status.textContent = '';
    const firstInvalid = validate(form);
    if (firstInvalid) { firstInvalid.focus(); track('quote_form_invalid', { form_id: form.id }); return; }

    button.setAttribute('aria-busy', 'true');
    button.disabled = true;
    try {
      const res = await fetch(form.action, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: new URLSearchParams(new FormData(form)),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) {
        if (data.errors) for (const [n, m] of Object.entries(data.errors)) showError(form, n, m);
        throw new Error(data.message || 'Something went wrong sending your request.');
      }
      track('generate_lead', {
        form_id: form.id,
        project_type: form.elements.project_type?.value || '',
        fence_type: form.elements.fence_type?.value || '',
        page_path: location.pathname,
      });
      form.hidden = true;
      success.dataset.visible = 'true';
      success.focus();
    } catch (err) {
      status.dataset.state = 'error';
      status.textContent = `${err.message} Please try again, or call us at (810) 614-4181.`;
      track('quote_form_error', { form_id: form.id, error: String(err.message).slice(0, 100) });
    } finally {
      button.removeAttribute('aria-busy');
      button.disabled = false;
    }
  });
});
