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
- **Use `MediaImage` for all images in content.** Never raw `<img>` tags. Prepares for future CDN migration.
- **Filter drafts at query time.** `getCollection('blog', ({ data }) => !data.draft)`. Never in the schema.

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

## Common Mistakes to Avoid

1. **Wrapping everything in React.** An Astro component with a `<style>` tag is simpler, faster, and has zero JS overhead.
2. **Over-abstracting.** Don't create a component that handles 15 variants. Start with the simplest thing that works.
3. **Forgetting async.** Astro's content API is async. Always `await` your `getCollection()` and `getEntry()` calls.
4. **Using `import.meta.glob` instead of Content Collections.** Content Collections exist for this.
5. **Putting content in `src/pages/` instead of `src/content/`.** Pages are routes. Content is data.
6. **Frontmatter is server-only.** No `window`, `document`, or `localStorage` in the `---` block.
7. **`reference()` returns stubs.** You get `{ id, collection }`, not the full entry. Resolve with `getEntry(ref)`.
8. **MDX components aren't auto-available.** Pass them explicitly via the `components` prop when rendering.
