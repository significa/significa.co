# Blog Post Template & Guidelines

This document explains the structure, content, and best practices for creating blog posts on the Significa website.

---

## Quick Start

1. Create a new `.mdx` or `.md` file in `src/content/blog/`
2. Use kebab-case for the filename: `designing-complex-products.mdx`
3. Copy the frontmatter template below
4. Write your content using MDX components
5. Add images via CDN (`https://cdn.significa.co/blog/...`)
6. Reference related projects using `relatedProjects` array

---

## Frontmatter Template

```yaml
---
title: Your Post Title Here
description: A compelling one-sentence summary that appears in previews and meta descriptions
date: 2026-01-22
author: Author Name
thumbnail: https://cdn.significa.co/blog/your-post/hero.jpg
tags:
  - design
  - guide
  - case-study
relatedProjects:
  - project-slug
seo:
  metaTitle: Your Post Title — Significa
  metaDescription: Extended description for search engines (150-160 characters)
  ogImage: https://cdn.significa.co/blog/your-post/og-image.jpg
---
```

### Frontmatter Fields

| Field | Required | Type | Description |
|---|---|---|---|
| `title` | Yes | string | Post title (50-60 characters ideal) |
| `description` | No | string | One-sentence summary for previews |
| `date` | Yes | date | Publication date (YYYY-MM-DD) |
| `author` | No | string | Author's full name |
| `thumbnail` | No | string | CDN path to hero image (16:9 ratio, 1600x900px) |
| `tags` | No | array | Content categories (lowercase, hyphenated) |
| `relatedProjects` | No | array | Project slugs (validated at build time) |
| `seo.metaTitle` | No | string | Override default page title |
| `seo.metaDescription` | No | string | Override default description |
| `seo.ogImage` | No | string | Social sharing image (1200x630px) |

### Common Tags

- `design` - Design process, UI/UX, visual design
- `development` - Engineering, code, technical
- `strategy` - Product strategy, planning
- `guide` - How-to articles, tutorials
- `case-study` - Project retrospectives
- `team` - Culture, hiring, team posts
- `learning` - Lessons learned, insights

---

## Content Structure

### Opening Hook

Start with a compelling hook that establishes context and creates curiosity:

```mdx
I recently designed an insurance management product. My knowledge of insurance? Zero.

I could barely tell you the difference between premiums and brokers, let alone design a platform that finance professionals would use daily to reconcile thousands of payments. But here's the thing: designers rarely start projects as domain experts, and we don't need to be.
```

**Why this works:**
- Vulnerable opening (relatable)
- Specific problem stated
- Promise of insight/solution

### Project Cross-Sell (Optional)

Link to a related project early in the post:

```mdx
<ProjectCrossSell
  project="mishmash"
  title="Streamlining insurance payments"
  description="Before you uncover all the insights from this article, discover the project behind it."
/>
```

**Best practices:**
- Place after intro, before first H2
- Use when post relates to a specific project
- Keep description focused on the project, not the post

### Body Structure

Use clear hierarchy with H2 and H3 headings:

```mdx
## Main Section Heading

Opening paragraph for the section.

### Subsection (if needed)

More specific content.
```

**Heading guidelines:**
- H2 for main sections (actionable, clear)
- H3 for subsections (rare, use sparingly)
- No H4 or deeper (simplify instead)
- Keep headings short (3-7 words)
- Use sentence case, not title case

### Visual Content

Use MDX components to add rich media:

#### Images

```mdx
<MediaImage
  src="https://cdn.significa.co/blog/your-post/image-name.jpg"
  alt="Descriptive alt text for accessibility"
  width={1260}
  height={840}
  caption="Optional caption explaining the image"
/>
```

**Image specifications:**
- Format: JPG for photos, PNG for screenshots/diagrams
- Max width: 1600px (for retina displays)
- Aspect ratio: 3:2 or 16:9 preferred
- File size: <500KB per image
- CDN path: `https://cdn.significa.co/blog/{post-slug}/{image-name}.jpg`

#### Video

```mdx
<MediaVideo
  src="https://cdn.significa.co/blog/your-post/video-name.mp4"
  width={1260}
  height={840}
  poster="https://cdn.significa.co/blog/your-post/video-poster.jpg"
  caption="Optional video caption"
/>
```

#### Comparison Blocks

```mdx
<ComparisonBlock
  before={{
    src: "https://cdn.significa.co/blog/your-post/before.jpg",
    label: "Before — Immediate confirmation dialog",
  }}
  after={{
    src: "https://cdn.significa.co/blog/your-post/after.jpg",
    label: "After — Undo toast with 10s grace period",
  }}
/>
```

**Use for:**
- Before/after redesigns
- Problem/solution comparisons
- Old vs new approach

#### Metrics

```mdx
<Metrics
  items={[
    { value: "+12%", label: "Engagement increase" },
    { value: "3x", label: "Faster task completion" },
    { value: "−28%", label: "Support tickets reduced" },
  ]}
/>
```

**Best practices:**
- 3-5 metrics maximum
- Use real data when possible
- Include context in labels
- Format consistently (+/−/x)

### Quotes

Use blockquotes for testimonials or key insights:

```mdx
> "From the outside, it might not seem like the most exciting area, but I was genuinely surprised by how intricate and intellectually stimulating it is. Insurance payments involve a huge amount of nuance, edge cases, and interconnected rules."
>
> **Julieta Frade** — Front-end developer
```

**Formatting:**
- Use `>` for blockquotes
- Add attribution on a new line
- Bold the name with `**Name**`
- Use em dash (—) before role/title

### Lists

Use lists for clarity:

**Bullet lists:**
```mdx
- **Choose what to "buy"** → Select which premiums to process
- **Review your cart** → Double-check selections
- **Complete checkout** → Process the payout
```

**Numbered lists:**
```mdx
1. Create a domain model early
2. Run structured workshops
3. Keep feedback continuous
4. Validate with real users
```

**Best practices:**
- Bold key terms at the start
- Keep items parallel in structure
- Use 3-7 items (never just 2)
- Add context after em dash (→) if needed

### Closing

End with a clear takeaway:

```mdx
## Lessons learned.

Every project is a crash course in something new. You don't need to become an industry expert to design a great product, but you do need to collaborate effectively, ask the right questions, simplify complexity when you can, and validate your assumptions with real users.

The best work doesn't come from designers working in isolation or clients dictating solutions. They come from genuine collaboration where both sides bring what they know best and build something better together.

That's what made this project work… and that's what I'll carry into the next unfamiliar industry I encounter.
```

**Why this works:**
- Summarizes key insights
- Actionable takeaway
- Personal reflection
- Forward-looking

---

## Writing Style Guide

### Voice & Tone

- **Conversational but professional** - Write like you're explaining to a colleague
- **First person for personal posts** - "I designed..." not "We designed..."
- **Active voice** - "We tested the prototype" not "The prototype was tested"
- **Specific over vague** - "Reduced support tickets by 28%" not "Improved efficiency"

### Sentence Structure

- **Vary sentence length** - Mix short punchy sentences with longer explanatory ones
- **One idea per sentence** - Complex ideas deserve their own space
- **Start strong** - Put the main point early in the sentence
- **Cut filler words** - "really", "very", "just", "actually" rarely add value

### Paragraphs

- **2-4 sentences per paragraph** - Easier to scan online
- **One idea per paragraph** - New point = new paragraph
- **Add breathing room** - White space improves readability

### Common Mistakes

❌ **Don't:**
- Start sentences with "So..."
- Overuse em dashes (—) for dramatic effect
- Write in abstract generalities
- Use corporate jargon
- Apologize for opinions ("In my humble opinion...")

✅ **Do:**
- Use concrete examples
- Show your work (screenshots, diagrams)
- Tell stories
- Share failures alongside wins
- Link to related work

---

## Technical Considerations

### MDX vs MD

- Use `.mdx` if you need MDX components (MediaImage, Metrics, etc.)
- Use `.md` for simple text-only posts
- Both support frontmatter and markdown syntax

### Links

**Internal links:**
```mdx
[related project](/projects/mishmash)
[our services](/services)
```

**External links:**
```mdx
[external resource](https://example.com)
```

**Project references:**
```yaml
relatedProjects:
  - mishmash
  - planit-app
```

Build validates these at compile time. Typos break the build.

### Images via CDN

All images must be served from `https://cdn.significa.co`:

```
https://cdn.significa.co/blog/{post-slug}/{image-name}.jpg
```

**Folder structure:**
```
cdn.significa.co/
└── blog/
    └── designing-complex-products/
        ├── hero.jpg
        ├── london-workshop.jpg
        ├── domain-model.jpg
        └── og-image.jpg
```

**Image optimization:**
- Use CDN's automatic resizing
- Specify `width` and `height` attributes
- Always include descriptive `alt` text
- Use `loading="lazy"` for below-fold images

### Reading Time

Automatically calculated based on word count (200 words per minute).

### URL Structure

Posts live at `/blog/{filename-without-extension}`:

```
src/content/blog/designing-complex-products.mdx
→ https://significa.co/blog/designing-complex-products
```

---

## SEO Best Practices

### Title Optimization

- 50-60 characters (display limit in search)
- Include primary keyword
- Front-load important words
- Add brand suffix: "— Significa"

### Description

- 150-160 characters (search result snippet)
- Include secondary keywords
- Add call-to-action
- Match article tone

### OG Image

Social sharing image specifications:

- Size: 1200x630px (Facebook/LinkedIn ratio)
- Format: JPG (better compression)
- Text overlay: Large, readable from thumbnail
- Include Significa branding

### Internal Linking

- Link to 2-3 related projects or posts
- Use descriptive anchor text
- Add related projects in frontmatter
- Link naturally within content

---

## Publishing Checklist

Before publishing, verify:

- [ ] Frontmatter complete and valid
- [ ] All images uploaded to CDN
- [ ] Alt text added to all images
- [ ] Links work (no 404s)
- [ ] Related projects valid
- [ ] Tags appropriate
- [ ] Spelling and grammar checked
- [ ] Code examples formatted
- [ ] Build passes (`pnpm build`)
- [ ] Preview looks correct

---

## Example Post Structures

### Case Study Post

1. Opening hook (the challenge)
2. Project context
3. ProjectCrossSell component
4. Main insight #1 with visuals
5. Main insight #2 with visuals
6. Main insight #3 with visuals
7. Results/metrics
8. Lessons learned
9. Related projects (automatic footer)

### Guide/Tutorial Post

1. Opening hook (why this matters)
2. Problem statement
3. Step 1 with examples
4. Step 2 with examples
5. Step 3 with examples
6. Common mistakes section
7. Conclusion with takeaway
8. Related resources

### Team/Culture Post

1. Personal anecdote opening
2. Context/background
3. Main story/insight
4. Supporting examples
5. Broader lesson
6. Personal reflection
7. Call to action

---

## Getting Help

- **Content questions:** Ask the content team
- **Technical issues:** Check `docs/03-MDX-COMPONENTS.md`
- **Design tokens:** See `docs/08-DESIGN-TOKENS.md`
- **SEO guidelines:** Review `docs/09-SEO-ACCESSIBILITY.md`

---

## Real Example

See `src/content/blog/designing-complex-products.mdx` for a complete, production-ready example that demonstrates:

- Effective frontmatter structure
- Compelling opening hook
- Strategic use of MDX components
- Clear heading hierarchy
- Quotes and testimonials
- Strong closing with takeaways
- Related project references