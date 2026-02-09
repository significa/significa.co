import { defineCollection, reference, z } from "astro:content";
import { glob } from "astro/loaders";

// ============================================================
// Shared schemas (reusable across collections)
// ============================================================

const seoSchema = z.object({
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
  ogImage: z.string().optional(),
});

// ============================================================
// ID generation: strip file extensions for clean URLs
// ============================================================

function stripExtension({ entry }: { entry: string }) {
  return entry.replace(/\.(mdx?|yaml)$/, "");
}

// ============================================================
// Collections
// ============================================================

const projects = defineCollection({
  loader: glob({
    pattern: "**/*.mdx",
    base: "src/content/projects",
    generateId: stripExtension,
  }),
  schema: z.object({
    title: z.string(),
    tagline: z.string().optional(),
    client: z.string().optional(),
    date: z.coerce.date(),
    draft: z.boolean().default(false),
    thumbnail: z.string(),
    tags: z.array(z.string()).default([]),
    seo: seoSchema.optional(),
    relatedProjects: z.array(reference("projects")).default([]),
  }),
});

const blog = defineCollection({
  loader: glob({
    pattern: "**/*.{md,mdx}",
    base: "src/content/blog",
    generateId: stripExtension,
  }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    draft: z.boolean().default(false),
    author: z.string().optional(),
    thumbnail: z.string().optional(),
    tags: z.array(z.string()).default([]),
    seo: seoSchema.optional(),
    relatedProjects: z.array(reference("projects")).default([]),
  }),
});

const labs = defineCollection({
  loader: glob({
    pattern: "**/*.mdx",
    base: "src/content/labs",
    generateId: stripExtension,
  }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    draft: z.boolean().default(false),
    repoUrl: z.string().url().optional(),
    thumbnail: z.string().optional(),
    tags: z.array(z.string()).default([]),
    seo: seoSchema.optional(),
  }),
});

const pages = defineCollection({
  loader: glob({
    pattern: "**/*.mdx",
    base: "src/content/pages",
    generateId: stripExtension,
  }),
  schema: z.object({
    title: z.string(),
    seo: seoSchema.optional(),
  }),
});

// ============================================================
// Homepage highlights
// ============================================================
// Each entry references an item in another collection.
// Astro validates every slug at build time: typos break the build, not prod.

const highlights = defineCollection({
  loader: glob({
    pattern: "**/*.yaml",
    base: "src/content/highlights",
    generateId: stripExtension,
  }),
  schema: z.object({
    label: z.string().optional(),
    source: z.discriminatedUnion("collection", [
      z.object({
        collection: z.literal("projects"),
        entry: reference("projects"),
      }),
      z.object({
        collection: z.literal("blog"),
        entry: reference("blog"),
      }),
      z.object({
        collection: z.literal("labs"),
        entry: reference("labs"),
      }),
    ]),
    order: z.number(),
  }),
});

export const collections = { projects, blog, labs, pages, highlights };
