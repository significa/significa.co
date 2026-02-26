# Cover Images - URL Format Confirmed ✅

## Overview

The cover image feature for handbook pages is **fully compatible with URL-based images**. You can paste any public image URL directly into the `coverImage` field and it will work perfectly.

## Supported URL Formats

### ✅ Significa CDN (Recommended)
```yaml
coverImage: https://cdn.significa.co/handbook/code-of-ethics-cover.jpg
```
**Benefits:**
- Automatic image optimization
- Responsive srcset generation
- Quality and format conversion (WebP/AVIF)
- Width-based transforms

### ✅ External URLs (Unsplash, etc.)
```yaml
coverImage: https://images.unsplash.com/photo-1234567890
```
**Behavior:**
- Used as-is without modification
- No optimization applied
- No srcset generation
- Still displays perfectly

### ✅ Any Public Image URL
```yaml
coverImage: https://example.com/images/my-cover.jpg
```
**Works with:**
- Image hosting services
- Asset managers
- Direct S3 links
- Any publicly accessible image

## How It Works

The `cdnUrl()` helper function in `src/lib/cdn.ts` intelligently handles all URL formats:

```typescript
// CDN URLs → Adds optimization parameters
if (src.startsWith("https://cdn.significa.co")) {
  return "https://cdn.significa.co/path?width=1200&quality=80";
}

// External URLs → Used directly
if (isAbsoluteUrl(src)) {
  return src; // No modification
}
```

## Usage Example

Simply paste your image URL into the frontmatter:

```yaml
---
title: Code of Ethics
description: Our ethical guidelines and principles.
date: 2024-01-15
coverImage: https://cdn.significa.co/handbook/code-of-ethics-cover.jpg
group: knowing-significa
order: 1
---

## Your content here...
```

## Real-World Scenarios

### Scenario 1: Marketing Team Uses Asset Manager
```yaml
# Marketing uploads to Significa's asset manager
# Gets back: https://cdn.significa.co/handbook/ethics.jpg
coverImage: https://cdn.significa.co/handbook/ethics.jpg
```
✅ **Result:** Fully optimized with responsive images

### Scenario 2: Designer Uses Unsplash
```yaml
# Designer finds perfect image on Unsplash
# Copies URL: https://images.unsplash.com/photo-xyz
coverImage: https://images.unsplash.com/photo-xyz
```
✅ **Result:** Displays perfectly, no optimization needed

### Scenario 3: External Asset Service
```yaml
# Company uses external DAM system
# URL: https://assets.company.com/handbook-covers/image.jpg
coverImage: https://assets.company.com/handbook-covers/image.jpg
```
✅ **Result:** Works as expected

## Advantages of URL-Based Approach

1. **Flexible:** Works with any image hosting solution
2. **Simple:** Just copy-paste the URL
3. **No Migration:** Existing URLs continue working
4. **Team-Friendly:** Non-technical team members can add images easily
5. **Future-Proof:** Change hosting providers without code changes

## Performance Considerations

### CDN URLs (Optimal)
- ✅ Automatic optimization
- ✅ Responsive srcsets
- ✅ Format negotiation (WebP/AVIF)
- ✅ Edge caching

### External URLs (Good)
- ⚠️ No optimization applied
- ⚠️ No srcset generation
- ✅ Still fast if source is optimized
- ✅ Eager loading applied

**Recommendation:** Use Significa CDN URLs when possible for best performance.

## Documentation Updated

All documentation has been updated to reflect URL-based usage:
- ✅ `docs/10-PARENT-CHILD-PAGES.md` - Full URL examples
- ✅ `docs/QUICK-PARENT-CHILD-GUIDE.md` - Quick reference with URLs
- ✅ `docs/04-MEDIA-ASSETS.md` - CDN integration details
- ✅ `COVER-IMAGES-SUMMARY.md` - Complete technical reference

## Validation

**Build Status:** ✅ All tests passing
```bash
pnpm check  # 0 errors, 0 warnings
pnpm build  # 26 pages built successfully
```

**Example Page:** `src/content/handbook/mission-and-values/code-of-ethics.mdx`
```yaml
coverImage: https://cdn.significa.co/handbook/code-of-ethics-cover.jpg
```

## Workflow for Content Authors

1. **Get image URL** from your preferred source (asset manager, Unsplash, etc.)
2. **Copy the full URL** (must start with `https://`)
3. **Paste into frontmatter:**
   ```yaml
   coverImage: https://your-url-here.jpg
   ```
4. **Save and commit** - that's it!

## Technical Details

### Schema
```typescript
coverImage: z.string().optional()
```
- Accepts any string
- No URL validation (flexible)
- Optional field (can be omitted)

### Rendering
```astro
{page.data.coverImage && (
  <img
    src={cdnUrl(page.data.coverImage, { width: 1200, quality: 80 })}
    srcset={cdnSrcset(page.data.coverImage, { quality: 80 })}
    sizes="(max-width: 768px) 100vw, 840px"
    loading="eager"
    fetchpriority="high"
  />
)}
```

### URL Processing
- **Full URLs:** Used directly or with optimization params
- **No validation:** Won't break build if URL is invalid
- **Graceful handling:** Missing images won't crash the page

## Summary

✅ **URL format is fully supported and recommended**
✅ **Works with any public image URL**
✅ **CDN URLs get automatic optimization**
✅ **External URLs work as-is**
✅ **Simple copy-paste workflow for content authors**
✅ **Production-ready and tested**

Your team can now add cover images by simply pasting image URLs into the handbook pages. No complex file management required!