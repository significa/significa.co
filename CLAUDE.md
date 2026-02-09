# Significa Website: Project CLAUDE.md

## Project Overview

Significa's company website. Static site built with Astro (latest stable), MDX for rich content, TypeScript strict. No CMS, no database, no server. Content lives in git as typed MDX/YAML files. Marketing team manages content directly with AI assistance.

**Live site:** significa.co
**Stack:** Astro v6 (latest stable), MDX, TypeScript strict, Content Collections with Zod, React (islands only)
**Deploy:** Cloudflare Pages (static output to `dist/`)

---

## Critical Rules

These override all defaults. Follow them exactly.

### Architecture

1. **Static site. No exceptions.** No API routes, no server-side logic, no `fetch()` for content. Everything renders at build time.
2. **Astro components first.** React only for interactive islands with explicit `client:*` directives. If it can be done without JS, do it without JS.
3. **Content Collections are the database.** Use `getCollection()` and `getEntry()` from `astro:content`. Never `import.meta.glob`. Never raw file reads.
4. **References use `reference()`.** Cross-collection links must use Astro's `reference()` for build-time validation. Broken slugs break the build, not production.
5. **Media lives in `public/` for now.** During development, images and videos go in `public/`. An external CDN/image service (ImageKit, Cloudinary, or similar integrated with S3) will be evaluated later. SVG icons, favicons, and fonts also live in `public/`.
6. **Always use latest stable Astro.** We use Astro v6 (latest stable) to avoid near-future breaking changes. Keep dependencies up to date.

### Code Quality

1. **Semantic HTML always.** `<article>`, `<nav>`, `<section>`, `<header>`, `<footer>`, `<main>`, `<time>`. Not everything is a `<div>`.
2. **TypeScript strict.** Type all props with `interface Props`. Type all utility functions. No `any`.
3. **Fail at build time. Always.** If a slug doesn't resolve, a required field is missing, or data is invalid: throw. The build breaks, not production. This is critical: the site is managed by marketing and non-technical people. Runtime errors are unacceptable. Use `reference()` instead of plain slugs. Add build-time validation checks wherever possible.
4. **Keep pages thin.** Pages (`src/pages/`) fetch data and delegate to layouts/components. No complex logic in pages.
5. **Minimal dependencies.** Every `pnpm add` needs a clear reason. Fewer deps = fewer problems.
6. **No CSS framework.** Scoped `<style>` in Astro components + `global.css` for tokens. Use the design token system (see below).
7. **No magic numbers. No magic colors.** Every value must come from the design token system. No hardcoded pixel values, no hex colors, no arbitrary spacing. Agents must use tokens from `global.css`. If a token doesn't exist for what you need, ask before inventing one.

### Content

1. **MDX for case studies and rich content.** Blog posts that don't need custom components can use plain `.md`.
2. **YAML for structured data without prose.** Highlights, team data, config-like content.
3. **Frontmatter is the schema.** Every field in frontmatter must match the Zod schema in `content.config.ts`. The build enforces this.
4. **Drafts filter at query time.** Use `getCollection('blog', ({ data }) => !data.draft)`. Never in the schema.
5. **Marketing team writes content.** The team has the project set up locally with AI assistance. MDX is the authoring format. Content templates and documentation must be clear enough for non-developers to follow. AI fills any gaps.

---

## Project Structure

```
src/
├── components/
│   ├── mdx/                  # Components available inside MDX files
│   │   ├── MediaImage.astro    # Starting set. New components
│   │   ├── MediaVideo.astro    # are added as content needs
│   │   ├── ComparisonBlock.astro # arise. Start lean, grow
│   │   ├── Metrics.astro       # with the content.
│   │   └── ProjectCrossSell.astro
│   ├── ui/                   # Reusable UI components
│   └── layout/               # Header, Footer, Nav
├── content/
│   ├── content.config.ts     # Collection schemas (the "database")
│   ├── projects/             # .mdx per project case study
│   ├── blog/                 # .md or .mdx per blog post
│   ├── labs/                 # .mdx per open source project
│   ├── pages/                # .mdx per misc page (about, services, etc.)
│   └── highlights/           # .yaml per homepage highlight
├── layouts/
│   └── Base.astro            # Main HTML layout with SEO component
├── pages/
│   ├── index.astro           # Homepage
│   ├── blog/
│   │   ├── index.astro       # Blog listing
│   │   └── [slug].astro      # Blog post detail
│   ├── projects/
│   │   ├── index.astro       # Projects listing
│   │   └── [slug].astro      # Project detail
│   ├── labs/
│   │   ├── index.astro       # Labs listing
│   │   └── [slug].astro      # Lab detail
│   ├── 404.astro             # Custom 404 page
│   └── [...slug].astro       # Catch-all for misc pages
├── styles/
│   └── global.css            # Design tokens, resets, typography
└── lib/
    ├── collections.ts        # Helper functions for content queries
    ├── seo.ts                # Structured data generation
    └── content-errors.ts     # Build-time error formatting
public/
├── favicon.svg
├── fonts/
└── robots.txt
```

---

## Content Collections

### Schema Location

`src/content/content.config.ts`

### Collections

| Collection | Format | Loader Pattern | Purpose |
|---|---|---|---|
| `projects` | MDX | `**/*.mdx` | Case studies |
| `blog` | MD/MDX | `**/*.{md,mdx}` | Blog posts |
| `labs` | MDX | `**/*.mdx` | Open source projects |
| `pages` | MDX | `**/*.mdx` | Misc pages (about, services) |
| `highlights` | YAML | `**/*.yaml` | Homepage curation |

### Key Patterns

```typescript
// Get published entries
const posts = await getCollection('blog', ({ data }) => !data.draft);

// Get single entry
const project = await getEntry('projects', slug);

// Resolve references
const related = await Promise.all(
  project.data.relatedProjects.map(ref => getEntry(ref))
);

// Render MDX to component
const { Content } = await render(post);

// Pass MDX components
<Content components={mdxComponents} />
```

### Dynamic Routes

```typescript
// Only [slug].astro and [...slug].astro need getStaticPaths()
export async function getStaticPaths() {
  const items = await getCollection('projects', ({ data }) => !data.draft);
  return items.map(item => ({
    params: { slug: item.id },
    props: { item },
  }));
}
```

---

## MDX Components

All MDX components are Astro components (not React). They run at build time with zero client JS.

### Registration

Components must be passed explicitly when rendering MDX:

```astro
---
// Import all MDX components and pass them when rendering
const mdxComponents = {
  MediaImage,
  MediaVideo,
  ComparisonBlock,
  Metrics,
  ProjectCrossSell,
  // Add new components here as they are created
};
---

<Content components={mdxComponents} />
```

### Component Growth Strategy

We start with a lean set of 5 components. New components are added when content demands them, not eagerly. When a content author needs a pattern that doesn't exist, that's the signal to build it. Don't pre-build components that might not be needed.

### Rules for MDX Components

1. **Astro components only.** No React unless the component needs client interactivity.
2. **Throw on bad data.** Missing props or unresolved slugs must throw with a clear error message at build time.
3. **No data fetching.** All data comes from props or content collections.
4. **Keep them simple.** Render what they receive. Business logic stays in page templates.
5. **Document the props interface.** Every component needs a clear Props interface.

### Adding New MDX Components

1. Create the `.astro` file in `src/components/mdx/`
2. Define `interface Props` with TypeScript
3. Import and add to `mdxComponents` in every `[slug].astro` that needs it
4. Add usage example to the component documentation
5. Test with `pnpm build` to verify

---

## Design Token System

All design values live in `src/styles/global.css` as CSS custom properties. The token system evolves as the design develops, but the principle is absolute: **no magic numbers, no magic colors**.

### How the Token System Works

Tokens are defined in `global.css` and used everywhere via `var()`. The system grows with the design. When you need a value that doesn't exist as a token, ask the designer to add it to the system rather than hardcoding it.

### Spacing Scale

Use rem values based on 4px grid: `--space-1` (0.25rem/4px) through `--space-16` (4rem/64px).

```
4, 8, 12, 16, 24, 32, 48, 64
```

### Typography

- Maximum 2-3 font sizes per view
- Hierarchy through weight and color, not size explosion
- Use `clamp()` for fluid sizing: `clamp(1rem, 0.5rem + 1.5vw, 1.5rem)`
- No arbitrary font sizes

### Colors

- OKLCH color space
- Semantic naming: `--color-text`, `--color-surface`, `--color-primary`, `--color-muted`
- Every color serves a purpose: primary action, feedback, hierarchy, decoration

### Breakpoints

Define once in `global.css`, use consistently:

```css
/* Breakpoints (use in media queries) */
/* sm: 640px, md: 768px, lg: 1024px, xl: 1280px */
```

### Rules (Non-Negotiable)

- **No hardcoded pixel values.** Use the spacing scale via custom properties.
- **No hex colors.** Use OKLCH via custom properties.
- **No arbitrary spacing.** Use the scale. `margin: 13px` is never acceptable.
- **No inline color values.** Always reference a token: `color: var(--color-text)`, never `color: #333`.
- Whitespace is a feature. When in doubt, add more space.
- WCAG AA contrast minimum. Always.
- Agents must follow these rules strictly. If a design token doesn't exist for what you need, flag it rather than inventing a value.

---

## Image Handling

### Current Approach (Development Phase)

Images live in `public/` during development. This keeps things simple while we evaluate external image services (ImageKit, Cloudinary, or similar with S3 integration).

```
public/
├── images/
│   ├── projects/
│   │   └── cool-project/
│   │       ├── hero.jpg
│   │       └── screenshot-01.jpg
│   └── blog/
│       └── post-name/
│           └── cover.jpg
```

Reference in content: `/images/projects/cool-project/hero.jpg`

### Future: External Image Service

When an image service is adopted, `MediaImage` will be updated to use transformation URLs. The content references will be migrated. Design components now with this migration in mind: always use `MediaImage` instead of raw `<img>` tags.

### MediaImage Requirements

- `width` and `height` are **required** (prevents layout shift)
- `alt` is **required** (accessibility)
- Use `eager` prop for above-the-fold images (hero images)
- Default is `loading="lazy"` with `decoding="async"`

---

## Interactive Islands

### When to Use `client:*`

- Mobile navigation toggle: `client:load`
- ComparisonBlock slider: `client:visible`
- Project tag filtering: `client:load`
- Contact form: `client:load`
- Image lightbox: `client:visible`

### When NOT to Use Islands

- Scroll animations: use Intersection Observer in a `<script>` tag
- Hover effects: pure CSS
- Accordions: `<details>/<summary>`
- Dark mode toggle: inline `<script>` + CSS custom properties
- Any content display that doesn't need user state

### Rule

If you're reaching for `client:load`, stop and ask: can this be done with CSS or a vanilla `<script>` tag? If yes, do that instead.

---

## SEO Checklist

Every page must have:

- [ ] `<title>` tag (unique per page)
- [ ] `<meta name="description">` (unique, under 160 chars)
- [ ] `<link rel="canonical">` (absolute URL)
- [ ] Open Graph tags (og:title, og:description, og:image, og:type, og:url)
- [ ] Twitter card tags (twitter:card, twitter:title, twitter:description, twitter:image)
- [ ] Proper heading hierarchy (h1 > h2 > h3, never skip)
- [ ] `lang` attribute on `<html>`

### Site-Level SEO (Include From Inception)

These should be set up from the start of the project, not bolted on before launch:

- [ ] `@astrojs/sitemap` configured with `site` in `astro.config.mjs`
- [ ] RSS feed at `/blog/rss.xml` using `@astrojs/rss`
- [ ] `robots.txt` in `public/`
- [ ] JSON-LD structured data (Organization, Article, BreadcrumbList)
- [ ] `404.astro` page
- [ ] Canonical URLs in every page head
- [ ] Reusable `<SEO>` component in Base layout

---

## Build and Deploy

### Commands

```bash
pnpm dev        # Development server with HMR
pnpm build      # Build static site to dist/
pnpm preview    # Preview built site locally
pnpm check      # TypeScript + content validation
```

### CI Pipeline

```bash
pnpm install --frozen-lockfile
pnpm check      # Type safety + content validation
pnpm build      # Full build (catches MDX errors, broken references)
```

### Pre-Push Checklist

Before pushing, run `pnpm check && pnpm build` locally. Content errors caught locally are 10x faster than waiting for CI.

### Deploy

Cloudflare Pages: push to main triggers build and deploy of `dist/`. Branch pushes create preview deployments automatically.

---

## View Transitions

Use Astro's native View Transitions for smooth page navigation:

```astro
---
import { ViewTransitions } from 'astro:transitions';
---

<head>
  <ViewTransitions />
</head>
```

- Use `transition:name` for shared element transitions (thumbnail to hero)
- Use `transition:animate` with `fade()` or `slide()` for page-level transitions
- Respect `prefers-reduced-motion` (Astro handles this by default)
- Use `data-astro-transition-persist` for elements that survive navigation (audio player, nav state)

---

## Accessibility

Non-negotiable baseline:

1. **Alt text on every image.** `alt` prop is required on `MediaImage`. Caption is not alt text.
2. **WCAG AA contrast.** 4.5:1 for body text, 3:1 for large text. Test with real content.
3. **Keyboard navigation.** All interactive elements (lightbox, slider, nav, filters) must work with keyboard.
4. **Reduced motion.** `prefers-reduced-motion` disables all non-essential animations.
5. **Semantic HTML.** `<article>` for entries, `<nav>` for navigation, `<main>` for content, proper heading hierarchy.
6. **Skip link.** First focusable element: "skip to content."
7. **Focus management.** On View Transition navigation, focus moves to main content.

---

## Build-Time Validation

Maximize compile-time checks. This site is managed by marketing and non-technical people. Every error that can be caught at build time is one less bug in production.

### Slug Collision Check

The catch-all `[...slug].astro` must validate that no page slug collides with reserved routes:

```typescript
// In src/pages/[...slug].astro getStaticPaths()
const reserved = ['blog', 'projects', 'labs'];
for (const page of pages) {
  const topSegment = page.id.split('/')[0];
  if (reserved.includes(topSegment)) {
    throw new Error(
      `Page "${page.id}" collides with reserved route /${topSegment}. Rename it.`
    );
  }
}
```

### Content Error Helper

Wrap build-time errors with actionable messages:

```typescript
// src/lib/content-errors.ts
export function contentError(
  component: string,
  file: string,
  message: string
): never {
  throw new Error(
    `[${component}] in ${file}: ${message}\nFix the content and rebuild.`
  );
}
```

### Why `reference()` Over Plain Slugs

We always use `reference()` instead of `z.string()` for cross-collection links. The trade-off (Astro lock-in) is worth it because:
- Build fails immediately on broken references
- Non-technical content editors get instant feedback
- No runtime errors reach production

---

## Common Gotchas

1. **Frontmatter is server-only.** No `window`, `document`, or `localStorage` in the `---` block.
2. **`reference()` returns stubs.** You get `{ id, collection }`, not the full entry. Resolve with `getEntry(ref)`.
3. **MDX components must be passed explicitly.** They're not auto-available. Pass via `components` prop.
4. **Catch-all route collision.** If a page in `src/content/pages/` has a slug matching `blog`, `projects`, or `labs`, the build-time check throws. See Build-Time Validation above.
5. **Draft filtering is manual.** Always filter with `({ data }) => !data.draft` in `getCollection()` calls.
6. **Static paths must be exhaustive.** Every URL must be returned by `getStaticPaths()`. Missing = 404.
7. **Async everywhere.** All `getCollection()` and `getEntry()` calls are async. Always `await`.

---

## File Naming Conventions

- **Components:** PascalCase (`MediaImage.astro`, `ProjectCard.astro`)
- **Pages:** kebab-case or `[slug].astro` for dynamic routes
- **Content:** kebab-case slugs (`cool-project.mdx`, `how-we-design.md`)
- **Utilities:** camelCase (`formatDate.ts`, `collections.ts`)
- **Styles:** kebab-case (`global.css`)

---

## Git Conventions

### Commits

- Natural language, infinitive tense
- Portuguese or English (match project context)
- One logical change per commit
- Examples: "add blog listing pagination", "fix broken reference in highlights schema"

### Branches

- `feature/short-description`
- `fix/short-description`
- `chore/short-description`

---

## Reference Documentation

- **Astro docs:** https://docs.astro.build
- **Content Collections:** https://docs.astro.build/en/guides/content-collections/
- **MDX in Astro:** https://docs.astro.build/en/guides/markdown-content/
- **View Transitions:** https://docs.astro.build/en/guides/view-transitions/
- **Islands Architecture:** https://docs.astro.build/en/concepts/islands/
- **Astro Skill (local):** See `astro-skill.md` in this repo
- **Team Discussion:** See `team-discussion.md` in this repo
- **Plan Documents:** See `significa-website-plan/` directory

**Rule: Do not hallucinate APIs.** If you're unsure whether a method or config option exists, check the docs. Astro's API surface is small.
