# Content Schema & Relationships

This is the most important file. It defines the "database" — all content types, their fields, and how they relate to each other.

## Schema Definition

Create `src/content/content.config.ts`:

```ts
import { defineCollection, reference, z } from "astro:content";
import { glob } from "astro/loaders";

// ============================================================
// Shared schemas (reusable across collections)
// ============================================================

const seoSchema = z.object({
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
  ogImage: z.string().url().optional(),
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
    thumbnail: z.string().url(), // URL to CDN-hosted image
    tags: z.array(z.string()).default([]),
    seo: seoSchema.optional(),

    // Compile-time validated references — build fails if slug doesn't exist
    relatedProjects: z.array(reference("projects")).default([]),
  }),
});

const blog = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "src/content/blog" }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    draft: z.boolean().default(false),
    author: z.string().optional(),
    thumbnail: z.string().url().optional(),
    tags: z.array(z.string()).default([]),
    seo: seoSchema.optional(),

    // Compile-time validated references
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
    thumbnail: z.string().url().optional(),
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
// A dedicated collection for curating what appears on the homepage.
// Each entry is a reference to an item in another collection.
// Using a collection (instead of a loose .ts file) means Astro
// validates every slug at build time — typos break the build, not prod.

const highlights = defineCollection({
  loader: glob({ pattern: "**/*.yaml", base: "src/content/highlights" }),
  schema: z.object({
    label: z.string().optional(), // optional override label for the homepage
    source: z.discriminatedUnion("collection", [
      z.object({ collection: z.literal("projects"), entry: reference("projects") }),
      z.object({ collection: z.literal("blog"), entry: reference("blog") }),
      z.object({ collection: z.literal("labs"), entry: reference("labs") }),
    ]),
    order: z.number(), // controls display order on homepage
  }),
});

export const collections = { projects, blog, labs, pages, highlights };
```

### How highlights work

Each highlight is a tiny YAML file in `src/content/highlights/`:

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

If `cool-project` or `how-we-design` doesn't exist, **the build fails** with a clear error message pointing at the broken reference.

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

There is no JOIN or foreign key. Relationships are **slug strings resolved at build time** with `getEntry()` or `getCollection()`.

### Pattern 1: Related Projects in a Case Study

Frontmatter in `src/content/projects/cool-project.mdx`:

```yaml
---
title: Cool Project
client: Acme Corp
date: 2024-06-01
thumbnail: https://cdn.significa.co/projects/cool-project/thumb.jpg
relatedProjects:
  - another-project
  - third-project
---
```

If `another-project` or `third-project` don't exist as files in `src/content/projects/`, **the build fails immediately** with a clear error.

In the page template `src/pages/projects/[slug].astro`:

```astro
---
import { getCollection, getEntry } from "astro:content";

export async function getStaticPaths() {
  const projects = await getCollection("projects", ({ data }) => !data.draft);
  return projects.map((project) => ({
    params: { slug: project.id },
    props: { project },
  }));
}

const { project } = Astro.props;
const { Content } = await project.render();

// Resolve related projects — reference() gives you { id, collection } objects
const relatedProjects = await Promise.all(
  project.data.relatedProjects.map((ref) => getEntry(ref))
);
---
```

### Pattern 2: Homepage Highlights (cross-collection)

Highlights are a dedicated content collection — see the `highlights` collection in the schema above. Each highlight is a small YAML file that references an entry in another collection. Astro validates every reference at build time.

See the schema definition above for the full implementation.

### Pattern 3: MDX Cross-Sell Component

Inside any `.mdx` file:

```mdx
Here's the case study content...

<ProjectCrossSell slug="another-project" />

More content continues...
```

The component `src/components/mdx/ProjectCrossSell.astro`:

```astro
---
import { getEntry } from "astro:content";

interface Props {
  slug: string;
}

const { slug } = Astro.props;
const project = await getEntry("projects", slug);

if (!project) {
  throw new Error(`ProjectCrossSell: project "${slug}" not found`);
}
---

<a href={`/projects/${project.id}`} class="cross-sell-card">
  <img src={project.data.thumbnail} alt={project.data.title} />
  <div>
    <strong>{project.data.title}</strong>
    {project.data.tagline && <p>{project.data.tagline}</p>}
  </div>
</a>
```

## Important Notes

- **All cross-content references use `reference()` from Astro.** This gives you compile-time validation — a typo in a slug breaks the build, not production.
- **`reference()` returns `{ id, collection }` objects**, not the full entry. You still need `getEntry(ref)` to resolve the actual data.
- **Drafts:** filter with `({ data }) => !data.draft` in `getCollection()` calls. Never in the schema.
