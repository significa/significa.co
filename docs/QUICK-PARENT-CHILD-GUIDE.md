# Quick Guide: Creating Parent-Child Pages

This is a quick reference for creating hierarchical page structures in the handbook.

## 5-Minute Setup

### 1. Create Parent Page (if it doesn't exist)

```bash
# Example: Creating "Culture" parent page
touch src/content/handbook/culture.mdx
```

**Content:**
```yaml
---
title: Culture
description: How we work and what we value
date: 2024-01-15
group: knowing-significa
order: 1
---

## Your content here...
```

### 2. Create Directory for Children

```bash
# Directory name MUST match the parent filename exactly
mkdir src/content/handbook/culture
```

### 3. Add Child Pages

```bash
# Create as many children as needed
touch src/content/handbook/culture/remote-work.mdx
touch src/content/handbook/culture/diversity.mdx
touch src/content/handbook/culture/team-rituals.mdx
```

**Child content example:**
```yaml
---
title: Remote Work Policy
description: Guidelines for working remotely
date: 2024-01-15
coverImage: https://cdn.significa.co/handbook/remote-work-cover.jpg  # Optional
group: knowing-significa  # Must match parent's group
order: 1
---

## Your content here...
```

### 4. Verify

```bash
pnpm check  # Validates structure
pnpm build  # Generates routes
```

## Result

- Parent: `https://significa.co/handbook/culture`
- Child 1: `https://significa.co/handbook/culture/remote-work`
- Child 2: `https://significa.co/handbook/culture/diversity`
- Child 3: `https://significa.co/handbook/culture/team-rituals`

## What You Get Automatically

✅ **Index page** shows parent with children nested below  
✅ **Parent page** displays "In this section" box with all children  
✅ **Child pages** show breadcrumbs (Handbook › Parent › Child)  
✅ **Sidebar navigation** displays full hierarchy  
✅ **Cover images** display at the top when provided (optional)  
✅ **Build-time validation** prevents broken links  

## Real Example from This Repo

```
src/content/handbook/
├── mission-and-values.mdx              → /handbook/mission-and-values
└── mission-and-values/
    └── code-of-ethics.mdx              → /handbook/mission-and-values/code-of-ethics
```

Visit:
- http://localhost:4322/handbook (see hierarchy)
- http://localhost:4322/handbook/mission-and-values (parent)
- http://localhost:4322/handbook/mission-and-values/code-of-ethics (child)

## Rules to Remember

1. **Directory name = parent filename** (without .mdx)
2. **Children must use same group** as their parent
3. **No special frontmatter needed** - structure is file-based
4. **Drafts work at any level** - use `.draft.mdx` suffix

## Common Mistakes

❌ `mission-and-values.mdx` + `mission_and_values/` directory  
✅ `mission-and-values.mdx` + `mission-and-values/` directory

❌ Child has different `group` than parent  
✅ Child has same `group` as parent

❌ Creating directory without parent file  
✅ Parent file exists first, then create directory

## Cover Images (Optional)

Add a cover image to any page by including the `coverImage` field with a full URL:

```yaml
---
title: Your Page Title
coverImage: https://cdn.significa.co/handbook/your-image.jpg
# ... other fields
---
```

**Supported URL formats:**
- **CDN URLs:** `https://cdn.significa.co/handbook/image.jpg` (recommended)
- **External URLs:** `https://images.unsplash.com/photo-xyz`
- **Any public image URL**

**Image guidelines:**
- Use full URLs (not relative paths)
- Recommended size: 1200×630px or larger
- Format: JPEG or PNG
- Will be automatically optimized (for CDN URLs)

## Need More Info?

See `docs/10-PARENT-CHILD-PAGES.md` for complete documentation.