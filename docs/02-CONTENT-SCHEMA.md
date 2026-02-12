# Content Schema & Relationships

Defines the "database": all content types, their fields, and how they relate to each other.

## Schema Definition

File: `src/content.config.ts` (at the root of `src/`, not inside `src/content/`)

### Shared Schemas

```ts
import { defineCollection, reference, z } from "astro:content";
import { glob } from "astro/loaders";

const seoSchema = z.object({
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
  ogImage: z.string().optional(),
});

const metricSchema = z.object({
  value: z.string(),
  label: z.string(),
});
```

### ID Generation

All collections use a `generateId` function that strips file extensions for clean URL slugs:

```ts
function stripExtension({ entry }: { entry: string }) {
  return entry.replace(/\.(mdx?|yaml)$/, "");
}
```

This means `example-project.mdx` gets the ID `example-project`, used in URLs and references.

## Collections

### Projects (MDX)

Case studies. The richest content type.

```ts
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
    heroImage: z.string().optional(),
    tags: z.array(z.string()).default([]),
    metrics: z.array(metricSchema).default([]),
    seo: seoSchema.optional(),
    relatedProjects: z.array(reference("projects")).default([]),
  }),
});
```

| Field | Type | Required | Description |
|---|---|---|---|
| `title` | string | yes | Project name |
| `tagline` | string | no | Short description for cards |
| `client` | string | no | Client company name |
| `date` | date | yes | Project date (used for sorting) |
| `draft` | boolean | no | Default `false`. Filter at query time, not schema |
| `thumbnail` | string | yes | CDN path for listing cards |
| `heroImage` | string | no | CDN path for showcase/detail header |
| `tags` | string[] | no | Categorization tags |
| `metrics` | metric[] | no | Key metrics shown on project cards (e.g. `{ value: "55%↑", label: "Conversion" }`) |
| `seo` | object | no | Override meta title, description, OG image |
| `relatedProjects` | reference[] | no | Build-time validated slugs of related projects |

### Blog (MD/MDX)

Blog posts. Supports both `.md` (no components) and `.mdx` (with components).

```ts
const blog = defineCollection({
  loader: glob({
    pattern: "**/*.{md,mdx}",
    base: "src/content/blog",
    generateId: stripExtension,
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
```

| Field | Type | Required | Description |
|---|---|---|---|
| `title` | string | yes | Post title |
| `description` | string | no | Short description for SEO and RSS. Falls back to title-based string if missing |
| `date` | date | yes | Publication date |
| `draft` | boolean | no | Default `false` |
| `author` | string | no | Author name |
| `thumbnail` | string | no | CDN path for listing cards |
| `tags` | string[] | no | Categorization tags |
| `seo` | object | no | Override meta title, description, OG image |
| `relatedProjects` | reference[] | no | Cross-sell to project case studies |

### Labs (MDX)

Open source projects and experiments.

```ts
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
```

### Pages (MDX)

Miscellaneous content pages (about, services, etc.) rendered by the catch-all `[...slug].astro`.

```ts
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
```

### Highlights (YAML)

Homepage curation. Each entry references an item in another collection using a discriminated union. Astro validates every slug at build time.

```ts
const highlights = defineCollection({
  loader: glob({
    pattern: "**/*.yaml",
    base: "src/content/highlights",
    generateId: stripExtension,
  }),
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
```

Example YAML:

```yaml
# src/content/highlights/01-cool-project.yaml
order: 1
label: Featured Project
source:
  collection: projects
  entry: example-project
```

If `example-project` doesn't exist in `src/content/projects/`, **the build fails** with a clear error.

### Clients (YAML)

Client logo strip and references across the site.

```ts
const clients = defineCollection({
  loader: glob({
    pattern: "**/*.yaml",
    base: "src/content/clients",
    generateId: stripExtension,
  }),
  schema: z.object({
    name: z.string(),
    logo: z.string(),
    url: z.string().url().optional(),
    order: z.number().default(0),
  }),
});
```

| Field | Type | Required | Description |
|---|---|---|---|
| `name` | string | yes | Client company name |
| `logo` | string | yes | Path to SVG logo in `public/` (e.g. `/logos/boeing.svg`) |
| `url` | string | no | Client website URL |
| `order` | number | no | Sort order (ascending). Default `0` |

### Testimonials (YAML)

Customer quotes for social proof sections.

```ts
const testimonials = defineCollection({
  loader: glob({
    pattern: "**/*.yaml",
    base: "src/content/testimonials",
    generateId: stripExtension,
  }),
  schema: z.object({
    quote: z.string(),
    author: z.string(),
    role: z.string(),
    company: z.string(),
    avatar: z.string().optional(),
    order: z.number().default(0),
  }),
});
```

| Field | Type | Required | Description |
|---|---|---|---|
| `quote` | string | yes | The testimonial text |
| `author` | string | yes | Person's name |
| `role` | string | yes | Job title |
| `company` | string | yes | Company name |
| `avatar` | string | no | CDN path to author photo |
| `order` | number | no | Sort order (ascending). Default `0` |

### Awards (YAML)

Recognition and validation. Each award references a project.

```ts
const awards = defineCollection({
  loader: glob({
    pattern: "**/*.yaml",
    base: "src/content/awards",
    generateId: stripExtension,
  }),
  schema: z.object({
    award: z.string(),
    year: z.number(),
    project: reference("projects"),
    url: z.string().url().optional(),
    order: z.number().default(0),
  }),
});
```

| Field | Type | Required | Description |
|---|---|---|---|
| `award` | string | yes | Award name (e.g. "Red Dot", "Awwwards SOTD") |
| `year` | number | yes | Year awarded |
| `project` | reference | yes | Project that won — build-time validated |
| `url` | string | no | External link to award page |
| `order` | number | no | Sort order (ascending). Default `0` |

## Export

All collections must be exported from `src/content.config.ts`:

```ts
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
```

## How Relationships Work

All cross-content references use `reference()` from Astro for compile-time validation. `reference()` returns `{ id, collection }` objects, **not** full entries. You must resolve them with `getEntry()`.

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
import { mdxComponents } from "../../components/mdx/components";

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
const relatedProjects = project.data.relatedProjects?.length
  ? await Promise.all(project.data.relatedProjects.map((ref) => getEntry(ref)))
  : [];
---

<Content components={mdxComponents} />
```

### Pattern 2: Homepage Highlights (Cross-Collection)

Each highlight references an entry in another collection via `discriminatedUnion`. Resolved in `src/lib/collections.ts`:

```ts
export async function getResolvedHighlights() {
  const allHighlights = await getCollection("highlights");
  const sorted = allHighlights.sort((a, b) => a.data.order - b.data.order);

  const resolved = await Promise.all(
    sorted.map(async (h) => {
      const entry = await getEntry(
        h.data.source.collection,
        h.data.source.entry.id,
      );
      return {
        label: h.data.label,
        collection: h.data.source.collection,
        entry,
      };
    }),
  );

  return resolved;
}
```

### Pattern 3: Awards with Project References

Awards reference projects, resolved in `src/lib/collections.ts`:

```ts
export async function getAwards() {
  const allAwards = await getCollection("awards");
  const sorted = allAwards.sort((a, b) => a.data.order - b.data.order);

  const resolved = await Promise.all(
    sorted.map(async (a) => {
      const project = await getEntry("projects", a.data.project.id);
      return {
        award: a.data.award,
        year: a.data.year,
        url: a.data.url,
        project,
      };
    }),
  );

  return resolved;
}
```

### Pattern 4: MDX Cross-Sell Component

Inside any `.mdx` file:

```mdx
<ProjectCrossSell slug="another-project" />
```

The component resolves the slug with `getEntry()` and throws at build time if not found.

## Collection Helper Functions

All query helpers live in `src/lib/collections.ts`. These handle filtering, sorting, and reference resolution:

| Function | Returns |
|---|---|
| `getPublishedProjects()` | Non-draft projects, sorted by date desc |
| `getPublishedPosts()` | Non-draft blog posts, sorted by date desc |
| `getPublishedLabs()` | Non-draft labs, sorted by date desc |
| `getClients()` | All clients, sorted by order asc |
| `getTestimonials()` | All testimonials, sorted by order asc |
| `getResolvedHighlights()` | Highlights with referenced entries resolved |
| `getAwards()` | Awards with referenced projects resolved |

## Important Notes

- **`reference()` returns `{ id, collection }` objects**, not the full entry. Resolve with `getEntry(ref)`.
- **Drafts:** filter with `({ data }) => !data.draft` in `getCollection()` calls. Never in the schema.
- **Blog supports both `.md` and `.mdx`.** Blog posts that don't need custom components can use plain `.md`.
- **YAML for structured data without prose.** Highlights, clients, testimonials, awards.
- **Config file location:** `src/content.config.ts` (at root of `src/`, both this path and `src/content/content.config.ts` work in Astro v5+, but we use the root path).
- **MDX components are centralized:** registered once in `src/components/mdx/components.ts`, used by all slug pages.