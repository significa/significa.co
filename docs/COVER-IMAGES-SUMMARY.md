# Cover Images Feature - Implementation Summary

## Overview

I've successfully added support for optional cover images on all handbook pages. This feature allows you to add visual context and improve the presentation of handbook content.

## What Changed

### 1. Schema Update
**File:** `src/content.config.ts`

Added optional `coverImage` field to the handbook collection:
```typescript
coverImage: z.string().optional()
```

This field accepts full URLs (e.g., `https://cdn.significa.co/handbook/code-of-ethics-cover.jpg`).

### 2. UI Implementation
**File:** `src/pages/handbook/[...slug].astro`

Enhanced the detail page to display cover images:
- Imports CDN helpers (`cdnUrl`, `cdnSrcset`, `DEFAULT_QUALITY`)
- Conditionally renders cover image when `coverImage` field is present
- Displays between page header and content
- Optimized for performance with eager loading and high fetchpriority

### 3. Documentation Updates

Updated multiple documentation files:
- `docs/04-MEDIA-ASSETS.md` - Added handbook cover images section
- `docs/10-PARENT-CHILD-PAGES.md` - Added cover image usage and guidelines
- `docs/QUICK-PARENT-CHILD-GUIDE.md` - Added quick reference for cover images
- `PARENT-CHILD-SETUP.md` - Updated with cover image information

### 4. Example Implementation
**File:** `src/content/handbook/mission-and-values/code-of-ethics.mdx`

Added cover image to demonstrate the feature:
```yaml
coverImage: https://cdn.significa.co/handbook/code-of-ethics-cover.jpg
```

## How to Use

### Adding a Cover Image

Simply add the `coverImage` field to your handbook page frontmatter with a full URL:

```yaml
---
title: Your Page Title
description: Your description
date: 2024-01-15
coverImage: https://cdn.significa.co/handbook/your-image.jpg
group: your-group
order: 1
---
```

### Image Guidelines

**Dimensions:**
- Recommended: 1200×630px or larger
- Aspect ratio: 16:9 or 2:1 works best

**Format:**
- JPEG for photographs
- PNG for graphics with transparency

**URL Format:**
- Use full URLs: `https://cdn.significa.co/handbook/image-name.jpg`
- External URLs also supported: `https://images.unsplash.com/photo-xyz`
- Any public image URL works

**File Size:**
- Optimize before uploading
- CDN images will be automatically optimized further with quality settings
- External URLs are used as-is (no optimization applied)

## Display Behavior

### Visual Presentation
- Full-width within content area (max 840px on desktop)
- Rounded corners (8px border-radius)
- Positioned between page header and content
- Overflow hidden for clean edges

### Performance Optimization
- **Eager loading:** `loading="eager"`
- **High priority:** `fetchpriority="high"`
- **Sync decoding:** `decoding="sync"`
- **Responsive srcset:** Automatically generated for multiple screen sizes
- **Optimized for LCP:** Cover images load immediately for better Core Web Vitals

### Responsive Behavior
```html
sizes="(max-width: 768px) 100vw, 840px"
```
- Mobile: Full viewport width
- Desktop: Constrained to content width (840px)

## Technical Details

### URL Handling

The `cdnUrl()` helper function handles all URL formats:
- **CDN URLs** (`https://cdn.significa.co/...`) → Adds optimization parameters
- **External URLs** → Used as-is without modification
- **Relative paths** (legacy) → Prepends CDN hostname

### CDN Integration

Cover images leverage the existing CDN infrastructure:
- Served from `https://cdn.significa.co`
- Automatic srcset generation via `cdnSrcset()` (CDN URLs only)
- Quality optimization via `cdnUrl()` with width and quality parameters
- Format auto-negotiation (WebP/AVIF based on browser support)
- External URLs bypass srcset generation (used directly)

### Build-Time Validation

- Schema validates `coverImage` is a string (if provided)
- Invalid paths don't break the build (handled gracefully at runtime)
- Missing images won't cause build failures
- Type-safe with TypeScript strict mode

## Examples

### With Cover Image
```yaml
---
title: Code of Ethics
description: Our ethical guidelines and principles.
date: 2024-01-15
coverImage: https://cdn.significa.co/handbook/code-of-ethics-cover.jpg
group: knowing-significa
order: 1
---
```

### External URL Example
```yaml
---
title: Design Principles
description: How we approach design.
date: 2024-01-20
coverImage: https://images.unsplash.com/photo-1234567890
group: design
order: 1
---
```

### Without Cover Image
```yaml
---
title: Manifesto
description: What we believe in.
date: 2024-01-10
group: knowing-significa
order: 2
---
```

Both work perfectly fine. The cover image is completely optional.

## Testing

**Validation:**
- ✅ `pnpm check` - 0 errors, 0 warnings
- ✅ `pnpm build` - 26 pages built successfully
- ✅ Types generated correctly
- ✅ Cover image displays on Code of Ethics page

**Test URLs:**
- Index: http://localhost:4322/handbook
- With cover: http://localhost:4322/handbook/mission-and-values/code-of-ethics
- Without cover: http://localhost:4322/handbook/manifesto

## Usage Recommendations

### When to Use Cover Images

✅ **Good use cases:**
- Visual context for the content (e.g., team photo for culture page)
- Setting the tone (e.g., ethics imagery for Code of Ethics)
- Breaking up long handbook sections
- Creating visual distinction between major sections

❌ **Avoid:**
- Adding images just because you can
- Using low-quality or irrelevant images
- Heavy file sizes (optimize first!)
- Images that don't add value to the content

### Best Practices

1. **Keep it relevant** - Cover should relate to page content
2. **Optimize first** - Upload optimized images (CDN will optimize further)
3. **Consistent aspect ratio** - Use 16:9 or 2:1 across handbook
4. **Accessible imagery** - Choose clear, professional images
5. **Optional is OK** - Not every page needs a cover image

## Architecture Notes

### Why Not Use MediaImage Component?

Cover images are rendered directly (not through `MediaImage`) for several reasons:
- **Performance:** Direct rendering with eager loading for LCP optimization
- **Simplicity:** No need for width/height/alt props in frontmatter
- **Decorative:** Cover images are decorative (no alt text needed)
- **Consistency:** Handbook pages have consistent layout constraints

### CDN Helper Functions Used

```typescript
cdnUrl(src, { width: 1200, quality: DEFAULT_QUALITY })
cdnSrcset(src, { quality: DEFAULT_QUALITY })
```

These generate optimized URLs and responsive srcsets automatically.

## Future Enhancements (Optional)

If needed in the future, you could add:
- Different aspect ratios per page
- Image captions for covers
- Parallax or zoom effects
- Dark mode variants
- Focal point control

But the current implementation is intentionally minimal and focused on core use cases.

## Summary

Cover images are now fully supported on all handbook pages:
- ✅ Optional field in schema
- ✅ Automatic CDN optimization
- ✅ Performance-optimized rendering
- ✅ Responsive and accessible
- ✅ Fully documented
✅ **Example implementation included**

Just add `coverImage: https://cdn.significa.co/handbook/your-image.jpg` (or any public URL) to any handbook page frontmatter and it works!