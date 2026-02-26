# Blog Index Page Documentation

This document explains the structure, features, and implementation of the blog index page at `/blog`.

---

## Overview

The blog index page serves as the main entry point for all blog content. It features:

- **Hero section** with headline and description
- **Featured post** (most recent) with large visual treatment
- **Tag filtering** (client-side JavaScript enhancement)
- **Blog grid** with card-based layout
- **Newsletter CTA** for engagement

---

## Page Structure

### 1. Blog Header

```astro
<section class="blog-header">
  <h1>We think things through.</h1>
  <p>Insights on design, development, and building products...</p>
</section>
```

**Purpose:**
- Sets the tone and context
- Clearly communicates what the blog is about
- Simple, centered layout

**Styling:**
- Large heading (--text-4xl)
- Centered text
- Generous padding (8rem top)
- Neutral background

---

### 2. Featured Post

The most recent blog post gets special treatment:

**Features:**
- Large two-column layout (image + content)
- "Featured" label badge
- Date and reading time
- Full description
- Tag badges
- Hover effects

**Layout:**
- Desktop: 1fr 1fr grid (50/50 split)
- Tablet/Mobile: Stacks vertically
- Image on left, content on right (desktop)

**Visual treatment:**
- Larger font sizes
- Border on hover
- Image zoom on hover
- Clear hierarchy

---

### 3. Tag Filter

Client-side filtering system for blog posts:

**Features:**
- "All" button (default active)
- Individual tag buttons
- Active state styling
- Smooth fade-in animation when filtering

**How it works:**
1. Extract all unique tags from posts
2. Render as buttons
3. JavaScript listens for clicks
4. Filters cards by matching `data-tags` attribute
5. Animates filtered results

**Implementation:**
```javascript
// Cards have data-tags attribute
<article data-tags='["design","guide"]'>

// Filter on button click
if (selectedTag === "all" || cardTags.includes(selectedTag)) {
  card.style.display = "";
} else {
  card.style.display = "none";
}
```

---

### 4. Blog Grid

Card-based layout for all non-featured posts:

**Features:**
- Responsive grid (auto-fill, minmax 320px)
- Thumbnail image (600x400px)
- Date and reading time
- Title and description
- Tag badges
- Hover effects

**Card anatomy:**
```
┌─────────────────┐
│                 │
│     Image       │
│                 │
├─────────────────┤
│ Date • 5 min    │
│                 │
│ Post Title      │
│                 │
│ Description...  │
│                 │
│ [tag] [tag]     │
└─────────────────┘
```

**Behavior:**
- Border color change on hover
- Image scales 1.05x on hover
- Entire card is clickable
- Smooth transitions

---

### 5. Newsletter CTA

Bottom section encouraging engagement:

**Features:**
- Centered layout
- Clear headline and description
- Primary CTA button
- Alternative background color

**Can be customized to:**
- Link to newsletter signup
- Link to RSS feed
- Link to contact form
- Any engagement action

---

## Data Processing

### Post Fetching

```astro
const allPosts = await getPosts(); // Sorted by date desc
const featuredPost = allPosts[0];   // Most recent
const recentPosts = allPosts.slice(1); // Rest
```

### Tag Extraction

```astro
const allTags = [
  ...new Set(allPosts.flatMap((post) => post.data.tags || []))
].sort();
```

**Result:** Unique, sorted array of all tags used across posts.

### Reading Time Calculation

```typescript
function calculateReadingTime(post): number {
  const wordCount = post.body?.split(/\s+/).length ?? 0;
  return wordCount > 0 ? Math.ceil(wordCount / 200) : 5;
}
```

**Formula:** Word count ÷ 200 words per minute (industry standard).

### Date Formatting

```typescript
function formatDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
```

**Output:** "January 22, 2026"

---

## JavaScript Functionality

### Tag Filtering

**Purpose:** Filter posts without page reload.

**How it works:**
1. Store tags in `data-tags` attribute as JSON
2. Button click updates active state
3. Parse each card's tags
4. Show/hide based on match
5. Animate appearance

**Progressive enhancement:**
- Works without JavaScript (all posts visible)
- Enhances experience when JS available
- Respects View Transitions API

**Code:**
```javascript
function initTagFilter() {
  const buttons = document.querySelectorAll(".tag-button");
  const cards = document.querySelectorAll(".blog-card");

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const selectedTag = button.dataset.tag;
      
      // Update active state
      buttons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");

      // Filter cards
      cards.forEach((card) => {
        const cardTags = JSON.parse(card.dataset.tags);
        
        if (selectedTag === "all" || cardTags.includes(selectedTag)) {
          card.style.display = "";
          card.style.animation = "fadeIn 0.3s ease-out";
        } else {
          card.style.display = "none";
        }
      });
    });
  });
}

// Run on load and after navigation
initTagFilter();
document.addEventListener("astro:after-swap", initTagFilter);
```

---

## Styling Details

### Layout Widths

- **Header/CTA:** `--max-width-narrow` (centered, readable)
- **Featured post:** `--max-width` (wider for visual impact)
- **Blog grid:** `--max-width` (wider for cards)

### Grid Behavior

```css
.blog-grid-inner {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 2rem;
}
```

**Result:**
- Desktop: 3 columns
- Tablet: 2 columns
- Mobile: 1 column
- Automatic, responsive

### Card Heights

Cards have flexible height:
- `.card-link { height: 100%; }` - Fill parent
- `.card-content { flex-grow: 1; }` - Expand content
- `.card-description { flex-grow: 1; }` - Push tags to bottom
- `.card-tags { margin-top: auto; }` - Stick to bottom

**Result:** Aligned cards even with varying content lengths.

### Color Usage

- **Surface:** Main background (white/dark)
- **Surface-alt:** Alternating sections, cards
- **Border:** Subtle borders on cards, tags
- **Text:** Primary content
- **Text-muted:** Secondary info (dates, descriptions)

All from design token system.

---

## Responsive Design

### Breakpoints

**Featured Post (968px):**
```css
@media (max-width: 968px) {
  .featured-link {
    grid-template-columns: 1fr; /* Stack vertically */
  }
  
  .featured-image {
    height: 300px; /* Fixed height for stacked layout */
  }
}
```

**Mobile (768px):**
```css
@media (max-width: 768px) {
  .blog-title {
    font-size: var(--text-3xl); /* Smaller heading */
  }
}
```

**Grid:**
- Auto-adjusts based on `minmax(320px, 1fr)`
- No explicit breakpoints needed
- Fluid, responsive by default

---

## SEO Optimization

### Page Metadata

```astro
<BaseLayout
  title="Blog — Significa"
  description="Thoughts on design, engineering, product strategy, and building digital products that work beautifully."
>
```

### Structured Content

- Semantic HTML (`<article>`, `<time>`, `<section>`)
- Proper heading hierarchy (H1 → H2)
- Alt text on all images
- Descriptive link text

### Internal Linking

- Each card links to full post
- Related posts visible in grid
- Tag-based organization
- Clear navigation

---

## Performance Considerations

### Image Loading

**Featured post:**
```astro
loading="eager"  // Above fold, load immediately
```

**Grid cards:**
```astro
loading="lazy"   // Below fold, lazy load
```

### CDN Usage

All images served via CDN with optimization:
```astro
src={cdnUrl(post.data.thumbnail, { width: 600, quality: 80 })}
```

**Benefits:**
- Automatic resizing
- Format optimization
- Caching
- Fast delivery

### JavaScript

- **Minimal:** ~40 lines for filtering
- **Progressive:** Works without JS
- **Efficient:** Event delegation, no loops
- **Cached:** Static, changes rarely

---

## Accessibility

### Keyboard Navigation

- All interactive elements focusable
- Clear focus states
- Logical tab order

### Screen Readers

- Semantic HTML throughout
- `<time>` elements with `datetime` attribute
- Alt text on all images
- Clear link purposes

### Color Contrast

- Text meets WCAG AA standards
- Sufficient contrast ratios
- No color-only indicators

---

## Content Requirements

### For Posts to Appear Correctly

**Required:**
- `title` - Display in cards
- `date` - Sorting and display

**Recommended:**
- `thumbnail` - Visual interest (600x400px minimum)
- `description` - Preview text
- `tags` - Categorization and filtering
- `author` - Attribution

**Optional:**
- `seo.*` - Override defaults

### Missing Content Handling

**No thumbnail:**
- Card still displays with placeholder background
- Content fills available space
- No broken image

**No description:**
- Card shows title and meta only
- Still looks complete

**No tags:**
- No tag badges shown
- Card still functional

---

## Customization Guide

### Change Featured Post Logic

Currently shows most recent. To change:

```astro
// Example: Feature specific post
const featuredPost = allPosts.find(p => p.data.featured);

// Example: Feature random post
const featuredPost = allPosts[Math.floor(Math.random() * allPosts.length)];
```

### Add More Filters

Beyond tags, you could add:

```astro
// Author filter
const authors = [...new Set(allPosts.map(p => p.data.author))];

// Year filter
const years = [...new Set(allPosts.map(p => p.data.date.getFullYear()))];

// Category filter (if you add categories)
const categories = [...new Set(allPosts.flatMap(p => p.data.categories))];
```

### Modify Card Layout

Change grid columns:

```css
/* 4 columns on large screens */
grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));

/* 2 columns max */
grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
```

### Add Pagination

For many posts:

```astro
const POSTS_PER_PAGE = 12;
const page = Number(Astro.url.searchParams.get('page')) || 1;
const paginatedPosts = recentPosts.slice(
  (page - 1) * POSTS_PER_PAGE,
  page * POSTS_PER_PAGE
);
```

---

## Best Practices

### Image Specifications

**Featured post:**
- Size: 1200x675px (16:9)
- Format: JPG
- Quality: 85%
- Loading: eager

**Grid cards:**
- Size: 600x400px (3:2)
- Format: JPG
- Quality: 80%
- Loading: lazy

### Tag Naming

- **lowercase** - "design" not "Design"
- **hyphenated** - "case-study" not "case study"
- **specific** - "ui-design" not just "design"
- **consistent** - Use same tags across posts

### Writing Card Content

**Titles:**
- 50-70 characters ideal
- Front-load important words
- No clickbait

**Descriptions:**
- 100-150 characters
- Complete sentence
- Entice without spoiling

---

## Analytics Recommendations

Track these events:

1. **Featured post clicks** - Measure effectiveness
2. **Tag filter usage** - Which topics are popular
3. **Card clicks** - Which posts get attention
4. **Scroll depth** - How far users browse
5. **Newsletter CTA clicks** - Conversion rate

---

## Future Enhancements

Consider adding:

1. **Search functionality** - Full-text search
2. **Load more button** - Instead of pagination
3. **Related posts** - "You might also like..."
4. **Author pages** - Filter by author
5. **RSS feed** - Already exists at `/blog/rss.xml`
6. **Reading progress** - Show how much user has read
7. **Share buttons** - Social sharing
8. **Bookmarking** - Save for later
9. **Comments** - Discussion system
10. **View count** - Popular posts indicator

---

## Troubleshooting

### Tags not filtering

Check:
1. Posts have `tags` in frontmatter
2. JavaScript is enabled
3. `data-tags` attribute is valid JSON
4. Console for errors

### Cards have different heights

Ensure:
1. `.card-link { height: 100%; }`
2. `.card-description { flex-grow: 1; }`
3. `.card-tags { margin-top: auto; }`

### Featured post not showing

Verify:
1. At least one post exists
2. Post has all required fields
3. Array is not empty: `allPosts.length > 0`

### Images not loading

Check:
1. CDN path is correct
2. Image exists at path
3. CDN service is running
4. No CORS issues

---

## Related Documentation

- **Blog post template:** `docs/10-BLOG-POST-TEMPLATE.md`
- **MDX components:** `docs/03-MDX-COMPONENTS.md`
- **Design tokens:** `docs/08-DESIGN-TOKENS.md`
- **SEO guidelines:** `docs/09-SEO-ACCESSIBILITY.md`

---

This blog index provides a modern, performant, and user-friendly way to discover and filter blog content while maintaining the design system and accessibility standards.