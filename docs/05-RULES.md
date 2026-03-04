# Rules & Anti-Patterns

## DO

- **Use Astro components by default.** Only reach for React when you need client-side interactivity (e.g. mobile menu toggle, form validation). Even then, prefer `client:visible` over `client:load`.
- **Use semantic HTML.** `<article>`, `<nav>`, `<section>`, `<header>`, `<footer>`, `<main>`, `<time>`. Not everything is a `<div>`.
- **Fail at build time.** If a slug reference is broken, a required field is missing, or data is invalid: throw. The build breaks, not production.
- **Keep pages thin.** Pages (`src/pages/`) should fetch data and delegate rendering to layout/components. No complex logic in pages.
- **Use TypeScript everywhere.** Type your props with `interface Props`, type your data, type your utils. No `any`.
- **Use `reference()` for cross-collection links.** Build-time validated. Broken slugs break the build, not production.
- **Use `pnpm`.** Not npm, not yarn.
- **Use design tokens for colors and typography.** Colors and font sizes come from `tokens.css` custom properties. No hex colors, no arbitrary font sizes. Spacing uses raw values (4px grid guideline, `rem` for vertical, `px` for horizontal when appropriate). See `docs/08-DESIGN-TOKENS.md`.
- **Use `MediaImage` for all images in content.** Never raw `<img>` tags. It constructs CDN URLs with responsive `srcset` and optimization parameters automatically.
- **Drafts use the `.draft` filename suffix.** Name a file `my-post.draft.mdx` to mark it as a draft. In production builds, `.draft` files are excluded at the glob level — they never enter the content layer. In development (`pnpm dev`), drafts are included so authors can preview them locally. Publishing is a file rename: `my-post.draft.mdx` → `my-post.mdx`. No frontmatter field needed.
- **Use kebab-case for all filenames.** Components, pages, utilities, styles, content — everything is kebab-case (`media-image.astro`, `content-errors.ts`, `global.css`). Enforced by ESLint via `eslint-plugin-check-file`.
- **Handbook pages with children use `index.mdx`.** If a handbook page has child pages, its content lives at `my-page/index.mdx` (not `my-page.mdx` alongside a `my-page/` folder). Standalone pages with no children stay as flat `.mdx` files. The `generateId` loader strips `/index` suffixes so URLs are identical either way. See `02-CONTENT-SCHEMA.md` for the full convention table.

## DO NOT

- **Do not use `getStaticPaths` for non-dynamic routes.** Only `[slug].astro` files need it. Static pages like `index.astro` call `getCollection()` directly.
- **Do not add a CSS framework.** Scoped `<style>` in Astro components + `global.css` for tokens. No Tailwind, no Bootstrap.
- **Do not add a CMS.** Content lives in MDX/YAML files in the repo. Marketing team uses git + AI assistance.
- **Do not use `client:load` on everything.** This defeats the purpose of Astro. Most components need zero JS.
- **Do not create API routes.** This is a static site. No server-side logic.
- **Do not use `fetch()` to load content.** Use `getCollection()` and `getEntry()` from `astro:content`.
- **Do not use `import.meta.glob`.** Content Collections exist for this. Don't reinvent them.
- **Do not guess Astro APIs.** Check the docs. Astro's API surface is small.
- **Do not add dependencies without justification.** Every `pnpm add` should have a clear reason.
- **Do not use hex colors.** Use OKLCH via custom properties.
- **Do not use PascalCase or camelCase for filenames.** All files are kebab-case. `MediaImage.astro` → `media-image.astro`. `formatDate.ts` → `format-date.ts`. The ESLint rule will catch violations.
- **Do not use a `draft` frontmatter field.** Drafts are managed via the `.draft` filename suffix (e.g. `my-post.draft.mdx`), not a boolean in frontmatter. The content loader excludes `.draft` files in production automatically.
- **Do not create `my-page.mdx` alongside a `my-page/` folder for handbook entries.** This was the old pattern and is now forbidden. If a handbook page gains children, move `my-page.mdx` into `my-page/index.mdx` — do not leave the flat file next to the folder.

## Build-Time Validation

This site is managed by marketing and non-technical people. Every error caught at build time is one less bug in production.

### Slug Collision Check

The catch-all `[...slug].astro` must validate that no page slug collides with reserved routes:

```typescript
// In src/pages/[...slug].astro getStaticPaths()
const reserved = ['blog', 'projects', 'labs', 'who-we-are', 'what-we-do', 'work-with-us'];
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

## Common Mistakes and Gotchas

1. **Wrapping everything in React.** An Astro component with a `<style>` tag is simpler, faster, and has zero JS overhead.
2. **Over-abstracting.** Don't create a component that handles 15 variants. Start with the simplest thing that works.
3. **Forgetting async.** Astro's content API is async. Always `await` your `getCollection()` and `getEntry()` calls.
4. **Using `import.meta.glob` instead of Content Collections.** Content Collections exist for this.
5. **Putting content in `src/pages/` instead of `src/content/`.** Pages are routes. Content is data.
6. **Frontmatter is server-only.** No `window`, `document`, or `localStorage` in the `---` block.
7. **`reference()` returns stubs.** You get `{ id, collection }`, not the full entry. Resolve with `getEntry(ref)`.
8. **MDX components aren't auto-available.** Pass them explicitly via the `components` prop when rendering.
9. **Referencing a draft from non-draft content.** If a highlight or award references a `.draft` project, the dev server works fine but `pnpm build` fails because the draft is excluded from the collection. This is correct behavior — it prevents shipping pages that link to nothing.
10. **Catch-all route collision.** If a page in `src/content/pages/` has a slug matching `blog`, `projects`, or `labs`, the build-time check throws. See Build-Time Validation above.
11. **Static paths must be exhaustive.** Every URL must be returned by `getStaticPaths()`. Missing = 404.
12. **Handbook flat file + folder coexistence is forbidden.** Never have both `handbook/career.mdx` and `handbook/career/` at the same time. Pages with children always use `handbook/career/index.mdx`. Pages without children use `handbook/career.mdx`. Pick one — the loader cannot produce correct IDs for both simultaneously.