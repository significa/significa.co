# Content Schema & Relationships

Defines the "database": all content types, their fields, and how they relate to each other.

## Schema Definition

File: `src/content.config.ts` (at the root of `src/`, not inside `src/content/`)

### Shared Schemas

```ts
import { defineCollection, reference, z } from "astro:content";
import { glob, type Loader } from "astro/loaders";

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

### Content Loader

All collections use a shared `contentLoader()` helper that centralizes glob patterns, ID generation, and **draft filtering**:

```ts
const contentLoader = ({ base, extensions }: { extensions: string[]; base: string }): Loader => {
  const stripExtension = ({ entry }: { entry: string }) => {
    return entry.replace(/\.(mdx?|yaml)$/, "").replace(/\/index$/, "");
  };

  // In development: include all files (drafts visible for preview)
  // In production: exclude *.draft.* files at the glob level
  const draftFilter = import.meta.env.MODE === "development" ? "**" : "!(*.draft)";
  const extensionFilter = extensions.length > 1 ? `{${extensions.join(",")}}` : extensions[0];

  return glob({
    pattern: `**/${draftFilter}.${extensionFilter}`,
    base,
    generateId: stripExtension,
  });
};
```

This means:

- **Development** (`pnpm dev`): all files are loaded, including `*.draft.*` files, so authors can preview drafts locally.
- **Production** (`pnpm build`): files matching `*.draft.*` are excluded at the glob level — they never enter the content layer.
- **Publishing a draft** is a file rename: `my-post.draft.mdx` → `my-post.mdx`.
- **ID generation** strips file extensions and `/index` suffixes for clean URL slugs: `example-project.mdx` → `example-project`, `career/index.mdx` → `career`.

## Collections

### Projects (MDX)

Case studies. The richest content type.

```ts
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
  loader: contentLoader({
    extensions: ["md", "mdx"],
    base: "src/content/blog",
  }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    date: z.coerce.date(),
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
| `author` | string | no | Author name |
| `thumbnail` | string | no | CDN path for listing cards |
| `tags` | string[] | no | Categorization tags |
| `seo` | object | no | Override meta title, description, OG image |
| `relatedProjects` | reference[] | no | Cross-sell to project case studies |

### Labs (MD/MDX)

Open source projects and experiments.

```ts
const labs = defineCollection({
  loader: contentLoader({
    extensions: ["md", "mdx"],
    base: "src/content/labs",
  }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
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
  loader: contentLoader({
    extensions: ["mdx"],
    base: "src/content/pages",
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
  loader: contentLoader({
    extensions: ["yaml"],
    base: "src/content/highlights",
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

If `example-project` doesn't exist in `src/content/projects/`, **the build fails** with a clear error. If the referenced file is a draft (e.g. `example-project.draft.mdx`), it works in dev but **fails the production build** — preventing links to unpublished content.

### Clients (YAML)

Client logo strip and references across the site.

```ts
const clients = defineCollection({
  loader: contentLoader({
    extensions: ["yaml"],
    base: "src/content/clients",
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
  loader: contentLoader({
    extensions: ["yaml"],
    base: "src/content/testimonials",
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
  loader: contentLoader({
    extensions: ["yaml"],
    base: "src/content/awards",
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

### Handbook Groups (YAML)

Visual categories shown on the handbook index page. Each handbook page references one group.

```ts
const handbookGroups = defineCollection({
  loader: contentLoader({
    extensions: ["yaml"],
    base: "src/content/handbook-groups",
  }),
  schema: z.object({
    title: z.string(),
    order: z.number(),
  }),
});
```

| Field | Type | Required | Description |
|---|---|---|---|
| `title` | string | yes | Display name shown on the index page |
| `order` | number | yes | Sort order of the group on the index page |

Filenames act as slugs referenced by handbook pages (e.g. `engineering.yaml` → `group: engineering`).

### Handbook (MDX)

Internal company documentation. File path determines both the URL and the parent-child hierarchy.

```ts
const handbook = defineCollection({
  loader: contentLoader({
    extensions: ["mdx"],
    base: "src/content/handbook",
  }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    date: z.coerce.date(),
    group: reference("handbook-groups"),
    order: z.number().default(0),
    seo: seoSchema.optional(),
  }),
});
```

| Field | Type | Required | Description |
|---|---|---|---|
| `title` | string | yes | Page title |
| `description` | string | no | Short description for SEO and child page listings |
| `date` | date | yes | Last updated date |
| `group` | reference | yes | Which group this page belongs to — build-time validated |
| `order` | number | no | Sort order within the group on the index. Default `0` |
| `seo` | object | no | Override meta title, description, OG image |

**File structure determines hierarchy:**

```
src/content/handbook/
├── manifesto.mdx                            → /handbook/manifesto         (standalone, no children)
└── how-we-build-software/
    ├── index.mdx                            → /handbook/how-we-build-software  (parent page)
    ├── front-end-development.mdx            → /handbook/how-we-build-software/front-end-development
    └── back-end-development.mdx            → /handbook/how-we-build-software/back-end-development
```

**Convention: `index.mdx` for parent pages**

- Pages that have children live inside their own folder as `index.mdx`.
- Standalone pages with no children remain as flat `.mdx` files at the top level.
- The `generateId` loader strips `/index` suffixes, so `how-we-build-software/index.mdx` produces the ID `how-we-build-software` — identical URL to what a flat file would produce.
- Children inherit their parent's URL as a prefix.
- Nesting beyond one level is supported but should be used sparingly.
- The `group` field is still required on child pages — it controls which group they appear under in sidebar navigation.

**When to use which pattern:**

| Situation | File location |
|---|---|
| Page with no children | `handbook/my-page.mdx` |
| Page with children | `handbook/my-page/index.mdx` |
| Child of a parent | `handbook/my-page/child.mdx` |

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
  "handbook-groups": handbookGroups,
  handbook,
};
```

## Draft System

Drafts are managed via the **`.draft` filename suffix**, not a frontmatter field.

### How It Works

| File | Dev (`pnpm dev`) | Prod (`pnpm build`) |
|---|---|---|
| `cool-project.mdx` | ✅ Loaded | ✅ Loaded |
| `cool-project.draft.mdx` | ✅ Loaded (preview) | ❌ Excluded at glob level |

### Workflow

1. **Create a draft:** name it `my-post.draft.mdx` (or `.draft.md`, `.draft.yaml`)
2. **Preview locally:** run `pnpm dev` — drafts are included in the content layer
3. **Publish:** rename `my-post.draft.mdx` → `my-post.mdx`
4. **Unpublish:** rename `my-post.mdx` → `my-post.draft.mdx`

### Important: References to Drafts

If a non-draft entry (e.g. a highlight or award) references a draft entry:
- **In dev:** works fine — the draft is in the collection
- **In prod build:** fails with a build error — the draft is excluded, so the reference is broken

This is intentional. It prevents shipping pages that link to unpublished content.

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
  const projects = await getCollection("projects");
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

All query helpers live in `src/lib/collections.ts`. These handle sorting and reference resolution. **No draft filtering is needed** — drafts are already excluded by the content loader in production.

| Function | Returns |
|---|---|
| `getProjects()` | All projects, sorted by date desc |
| `getPosts()` | All blog posts, sorted by date desc |
| `getLabs()` | All labs, sorted by date desc |
| `getClients()` | All clients, sorted by order asc |
| `getTestimonials()` | All testimonials, sorted by order asc |
| `getResolvedHighlights()` | Highlights with referenced entries resolved |
| `getAwards()` | Awards with referenced projects resolved |
| `getHandbookGroups()` | All handbook groups, sorted by order asc |
| `getHandbookPages()` | All handbook pages, sorted by order asc |
| `getTopLevelHandbookPages()` | Handbook pages without a parent |
| `getHandbookChildren(parentId)` | Direct children of a handbook page |
| `getHandbookParent(entry)` | Parent entry for a handbook page, or null |
| `getHandbookBreadcrumbs(entry)` | Ancestor chain from root to the current page |
| `getHandbookIndex()` | Full grouped structure for the index page |

## Important Notes

- **`reference()` returns `{ id, collection }` objects**, not the full entry. Resolve with `getEntry(ref)`.
- **Handbook parent-child hierarchy is file-path derived.** A page at `how-we-build-software/front-end.mdx` is automatically a child of `how-we-build-software/index.mdx`. No `parent` field in frontmatter — the relationship is implicit in the directory structure.
- **Handbook groups use `reference("handbook-groups")`**, so a typo in `group:` breaks the build, not production.
- **Drafts use the `.draft` filename suffix.** No frontmatter field, no query-time filtering. The content loader handles it automatically.
- **Blog supports both `.md` and `.mdx`.** Blog posts that don't need custom components can use plain `.md`.
- **YAML for structured data without prose.** Highlights, clients, testimonials, awards.
- **Config file location:** `src/content.config.ts` (at root of `src/`, both this path and `src/content/content.config.ts` work in Astro v5+, but we use the root path).
- **MDX components are centralized:** registered once in `src/components/mdx/components.ts`, used by all slug pages.