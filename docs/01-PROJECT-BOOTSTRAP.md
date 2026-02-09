# Project Bootstrap

## Stack

- **Astro v6** (latest stable): static site generator, zero JS by default
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
├── images/                   # Media during development (see 04-MEDIA-ASSETS.md)
└── robots.txt
```

## Key Principles

1. **No database.** Content lives in MDX/YAML files with typed frontmatter. Content Collections are the database.
2. **No client-side JS by default.** Astro renders everything at build time. Only add `client:load` or `client:visible` to React components that genuinely need interactivity.
3. **Media in `public/` for now.** During development, images and videos go in `public/images/`. An external CDN/image service will be evaluated later.
4. **Relationships via `reference()`.** Collections reference each other using Astro's `reference()` for build-time validation. Broken slugs break the build, not production.
5. **Keep it simple.** If you're reaching for a library, stop and check if plain HTML/CSS or an Astro component can do it.
6. **Fail at build time.** The site is managed by marketing and non-technical people. Every error caught at build time is one less bug in production.

## Build & Deploy

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

### Deploy

Cloudflare Pages: push to main triggers build and deploy of `dist/`. Branch pushes create preview deployments.

### Pre-Push Checklist

Before pushing, run `pnpm check && pnpm build` locally. Content errors caught locally are 10x faster than waiting for CI.

## Reference Documentation

- **Astro docs:** https://docs.astro.build
- **Content Collections:** https://docs.astro.build/en/guides/content-collections/
- **MDX in Astro:** https://docs.astro.build/en/guides/markdown-content/
- **View Transitions:** https://docs.astro.build/en/guides/view-transitions/
- **Islands Architecture:** https://docs.astro.build/en/concepts/islands/

**Do not hallucinate APIs.** If you're unsure whether a method or config option exists, check the docs. Astro's API surface is small.
