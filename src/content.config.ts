import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const games = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/games' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      slug: z.string().optional(),
      status: z.enum(['teaser', 'announced', 'released']),
      tagline: z.string(),
      keyArt: image(),
      trailer: z.url().optional(),
      platforms: z.array(z.string()).default([]),
      storeLinks: z.record(z.string(), z.url()).default({}),
      mailingList: z.boolean().default(false),
    }),
});

export const collections = { games };
