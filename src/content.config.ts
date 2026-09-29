import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const articles = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/articles' }),
  schema: z.object({
    title: z.string(),
    excerpt: z.string(),
    category: z.enum(['Vedic Astrology', 'Intuitive Tarot', 'Numerology', 'Editorial Insights']),
    date: z.string(),
    readingTime: z.string(),
    featuredImage: z.string(),
    tags: z.array(z.string()),
  }),
});

export const collections = { articles };
