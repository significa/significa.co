# Media & Assets

## Current Approach (Development Phase)

Images and videos live in `public/images/` during development. This keeps things simple while we evaluate external image services (ImageKit, Cloudinary, or similar with S3 integration).

```
public/
├── images/
│   ├── projects/
│   │   └── cool-project/
│   │       ├── hero.jpg
│   │       └── screenshot-01.jpg
│   └── blog/
│       └── post-name/
│           └── cover.jpg
├── favicon.svg
├── fonts/
└── robots.txt
```

### Referencing in Content

In frontmatter:

```yaml
thumbnail: /images/projects/cool-project/thumb.jpg
```

In MDX body:

```mdx
<MediaImage
  src="/images/projects/cool-project/hero.jpg"
  alt="Dashboard overview"
  width={1200}
  height={630}
/>
```

## What Lives in the Repo

- **Images and videos** in `public/images/` (during development phase)
- **Icons and logos** (SVG): small, text-based, version-controlled
- **Favicons** in `public/`
- **Fonts** in `public/fonts/`

## Future: External Image Service

When an image service is adopted, `MediaImage` will be updated to use transformation URLs. The content references will be migrated. Design components now with this migration in mind: always use `MediaImage` instead of raw `<img>` tags.

## MediaImage Requirements

- `width` and `height` are **required** (prevents layout shift)
- `alt` is **required** (accessibility)
- Use `eager` prop for above-the-fold images (hero images)
- Default is `loading="lazy"` with `decoding="async"`

## Image Best Practices

- Always provide `width` and `height` to prevent Cumulative Layout Shift (CLS)
- Use `eager` prop and `fetchpriority="high"` for hero/LCP images
- All other images default to `loading="lazy"` and `decoding="async"`
- Always use `MediaImage` component, never raw `<img>` tags in content
