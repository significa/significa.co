# Astro Skill: Production Website Development

> Deep reference for building production static sites with Astro.
> Based on Astro v5/v6 source code analysis and real-world patterns. Use latest stable (v6).

---

## Core Mental Model

Astro is a **content-first static site generator** that ships **zero JavaScript by default**. Every `.astro` component renders to HTML at build time. JavaScript only reaches the browser when you explicitly opt in via `client:*` directives on framework components (React, Vue, Svelte).

This is the **island architecture**: a sea of static HTML with interactive islands of JavaScript where needed.

```
Static HTML (default, no JS)
  └── Interactive Island (React/Vue/Svelte, explicit opt-in)
       └── Hydrated only when triggered (load, idle, visible, media)
```

---

## Astro Component Anatomy

Two-part structure: server frontmatter + HTML template.

```astro
---
// Server-side only: runs at build time, never shipped to client
import { getCollection } from 'astro:content';
import Card from '../components/Card.astro';

interface Props {
  title: string;
  count?: number;
}

const { title, count = 0 } = Astro.props;
const posts = await getCollection('blog');
---

<!-- Template: renders to static HTML -->
<section>
  <h1>{title}</h1>
  <ul>
    {posts.map(post => (
      <li><Card title={post.data.title} /></li>
    ))}
  </ul>
</section>

<style>
  /* Scoped to this component automatically */
  section { max-width: 64rem; margin-inline: auto; }
  h1 { font-size: 2rem; }
</style>
```

### Key Rules
- Frontmatter is TypeScript, runs on server only
- Template uses JSX-like syntax but outputs HTML
- `Astro.props` for component props (type with `interface Props`)
- `Astro.url`, `Astro.request`, `Astro.redirect()` available in pages
- Styles are scoped by default; use `is:global` for global styles
- `<slot />` for content projection (named slots: `<slot name="header" />`)
- All async operations in frontmatter are awaited before rendering

---

## Content Collections (v5+)

The content system. Define schemas with Zod, load content with loaders, query with type-safe APIs.

### Schema Definition

File: `src/content/content.config.ts` (or `src/content.config.ts`)

```typescript
import { defineCollection, reference, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: 'src/content/blog' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    draft: z.boolean().default(false),
    tags: z.array(z.string()).default([]),
    thumbnail: z.string().url().optional(),
    // Cross-collection reference: build fails if slug doesn't exist
    relatedPosts: z.array(reference('blog')).default([]),
  }),
});

export const collections = { blog };
```

### Loaders

```typescript
// File-based (most common)
glob({ pattern: '**/*.mdx', base: 'src/content/blog' })

// Single file
file('src/data/authors.json')

// Custom loader (API, database, anything)
{
  loader: async ({ store }) => {
    const data = await fetch('https://api.example.com/posts');
    const posts = await data.json();
    for (const post of posts) {
      store.set({ id: post.slug, data: post });
    }
  }
}
```

### Querying Content

```typescript
import { getCollection, getEntry, render } from 'astro:content';

// Get all entries (with optional filter)
const posts = await getCollection('blog', ({ data }) => !data.draft);

// Get single entry
const post = await getEntry('blog', 'my-post-slug');

// Resolve a reference
const related = await getEntry(post.data.relatedPosts[0]);

// Render MDX/Markdown to component
const { Content } = await render(post);
```

### References (Cross-Collection)

`reference()` creates build-time validated links between collections:

```typescript
// In schema
relatedProjects: z.array(reference('projects')).default([])

// reference() returns { id, collection } objects, NOT full entries
// Must resolve with getEntry():
const resolved = await Promise.all(
  entry.data.relatedProjects.map(ref => getEntry(ref))
);
```

### Discriminated Unions (Cross-Collection Polymorphism)

```typescript
const highlights = defineCollection({
  loader: glob({ pattern: '**/*.yaml', base: 'src/content/highlights' }),
  schema: z.object({
    order: z.number(),
    source: z.discriminatedUnion('collection', [
      z.object({ collection: z.literal('projects'), entry: reference('projects') }),
      z.object({ collection: z.literal('blog'), entry: reference('blog') }),
    ]),
  }),
});
```

---

## Dynamic Routes (Static Generation)

For `[param].astro` files, `getStaticPaths()` tells Astro which pages to generate:

```astro
---
// src/pages/blog/[slug].astro
import { getCollection, render } from 'astro:content';
import Layout from '../../layouts/Layout.astro';

export async function getStaticPaths() {
  const posts = await getCollection('blog', ({ data }) => !data.draft);
  return posts.map(post => ({
    params: { slug: post.id },
    props: { post },
  }));
}

const { post } = Astro.props;
const { Content } = await render(post);
---

<Layout title={post.data.title}>
  <article>
    <h1>{post.data.title}</h1>
    <Content />
  </article>
</Layout>
```

### Catch-All Routes

```astro
// src/pages/[...slug].astro
// Matches /anything, /anything/nested, etc.
export async function getStaticPaths() {
  const pages = await getCollection('pages');
  return pages.map(page => ({
    params: { slug: page.id },
    props: { page },
  }));
}
```

**Rule:** Only `[slug].astro` and `[...slug].astro` files need `getStaticPaths()`. Static pages like `index.astro` just call `getCollection()` directly.

---

## MDX Integration

MDX = Markdown + JSX components. Content authors write markdown with embedded components.

### Setup

```javascript
// astro.config.mjs
import mdx from '@astrojs/mdx';

export default defineConfig({
  integrations: [mdx()],
});
```

### Passing Components to MDX

```astro
---
import MediaImage from '../components/mdx/MediaImage.astro';
import Metrics from '../components/mdx/Metrics.astro';

const { Content } = await render(post);

const mdxComponents = {
  MediaImage,
  Metrics,
  // Override default HTML elements:
  h1: CustomH1,
  img: CustomImage,
};
---

<Content components={mdxComponents} />
```

### MDX Component Rules
1. Use **Astro components** for MDX components (not React): zero JS, build-time only
2. **Throw on bad data**: if a slug doesn't resolve or a prop is missing, throw at build time
3. **No fetching**: all data comes from props or content collections
4. **Keep them simple**: render what they receive, business logic stays in page templates

---

## Island Architecture (Partial Hydration)

Only framework components (React, Vue, Svelte) can be islands. Astro components are always static.

### Client Directives

```astro
<Counter client:load />      <!-- Hydrate immediately on page load -->
<Counter client:idle />      <!-- Hydrate when browser is idle -->
<Counter client:visible />   <!-- Hydrate when scrolled into viewport -->
<Counter client:media="(max-width: 768px)" />  <!-- Hydrate on media query -->
<Counter client:only="react" />  <!-- Client-only, no SSR -->
```

### When to Use Islands
- Mobile navigation toggle
- Form validation with live feedback
- Interactive carousels or sliders
- Search with live results
- Theme toggle with persistence
- Anything requiring `useState`, `useEffect`, or event handlers beyond simple links

### When NOT to Use Islands
- Static content display
- Navigation links
- Image galleries (use CSS or `<details>`)
- Accordions (use `<details>/<summary>`)
- Tabs (can be CSS-only with `:target` or radio buttons)

---

## Styling

### Scoped Styles (Default)

```astro
<div class="card">
  <slot />
</div>

<style>
  /* Only applies to this component's .card */
  .card {
    padding: 1.5rem;
    border-radius: 0.5rem;
    background: var(--surface);
  }
</style>
```

### Global Styles

```astro
<!-- Option 1: is:global attribute -->
<style is:global>
  :root { --surface: #fff; }
</style>

<!-- Option 2: Import CSS file -->
---
import '../styles/global.css';
---
```

### CSS Strategy for Production
- Use CSS custom properties (variables) for design tokens
- Scoped styles in components for encapsulation
- One `global.css` for resets, typography, tokens
- `class:list` directive for conditional classes:

```astro
<div class:list={['card', { active: isActive, featured: isFeatured }]}>
```

---

## View Transitions

Smooth page transitions without full reload:

```astro
---
// In layout
import { ViewTransitions } from 'astro:transitions';
---

<head>
  <ViewTransitions />
</head>
```

### Transition Animations

```astro
import { fade, slide } from 'astro:transitions';

<div transition:animate={fade({ duration: '0.2s' })}>
  <h1 transition:name="title">{title}</h1>
</div>
```

### Persistent Elements

```astro
<!-- Survives page transitions -->
<audio data-astro-transition-persist="player" src={currentTrack} />
```

### Events

```javascript
document.addEventListener('astro:page-load', () => {
  // Runs on every page navigation (including initial load)
});

document.addEventListener('astro:after-swap', () => {
  // Runs after new page content is in DOM
});
```

---

## Performance Patterns

### Image Handling

```astro
<!-- For local images: use Astro's Image component -->
import { Image } from 'astro:assets';
<Image src={import('../assets/hero.jpg')} alt="Hero" width={1200} />

<!-- For CDN images: plain img with loading hints -->
<img
  src="https://cdn.example.com/hero.jpg"
  alt="Hero"
  width="1200"
  height="630"
  loading="lazy"
  decoding="async"
/>
```

### Font Loading

```astro
<!-- Preload critical fonts -->
<link rel="preload" href="/fonts/main.woff2" as="font" type="font/woff2" crossorigin />

<!-- Astro v6 Fonts API -->
import { Font } from 'astro:assets';
<Font cssVariable="--font-body" preload />
```

### Critical Patterns
- `loading="lazy"` on all images below the fold
- Explicit `width` and `height` to prevent layout shift
- Preload hero images: `<link rel="preload" as="image" href="..." />`
- Minimal client JS (islands only where needed)
- CSS in `<style>` tags (automatically scoped, tree-shaken)

---

## Project Structure (Recommended)

```
src/
├── assets/              # Local images processed by Astro
├── components/
│   ├── mdx/             # Components available in MDX
│   │   ├── MediaImage.astro
│   │   └── Metrics.astro
│   ├── ui/              # Reusable UI components
│   │   ├── Button.astro
│   │   └── Card.astro
│   └── layout/          # Layout pieces
│       ├── Header.astro
│       ├── Footer.astro
│       └── Nav.astro
├── content/
│   ├── content.config.ts
│   ├── blog/
│   └── projects/
├── layouts/
│   └── Base.astro
├── pages/
│   ├── index.astro
│   ├── blog/
│   │   ├── index.astro
│   │   └── [slug].astro
│   └── [...slug].astro
├── styles/
│   └── global.css
└── utils/               # Shared utilities
    ├── dates.ts
    └── seo.ts
public/
├── favicon.svg
├── fonts/
└── robots.txt
```

---

## Common Gotchas

### 1. Frontmatter Runs on Server Only
```typescript
// This fails: no window/document/localStorage in frontmatter
---
const theme = localStorage.getItem('theme'); // ReferenceError
---
```

### 2. Props Serialization for Islands
Functions, classes, and symbols cannot be passed to island components. Only serializable data (strings, numbers, objects, arrays, Date, Map, Set, URL, BigInt).

### 3. getStaticPaths Must Return All Routes
Every possible URL must be returned. Missing paths = 404 in production.

### 4. reference() Returns Stubs, Not Data
```typescript
// reference() gives { id, collection }, NOT the full entry
const ref = post.data.relatedPost; // { id: "some-post", collection: "blog" }
const fullEntry = await getEntry(ref); // Now you have the data
```

### 5. MDX Components Must Be Passed Explicitly
Components aren't automatically available in MDX. Pass them via the `components` prop when rendering.

### 6. Draft Filtering Is Manual
```typescript
// Filter drafts in getCollection, not in schema
const published = await getCollection('blog', ({ data }) => !data.draft);
```

### 7. Content Config Location
In Astro v5+, the config can be at `src/content/content.config.ts` OR `src/content.config.ts`. Both work.

### 8. Async in Astro Components
All `getCollection()` and `getEntry()` calls are async. Always `await` them in frontmatter.

---

## Build & Deploy

```bash
# Development
astro dev              # Start dev server with HMR

# Build
astro build            # Output static files to dist/

# Preview
astro preview           # Preview built site locally

# Type checking
astro check            # Run TypeScript checks on .astro files
```

### Deploy Targets
- **Cloudflare Pages**: `dist/` directory, build command `astro build`
- **Vercel**: Static mode (no adapter needed for static)
- **Netlify**: Static mode, `dist/` publish directory

### CI/CD Essentials
```bash
# In CI pipeline
pnpm install --frozen-lockfile
pnpm run astro check    # Type safety
pnpm run build          # Build static site
# Deploy dist/ to hosting
```

---

## Integration Checklist for Production Sites

- [ ] MDX integration (`@astrojs/mdx`)
- [ ] React integration (`@astrojs/react`) if using islands
- [ ] Sitemap (`@astrojs/sitemap`) for SEO
- [ ] RSS feed (`@astrojs/rss`) for blog
- [ ] View Transitions for smooth navigation
- [ ] Robots.txt in `public/`
- [ ] Favicon set in `public/`
- [ ] Open Graph / Twitter meta tags
- [ ] `astro check` in CI pipeline
- [ ] Image optimization strategy (CDN or Astro Image)
- [ ] Analytics integration (script in layout)
- [ ] 404 page (`src/pages/404.astro`)
- [ ] Canonical URLs in head
- [ ] Structured data (JSON-LD) for rich search results
