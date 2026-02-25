# SEO & Accessibility

## SEO Checklist

Every page must have:

- [ ] `<title>` tag (unique per page)
- [ ] `<meta name="description">` (unique, under 160 chars)
- [ ] `<link rel="canonical">` (absolute URL)
- [ ] Open Graph tags (`og:title`, `og:description`, `og:image`, `og:type`, `og:url`)
- [ ] Twitter card tags (`twitter:card`, `twitter:title`, `twitter:description`, `twitter:image`)
- [ ] Proper heading hierarchy (`h1` > `h2` > `h3`, never skip levels)
- [ ] `lang` attribute on `<html>`

### Site-Level SEO (Include From Inception)

These should be set up from the start of the project, not bolted on before launch:

- [ ] `@astrojs/sitemap` configured with `site` in `astro.config.mjs`
- [ ] RSS feed at `/blog/rss.xml` using `@astrojs/rss`
- [ ] `robots.txt` in `public/`
- [ ] JSON-LD structured data (`Organization`, `Article`, `BreadcrumbList`)
- [ ] `404.astro` page
- [ ] Canonical URLs in every page head
- [ ] Reusable `<SEO>` component in Base layout

## Accessibility

Non-negotiable baseline:

1. **Alt text on every image.** `alt` prop is required on `MediaImage`. Caption is not alt text.
2. **WCAG AA contrast.** 4.5:1 for body text, 3:1 for large text. Test with real content.
3. **Keyboard navigation.** All interactive elements (lightbox, slider, nav, filters) must work with keyboard.
4. **Reduced motion.** `prefers-reduced-motion` disables all non-essential animations.
5. **Semantic HTML.** `<article>` for entries, `<nav>` for navigation, `<main>` for content, proper heading hierarchy.
6. **Skip link.** First focusable element: "Skip to content."
7. **Focus management.** On View Transition navigation, focus moves to main content.