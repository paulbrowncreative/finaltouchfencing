import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import fs from 'node:fs';

// CONFIRM: production domain (not yet registered). Also update public/robots.txt and src/data/site.js.
const SITE = 'https://www.finaltouchfencing.com';
const EXCLUDE = ['/thank-you/', '/quote-error/', '/404/'];

// <lastmod> for blog posts from front matter (`updated`, else `date`). Other pages omit it rather than
// report a build date that doesn't reflect a real content change.
const POST_DATES = Object.fromEntries(
  fs.readdirSync('src/content/blog').filter((f) => f.endsWith('.md')).map((f) => {
    const fm = fs.readFileSync(`src/content/blog/${f}`, 'utf8').split('---')[1];
    const d = (fm.match(/^updated:\s*(\S+)/m) || fm.match(/^date:\s*(\S+)/m))?.[1];
    return [`/blog/${f.replace(/\.md$/, '')}/`, d];
  }),
);

export default defineConfig({
  site: SITE,
  trailingSlash: 'always',
  build: { format: 'directory', inlineStylesheets: 'always' },
  integrations: [
    sitemap({
      filter: (page) => !EXCLUDE.some((p) => page.endsWith(p)),
      serialize(item) {
        const d = POST_DATES[new URL(item.url).pathname];
        if (d) item.lastmod = new Date(d).toISOString();
        return item;
      },
    }),
  ],
});
