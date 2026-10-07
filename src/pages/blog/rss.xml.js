import rss from '@astrojs/rss';
import { getPosts } from '../../lib/blog.js';

export async function GET(context) {
  const posts = await getPosts();
  return rss({
    title: 'Final Touch Fencing Blog',
    description: 'Fence guides for St. Clair Shores, Macomb County and Metro Detroit homeowners.',
    site: context.site,
    items: posts.map((p) => ({
      title: p.data.title,
      description: p.data.description,
      pubDate: p.data.date,
      link: `/blog/${p.id}/`,
      categories: [p.data.category],
    })),
    customData: '<language>en-us</language>',
  });
}
