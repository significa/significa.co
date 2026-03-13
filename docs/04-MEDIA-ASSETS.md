# Media & Assets

## Architecture

Media files are managed through Significa's internal asset manager (`assets.significa.co`), which uploads files to **S3**. A self-hosted image transform service on **Fly.io** handles on-the-fly image optimization via **sharp**, fronted by **Cloudflare** for edge caching.

- **Asset Manager** (`assets.significa.co`): uploads images/videos to S3, returns URLs
- **CDN** (`cdn.significa.co`): Cloudflare edge cache → Fly.io transform service → S3
- **Image transforms**: sharp-based, triggered via URL query parameters

Content authors reference media by their S3 path. The `MediaBlock` component constructs optimized CDN URLs with transform parameters automatically.

```
Author uploads via asset manager
  -> File stored in S3
  -> Referenced in MDX as path (e.g. /projects/cool-project/hero.jpg)
  -> MediaBlock builds CDN URL with transforms
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
<MediaBlock
  src="/projects/cool-project/hero.jpg"
  alt="Dashboard overview"
  width={1920}
  height={1080}
  layout="full"
  caption="The main dashboard after redesign"
/>
```

The `MediaBlock` component prepends the CDN hostname and appends optimization parameters automatically. Content authors only need to provide the asset path as returned by the asset manager.

## MediaBlock Component Behavior

`MediaBlock` constructs responsive image URLs using the transform service (for images) or passes the URL through directly (for videos):

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

## MediaBlock Props

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `src` | string | yes | — | Asset path or full CDN URL. `.mp4`/`.webm`/`.mov` renders a video; anything else renders an image. |
| `alt` | string | no | `""` | Accessible description. Leave empty for decorative/ambient media (videos, atmosphere shots). |
| `width` | number | yes | — | Intrinsic width in pixels (prevents CLS) |
| `height` | number | yes | — | Intrinsic height in pixels (prevents CLS) |
| `layout` | `full` \| `wide` \| `medium` \| `small` | yes | — | Controls rendered width. **Always set explicitly.** See layout table below. |
| `caption` | string | no | — | Optional figure caption |
| `eager` | boolean | no | false | Use `loading="eager"` + `fetchpriority="high"` for above-the-fold images |
| `sizes` | string | no | `100vw` | Responsive sizes attribute (images only) |
| `quality` | number | no | 80 | Image quality 0–100 (images only) |

### Layout values

| Value | Width | Use when |
|---|---|---|
| `full` | 100vw — edge to edge | Hero shots, full-bleed atmosphere images, wide video reels |
| `wide` | 1152px centered | Multi-screen compositions, before/after, wide UI screenshots |
| `medium` | 768px — stays in prose column | Single screen, inline illustration, no breakout needed |
| `small` | ~384px centered | Detail shot, mobile screenshot, supporting visual |

### Video behaviour

If `src` ends in `.mp4`, `.webm`, or `.mov`, `MediaBlock` renders a `<video>` that autoplays muted, loops silently, and never shows controls. This is intentional — videos in case studies serve as ambient motion, not primary content requiring user control. Use `MediaVideo` if you need explicit playback controls.

## MediaVideo

Videos are also served via the CDN but without image transforms (video optimization is handled at upload time by the asset manager).

```mdx
<MediaVideo
  src="/projects/cool-project/demo.mp4"
  poster="/projects/cool-project/demo-poster.jpg"
  caption="Prototype walkthrough"
/>
```

The `poster` image goes through the same transform pipeline as `MediaBlock`.

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
- Always use `MediaBlock` component, never raw `<img>` or `<video>` tags in content
- Always set `layout` explicitly on every `<MediaBlock>` — it is a content decision, not a default
- Use the `sizes` prop when images don't span the full viewport
- Format auto-negotiation is handled by the transform service via `Accept` header — no need to specify format

## Handbook Cover Images

Handbook pages support optional cover images via the `coverImage` frontmatter field. These are rendered directly using CDN helpers (not the `MediaBlock` component) for optimal LCP performance.

### Usage

```yaml
---
title: Code of Ethics
coverImage: https://cdn.significa.co/handbook/code-of-ethics-cover.jpg
# ... other fields
---
```

### URL Format

The `coverImage` field accepts **full URLs**:
- **CDN URLs:** `https://cdn.significa.co/handbook/image.jpg` (recommended)
- **External URLs:** `https://images.unsplash.com/photo-xyz`
- **Any public image URL**

CDN URLs get automatic optimization; external URLs are used as-is.

### Implementation

Cover images are rendered in `src/pages/handbook/[...slug].astro` using:
- `cdnUrl()` for the main src (handles all URL formats)
- `cdnSrcset()` for responsive variants (CDN URLs only)
- Eager loading with high fetchpriority
- No alt text (decorative images)

### Guidelines

- **Dimensions**: 1200×630px or larger (16:9 or 2:1 aspect ratio)
- **Format**: JPEG for photos, PNG for graphics
- **URL**: Use full URLs (CDN URLs recommended for optimization)
- **Optimization**: Automatic for CDN URLs via transform service
- **Display**: Full-width within content area (max 840px), 8px border-radius