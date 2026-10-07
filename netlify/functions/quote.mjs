// Netlify Function (v2) — receives quote form POSTs at /api/quote and emails them to the business.
// Required env (set in Netlify → Site configuration → Environment variables, never in code):
//   RESEND_API_KEY        API key from resend.com
//   QUOTE_TO_EMAIL        defaults to finaltouchfencing@gmail.com
//   QUOTE_FROM_EMAIL      e.g. "Final Touch Fencing Website <quotes@finaltouchfencing.com>" (verified domain)
// Optional:
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
      TURNSTILE_SECRET_KEY: Netlify.env.get('TURNSTILE_SECRET_KEY'),
    },
  );
  return new Response(result.body, { status: result.status, headers: result.headers });
};

export const config = { path: '/api/quote' };
