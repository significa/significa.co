# Significa Website

Significa's company website. Static site built with Astro v5, MDX for rich content, TypeScript strict. No CMS, no database, no server. Content lives in git as typed MDX/YAML files. Marketing team manages content directly with AI assistance.

**Live site:** significa.co
**Stack:** Astro v5 (latest stable), MDX, TypeScript strict, Content Collections with Zod, React (islands only)
**Deploy:** Cloudflare Pages (static output to `dist/`)

---

## Commands

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

Before pushing: `pnpm lint && pnpm build`

---

## Critical Rules

These always apply, regardless of the task.

1. **Static site. No exceptions.** No API routes, no server-side logic, no `fetch()` for content. Everything renders at build time.
2. **Astro components first.** React only for interactive islands with explicit `client:*` directives. If it can be done without JS, do it without JS.
3. **Content Collections are the database.** Use `getCollection()` and `getEntry()` from `astro:content`. Never `import.meta.glob`. Never raw file reads.
4. **References use `reference()`.** Cross-collection links must use Astro's `reference()` for build-time validation. Broken slugs break the build, not production.
5. **Fail at build time. Always.** The site is managed by marketing and non-technical people. Runtime errors are unacceptable. Use `reference()`, require fields, throw on invalid data.
6. **TypeScript strict.** Type all props with `interface Props`. No `any`.
7. **Semantic HTML.** `<article>`, `<nav>`, `<section>`, `<header>`, `<footer>`, `<main>`, `<time>`. Not everything is a `<div>`.
8. **No CSS framework.** Scoped `<style>` in Astro components + `global.css` for design tokens. No magic colors — colors and typography must come from the token system. Spacing uses raw values (4px grid guideline, `rem` for vertical, `px` for horizontal when appropriate).
9. **Media via S3 + self-hosted CDN.** Images and videos served from `https://cdn.significa.co` (Cloudflare → Fly.io transform service → S3). Use `MediaBlock` component, never raw `<img>` or `<video>` tags in content.
10. **Minimal dependencies.** Every `pnpm add` needs a clear reason.
11. **Astro v5 (latest stable).** Astro 6 is in beta — upgrade to v6 as soon as it reaches stable. Until then, stay on latest v5.
12. **kebab-case for all filenames.** Enforced by ESLint via `eslint-plugin-check-file`. No exceptions.
13. **Drafts use the `.draft` filename suffix.** `my-post.draft.mdx` is a draft. Publishing is a file rename. No frontmatter field.
15. **No em-dashes.** Never use `—` in any content or copy. Use a comma, period, or rewrite the sentence instead.
14. **Handbook pages with children use `index.mdx`.** If a handbook page has child pages, its content lives at `my-page/index.mdx` inside its own folder. Standalone pages with no children stay as flat `.mdx` files at the top level. Never have `my-page.mdx` alongside a `my-page/` folder — that's the old forbidden pattern. The `generateId` loader strips `/index` suffixes so URLs are identical either way. See `docs/02-CONTENT-SCHEMA.md`.

---

## Project Structure

```
src/
├── components/
│   ├── mdx/                  # Components available inside MDX files
│   │   ├── media-block.astro
│   │   ├── media-video.astro
│   │   ├── comparison-block.astro
│   │   ├── metrics.astro
│   │   ├── project-cross-sell.astro
│   │   └── components.ts      # Centralized MDX component registry
│   ├── ui/                   # Reusable UI components
│   ├── header.astro
│   ├── footer.astro
│   └── seo.astro             # SEO meta tags component
├── content.config.ts         # Collection schemas (the "database")
├── content/
│   ├── projects/             # .mdx per project case study
│   ├── blog/                 # .md or .mdx per blog post
│   ├── labs/                 # .md or .mdx per open source project
│   ├── pages/                # .mdx per misc page (about, services, etc.)
│   ├── highlights/           # .yaml per homepage highlight
│   ├── clients/              # .yaml per client (logo strip)
│   ├── testimonials/         # .yaml per testimonial
│   ├── awards/               # .yaml per award
│   ├── handbook-groups/      # .yaml per sidebar group (e.g. design.yaml, engineering.yaml)
│   └── handbook/             # .mdx per handbook page
│       ├── manifesto.mdx     #   standalone (no children) → /handbook/manifesto
│       └── career/           #   page with children
│           ├── index.mdx     #     parent page → /handbook/career
│           └── side-gigs.mdx #     child page → /handbook/career/side-gigs
├── layouts/
│   └── base.astro            # Main HTML layout with SEO component
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
│   ├── handbook/
│   │   ├── index.astro       # Handbook index (grouped sidebar)
│   │   ├── [...slug].astro   # Handbook page detail
│   │   └── search-index.json.ts # Search index endpoint
│   ├── 404.astro             # Custom 404 page
│   └── [...slug].astro       # Catch-all for misc pages
├── styles/
│   ├── global.css            # Entry point: imports reset + tokens, base styles
│   ├── reset.css             # CSS reset
│   └── tokens.css            # Design tokens (colors, typography, layout, transitions)
└── lib/
    ├── collections.ts        # Helper functions for content queries
    ├── cdn.ts                # CDN URL helpers and srcset generation
    ├── seo.ts                # Structured data generation (JSON-LD)
    └── content-errors.ts     # Build-time error formatting
public/
├── favicon.svg
├── fonts/
└── robots.txt
# Images/videos are NOT in public/. They are served via S3 + CDN (cdn.significa.co).
```

---

## Git Conventions

- **Commits:** natural language, infinitive tense. One logical change per commit.
- **Branches:** `feature/short-description`, `fix/short-description`, `chore/short-description`

---

## Documentation

Read the docs relevant to your task. Don't load everything.

| Working on… | Read |
|---|---|
| Project setup, structure, commands, key principles | `docs/01-PROJECT-BOOTSTRAP.md` |
| Content schemas, collections, Zod types, relationships, drafts | `docs/02-CONTENT-SCHEMA.md` |
| MDX components (creating, registering, catalog) | `docs/03-MDX-COMPONENTS.md` |
| Images, videos, CDN, MediaBlock/MediaVideo | `docs/04-MEDIA-ASSETS.md` |
| Rules, anti-patterns, build-time validation, common gotchas | `docs/05-RULES.md` |
| Astro framework reference (components, islands, transitions, routing) | `docs/06-ASTRO-REFERENCE.md` |
| Architectural decisions, team discussion log | `docs/07-TEAM-DECISIONS.md` |
| Design tokens (spacing, typography, colors, breakpoints) | `docs/08-DESIGN-TOKENS.md` |
| SEO checklist, accessibility baseline, link rules | `docs/09-SEO-ACCESSIBILITY.md` |
| Structured data, JSON-LD schemas, schema functions, code patterns | `docs/10-STRUCTURED-DATA.md` |
| SEO strategy, keyword clusters, GEO principles, target markets | `docs/12-SEO-STRATEGY.md` |

### External References

- **Astro docs:** https://docs.astro.build
- **Content Collections:** https://docs.astro.build/en/guides/content-collections/
- **MDX in Astro:** https://docs.astro.build/en/guides/markdown-content/
- **View Transitions:** https://docs.astro.build/en/guides/view-transitions/
- **Islands Architecture:** https://docs.astro.build/en/concepts/islands/

**Do not hallucinate APIs.** If you're unsure whether a method or config option exists, check the Astro docs. The API surface is small.