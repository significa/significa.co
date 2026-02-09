# Project Bootstrap

## Stack

- **Astro** (latest v5) — static site generator
- **MDX** — markdown with custom components for case studies
- **TypeScript** — strict mode
- **Content Collections** — Astro's built-in content layer (with Zod schemas)
- **React** — only for interactive islands (e.g. mobile nav toggle). Keep it minimal.

## Init

```bash
npm create astro@latest significa-website -- --template minimal --typescript strict
cd significa-website
npx astro add mdx react
```

## Project Structure

```
src/
├── components/          # Astro + React components
│   ├── mdx/             # Components available inside MDX files
│   │   ├── ProjectCrossSell.astro
│   │   ├── ComparisonBlock.astro
│   │   ├── Metrics.astro
│   │   └── MediaImage.astro
│   └── ...              # Layout/UI components
├── content/
│   ├── content.config.ts  # Collection schemas (THIS IS THE "DATABASE")
│   ├── projects/        # One .mdx file per project
│   ├── blog/            # One .mdx file per blog post
│   ├── labs/            # One .mdx file per open source project
│   ├── pages/           # One .mdx file per misc page (services, about, etc.)
│   └── highlights/      # One .yaml file per homepage highlight (build-time validated)
├── layouts/
│   └── Base.astro       # Main HTML layout
├── pages/
│   ├── index.astro      # Homepage
│   ├── blog/
│   │   ├── index.astro
│   │   └── [slug].astro
│   ├── projects/
│   │   ├── index.astro
│   │   └── [slug].astro
│   ├── labs/
│   │   ├── index.astro
│   │   └── [slug].astro
│   └── [...slug].astro  # Catch-all for misc pages
└── styles/
    └── global.css
```

## Key Principles

1. **No database.** Content lives in MDX files with typed frontmatter.
2. **No client-side JS by default.** Astro renders everything server-side at build time. Only add `client:load` or `client:visible` to React components that genuinely need interactivity.
3. **Media is external.** Images/videos are hosted on Cloudflare R2 (or similar CDN). Reference them by URL in frontmatter and MDX. Never commit large media files to the repo.
4. **Relationships via slugs.** Collections reference each other using slug strings, resolved at build time. See `02-CONTENT-SCHEMA.md`.
5. **Keep it simple.** If you're reaching for a library, stop and check if plain HTML/CSS or an Astro component can do it.

## Build & Deploy

```bash
npm run build   # Outputs to dist/
npm run preview # Local preview of the built site
```

Deploy `dist/` to Cloudflare Pages, Vercel (static mode), or Netlify.

## Important: Astro Docs

When in doubt, **always check the official Astro docs** before guessing:
- Content Collections: https://docs.astro.build/en/guides/content-collections/
- MDX: https://docs.astro.build/en/guides/markdown-content/
- View Transitions: https://docs.astro.build/en/guides/view-transitions/
- Islands: https://docs.astro.build/en/concepts/islands/

**Do not hallucinate APIs.** If you're unsure whether a method or config option exists, look it up.
