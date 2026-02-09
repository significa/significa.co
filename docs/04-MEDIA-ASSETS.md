# Media & Assets

## Architecture

Media files are managed through Significa's internal asset manager, which uploads files to **S3**. On top of S3, we use **Bunny.net CDN** with the **Bunny Optimizer Engine** for delivery and image transformations.

- **Asset Manager** (internal app): uploads images/videos to S3, returns URLs
- **Bunny CDN**: serves media from `https://significa.b-cdn.net`
- **Bunny Optimizer**: real-time image transforms via URL query parameters

Content authors reference media by their S3 path. The `MediaImage` component constructs optimized Bunny CDN URLs with transform parameters automatically.

```
Author uploads via asset manager
  -> File stored in S3
  -> Referenced in MDX as path (e.g. /projects/cool-project/hero.jpg)
  -> MediaImage builds Bunny CDN URL with transforms
  -> Bunny serves optimized image
```

## Bunny CDN Hostname

```
https://significa.b-cdn.net
```

All media URLs are constructed by prepending this hostname to the asset path.

## Bunny Optimizer Engine

The Optimizer transforms images on-the-fly via query parameters appended to any image URL served through the CDN. Images are transformed once and cached at the edge.

### URL Pattern

```
https://significa.b-cdn.net/<path>?width=800&quality=80&format=webp
```

### Available Parameters

| Parameter | Values | Default | Description |
|---|---|---|---|
| `width` | integer (px) | original | Resize to width, maintain aspect ratio |
| `height` | integer (px) | original | Resize to height, maintain aspect ratio |
| `quality` | 0-100 | 85 | Compression level. Below 70 may show artifacts |
| `aspect_ratio` | e.g. `16:9`, `1:1` | original | Auto-crop to aspect ratio with center gravity |
| `crop` | `w,h` or `w,h,x,y` | none | Crop to dimensions. Format 2 specifies origin |
| `crop_gravity` | center, north, south, east, west, northeast, northwest, southeast, southwest | center | Anchor point for crop (Format 1 only) |
| `sharpen` | true/false | false | Enhance sharpness |
| `blur` | 0-100 | 0 | Blur intensity |
| `auto_optimize` | medium, high | none | Automatic optimization. `high` also applies sharpening |
| `format` | webp, avif, jpeg, png, gif | auto-negotiated | Force output format |
| `brightness` | integer | 0 | Adjust brightness |
| `contrast` | integer | 0 | Adjust contrast |
| `saturation` | integer | 0 | Adjust color saturation |
| `hue` | integer | 0 | Shift color hue |
| `sepia` | 0-100 | 0 | Apply sepia tone |
| `flip` | true/false | false | Mirror horizontally |
| `flop` | true/false | false | Mirror vertically |

**Note:** When both `width` and `height` are specified, Bunny selects whichever produces the smaller image while preserving aspect ratio. Crop operations are applied before resizing.

### Common Transform Recipes

```
# Thumbnail (400px wide, optimized)
?width=400&quality=80

# Hero image (full width, WebP)
?width=1920&quality=85&format=webp

# Square crop for avatar
?aspect_ratio=1:1&width=200&quality=80

# Blurred background placeholder
?width=32&blur=80&quality=30
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

The `MediaImage` component prepends the Bunny CDN hostname and appends optimization parameters automatically. Content authors only need to provide the asset path as returned by the asset manager.

## MediaImage Component Behavior

`MediaImage` constructs responsive image URLs using Bunny Optimizer:

1. Takes the `src` path (e.g. `/projects/cool-project/hero.jpg`)
2. Prepends the CDN hostname: `https://significa.b-cdn.net/projects/cool-project/hero.jpg`
3. Generates `srcset` with multiple widths for responsive loading
4. Appends `quality` and lets Bunny auto-negotiate format (WebP/AVIF when supported)

Example output:

```html
<picture>
  <img
    src="https://significa.b-cdn.net/projects/cool-project/hero.jpg?width=960&quality=80"
    srcset="
      https://significa.b-cdn.net/projects/cool-project/hero.jpg?width=640&quality=80 640w,
      https://significa.b-cdn.net/projects/cool-project/hero.jpg?width=960&quality=80 960w,
      https://significa.b-cdn.net/projects/cool-project/hero.jpg?width=1280&quality=80 1280w,
      https://significa.b-cdn.net/projects/cool-project/hero.jpg?width=1920&quality=80 1920w"
    sizes="100vw"
    alt="Dashboard overview"
    width="1200"
    height="630"
    loading="lazy"
    decoding="async"
  />
</picture>
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
| `quality` | number | no | 80 | Bunny quality parameter (0-100) |

## MediaVideo

Videos are also served via Bunny CDN but without optimizer transforms (video optimization is handled at upload time by the asset manager).

```mdx
<MediaVideo
  src="/projects/cool-project/demo.mp4"
  poster="/projects/cool-project/demo-poster.jpg"
  caption="Prototype walkthrough"
/>
```

The `poster` image goes through the same Bunny Optimizer pipeline as `MediaImage`.

## What Lives in the Repo

Only non-media static assets live in the repository:

- **SVG icons and logos**: small, text-based, version-controlled
- **Favicons** in `public/`
- **Fonts** in `public/fonts/`
- **robots.txt** in `public/`

All images and videos are managed externally via S3 + Bunny CDN.

## Local Development

During development, Bunny CDN URLs work directly since they're public. No local proxy or mock needed. Authors upload via the asset manager, get the path, and use it in content immediately.

## Image Best Practices

- Always provide `width` and `height` to prevent Cumulative Layout Shift (CLS)
- Use `eager` prop and `fetchpriority="high"` for hero/LCP images
- All other images default to `loading="lazy"` and `decoding="async"`
- Always use `MediaImage` component, never raw `<img>` tags in content
- Use the `sizes` prop when images don't span the full viewport
- Let Bunny auto-negotiate format (serves WebP/AVIF to supporting browsers)
