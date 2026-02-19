# Project Bootstrap

## Stack

- **Astro v5** (latest stable): static site generator, zero JS by default. Astro 6 is in beta (requires Node 22+, Zod 4, removes legacy APIs) — do not upgrade until stable.
- **MDX**: markdown with custom components for case studies and rich content
- **TypeScript**: strict mode, no `any`
- **Content Collections**: Astro's built-in content layer with Zod schemas
- **React**: only for interactive islands (mobile nav, form validation). Keep it minimal.
- **pnpm**: package manager
- **Cloudflare Pages**: static deploy target

## Init

```bash
pnpm create astro@latest significa-website -- --template minimal --typescript strict
cd significa-website
pnpm astro add mdx react
```

## Project Structure

```
src/
├── components/
│   ├── mdx/                  # Components available inside MDX files
│   │   ├── media-image.astro
│   │   ├── media-video.astro
│   │   ├── comparison-block.astro
│   │   ├── metrics.astro
│   │   ├── project-cross-sell.astro
│   │   └── components.ts      # Centralized MDX component registry
│   ├── ui/                   # Reusable UI components
│   ├── layout/               # Header, Footer, Nav
│   └── seo.astro             # SEO meta tags component
├── content.config.ts         # Collection schemas (the "database")
├── content/
│   ├── projects/             # .mdx per project case study
│   ├── blog/                 # .md or .mdx per blog post
│   ├── labs/                 # .mdx per open source project
│   ├── pages/                # .mdx per misc page (about, services, etc.)
│   ├── highlights/           # .yaml per homepage highlight
│   ├── clients/              # .yaml per client (logo strip)
│   ├── testimonials/         # .yaml per testimonial
│   └── awards/               # .yaml per award
├── layouts/
│   └── base.astro            # Main HTML layout with SEO component
├── pages/
│   ├── index.astro           # Homepage
│   ├── who-we-are.astro      # About page (hybrid: Astro page, not MDX)
│   ├── what-we-do.astro      # Services page (hybrid)
│   ├── work-with-us.astro    # Contact page (hybrid)
│   ├── blog/
│   │   ├── index.astro       # Blog listing
│   │   ├── [slug].astro      # Blog post detail
│   │   └── rss.xml.ts        # RSS feed
│   ├── projects/
│   │   ├── index.astro       # Projects listing
│   │   └── [slug].astro      # Project detail
│   ├── labs/
│   │   ├── index.astro       # Labs listing
│   │   └── [slug].astro      # Lab detail
│   ├── 404.astro             # Custom 404 page
│   └── [...slug].astro       # Catch-all for misc content pages
├── styles/
│   └── global.css            # Design tokens, resets, typography
└── lib/
    ├── collections.ts        # Helper functions for content queries
    ├── cdn.ts                # Bunny CDN URL helpers and srcset generation
    ├── seo.ts                # Structured data generation (JSON-LD)
    └── content-errors.ts     # Build-time error formatting
public/
├── favicon.svg
├── fonts/
└── robots.txt
# Images/videos served via S3 + Bunny CDN (see 04-MEDIA-ASSETS.md)
```

### Hybrid page architecture

Some pages are hardcoded Astro files (`who-we-are.astro`, `what-we-do.astro`, `work-with-us.astro`) because they have complex layouts that don't fit the MDX pattern. Other pages (about, services, etc.) live as MDX in `src/content/pages/` and are rendered by the catch-all `[...slug].astro`.

The reserved routes list in `[...slug].astro` prevents collisions between the two approaches.

## Key Principles

1. **No database.** Content lives in MDX/YAML files with typed frontmatter. Content Collections are the database.
2. **No client-side JS by default.** Astro renders everything at build time. Only add `client:load` or `client:visible` to React components that genuinely need interactivity.
3. **Media via S3 + Bunny CDN.** Images and videos are uploaded through the internal asset manager to S3 and served via Bunny.net CDN (`https://significa.b-cdn.net`) with real-time image optimization. See `docs/04-MEDIA-ASSETS.md`.
4. **Relationships via `reference()`.** Collections reference each other using Astro's `reference()` for build-time validation. Broken slugs break the build, not production.
5. **Drafts via `.draft` filename suffix.** Name a file `my-post.draft.mdx` to mark it as a draft. The shared `contentLoader()` excludes `*.draft.*` files in production builds at the glob level. In development, drafts are included for preview. Publishing is a file rename — no frontmatter field needed.
6. **Keep it simple.** If you're reaching for a library, stop and check if plain HTML/CSS or an Astro component can do it.
7. **Fail at build time.** The site is managed by marketing and non-technical people. Every error caught at build time is one less bug in production.
8. **Centralized MDX registration.** All MDX components are registered in `src/components/mdx/components.ts`. Add new components there — all slug pages pick them up automatically.

## Build & Deploy

```bash
pnpm dev          # Development server with HMR
pnpm build        # Build static site to dist/
pnpm preview      # Preview built site locally
pnpm check        # TypeScript + content validation (astro check)
pnpm lint         # Full lint pipeline: Prettier + type check + ESLint
pnpm lint:check   # ESLint only
pnpm lint:fix     # ESLint auto-fix
pnpm format       # Prettier auto-format src/
pnpm format:check # Prettier check (no write)
```

### CI Pipeline

```bash
pnpm install --frozen-lockfile
pnpm lint       # Prettier + type check + ESLint (catches all code quality issues)
pnpm build      # Full build (catches MDX errors, broken references)
```

### Deploy

Cloudflare Pages: push to main triggers build and deploy of `dist/`. Branch pushes create preview deployments.

### Pre-Push Checklist

Before pushing, run `pnpm lint && pnpm build` locally. This runs Prettier, type checking, and ESLint before building. Content errors caught locally are 10x faster than waiting for CI.

## Reference Documentation

- **Astro docs:** https://docs.astro.build
- **Content Collections:** https://docs.astro.build/en/guides/content-collections/
- **MDX in Astro:** https://docs.astro.build/en/guides/markdown-content/
- **View Transitions:** https://docs.astro.build/en/guides/view-transitions/
- **Islands Architecture:** https://docs.astro.build/en/concepts/islands/

**Do not hallucinate APIs.** If you're unsure whether a method or config option exists, check the docs. Astro's API surface is small.