import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Blog posts live in src/content/blog/*.md. Copy follows docs/brand-voice.md.
const blog = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(), // H1, sentence case
    seoTitle: z.string().max(62), // <title>, brand appended by the template when it fits
    description: z.string().min(110).max(160),
    summary: z.string(), // card + intro deck
    date: z.coerce.date(),
    updated: z.coerce.date().optional(),
    category: z.enum(['Permits and rules', 'Materials and styles', 'Planning and cost', 'Care and repair']),
    image: z.string(), // key from src/data/photos.js
    keywords: z.array(z.string()).min(1), // target search phrases (editorial planning, not emitted as meta)
    services: z.array(z.string()).default([]), // service slugs this post supports
    areas: z.array(z.string()).default([]), // service-area slugs this post supports
    featured: z.boolean().default(false),
  }),
});

export const collections = { blog };
