# Parent-Child Page Structure - Implementation Summary

## What Was Done

I've implemented and tested a parent-child page structure for the handbook collection, plus added support for optional cover images on all handbook pages.

**Example created:**
- Parent: `/handbook/mission-and-values`
- Child: `/handbook/mission-and-values/code-of-ethics` (with cover image)

## How It Works

### File System Based Hierarchy

The relationship between parent and child pages is determined by **file location**, not frontmatter fields.

```
src/content/handbook/
├── mission-and-values.mdx              → Parent page
└── mission-and-values/                 → Directory for children
    └── code-of-ethics.mdx              → Child page
```

**Key Rules:**
1. Parent page: `mission-and-values.mdx`
2. Directory for children: `mission-and-values/` (exact same name)
3. Child pages: Any `.mdx` files inside that directory

### URLs Generated

- Parent: `https://significa.co/handbook/mission-and-values`
- Child: `https://significa.co/handbook/mission-and-values/code-of-ethics`

## Files Created

### 1. Child Page Content
**Location:** `src/content/handbook/mission-and-values/code-of-ethics.mdx`

Contains frontmatter and content for the Code of Ethics page. Uses the same schema as any handbook page:
- `title`, `description`, `date`, `group`, `order`
- `coverImage` (optional) - demonstrates the new cover image feature
- No special "parent" field needed

### 2. Updated Schema
**Location:** `src/content.config.ts`

Added optional `coverImage` field to the handbook collection schema:
- Accepts CDN paths (e.g., `/handbook/my-image.jpg`)
- Validated at build time
- Fully integrated with existing CDN infrastructure

### 3. Updated Detail Page
**Location:** `src/pages/handbook/[...slug].astro`

Enhanced to display cover images:
- Imports CDN helpers for image optimization
- Conditionally renders cover between header and content
- Responsive srcset generation
- Eager loading with high priority for LCP optimization

### 4. Documentation
**Location:** `docs/10-PARENT-CHILD-PAGES.md`

Complete guide covering:
- How the file system hierarchy works
- Helper functions available
- UI behavior (index, detail pages, navigation)
- Cover image usage and guidelines
- Common patterns and examples
- Gotchas and validation rules

## UI Features Already Working

The handbook pages already had full support for this pattern:

### Index Page (`/handbook`)
- Groups pages by category
- Shows parent pages with their children indented
- Visual hierarchy with borders and spacing

### Detail Pages (`/handbook/[...slug]`)
- **Cover image** displayed at top when `coverImage` field is present (optional)
- **Breadcrumbs** for child pages (e.g., "Handbook › Mission and Values › Code of Ethics")
- **Sidebar navigation** showing full hierarchy
- **"In this section" box** at bottom of parent pages listing all children
- Collapsible navigation that expands when viewing parent or child

## Helper Functions Available

Located in `src/lib/collections.ts`:

```ts
// Get all direct children of a parent
await getHandbookChildren("mission-and-values")

// Get the parent of a child page
await getHandbookParent(entry)

// Get breadcrumb trail
await getHandbookBreadcrumbs(entry)

// Get full grouped index structure
await getHandbookIndex()
```

## Build Validation

The system validates at build time:
- ✅ All references are valid
- ✅ No orphaned directories
- ✅ No broken links
- ✅ Build fails if structure is invalid

**Test results:**
- `pnpm check` → 0 errors, 0 warnings
- `pnpm build` → 26 pages built successfully
- Cover image integration validated

## Creating More Parent-Child Relationships

### Step-by-Step Process

1. **Create or identify the parent page:**
   ```bash
   # Parent already exists or create it:
   touch src/content/handbook/parent-name.mdx
   ```

2. **Create directory for children:**
   ```bash
   mkdir src/content/handbook/parent-name
   ```

3. **Add child pages:**
   ```bash
   touch src/content/handbook/parent-name/child-1.mdx
   touch src/content/handbook/parent-name/child-2.mdx
   ```

4. **Write frontmatter (same schema for all):**
   ```yaml
   ---
   title: Child Page Title
   description: Short description
   date: 2024-01-15
   coverImage: /handbook/my-cover.jpg  # Optional
   group: knowing-significa  # Must match parent's group
   order: 1
   ---
   ```

5. **Test:**
   ```bash
   pnpm check  # Validates content
   pnpm build  # Ensures routes are generated
   ```

## Nesting Depth

The system supports unlimited nesting:
```
parent.mdx
parent/
  child.mdx
  child/
    grandchild.mdx
    grandchild/
      great-grandchild.mdx
```

**Recommendation:** Keep it to 2-3 levels maximum for usability.

## Extending to Other Collections

This pattern can be applied to the `pages` collection if needed. You would:

1. The file loader already supports nested structures (no changes needed in `content.config.ts`)
2. Create similar helper functions in `src/lib/collections.ts`
3. Update `src/pages/[...slug].astro` to display children
4. Use the handbook implementation as a reference

## Cover Images

You can add an optional cover image to any handbook page (parent or child).

### Usage

Add the `coverImage` field to frontmatter:
```yaml
---
title: Your Page Title
coverImage: /handbook/your-image.jpg
# ... other fields
---
```

### Guidelines

- **Path format:** CDN paths like `/handbook/image-name.jpg`
- **Dimensions:** 1200×630px or larger recommended (16:9 or 2:1 ratio)
- **Format:** JPEG for photos, PNG for graphics
- **Optimization:** Automatic srcset generation and responsive sizing
- **Loading:** Eager loading with high fetchpriority for optimal LCP
- **Display:** Full-width within content area, 8px border-radius

### CDN Integration

Cover images use the existing CDN infrastructure:
- Served from `https://cdn.significa.co`
- Automatic quality optimization
- Responsive srcsets for multiple screen sizes
- No additional configuration needed

## Important Notes

- **Directory name must match filename exactly** (case-sensitive)
- **Children should use same group as parent** for correct navigation
- **Drafts work at any level** (`.draft.mdx` suffix)
- **Renaming a parent requires renaming its directory** to maintain relationships
- **No frontmatter changes needed for hierarchy** — it's all file system based
- **Cover images are optional** — omit the field if not needed

## Testing Your Setup

Visit these URLs to see it working:

1. **Index:** http://localhost:4322/handbook
   - See "Mission and Values" with "Code of Ethics" nested below

2. **Parent:** http://localhost:4322/handbook/mission-and-values
   - See "In this section" box listing child pages

3. **Child:** http://localhost:4322/handbook/mission-and-values/code-of-ethics
   - See cover image at top
   - See breadcrumbs
   - See sidebar showing hierarchy

## Next Steps

You can now create any parent-child structure you need:

- Company policies → specific policy documents
- Engineering practices → technology-specific guides  
- Design system → component documentation
- Any hierarchical content structure

Just follow the file system pattern and add cover images where they enhance the content.

## Summary of Changes

### Schema Changes
- Added `coverImage?: string` field to handbook collection

### UI Changes  
- Cover images display between header and content
- Responsive with automatic srcset generation
- Optimized for performance (eager loading, high priority)

### Documentation Added
- Complete cover image guidelines in `docs/10-PARENT-CHILD-PAGES.md`
- Quick reference in `docs/QUICK-PARENT-CHILD-GUIDE.md`
- Implementation summary in this file

## Questions?

Refer to `docs/10-PARENT-CHILD-PAGES.md` for detailed documentation, examples, and troubleshooting.