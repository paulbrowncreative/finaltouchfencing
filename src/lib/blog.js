import { getCollection } from 'astro:content';
import { getImage } from 'astro:assets';
import { photos } from '../data/photos.js';

export const CATEGORIES = ['Permits and rules', 'Materials and styles', 'Planning and cost', 'Care and repair'];
export const categoryId = (c) => c.toLowerCase().replace(/[^a-z]+/g, '-');

export async function getPosts() {
  const posts = await getCollection('blog');
  return posts.sort((a, b) => b.data.date - a.data.date || a.data.title.localeCompare(b.data.title));
}

export const readingMinutes = (body = '') => Math.max(2, Math.round(body.split(/\s+/).filter(Boolean).length / 225));

export const formatDate = (d) =>
  d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC' });

export const postPhoto = (post) => photos[post.data.image] ?? photos.panorama;

/** Posts tied to a service or area slug (for "Related guides" on service and area pages). */
export async function postsFor({ service, area, limit = 3 }) {
  const posts = await getPosts();
  const score = (p) => (service && p.data.services.includes(service) ? 2 : 0) + (area && p.data.areas.includes(area) ? 2 : 0);
  return posts.filter((p) => score(p) > 0).sort((a, b) => score(b) - score(a)).slice(0, limit);
}

/** 1200×630 JPEG social image cropped from a project photo. */
export async function ogImageFor(photo) {
  const img = await getImage({ src: photo.src, width: 1200, height: 630, fit: 'cover', format: 'jpg', quality: 80 });
  return img.src;
}
