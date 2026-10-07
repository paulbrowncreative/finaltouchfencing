import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// CONFIRM: production domain (not yet registered). Also update public/robots.txt and src/data/site.js.
const SITE = 'https://www.finaltouchfencing.com';
const EXCLUDE = ['/thank-you/', '/quote-error/', '/404/'];

export default defineConfig({
  site: SITE,
  trailingSlash: 'always',
  build: { format: 'directory', inlineStylesheets: 'always' },
  integrations: [sitemap({ filter: (page) => !EXCLUDE.some((p) => page.endsWith(p)) })],
});
