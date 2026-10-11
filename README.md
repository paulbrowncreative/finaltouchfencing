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

Quote forms use **Netlify Forms**. Every `QuoteForm.astro` instance is named `quote` (`data-netlify="true"`, honeypot `company`). With JavaScript, `src/scripts/site.js` validates the fields and posts them in the background to the site itself, so the visitor stays on the page and sees the thank-you message. Without JavaScript, the plain POST lands on `/thank-you/`. Netlify stores every submission (Netlify → Forms) and emails it to the business. No API keys, and no outside form service.

Each submission includes every field, plus the source page, landing page, referrer, UTM tags and gclid.

### Launch setup (Netlify dashboard, one time)

1. **Project configuration → Forms → Enable form detection**, then redeploy. The `quote` form appears under **Forms**.
2. **Project configuration → Notifications → Emails and webhooks → Form submission notifications → Add notification → Email notification**: email `finaltouchfencing@gmail.com`, form `quote`.
3. Submit a test quote on the live site. Confirm it appears under **Forms → quote** and arrives in Gmail (check spam the first time and mark **Not spam**).

`netlify/functions/quote.mjs` (`/api/quote`) is an unused legacy endpoint that can deliver through Resend or FormSubmit. The form no longer calls it.

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
