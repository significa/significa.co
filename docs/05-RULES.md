# Rules & Anti-Patterns

## DO

- **Use Astro components by default.** Only reach for React when you need client-side interactivity (e.g. mobile menu toggle, form validation). Even then, prefer `client:visible` over `client:load`.
- **Use semantic HTML.** `<article>`, `<nav>`, `<section>`, `<header>`, `<footer>`, `<main>`, `<time>`. Not everything is a `<div>`.
- **Fail at build time.** If a slug reference is broken, a required field is missing, or data is invalid: throw. The build breaks, not production.
- **Keep pages thin.** Pages (`src/pages/`) should fetch data and delegate rendering to layout/components. No complex logic in pages.
- **Use TypeScript everywhere.** Type your props with `interface Props`, type your data, type your utils. No `any`.
- **Use `reference()` for cross-collection links.** Build-time validated. Broken slugs break the build, not production.
- **Use `pnpm`.** Not npm, not yarn.
- **Use design tokens.** Every value comes from `global.css` custom properties. No magic numbers, no magic colors.
- **Use `MediaImage` for all images in content.** Never raw `<img>` tags. It constructs Bunny CDN URLs with responsive `srcset` and optimization parameters automatically.
- **Drafts use the `.draft` filename suffix.** Name a file `my-post.draft.mdx` to mark it as a draft. In production builds, `.draft` files are excluded at the glob level — they never enter the content layer. In development (`pnpm dev`), drafts are included so authors can preview them locally. Publishing is a file rename: `my-post.draft.mdx` → `my-post.mdx`. No frontmatter field needed.
- **Use kebab-case for all filenames.** Components, pages, utilities, styles, content — everything is kebab-case (`media-image.astro`, `content-errors.ts`, `global.css`). Enforced by ESLint via `eslint-plugin-check-file`.

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
- **Do not hardcode pixel values.** Use the spacing scale via custom properties.
- **Do not use hex colors.** Use OKLCH via custom properties.
- **Do not use arbitrary spacing.** Use the scale. `margin: 13px` is never acceptable.
- **Do not use PascalCase or camelCase for filenames.** All files are kebab-case. `MediaImage.astro` → `media-image.astro`. `formatDate.ts` → `format-date.ts`. The ESLint rule will catch violations.
- **Do not use a `draft` frontmatter field.** Drafts are managed via the `.draft` filename suffix (e.g. `my-post.draft.mdx`), not a boolean in frontmatter. The content loader excludes `.draft` files in production automatically.

## Common Mistakes to Avoid

1. **Wrapping everything in React.** An Astro component with a `<style>` tag is simpler, faster, and has zero JS overhead.
2. **Over-abstracting.** Don't create a component that handles 15 variants. Start with the simplest thing that works.
3. **Forgetting async.** Astro's content API is async. Always `await` your `getCollection()` and `getEntry()` calls.
4. **Using `import.meta.glob` instead of Content Collections.** Content Collections exist for this.
5. **Putting content in `src/pages/` instead of `src/content/`.** Pages are routes. Content is data.
6. **Frontmatter is server-only.** No `window`, `document`, or `localStorage` in the `---` block.
7. **`reference()` returns stubs.** You get `{ id, collection }`, not the full entry. Resolve with `getEntry(ref)`.
8. **MDX components aren't auto-available.** Pass them explicitly via the `components` prop when rendering.
9. **Referencing a draft from non-draft content.** If a highlight or award references a `.draft` project, the dev server works fine but `pnpm build` fails because the draft is excluded from the collection. This is correct behavior — it prevents shipping pages that link to nothing.
