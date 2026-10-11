// Netlify Function (v2) — receives quote form POSTs at /api/quote and emails them to the business.
// Delivery works with no configuration: leads go through FormSubmit.co to finaltouchfencing@gmail.com
// (the inbox must click FormSubmit's one-time "Activate Form" email). All settings are optional and
// live in Netlify → Project configuration → Environment variables, never in code:
//   QUOTE_TO_EMAIL        destination inbox (default finaltouchfencing@gmail.com)
//   FORMSUBMIT_ALIAS      the random alias FormSubmit emails after activation; used instead of the address
//   RESEND_API_KEY        switch delivery to Resend (branded HTML email) once a domain is verified there
//   QUOTE_FROM_EMAIL      Resend sender, e.g. "Final Touch Fencing Website <quotes@finaltouchfencing.com>"
//   TURNSTILE_SECRET_KEY  enables Cloudflare Turnstile verification (pair with PUBLIC_TURNSTILE_SITE_KEY at build)
import { handleQuote } from '../lib/quote-core.mjs';

export default async (req, context) => {
  const headers = Object.fromEntries([...req.headers.entries()].map(([k, v]) => [k.toLowerCase(), v]));
  const bodyText = req.method === 'POST' ? await req.text() : '';
  const result = await handleQuote(
    { method: req.method, headers, bodyText, ip: context?.ip },
    {
      RESEND_API_KEY: Netlify.env.get('RESEND_API_KEY'),
      RESEND_API_URL: Netlify.env.get('RESEND_API_URL'),
      QUOTE_TO_EMAIL: Netlify.env.get('QUOTE_TO_EMAIL'),
      QUOTE_FROM_EMAIL: Netlify.env.get('QUOTE_FROM_EMAIL'),
      FORMSUBMIT_ALIAS: Netlify.env.get('FORMSUBMIT_ALIAS'),
      TURNSTILE_SECRET_KEY: Netlify.env.get('TURNSTILE_SECRET_KEY'),
    },
  );
  return new Response(result.body, { status: result.status, headers: result.headers });
};

export const config = { path: '/api/quote' };
