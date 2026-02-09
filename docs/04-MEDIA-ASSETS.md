# Media & Assets

## Rule: No Large Files in Git

Do **not** commit images, videos, or other media to the repository. Git is not designed for binary files — the repo will bloat and cloning will become painfully slow.

## Strategy: External URLs

All media (images, videos) is hosted externally and referenced by URL. The hosting infrastructure is managed separately — this project only cares about URLs.

### Referencing in Content

In frontmatter:

```yaml
thumbnail: https://cdn.significa.co/projects/cool-project/thumb.jpg
```

In MDX body:

```mdx
<MediaImage src="https://cdn.significa.co/projects/cool-project/hero.jpg" alt="Hero" />
```

The `thumbnail` field in schemas is typed as `z.string().url()` — Zod validates it's a valid URL at build time.

## What CAN Live in the Repo

- **Icons and logos** (SVG) — small, text-based, version-controlled
- **Favicons** — in `public/`
- **Fonts** — in `public/fonts/` if self-hosting

## Image Rendering

Use plain `<img>` tags with `loading="lazy"` and explicit `width`/`height` attributes to prevent layout shift. Image optimization (resizing, format conversion) is handled at the CDN/infrastructure level, not by Astro.
