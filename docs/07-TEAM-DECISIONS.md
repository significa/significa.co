# Significa Website: Team Discussion & Exploration

> Senior team review of the Significa website rebuild plan.
> 4 agents, 4 perspectives, 1 synthesis.
> Date: 2026-02-09

---

## Participants

| Role | Focus | Experience |
|---|---|---|
| **Technical Architect** | Architecture, build, deploy, performance | 15+ years |
| **UX/UI Designer** | Storytelling, components, IA, interactions | 12+ years |
| **Marketing/Content Director** | Lead gen, SEO, workflow, content strategy | 15+ years |
| **Devil's Advocate** | Stress-testing every decision | 15+ years |

---

## Consensus: The Plan Is Solid

All 4 participants agree: the technical foundation is well-designed. Astro, static output, Content Collections with Zod, MDX. No one recommended changing the framework or fundamental approach.

Verdict: **ship it, but fix these gaps first.**

---

## Team Decisions (Post-Discussion)

After reviewing all 4 perspectives, the following decisions were made:

1. **Astro v6 (latest stable).** We go with the latest stable version to avoid near-future breaking changes. No pinning to v5.
2. **Media in `public/` for now.** External CDN/image service (ImageKit, Cloudinary, or similar with S3) will be evaluated later. Not blocking for development.
3. **No CMS. Marketing uses git + AI.** The marketing team will have the project set up locally. MDX is learnable. AI assistance fills any gaps. Good documentation and content templates are key.
4. **Components: start lean, grow with content.** The 5 starting components are sufficient. New components are added when content demands them, not eagerly pre-built.
5. **Conversion architecture evolves with data.** CTAs and conversion points will be designed and tested against real metrics. Marketing owns this.
6. **SEO infra from inception.** RSS, sitemap, canonical URLs, robots.txt, 404 page, and SEO component should be set up from the start.
7. **CSS token system: no magic values.** Tokens evolve with the design but the rule is absolute: no hardcoded pixels, no hex colors, no arbitrary spacing. Agents must follow this strictly.
8. **Slug collision check: included.** Maximize compile-time validations. `reference()` over plain slugs, always. Non-technical content editors need the build to catch their mistakes.
9. **`reference()` is non-negotiable.** The Astro lock-in is worth the build-time validation. Runtime errors are unacceptable for a site managed by non-developers.

---

## 5 Critical Gaps (Unanimous or Near-Unanimous)

### 1. Media Pipeline Is Underspecified

**Raised by:** All 4 participants.

The plan says "CDN handles it" but doesn't define the actual pipeline. Cloudflare R2 is object storage, not an image CDN.

**What's missing:**
- URL patterns for responsive images (`srcset`, format=webp/avif)
- Upload workflow (Figma to CDN to MDX)
- `width` and `height` as required props on `MediaImage` (prevents CLS)
- `loading="eager"` + `fetchpriority="high"` for hero images (LCP)
- Cloudflare Image Resizing or Workers for transformation
- Local development experience with CDN images

**Tech Architect's solution:**

```astro
---
// MediaImage with responsive images via Cloudflare Image Resizing
interface Props {
  src: string;
  alt: string;
  width: number;
  height: number;
  eager?: boolean;
  sizes?: string;
}

const { src, alt, width, height, eager = false, sizes = '100vw' } = Astro.props;
const cdnBase = 'https://media.significa.co';
const transforms = (w: number) =>
  `${cdnBase}/cdn-cgi/image/width=${w},format=auto,quality=80/${src}`;
---

<picture>
  <source
    srcset={`${transforms(640)} 640w, ${transforms(960)} 960w, ${transforms(1280)} 1280w, ${transforms(1920)} 1920w`}
    sizes={sizes}
  />
  <img
    src={transforms(960)}
    alt={alt}
    width={width}
    height={height}
    loading={eager ? 'eager' : 'lazy'}
    fetchpriority={eager ? 'high' : 'auto'}
    decoding={eager ? 'sync' : 'async'}
  />
</picture>
```

**Recommendation:** Define the image pipeline before writing any content. Build a CLI tool or script that uploads to R2 and generates the MDX snippet.

**Team Decision (Updated):** Media is managed via the internal asset manager app, which uploads to S3. Bunny.net CDN (`https://significa.b-cdn.net`) serves media with the Bunny Optimizer Engine for real-time image transforms (resize, quality, format conversion via URL query parameters). See `docs/04-MEDIA-ASSETS.md` for the full technical reference.

---

### 2. Content Workflow Without CMS: Realistic But Limited

**Raised by:** Marketing, Devil's Advocate, Tech Architect.

Git + MDX works if 1-2 technical people control the content. The breaking point comes when non-technical team members need to publish.

**Devil's Advocate scenario:**
> Tuesday afternoon. A marketing manager wants to fix a typo. They need to: open the repo, find the .mdx file, edit without breaking YAML, commit to a branch, open a PR, wait for build, get it merged, wait for deployment. In a CMS: click, edit, save. 30 seconds.

**When it works:**
- 1-2 people write content AND are comfortable with git
- Publishing cadence is low (2-4 posts/month)
- No external contributors

**When it breaks:**
- Non-technical team members need to contribute
- Publishing frequency increases
- Blog posts sit in PRs because the dev who merges is busy

**Recommendation:** Don't add CMS now, but:
1. Create MDX skeleton templates for each content type (copy-paste-edit)
2. Document "create new blog post" in 5 steps
3. Assign one content owner (not "the team")
4. Document Decap CMS as the Phase 2 escape hatch (git-backed, zero lock-in)

**Marketing Director's phased approach:**
1. **Phase 1 (now):** File-based MDX. Ship the site.
2. **Phase 2 (6-12 months):** Decap CMS or Tina CMS (git-backed visual editor)
3. **Phase 3 (if needed):** Headless CMS (Sanity, Contentful, Payload)

**Team Decision:** No CMS. The marketing team will have the project set up on their computers with AI assistance. Changing markdown files is not rocket science. Even with some learning curve, the team should be sufficiently familiar within a week or two. AI fills any remaining gaps, given correct skills and documentation in-project.

---

### 3. MDX Components Insufficient for Case Studies

**Raised by:** UX/UI (strongly), Marketing, Devil's Advocate.

5 components produce linear, monotonous case studies. The UX/UI Designer was unequivocal: the gap between "portfolio site" and "design studio experience" is in the component toolkit.

**Current 5 components:**

| Component | Verdict |
|---|---|
| MediaImage | Essential. Needs `size` variant and `eager` prop. |
| MediaVideo | Essential. Needs autoplay-on-scroll for showreels. |
| ComparisonBlock | Good. Limited use but high impact. |
| Metrics | Important. Needs careful design. |
| ProjectCrossSell | Necessary. Should support blog/labs too. |

**What a case study looks like with 5 components:**
```
Title (markdown)
Intro paragraph (markdown)
<Metrics />
More text (markdown)
<MediaImage />
<MediaImage />
<ComparisonBlock />
Results paragraph (markdown)
<ProjectCrossSell />
```
This is a **linear, single-column scroll**. No rhythm, no visual chapters, no surprise.

**What a compelling case study needs:**
```
[Hero: full-bleed image/video, title overlay]
[Brief: 2-3 sentences, large type]
[Challenge with client quote]
[Process: timeline/steps]
[Design exploration: image grid]
[Key decision: callout block]
[Solution: full-bleed dark section with device frames]
[Details: comparison, color palette, type specimen]
[Results: metrics with context]
[Impact: client testimonial]
[Next: related project cross-sell]
```

**Components to add (by priority):**

| Component | Justification | Priority |
|---|---|---|
| `ImageGrid` | Show multiple screens side by side (2-4 columns) | Must-have |
| `Section` | Background color changes, full-bleed, visual chapters | Must-have |
| `Testimonial` | Client voice: quote, name, role, company | Must-have |
| `CTA` | Conversion points within content | Must-have |
| `PullQuote` / `Callout` | Break monotony, highlight insights | Should-have |
| `DeviceFrame` | Contextualize screenshots (phone/desktop) | Should-have |
| `ProcessTimeline` | Visualize design process | Should-have |
| `ContentCrossSell` | Generic version of ProjectCrossSell (blog/labs too) | Should-have |
| `ColorPalette` | For branding projects | Nice-to-have |
| `TypeSpecimen` | For branding projects | Nice-to-have |
| `Embed` | Figma prototypes, CodeSandbox | Nice-to-have |

**Devil's Advocate concern:** Every new component requires a code change and deployment. Document the component addition process so it's a 15-minute task, not a research project.

**UX/UI insight:** Consider using `.md` for blog posts (no custom components needed) and `.mdx` only for case studies. Saves MDX compilation overhead on content that doesn't need it.

**Team Decision:** The 5 starting components are a starting point. New components will be created as content needs arise. We won't eagerly build components that might not be needed. Start simple and lean, grow with the content.

---

### 4. Conversion Architecture Is Nonexistent

**Raised by:** Marketing (strongly), UX/UI.

The plan has zero conversion points. After reading a brilliant case study, the visitor encounters nothing saying "let's work together."

**What's missing:**
- `CTA` component embeddable in MDX (headline, body, button, link)
- Contact form (Formspree, Netlify Forms, or similar)
- Newsletter signup (Buttondown, Resend)
- Contextual CTAs at the end of case studies and blog posts
- Strategic CTA placement on homepage

**Marketing Director's math:**
> 5,000 monthly visitors at 1% contact rate = 50 leads. With proper conversion architecture (CTAs, newsletter, social proof) = 2-3% = 100-150 leads. For a studio, that's predictable pipeline vs. relying on referrals.

**Recommended CTA placements:**
- **Case studies:** "Want results like these? Let's talk." at the bottom
- **Blog posts:** Newsletter signup mid-article and at bottom
- **Labs:** "Built by Significa. See our client work." crosslink
- **Homepage:** Primary CTA above the fold, secondary after work section

**Team Decision:** The final structure will have conversion points, but this is something to try and test against real data and metrics. Not a worry for the initial build. Marketing people own this and will iterate based on performance.

---

### 5. SEO and Technical Infrastructure Missing

**Raised by:** Marketing, Tech Architect.

Elements required for launch day:

| Item | Status | Priority | Effort |
|---|---|---|---|
| RSS Feed (`@astrojs/rss`) | Not mentioned | Must-have | Low |
| Sitemap (`@astrojs/sitemap`) | Not mentioned | Must-have | Low |
| 404 page | Not mentioned | Must-have | Low |
| Canonical URLs | Not mentioned | Must-have | Low |
| Robots.txt | Not mentioned | Must-have | Low |
| `<SEO>` component (OG, Twitter, meta) | Partial | Must-have | Medium |
| JSON-LD structured data | Not mentioned | Should-have | Medium |
| Tag archive pages | Not mentioned | Should-have | Medium |
| View Transitions | Mentioned, not planned | Should-have | Medium |
| Pagefind (search) | Not mentioned | Nice-to-have | Low |

**Tech Architect's SEO component:**

```astro
---
interface Props {
  title: string;
  description: string;
  ogImage?: string;
  type?: 'website' | 'article';
  publishedAt?: Date;
}

const {
  title,
  description,
  ogImage = 'https://media.significa.co/og-default.jpg',
  type = 'website',
  publishedAt
} = Astro.props;

const canonicalURL = new URL(Astro.url.pathname, Astro.site);
---

<title>{title}</title>
<meta name="description" content={description} />
<link rel="canonical" href={canonicalURL.href} />
<meta property="og:type" content={type} />
<meta property="og:url" content={canonicalURL.href} />
<meta property="og:title" content={title} />
<meta property="og:description" content={description} />
<meta property="og:image" content={ogImage} />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content={title} />
<meta name="twitter:description" content={description} />
<meta name="twitter:image" content={ogImage} />
{type === 'article' && publishedAt && (
  <meta property="article:published_time" content={publishedAt.toISOString()} />
)}
```

---

## Secondary Gaps (Important but Not Blockers)

### Content Types Missing

**Team/People collection** (raised by UX/UI, Marketing):
- Name, role, photo, bio, social links
- Feeds into: author cards on blog, project credits, about page
- A design studio sells people. Without this, the studio feels faceless.

**Testimonials** as structured data (raised by Marketing, UX/UI):
- Client name, role, company, quote, associated project
- Embeddable in case studies AND aggregatable on homepage
- Single highest-ROI missing content type per Marketing Director

**Careers collection** (raised by Marketing):
- Title, department, location, type, description, requirements
- Enables Google Jobs structured data
- Static "careers page" is insufficient if attracting talent is a goal

### Analytics (Raised by Marketing, Tech)

Nothing mentioned in the plan. Unanimous recommendation:
- **Plausible or Fathom** (privacy-first, no GDPR cookie banner needed)
- **Google Search Console** (free, non-negotiable for SEO)
- Track: page views, traffic sources, conversions, content performance

### ~~Version Pinning~~ Resolved: Use Astro v6

**Team Decision:** Use latest stable Astro (v6 when stable). We want to work with the latest versions of everything to avoid breaking changes in the near future.

### CSS Token System (Raised by Devil's Advocate, UX/UI)

**Team Decision:** Confirmed needed. The token system will be documented and developed alongside the design. No magic numbers and no magic colors must be enforced by all agents. The system grows with the project but the rule is absolute from day one.

### Slug Collision Check (Raised by Tech Architect)

**Team Decision:** Include this. We should include as many compile-time validations as possible. A website managed by non-tech and marketing people should error as soon as possible instead of relying on runtime errors.

```typescript
const reserved = ['blog', 'projects', 'labs', 'index'];
for (const page of pages) {
  const topSegment = page.id.split('/')[0];
  if (reserved.includes(topSegment)) {
    throw new Error(`Page "${page.id}" collides with reserved route /${topSegment}.`);
  }
}
```

This philosophy extends to all content validation: use `reference()` instead of plain slugs, require fields that must exist, throw on missing data. Build-time errors are features, not annoyances.

---

## Plan Strengths (Full Consensus)

What all 4 participants praised:

1. **Build-time validation** with `reference()` and Zod: broken references fail the build, not production
2. **Zero JS by default**: performance is excellent out of the box
3. **Highlights with discriminatedUnion**: elegant, extensible homepage curation
4. **Documentation quality**: clear, opinionated, well-organized (rare for a project plan)
5. **MDX components as Astro (not React)**: correct decision, zero client JS overhead
6. **Media on CDN, not in git**: repo stays lean, deploys stay fast
7. **Content Collections as the "database"**: typed, validated, portable content

---

## Devil's Advocate: Report Card

| Aspect | Grade | Note |
|---|---|---|
| Framework choice (Astro) | B+ | Good fit, but version uncertainty is real |
| Content strategy (MDX in git) | B- | Works for dev teams, risky for mixed teams |
| Schema design | A- | Well-structured, good references and validation |
| Component architecture | B | Solid start, needs growth strategy |
| CSS approach | B- | Works at small scale, needs token system |
| Media strategy | C+ | Too vague. "CDN handles it" isn't a plan |
| Build/deploy | B | Fine for now, needs monitoring |
| Documentation | A- | Clear, opinionated, well-organized |
| Migration risk | B | Content is portable, glue code is not |
| Team scalability | C+ | Works for devs, walls off everyone else |

---

## Interactions and Islands (UX/UI Perspective)

### Where Islands Are Required
1. **Mobile navigation**: `client:load` (immediate)
2. **ComparisonBlock slider**: `client:visible` (in viewport)
3. **Project filtering**: `client:load` (tag-based, immediate results)
4. **Image lightbox/zoom**: `client:visible` (portfolio detail viewing)
5. **Contact form**: `client:load` (validation + submission)
6. **Video player controls**: `client:visible` (CDN-hosted showreels)

### Where Islands Are NOT Needed
- Scroll animations: CSS `@scroll-timeline` or Intersection Observer via `<script>`
- Hover effects: pure CSS
- Accordions: `<details>/<summary>` with CSS transitions
- Dark mode toggle: inline script + CSS custom properties

### Highest-Impact Interaction
**View Transitions** (Astro native). The transition from project grid to project detail should feel designed. Thumbnail expands into hero, content fades in. This single feature does more for perceived quality than anything else.

---

## Content Relationships (Marketing Perspective)

**What works:**
- `relatedProjects` on case studies (keeps visitors in the work section)
- Blog posts referencing projects (connects thought leadership to proof)

**What's missing:**
- **Author pages** (`/blog/author/joao`): aggregates posts, improves E-E-A-T for Google
- **Tag archive pages** (`/blog/tag/design-systems`): topical clusters for SEO
- **Bi-directional blog-project linking**: projects should link to related blog posts too
- **Blog-to-blog references**: "if you liked this, you might also enjoy..."
- **Series/multi-part content**: series name + part number for deep dives

---

## Competitor Comparison (UX/UI Analysis)

| Aspect | Industry Best | Significa (Proposed) | Gap |
|---|---|---|---|
| Content types | Projects, Blog, Team, Labs | Projects, Blog, Labs, Pages | Missing Team |
| Case study depth | 10+ components, layout sections | 5 components, single column | Significant |
| Interactivity | View transitions, prototypes, filtering | Minimal islands | Moderate |
| Performance | < 1s LCP, static generation | Astro static, excellent | No gap |
| IA clarity | 4-5 main sections | 5 sections + catch-all | No gap |
| Visual storytelling | Full-bleed sections, device frames, grids | Linear single-column | Significant |

---

## Final Recommendation

The plan is **good and worth executing**. It doesn't need to be rewritten. It needs to be complemented:

1. **Image pipeline defined** (before any content)
2. **5-7 additional MDX components** (before launch)
3. **SEO infrastructure** (RSS, sitemap, canonical, 404, robots.txt)
4. **Conversion architecture** (CTA component, contact form, newsletter)
5. **View Transitions** between pages (massive perceived quality gain)
6. **Design tokens** in global.css (consistency at scale)
7. **Content templates + runbook** (workflow documentation)
8. **Analytics** (Plausible/Fathom + Google Search Console)

Ship it. Iterate. Don't add complexity until the content demands it.

---

## Hybrid Page Architecture

### Decision

Marketing pages with bespoke layouts (homepage, who-we-are, what-we-do, work-with-us) are **custom `.astro` files** in `src/pages/`. Content-heavy prose pages (handbook, playbook, etc.) remain **MDX via the `pages` collection** and the `[...slug].astro` catch-all route.

Both page types pull dynamic data from content collections. The difference is who controls the layout: the developer (custom pages) or the content author (MDX pages).

### Why not MDX for everything?

MDX gives you a linear content flow. Marketing pages need grid layouts, full-bleed sections, asymmetric columns, stats blocks alongside testimonials — the kind of layout that fights MDX's grain. You'd end up with an MDX file that's just `<Hero /><Stats /><Clients />` with zero actual markdown, which is indirection for nothing.

Custom Astro pages with scoped `<style>` are simpler, more explicit, and give full layout control. The data still comes from collections — that's the important part.

### When to use which

| Use case | Approach | Where it lives |
|---|---|---|
| Homepage, landing pages | Custom `.astro` page | `src/pages/` |
| Who we are, What we do, Work with us | Custom `.astro` page | `src/pages/` |
| Blog posts | MDX via `blog` collection | `src/content/blog/` → `src/pages/blog/[slug].astro` |
| Project case studies | MDX via `projects` collection | `src/content/projects/` → `src/pages/projects/[slug].astro` |
| Handbook, playbook, culture pages | MDX via `pages` collection | `src/content/pages/` → `src/pages/[...slug].astro` |

### New collections added

**`clients`** (YAML) — client logo strip data. Used on homepage, who-we-are, what-we-do, work-with-us. Fields: `name`, `logo` (SVG path in `public/`), `url` (optional), `order`.

**`testimonials`** (YAML) — customer quotes. Used on homepage, who-we-are, work-with-us. Fields: `quote`, `author`, `role`, `company`, `avatar` (optional CDN path), `order`.

### Reserved routes

The `[...slug].astro` catch-all now checks against: `blog`, `projects`, `labs`, `who-we-are`, `what-we-do`, `work-with-us`. Any `pages` collection entry with a matching slug will break the build with a clear error.

---

## Appendix: Team Decisions Summary

| Topic | Decision |
|---|---|
| Astro version | v6 latest stable |
| Media pipeline | S3 + Bunny.net CDN with Optimizer Engine (`significa.b-cdn.net`) |
| CMS | No CMS; marketing uses git + AI assistance |
| MDX components | Start with 5, grow as content demands |
| Conversion architecture | Evolves with real data; marketing owns it |
| SEO infrastructure | Include from inception |
| CSS tokens | Required from day one; no magic values |
| Slug collision check | Included; maximize compile-time validation |
| `reference()` vs plain slugs | Always `reference()`; build-time validation is non-negotiable |
| Page architecture | Hybrid: custom `.astro` for marketing pages, MDX for prose content |
| `clients` collection | YAML; logo strip and social proof across custom pages |
| `testimonials` collection | YAML; customer quotes reused across multiple pages |
| `awards` collection | YAML; each entry references a project via `reference()`. Build-time validated. |
| Project metrics | Optional `metrics` array in project frontmatter (`value` + `label`). Shown on homepage showcase cards. |
| Project heroImage | Optional `heroImage` field on projects for full-bleed homepage showcase (falls back to `thumbnail`) |
| Showreel cursor | Vanilla `<script>` with `requestAnimationFrame` lerp, not a React island. Respects `prefers-reduced-motion`. Falls back to static centered button on touch devices. Re-inits on View Transition via `astro:after-swap`. |
| Industries/capabilities | Hardcoded arrays on homepage — not collections. They rarely change and are only used in one place. |
