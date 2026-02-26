# Homepage Restructure Documentation

## Overview

The homepage has been completely restructured to align with the new content strategy outlined in Notion. The new structure provides a clearer narrative flow, better showcases services, and creates more engagement opportunities.

## Key Changes

### 1. New Hero Section
- **Before:** Long tagline with muted text and inline CTA
- **After:** Simple, bold statement: "We are a **design and development agency** building digital products that work beautifully."
- More concise and impactful first impression

### 2. Content Flow Reorganization

The new homepage follows this narrative structure:

1. **Hero** - Bold positioning statement
2. **Showreel** - Visual showcase (maintained from original)
3. **Strategy Statement** - "From strategy to code..." positioning
4. **Selected Highlights** - Dynamic content from highlights collection (replaces hardcoded featured projects)
5. **Service Pillars Intro** - Overview of Think/Design/Develop/Launch/Scale approach
6. **Service Pillars Detail** - Expandable descriptions of each pillar
7. **Team CTA** - "We are a team of designers, developers..."
8. **Blog Section** - "We think things through" with 3 recent posts
9. **Impact Section** - B Corp and sustainability messaging
10. **Playground Section** - Open source contributions
11. **Social Proof** - Customer testimonials and satisfaction stats
12. **Awards** - International recognition
13. **Final CTA** - "We are ready to grow your business"
14. **FAQs** - Common questions answered
15. **Client Logos** - Trust indicators

### 3. Dynamic Content via Highlights Collection

The homepage now uses the `highlights` collection instead of hardcoded featured projects:

```astro
const highlights = await getResolvedHighlights();
const featuredHighlights = highlights.slice(0, 3);
```

This allows the marketing team to:
- Control which content appears on the homepage via YAML files
- Mix projects, blog posts, and playground items
- Add custom labels to each highlight
- Manage order without touching code

### 4. Service Pillars

New comprehensive service section with 5 pillars:
- **Think** - Strategy and planning
- **Design** - UI/UX and design systems
- **Develop** - Engineering and code
- **Launch** - Deployment and handover
- **Scale** - Growth and optimization

Each pillar has a title and description, presented in a responsive grid.

### 5. New Sections Added

#### Impact Section
- Highlights B Corp certification
- 1% for the Planet membership
- Ethical and sustainable approach
- Links to `/impact` page

#### Playground Section
- Shows 3 recent open source projects
- Separate from blog content
- Links to `/playground` listing page

#### FAQs Section
- 5 common questions with answers
- Helps with SEO and reduces friction
- Can be easily expanded

#### Final CTA
- Clear call to action before footer
- Option to continue browsing or get in touch

### 6. Improved Blog Section

- Now labeled "We think things through"
- Shows 3 most recent posts (reduced from 4)
- Better card layout with thumbnails
- Includes post descriptions
- Date formatting improved

### 7. Awards Redesign

- Changed heading from "Ah, awards..." to "International recognition"
- Card-based layout instead of list
- Limited to 18 most recent awards
- Better visual hierarchy
- Shows award name, year, and project

### 8. Removed Sections

- **Industries list** - Removed hardcoded list
- **Capabilities list** - Removed hardcoded list
- **Team photo** - Removed from homepage (can be added to About page)
- **Recent articles highlights** - Replaced with dedicated blog section

### 9. CSS Improvements

All styles are scoped and follow design token conventions:

- Consistent spacing using `var(--gutter)`
- Responsive grid layouts with `auto-fit` and `minmax`
- Proper semantic HTML (`<section>`, `<article>`, `<h2>`, etc.)
- Hover states and transitions
- Mobile-first responsive design
- Accessible focus states

### 10. CTA Components

Three standardized CTA button styles:

- `.cta-link` - Inline text link with arrow
- `.cta-button` - Primary filled button
- `.cta-button-outline` - Secondary outlined button
- `.cta-button-large` - Hero-sized button

All with consistent hover effects (opacity + translateY).

## Technical Implementation

### Data Fetching

```astro
const clients = await getClients();
const testimonials = await getTestimonials();
const recentPosts = (await getPosts()).slice(0, 3);
const highlights = await getResolvedHighlights();
const awards = (await getAwards()).slice(0, 18);
const playgroundProjects = (await getPlayground()).slice(0, 3);
```

### Type Safety

The highlights section handles different collection types safely:

```typescript
// Get thumbnail based on collection type
let thumbnail: string | undefined;
if (highlight.collection === "projects") {
  thumbnail = (entry.data as any).thumbnail || (entry.data as any).heroImage;
} else {
  thumbnail = (entry.data as any).thumbnail;
}
```

Uses type assertions to access properties that exist on different schemas.

### SEO Improvements

- Updated page title: "Significa — Design and Development Agency"
- Improved meta description
- Better heading hierarchy
- Semantic HTML structure
- FAQ section for rich snippets potential

## Content Management

### To Feature Content on Homepage

1. Create a YAML file in `src/content/highlights/`
2. Reference a project, blog post, or playground item:

```yaml
label: "Featured Project"
source:
  collection: "projects"
  entry: "mishmash"
order: 1
```

3. Build validates references at compile time

### To Update Service Pillars

Edit the hardcoded content in `src/pages/index.astro` around line 138-184.

### To Update FAQs

Edit the hardcoded FAQ items in `src/pages/index.astro` around line 366-429.

## Next Steps / Recommendations

1. **Create missing pages** referenced by CTAs:
   - `/services` - Service details page
   - `/impact` - Impact and sustainability page
   - Consider `/work-with-us` improvements

2. **Add analytics** to track:
   - CTA click rates
   - Scroll depth
   - Section engagement
   - Showreel video plays

3. **Consider adding:**
   - Loading animations on scroll
   - Interactive service pillar expansion
   - More case study metrics
   - Video testimonials

4. **Content to prepare:**
   - Populate `highlights` collection YAML files
   - Add thumbnails to blog posts if missing
   - Add thumbnails to playground projects if missing
   - Review and update FAQ answers

5. **Performance optimizations:**
   - Add `loading="eager"` to above-fold images
   - Consider image format optimization (WebP/AVIF)
   - Implement lazy loading for awards section

## Migration Notes

### Breaking Changes
- Homepage structure completely changed
- Old sections removed (industries, capabilities lists)
- Featured projects now managed via highlights collection

### Backwards Compatibility
- All content collections unchanged
- Helper functions unchanged
- CDN utility unchanged
- Showreel JS functionality preserved

## Testing Checklist

- [ ] Check all internal links work
- [ ] Verify showreel video plays correctly
- [ ] Test responsive layouts on mobile/tablet
- [ ] Validate all images load correctly
- [ ] Ensure type checking passes (`pnpm check`)
- [ ] Test with and without highlights data
- [ ] Verify CTA buttons are clickable
- [ ] Check FAQs are readable and accurate
- [ ] Test accessibility (keyboard navigation, screen readers)
- [ ] Validate SEO meta tags

## Design Token Usage

All spacing, colors, and typography use the design token system:

- `var(--gutter)` - Horizontal padding
- `var(--max-width)` - Content max width
- `var(--max-width-narrow)` - Narrow content max width
- `var(--text-*)` - Font size scale
- `var(--weight-*)` - Font weight scale
- `var(--color-*)` - Color palette
- `var(--duration-*)` - Animation durations
- `var(--ease-out)` - Easing function

No magic numbers in the stylesheet!