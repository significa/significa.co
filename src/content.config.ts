import { defineCollection, reference, z } from "astro:content";
import { glob, type Loader } from "astro/loaders";

// ============================================================
// Shared schemas (reusable across collections)
// ============================================================

const seoSchema = z.object({
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
  ogImage: z.string().optional(),
});

/**
 * A single metric shown on project cards (e.g. "55%↑", "3.2x").
 * Used in project frontmatter and rendered on the homepage showcase.
 */
const metricSchema = z.object({
  value: z.string(),
  label: z.string(),
});

// ============================================================
// Loader
// ============================================================
const contentLoader = ({ base, extensions }: { extensions: string[]; base: string }): Loader => {
  // id generation: strip file extensions for clean URLs
  const stripExtension = ({ entry }: { entry: string }) => {
    return entry.replace(/\.(mdx?|yaml)$/, "");
  };

  // filter drafts only in production
  const draftFilter = import.meta.env.MODE === "development" ? "**" : "!(*.draft)";
  // filter extensions
  const extensionFilter = extensions.length > 1 ? `{${extensions.join(",")}}` : extensions[0];

  return glob({
    pattern: `**/${draftFilter}.${extensionFilter}`,
    base,
    generateId: stripExtension,
  });
};

// ============================================================
// Collections
// ============================================================

const projects = defineCollection({
  loader: contentLoader({
    base: "src/content/projects",
    extensions: ["mdx"],
  }),
  schema: z.object({
    title: z.string(),
    tagline: z.string().optional(),
    client: z.string().optional(),
    date: z.coerce.date(),
    draft: z.boolean().default(false),
    thumbnail: z.string(),
    /** Large hero image for homepage showcase and project detail header */
    heroImage: z.string().optional(),
    tags: z.array(z.string()).default([]),
    /** Key metrics shown on project cards (e.g. conversion uplift, NPS) */
    metrics: z.array(metricSchema).default([]),
    seo: seoSchema.optional(),
    relatedProjects: z.array(reference("projects")).default([]),
  }),
});

const blog = defineCollection({
  loader: contentLoader({
    extensions: ["md", "mdx"],
    base: "src/content/blog",
  }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
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
  loader: contentLoader({
    extensions: ["md", "mdx"],
    base: "src/content/labs",
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
  loader: contentLoader({
    extensions: ["mdx"],
    base: "src/content/pages",
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
  loader: contentLoader({
    extensions: ["yaml"],
    base: "src/content/highlights",
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

// ============================================================
// Clients — logo strip, references across the site
// ============================================================
// YAML entries for each client. Used by the homepage logo strip,
// project pages, and anywhere we need to show who we work with.

const clients = defineCollection({
  loader: contentLoader({
    extensions: ["yaml"],
    base: "src/content/clients",
  }),
  schema: z.object({
    name: z.string(),
    /** Path to SVG logo in public/ (e.g. "/logos/boeing.svg") */
    logo: z.string(),
    url: z.string().url().optional(),
    order: z.number().default(0),
  }),
});

// ============================================================
// Testimonials — customer quotes
// ============================================================
// YAML entries for client testimonials. Used on the homepage,
// and potentially on project pages or a dedicated social proof section.

const testimonials = defineCollection({
  loader: contentLoader({
    extensions: ["yaml"],
    base: "src/content/testimonials",
  }),
  schema: z.object({
    quote: z.string(),
    author: z.string(),
    role: z.string(),
    company: z.string(),
    /** CDN path to author avatar (optional) */
    avatar: z.string().optional(),
    order: z.number().default(0),
  }),
});

// ============================================================
// Awards — recognition and validation
// ============================================================
// YAML entries for awards and recognitions. Shown on the homepage
// in a scrollable list. Each award references the project it was for.

const awards = defineCollection({
  loader: contentLoader({
    extensions: ["yaml"],
    base: "src/content/awards",
  }),
  schema: z.object({
    /** Award name (e.g. "Red Dot", "Awwwards Site of the Day") */
    award: z.string(),
    year: z.number(),
    /** Project that won the award — validated at build time */
    project: reference("projects"),
    /** External link to the award page (optional) */
    url: z.string().url().optional(),
    order: z.number().default(0),
  }),
});

export const collections = {
  projects,
  blog,
  labs,
  pages,
  highlights,
  clients,
  testimonials,
  awards,
};
