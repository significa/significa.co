# Rules & Anti-Patterns

## DO

- **Use Astro components by default.** Only reach for React when you need client-side interactivity (e.g. mobile menu toggle, form validation). Even then, prefer `client:visible` over `client:load`.
- **Use semantic HTML.** `<article>`, `<nav>`, `<section>`, `<header>`, `<footer>`, `<main>`. Don't wrap everything in `<div>`.
- **Fail at build time.** If a slug reference is broken, a required field is missing, or an image URL is invalid — throw. The build should break, not the production site.
- **Keep pages thin.** Pages (`src/pages/`) should fetch data and delegate rendering to layout/components. No complex logic in pages.
- **Use TypeScript everywhere.** Type your props, your data, your utils.

## DO NOT

- **Do not use `getStaticPaths` for non-dynamic routes.** Only `[slug].astro` files need it. Static pages like `index.astro` just call `getCollection()` directly.
- **Do not install a CSS framework unless explicitly asked.** Start with plain CSS or CSS modules. Astro has built-in scoped styles via `<style>` tags in `.astro` files.
- **Do not add a CMS.** The content lives in MDX files in the repo. That's the whole point.
- **Do not use `client:load` on everything.** This defeats the purpose of Astro. Most components need zero JS.
- **Do not create API routes.** This is a static site. No server-side logic.
- **Do not use `fetch()` to load content.** Use `getCollection()` and `getEntry()` from `astro:content`.
- **Do not guess Astro APIs.** If you're not sure a method exists, check the docs. Astro's API surface is small — don't invent things.
- **Do not add dependencies without justification.** Every `npm install` should have a clear reason. Fewer dependencies = fewer problems.
- **Do not commit images or videos to the repo.** See `04-MEDIA-ASSETS.md`.

## Common Mistakes to Avoid

1. **Wrapping everything in React.** An Astro component with a `<style>` tag is simpler, faster, and has zero JS overhead. Use React only for stateful UI.
2. **Over-abstracting.** Don't create a `<Button>` component that handles 15 variants. Start with the simplest thing that works.
3. **Forgetting `await context.sync()` patterns.** Astro's content API is async. Always `await` your `getCollection()` and `getEntry()` calls.
4. **Using `import.meta.glob` instead of content collections.** Content collections exist for this. Don't reinvent them.
5. **Putting content in `src/pages/` instead of `src/content/`.** Pages are routes. Content is data. Keep them separate.
