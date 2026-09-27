import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const projects = defineCollection({
  loader: glob({ base: "./src/content/projects", pattern: "**/*.{md,mdx}" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      publishDate: z.coerce.date(),
      summary: z.string(),
      cover: image(),
      coverAlt: z.string(),
      status: z.enum(["planned", "in-progress", "finished"]).default("finished"),
      itemType: z.string(),
      pattern: z.string().optional(),
      designer: z.string().optional(),
      fabric: z.string().optional(),
      techniques: z.array(z.string()).default([]),
      featured: z.boolean().default(false),
      draft: z.boolean().default(true),
      gallery: z
        .array(
          z.object({
            image: image(),
            alt: z.string()
          })
        )
        .default([])
    })
});

const journal = defineCollection({
  loader: glob({ base: "./src/content/journal", pattern: "**/*.{md,mdx}" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      publishDate: z.coerce.date(),
      summary: z.string(),
      cover: image(),
      coverAlt: z.string(),
      tags: z.array(z.string()).default([]),
      featured: z.boolean().default(false),
      draft: z.boolean().default(true)
    })
});

const pages = defineCollection({
  loader: glob({ base: "./src/content/pages", pattern: "**/*.{md,mdx}" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      eyebrow: z.string().optional(),
      portrait: image().optional(),
      portraitAlt: z.string().optional()
    })
});

export const collections = { projects, journal, pages };
