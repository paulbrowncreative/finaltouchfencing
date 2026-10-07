# Final Touch Fencing LLC — Website

Static site built with [Astro](https://astro.build) and deployed on Netlify, plus one serverless function for the quote form.

- 41 indexable pages: home, 9 service pages, 6 service-area pages, a 15-post blog, about, our work, reviews, contact, hubs and legal pages
- Copy follows the voice and style guide in `docs/brand-voice.md`. Read it before editing any page or post.
- Every business fact lives in `src/data/` (sources: `research/online-presence-audit.md`, `research/local-regulations.md`)
- All photos are the company's own project photos (`src/assets/images/`), served as AVIF and WebP at responsive sizes

## Develop

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # outputs dist/
npm test           # quote handler unit tests (13)
npm run test:e2e   # builds nothing; serves dist/ and runs browser form tests (8)
node tests/e2e/audit.mjs   # with the e2e server running: SEO, link, schema and axe WCAG audit
```

## Blog

Posts are Markdown files in `src/content/blog/`, validated against the schema in `src/content.config.ts`: `title`, `seoTitle` (62 characters max), `description` (110–160 characters), `summary`, `date`, `category`, `image` (a key from `src/data/photos.js`), target `keywords`, and related `services` and `areas`.

To add a post, copy an existing file, change the frontmatter and write in the brand voice. The post automatically appears in:

- the blog index
- the RSS feed (`/blog/rss.xml`)
- the sitemap
- "Related guides" on its linked service and area pages
- "More fence guides" on other posts

Old `/resources/` URLs 301-redirect to the blog (`netlify.toml`).

## Quote form (how submissions reach finaltouchfencing@gmail.com)

`QuoteForm.astro` POSTs to `/api/quote`, which is handled by `netlify/functions/quote.mjs` (logic in `netlify/lib/quote-core.mjs`). The function validates the submission, filters spam (honeypot, time trap, link count, optional Cloudflare Turnstile), and sends a formatted email through the [Resend](https://resend.com) API. Visitors never leave the page and no email app opens. Without JavaScript, the form still works and redirects to `/thank-you/`.

The email contains every field, plus the source page, landing page, referrer, UTM tags, gclid and submission time (Eastern).

### Launch setup (required for the form to send email)

1. Create a Resend account and an API key.
   - **Quick start:** sign up for Resend *with finaltouchfencing@gmail.com*. Resend's test sender (`onboarding@resend.dev`) can deliver to the account owner's address before you verify a domain.
   - **Production:** verify the site's domain in Resend and set `QUOTE_FROM_EMAIL` to an address on it.
2. In Netlify → Site configuration → Environment variables, set `RESEND_API_KEY`, `QUOTE_TO_EMAIL` and `QUOTE_FROM_EMAIL` (see `.env.example`). Never put these in code.
3. Deploy, submit a test quote on the live site, and confirm it arrives in the inbox. Check spam the first time.
4. Optional: add Cloudflare Turnstile keys (`PUBLIC_TURNSTILE_SITE_KEY` at build time, `TURNSTILE_SECRET_KEY` for the function).

## Analytics

Set `PUBLIC_GTM_ID` to load Google Tag Manager, then configure GA4, Google Ads and Meta in GTM. The site pushes these `dataLayer` events:

| Event | When |
|---|---|
| `generate_lead` | Quote form submitted successfully (use as the conversion) |
| `quote_form_start` | First interaction with a quote form |
| `quote_form_invalid` / `quote_form_error` | Validation failure / server or network error |
| `phone_click` | Any `tel:` link |
| `email_click` | Any `mailto:` link |
| `cta_click` | Any element with `data-cta` (`cta_id` identifies which one) |
| `scroll_depth` | 50% and 90% on service, area and guide pages |

## Before launch: confirm with the owner

These are marked `CONFIRM` in `src/data/site.js`:

- **Domain:** `finaltouchfencing.com` isn't registered yet. If a different domain is used, update `astro.config.mjs`, `src/data/site.js` and `public/robots.txt`.
- **Hours:** the listings disagree (Mon–Fri 8–5 on Yelp, 9–5 on Angi, 7 days 8–6 on Thumbtack). The site uses Mon–Fri 8–5.
- **Address:** the site shows the city only (service-area business). Set `address.showStreet` to show the street address.
- **Insurance and warranty:** both are listed as "yes" on Angi and HomeAdvisor. Confirm before promoting them more strongly.
- **Full-size photos:** the aluminum, vinyl and staining photos are 332px Angi thumbnails (`src/assets/images/projects-lowres/`). Replace them with originals.
