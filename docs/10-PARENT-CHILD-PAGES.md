# Parent-Child Page Structure

This document explains how to create hierarchical page relationships in the handbook and pages collections.

---

## How It Works

The parent-child structure is based on **file system hierarchy**. No frontmatter field is needed — the directory structure determines the relationship.

### File System Rules

```
src/content/handbook/
├── mission-and-values.mdx              → /handbook/mission-and-values (parent)
└── mission-and-values/
    ├── code-of-ethics.mdx              → /handbook/mission-and-values/code-of-ethics (child)
    └── diversity-and-inclusion.mdx     → /handbook/mission-and-values/diversity-and-inclusion (child)
```

**Key principle:** A page's ID is its file path (without extension). Children have IDs that start with their parent's ID + `/`.

- Parent page: `mission-and-values` (from `mission-and-values.mdx`)
- Child page: `mission-and-values/code-of-ethics` (from `mission-and-values/code-of-ethics.mdx`)

---

## Creating a Parent-Child Relationship

### Step 1: Create the Parent Page

Create a top-level `.mdx` file:

```mdx
---
title: Mission and Values
description: Our mission and the core values that guide everything we do.
date: 2024-09-06
group: knowing-significa
order: 3
---

## Content of the parent page...
```

This becomes `/handbook/mission-and-values`.

### Step 2: Create a Directory for Children

Create a directory with the **exact same name** as the parent file (without extension):

```bash
mkdir src/content/handbook/mission-and-values
```

### Step 3: Add Child Pages

Create `.mdx` files inside the directory:

```mdx
---
title: Code of Ethics
description: Our ethical guidelines and principles.
date: 2024-01-15
coverImage: https://cdn.significa.co/handbook/code-of-ethics-cover.jpg
group: knowing-significa
order: 1
---

## Content of the child page...
```

This becomes `/handbook/mission-and-values/code-of-ethics`.

---

## Helper Functions

These functions in `src/lib/collections.ts` handle parent-child relationships:

### `getHandbookChildren(parentId: string)`

Returns all direct children of a parent page.

```ts
const children = await getHandbookChildren("mission-and-values");
// Returns: [code-of-ethics, diversity-and-inclusion]
```

### `getHandbookParent(entry: HandbookEntry)`

Returns the parent page of a child, or `null` for top-level pages.

```ts
const parent = await getHandbookParent(codeOfEthicsEntry);
// Returns: mission-and-values entry
```

### `getHandbookBreadcrumbs(entry: HandbookEntry)`

Returns the full breadcrumb trail from root to the current page (exclusive).

```ts
const breadcrumbs = await getHandbookBreadcrumbs(codeOfEthicsEntry);
// Returns: [mission-and-values]
```

### `getHandbookIndex()`

Returns the full grouped structure with children attached. Used by the index page.

```ts
const groups = await getHandbookIndex();
// Returns: [
//   {
//     group: { id: "knowing-significa", data: { title: "Knowing Significa" } },
//     pages: [
//       {
//         page: mission-and-values,
//         children: [code-of-ethics, diversity-and-inclusion]
//       }
//     ]
//   }
// ]
```

---

## UI Behavior

### Index Page (`/handbook`)

- Shows top-level pages grouped by `group`
- If a parent has children, they appear indented below it
- Clicking a parent or child navigates to that page

### Detail Page (`/handbook/[...slug]`)

**Parent pages:**
- Show their content
- Display an "In this section" box listing all children at the bottom

**Child pages:**
- Show breadcrumbs at the top (Handbook › Parent › Child)
- Show their content
- If they have children, display "In this section" box

**Sidebar navigation:**
- Shows full hierarchy with collapsible sections
- Children only visible when parent is active or current
- Active page highlighted in primary color

---

## Nesting Depth

The system supports **unlimited nesting depth**:

```
how-we-build-software.mdx                          (parent)
how-we-build-software/
  front-end-development.mdx                        (child of how-we-build-software)
  front-end-development/
    react-best-practices.mdx                       (child of front-end-development)
    react-best-practices/
      hooks-and-state-management.mdx               (child of react-best-practices)
```

However, **2-3 levels maximum is recommended** for usability. Deeper nesting becomes hard to navigate.

---

## Build-Time Validation

The system validates relationships at build time:

1. **No orphaned directories** — If `mission-and-values/` exists, `mission-and-values.mdx` must exist as the parent.
2. **No ID collisions** — File names must be unique within their directory level.
3. **Group references** — All pages must reference a valid `handbook-groups` entry (validated via `reference()`).

If validation fails, **the build breaks**. This prevents broken links in production.

---

## Common Patterns

### Creating a Section with Multiple Children

```
culture.mdx                      → /handbook/culture
culture/
  diversity.mdx                  → /handbook/culture/diversity
  remote-work.mdx                → /handbook/culture/remote-work
  team-rituals.mdx               → /handbook/culture/team-rituals
```

### Standalone Pages (No Children)

Just create the `.mdx` file without a matching directory:

```
changelog.mdx                    → /handbook/changelog (no children)
```

### Adding Children to an Existing Page

1. Create the directory: `mkdir src/content/handbook/existing-page`
2. Add child files inside the directory
3. The parent page automatically displays them in "In this section"

---

## Frontmatter Reference

All pages use the same schema, whether parent or child:

```yaml
title: string                    # Required. Page title
description: string              # Optional. Short description
date: Date                       # Required. Last updated date (YYYY-MM-DD)
coverImage: string               # Optional. Cover image (full URL)
group: reference("handbook-groups")  # Required. Which group it belongs to
order: number                    # Optional. Sort order within group (default: 0)
seo:                             # Optional. SEO overrides
  metaTitle: string
  metaDescription: string
  ogImage: string
```

**Note:** There is no `parent` field. The relationship is determined by file location.

---

## Extending to Other Collections

This pattern can be applied to any collection. For example, if you wanted parent-child pages in the `pages` collection:

1. Update `content.config.ts` to allow nested file structure
2. Create helper functions similar to `getHandbookChildren()` in `src/lib/collections.ts`
3. Update `src/pages/[...slug].astro` to handle children
4. Add UI for displaying child pages

The handbook implementation can serve as a reference.

---

## Examples

### Example 1: Mission and Values → Code of Ethics

**Parent:** `src/content/handbook/mission-and-values.mdx`
- URL: `/handbook/mission-and-values`
- Group: `knowing-significa`

**Child:** `src/content/handbook/mission-and-values/code-of-ethics.mdx`
- URL: `/handbook/mission-and-values/code-of-ethics`
- Group: `knowing-significa` (must match parent's group)

### Example 2: How We Build Software → Front-End Development

**Parent:** `src/content/handbook/how-we-build-software.mdx`
- URL: `/handbook/how-we-build-software`
- Group: `engineering`

**Child:** `src/content/handbook/how-we-build-software/front-end-development.mdx`
- URL: `/handbook/how-we-build-software/front-end-development`
- Group: `engineering` (must match parent's group)

---

## Gotchas

1. **Directory name must match file name exactly** (case-sensitive, including hyphens)
   - ✅ `mission-and-values.mdx` + `mission-and-values/`
   - ❌ `mission-and-values.mdx` + `mission_and_values/`

2. **Children must belong to the same group as their parent** — Otherwise they won't appear correctly in the navigation.

3. **The `.draft` suffix works for parent and child pages** — `mission-and-values.draft.mdx` or `code-of-ethics.draft.mdx` are excluded in production.

4. **Changing a parent's filename breaks children's URLs** — Renaming `mission-and-values.mdx` to `values.mdx` requires renaming the directory and all child IDs.

5. **Cover images are served from CDN** — Use paths like `/handbook/my-image.jpg` which resolve to `https://cdn.significa.co/handbook/my-image.jpg`. The system automatically generates responsive srcsets.

---

## Cover Images

You can add an optional cover image to any handbook page (parent or child).

### Adding a Cover Image

Add the `coverImage` field to your frontmatter with a full URL:

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

### URL Format

The `coverImage` field accepts **full URLs**. You can use:

- **CDN URLs:** `https://cdn.significa.co/handbook/my-image.jpg`
- **External URLs:** `https://images.unsplash.com/photo-xyz`
- **Any public image URL**

The system handles all URL formats correctly:
- CDN URLs get automatic optimization parameters
- External URLs are used as-is
- No need to worry about paths vs URLs

### Image Guidelines

- **URL format:** Full URL (e.g., `https://cdn.significa.co/handbook/my-image.jpg`)
- **Recommended dimensions:** 1200×630px or larger (16:9 or 2:1 aspect ratio)
- **File format:** JPEG for photos, PNG for graphics with transparency
- **File size:** Optimize before uploading (CDN images will be further optimized)
- **Alt text:** Cover images are decorative, so no alt text is added

### Display Behavior

- Cover image appears between the page header and content
- Full-width within the content area (max 840px on desktop)
- Rounded corners (8px border-radius)
- Responsive srcset generated automatically
- Loaded eagerly with high priority (optimized for LCP)

### Example

**Code of Ethics page** with cover:
```
/handbook/mission-and-values/code-of-ethics
```

The cover image displays prominently at the top, setting the visual tone for the ethical guidelines content.

### URL Examples

```yaml
# Significa CDN (recommended)
coverImage: https://cdn.significa.co/handbook/ethics-cover.jpg

# External service
coverImage: https://images.unsplash.com/photo-1234567890

# Any public URL
coverImage: https://example.com/images/cover.jpg
```

---

## Summary

- **Parent-child relationships are defined by file structure**, not frontmatter.
- **Create a directory matching the parent filename** to add children.
- **Helper functions in `src/lib/collections.ts`** handle queries and navigation.
- **The handbook implementation** is the reference for this pattern.
- **Build-time validation** ensures no broken relationships make it to production.

This approach keeps content management simple: just move files around. No need to update IDs or references manually.