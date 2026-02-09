# Content Schema & Relationships

Defines the "database": all content types, their fields, and how they relate to each other.

## Schema Definition

File: `src/content/content.config.ts`

```ts
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
// Collections
// ============================================================

const projects = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "src/content/projects" }),
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
  loader: glob({ pattern: "**/*.{md,mdx}", base: "src/content/blog" }),
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
  loader: glob({ pattern: "**/*.mdx", base: "src/content/labs" }),
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
  loader: glob({ pattern: "**/*.mdx", base: "src/content/pages" }),
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
  loader: glob({ pattern: "**/*.yaml", base: "src/content/highlights" }),
  schema: z.object({
    label: z.string().optional(),
    source: z.discriminatedUnion("collection", [
      z.object({ collection: z.literal("projects"), entry: reference("projects") }),
      z.object({ collection: z.literal("blog"), entry: reference("blog") }),
      z.object({ collection: z.literal("labs"), entry: reference("labs") }),
    ]),
    order: z.number(),
  }),
});

export const collections = { projects, blog, labs, pages, highlights };
```

### How Highlights Work

Each highlight is a YAML file in `src/content/highlights/`:

```yaml
# src/content/highlights/01-cool-project.yaml
order: 1
source:
  collection: projects
  entry: cool-project
```

```yaml
# src/content/highlights/02-design-post.yaml
order: 2
source:
  collection: blog
  entry: how-we-design
```

If `cool-project` or `how-we-design` doesn't exist, **the build fails** with a clear error message.

Resolve in `src/pages/index.astro`:

```astro
---
import { getCollection, getEntry } from "astro:content";

const allHighlights = await getCollection("highlights");
const sorted = allHighlights.sort((a, b) => a.data.order - b.data.order);

const resolved = await Promise.all(
  sorted.map(async (h) => {
    const entry = await getEntry(h.data.source.collection, h.data.source.entry.id);
    return { ...h.data, entry, collection: h.data.source.collection };
  })
);
---
```

## How Relationships Work

Relationships are slug strings resolved at build time with `getEntry()` or `getCollection()`. All cross-content references use `reference()` from Astro for compile-time validation.

### Pattern 1: Related Projects in a Case Study

Frontmatter in `src/content/projects/cool-project.mdx`:

```yaml
---
title: Cool Project
client: Acme Corp
date: 2024-06-01
thumbnail: /images/projects/cool-project/thumb.jpg
relatedProjects:
  - another-project
  - third-project
---
```

If `another-project` or `third-project` don't exist as files in `src/content/projects/`, **the build fails immediately**.

In the page template `src/pages/projects/[slug].astro`:

```astro
---
import { getCollection, getEntry, render } from "astro:content";

export async function getStaticPaths() {
  const projects = await getCollection("projects", ({ data }) => !data.draft);
  return projects.map((project) => ({
    params: { slug: project.id },
    props: { project },
  }));
}

const { project } = Astro.props;
const { Content } = await render(project);

// Resolve related projects
const relatedProjects = await Promise.all(
  project.data.relatedProjects.map((ref) => getEntry(ref))
);
---
```

### Pattern 2: Homepage Highlights (Cross-Collection)

Each highlight references an entry in another collection via `discriminatedUnion`. See the schema above.

### Pattern 3: MDX Cross-Sell Component

Inside any `.mdx` file:

```mdx
<ProjectCrossSell slug="another-project" />
```

The component resolves the slug with `getEntry()` and throws at build time if not found.

## Important Notes

- **`reference()` returns `{ id, collection }` objects**, not the full entry. Resolve with `getEntry(ref)`.
- **Drafts:** filter with `({ data }) => !data.draft` in `getCollection()` calls. Never in the schema.
- **Blog supports both `.md` and `.mdx`.** Blog posts that don't need custom components can use plain `.md`.
- **YAML for structured data without prose.** Highlights, team data, config-like content.
