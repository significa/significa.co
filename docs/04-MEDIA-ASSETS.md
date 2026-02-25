# Media & Assets

## Architecture

Media files are managed through Significa's internal asset manager (`assets.significa.co`), which uploads files to **S3**. A self-hosted image transform service on **Fly.io** handles on-the-fly image optimization via **sharp**, fronted by **Cloudflare** for edge caching.

- **Asset Manager** (`assets.significa.co`): uploads images/videos to S3, returns URLs
- **CDN** (`cdn.significa.co`): Cloudflare edge cache → Fly.io transform service → S3
- **Image transforms**: sharp-based, triggered via URL query parameters

Content authors reference media by their S3 path. The `MediaImage` component constructs optimized CDN URLs with transform parameters automatically.

```
Author uploads via asset manager
  -> File stored in S3
  -> Referenced in MDX as path (e.g. /projects/cool-project/hero.jpg)
  -> MediaImage builds CDN URL with transforms
  -> Cloudflare edge serves cached version (or Fly transforms on cache miss)
```

## CDN Hostname

```
https://cdn.significa.co
```

All media URLs are constructed by prepending this hostname to the asset path.

## Image Transform Service

The transform service runs on Fly.io (`assets.significa.co`) with sharp. It transforms images on-the-fly via query parameters. Transformed images are cached in two layers: S3 (persistent, survives deploys) and Cloudflare edge (global, automatic).

### URL Pattern

```
https://cdn.significa.co/<path>?width=800&quality=80&format=webp
```

### Available Parameters

| Parameter | Values | Default | Description |
|---|---|---|---|
| `width` | integer (px) | original | Resize to width, maintain aspect ratio |
| `height` | integer (px) | original | Resize to height, maintain aspect ratio |
| `quality` | 0-100 | 80 | Compression level |
| `format` | webp, avif, jpeg, png | auto-negotiated | Force output format |

When no `format` is specified, the service auto-negotiates from the `Accept` header: AVIF → WebP → original format. This gives every browser the best format it supports without clients needing to know.

### Caching

**Layer 1 — S3 transform cache (persistent):** Transformed images are stored back to S3 under a `_transforms/` prefix, keyed by a hash of (original path + params). Sharp runs exactly once per unique combination.

**Layer 2 — Cloudflare edge cache (global):** Responses include `Cache-Control: public, max-age=31536000, immutable`. After the first request, Cloudflare serves directly from the edge — never hits Fly again until eviction.

### Common Transform Recipes

```
# Thumbnail (400px wide, optimized)
?width=400&quality=80

# Hero image (full width, WebP)
?width=1920&quality=85&format=webp

# Square avatar (use CSS object-fit for cropping)
?width=200&quality=80
```

## Referencing Media in Content

### In frontmatter

```yaml
thumbnail: /projects/cool-project/thumb.jpg
```

### In MDX body

```mdx
<MediaImage
  src="/projects/cool-project/hero.jpg"
  alt="Dashboard overview"
  width={1200}
  height={630}
  caption="The main dashboard after redesign"
/>
```

The `MediaImage` component prepends the CDN hostname and appends optimization parameters automatically. Content authors only need to provide the asset path as returned by the asset manager.

## MediaImage Component Behavior

`MediaImage` constructs responsive image URLs using the transform service:

1. Takes the `src` path (e.g. `/projects/cool-project/hero.jpg`)
2. Prepends the CDN hostname: `https://cdn.significa.co/projects/cool-project/hero.jpg`
3. Generates `srcset` with multiple widths for responsive loading
4. Appends `quality` and lets the service auto-negotiate format (WebP/AVIF when supported)

Example output (without caption):

```html
<img
  src="https://cdn.significa.co/projects/cool-project/hero.jpg?width=960&quality=80"
  srcset="
    https://cdn.significa.co/projects/cool-project/hero.jpg?width=640&quality=80 640w,
    https://cdn.significa.co/projects/cool-project/hero.jpg?width=960&quality=80 960w,
    https://cdn.significa.co/projects/cool-project/hero.jpg?width=1280&quality=80 1280w,
    https://cdn.significa.co/projects/cool-project/hero.jpg?width=1920&quality=80 1920w"
  sizes="100vw"
  alt="Dashboard overview"
  width="1200"
  height="630"
  loading="lazy"
  decoding="async"
/>
```

When a `caption` is provided, the output wraps in `<figure>` with a `<figcaption>`:

```html
<figure>
  <img src="..." srcset="..." sizes="..." alt="..." width="1200" height="630" loading="lazy" decoding="async" />
  <figcaption>The main dashboard after redesign</figcaption>
</figure>
```

## MediaImage Props

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `src` | string | yes | - | Asset path (without CDN hostname) |
| `alt` | string | yes | - | Accessible description |
| `width` | number | yes | - | Intrinsic width (prevents CLS) |
| `height` | number | yes | - | Intrinsic height (prevents CLS) |
| `caption` | string | no | - | Optional figure caption |
| `eager` | boolean | no | false | Use `loading="eager"` + `fetchpriority="high"` for above-the-fold |
| `sizes` | string | no | `100vw` | Responsive sizes attribute |
| `quality` | number | no | 80 | Image quality parameter (0-100) |

## MediaVideo

Videos are also served via the CDN but without image transforms (video optimization is handled at upload time by the asset manager).

```mdx
<MediaVideo
  src="/projects/cool-project/demo.mp4"
  poster="/projects/cool-project/demo-poster.jpg"
  caption="Prototype walkthrough"
/>
```

The `poster` image goes through the same transform pipeline as `MediaImage`.

## What Lives in the Repo

Only non-media static assets live in the repository:

- **SVG icons and logos**: small, text-based, version-controlled
- **Favicons** in `public/`
- **Fonts** in `public/fonts/`
- **robots.txt** in `public/`

All images and videos are managed externally via S3 + CDN.

## Local Development

During development, CDN URLs work directly since they're public. No local proxy or mock needed. Authors upload via the asset manager, get the path, and use it in content immediately.

## Image Best Practices

- Always provide `width` and `height` to prevent Cumulative Layout Shift (CLS)
- Use `eager` prop and `fetchpriority="high"` for hero/LCP images
- All other images default to `loading="lazy"` and `decoding="async"`
- Always use `MediaImage` component, never raw `<img>` tags in content
- Use the `sizes` prop when images don't span the full viewport
- Format auto-negotiation is handled by the transform service via `Accept` header — no need to specify format