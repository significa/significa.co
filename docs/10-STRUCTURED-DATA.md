# Structured Data & JSON-LD

Every public-facing page on significa.co must include JSON-LD structured data. This tells search engines not just what your page says, but what it *means* — enabling rich snippets, knowledge panels, and better indexing.

**Organization schema is injected automatically by `BaseLayout` on every page.** You only need to pass page-specific schemas via the `structuredData` prop.

---

## How it works

```astro
---
import { webPageJsonLd } from "@/lib/seo";

const structuredData = webPageJsonLd({ ... });
---

<BaseLayout title="..." description="..." structuredData={structuredData}>
```

`BaseLayout` merges your schema with the site-wide `Organization` schema automatically. You never need to include Organization manually.

---

## Page-by-page reference

This is the canonical list. Every time you create a new page, find its type here and copy the pattern exactly.

---

### Generic page (About, Impact, B-Corp, etc.)

**Schema:** `WebPage`
**Function:** `webPageJsonLd()`

```astro
---
import { webPageJsonLd } from "@/lib/seo";

const structuredData = webPageJsonLd({
  title: "About Significa",
  description: "We are a digital product agency based in Porto, Portugal.",
  url: "https://significa.co/about",
  image: "https://cdn.significa.co/about-og.jpg", // optional
});
---

<BaseLayout
  title="About"
  description="We are a digital product agency..."
  ogImage="https://cdn.significa.co/about-og.jpg"
  structuredData={structuredData}
>
```

---

### Services page

**Schema:** `Service`
**Function:** `servicePageJsonLd()`

Note: No LocalBusiness, no geographic constraint. `areaServed` is always `"Worldwide"`.

```astro
---
import { servicePageJsonLd } from "@/lib/seo";

const structuredData = servicePageJsonLd({
  description: "Custom design and development services built to grow your business.",
  url: "https://significa.co/services",
  image: "https://cdn.significa.co/services-og.jpg", // optional
});
---

<BaseLayout
  title="Services"
  description="Custom design and development services..."
  structuredData={structuredData}
>
```

**With a FAQ section** — define the `faqs` array once and pass it to both the schema and the component so they are never out of sync:

```astro
---
import { servicePageJsonLd, faqJsonLd, withFaq } from "@/lib/seo";
import type { FAQItem } from "@/lib/seo";
import FAQSection from "@/components/mdx/faq-section.astro";

const faqs: FAQItem[] = [
  {
    question: "How long does a typical project take?",
    answer: "Most projects run 3–6 months depending on scope.",
  },
  {
    question: "Do you work with clients outside Portugal?",
    answer: "Yes. We work remotely with clients worldwide.",
  },
];

const structuredData = withFaq(
  servicePageJsonLd({
    description: "...",
    url: "https://significa.co/services",
  }),
  faqJsonLd({
    url: "https://significa.co/services",
    items: faqs,
  }),
);
---

<BaseLayout title="Services" description="..." structuredData={structuredData}>
  <!-- page content -->
  <FAQSection title="Common questions" items={faqs} />
</BaseLayout>
```

---

### Say hello (contact page)

**Schema:** `ContactPage`
**Function:** `contactPageJsonLd()`

```astro
---
import { contactPageJsonLd } from "@/lib/seo";

const structuredData = contactPageJsonLd({
  description: "Let's build something meaningful together. Get in touch to start a conversation.",
  url: "https://significa.co/say-hello",
});
---

<BaseLayout
  title="Say hello"
  description="Let's build something meaningful together."
  structuredData={structuredData}
>
```

---

### Blog listing

**Schema:** `WebPage`
**Function:** `webPageJsonLd()`

The listing page is a generic WebPage — individual posts carry the Article schema.

```astro
---
import { webPageJsonLd } from "@/lib/seo";

const structuredData = webPageJsonLd({
  title: "Blog — Significa",
  description: "Writing on design, engineering, and building digital products.",
  url: "https://significa.co/blog",
});
---

<BaseLayout title="Blog" description="..." structuredData={structuredData}>
```

---

### Blog post

**Schema:** `Article` + `BreadcrumbList`
**Function:** `pageWithArticleJsonLd()`

Pull all values directly from the collection entry — never hardcode them.

```astro
---
import { pageWithArticleJsonLd } from "@/lib/seo";

// post = CollectionEntry<"blog">
const structuredData = pageWithArticleJsonLd(
  {
    title: post.data.title,
    description: post.data.description ?? "",
    url: `https://significa.co/blog/${post.id}`,
    publishedAt: post.data.date,
    image: post.data.thumbnail,   // optional
    author: post.data.author,     // optional — falls back to "Significa"
  },
  [
    { name: "Home", url: "https://significa.co" },
    { name: "Blog", url: "https://significa.co/blog" },
    { name: post.data.title, url: `https://significa.co/blog/${post.id}` },
  ]
);
---

<BaseLayout
  title={post.data.title}
  description={post.data.description ?? ""}
  ogImage={post.data.thumbnail}
  type="article"
  publishedAt={post.data.date}
  structuredData={structuredData}
>
```

---

### Projects listing

**Schema:** `CollectionPage` with `ItemList`
**Function:** `pageWithPortfolioJsonLd()`

Map over the same `projects` array you already fetch. Do not hardcode project data.

```astro
---
import { getProjects } from "@/lib/collections";
import { pageWithPortfolioJsonLd } from "@/lib/seo";

const projects = await getProjects();

const structuredData = pageWithPortfolioJsonLd(
  projects.map((p) => ({
    title: p.data.title,
    description: p.data.tagline ?? p.data.title,
    url: `https://significa.co/projects/${p.id}`,
    image: p.data.thumbnail,
  }))
);
---

<BaseLayout title="Projects" description="..." structuredData={structuredData}>
```

---

### Project detail (case study)

**Schema:** `CreativeWork` + `BreadcrumbList`
**Function:** `pageWithProjectJsonLd()`

This is the most important schema on the site. It signals to Google what was built, for whom, when, and the services rendered. It directly affects how your portfolio appears in search results.

All values come from the content collection — nothing is hardcoded.

```astro
---
import { getProjects, getAwardsForProject } from "@/lib/collections";
import { pageWithProjectJsonLd } from "@/lib/seo";

// project = CollectionEntry<"projects">
const projectAwards = await getAwardsForProject(project.id);

const structuredData = pageWithProjectJsonLd(
  {
    title: project.data.title,
    description: project.data.tagline ?? project.data.title,
    url: `https://significa.co/projects/${project.id}`,
    image: project.data.heroImage ?? project.data.thumbnail,
    datePublished: project.data.date,
    client: project.data.client,           // from frontmatter
    tags: project.data.tags,               // disciplines (Design, Engineering…)
    deliverable: project.data.deliverable, // what was built (website, app…)
    industry: project.data.industry,       // sector (fintech, e-commerce…)
    awards: projectAwards.map((a) => `${a.data.award} ${a.data.year}`),
  },
  [
    { name: "Home", url: "https://significa.co" },
    { name: "Projects", url: "https://significa.co/projects" },
    { name: project.data.title, url: `https://significa.co/projects/${project.id}` },
  ]
);
---

<BaseLayout
  title={project.data.title}
  description={project.data.tagline ?? project.data.title}
  ogImage={project.data.heroImage ?? project.data.thumbnail}
  structuredData={structuredData}
>
```

**The richer the project frontmatter, the better the structured data.** Make sure every project has:
- `client` — the company the work was done for
- `tagline` — one sentence describing the outcome
- `tags` — disciplines involved
- `deliverable` — what type of thing was built
- `industry` — what sector the client is in
- `heroImage` — a high-quality image for OG and schema

---

## Adding a FAQ section to any page

`FAQSection` renders the visible accordion. `faqJsonLd()` generates the schema. **They must receive the same `items` array** — define it once as a variable and pass it to both.

The FAQ schema can be combined with any primary page schema using `withFaq()`:

```astro
---
import { webPageJsonLd, faqJsonLd, withFaq } from "@/lib/seo";
import type { FAQItem } from "@/lib/seo";
import FAQSection from "@/components/mdx/faq-section.astro";

const faqs: FAQItem[] = [
  { question: "...", answer: "..." },
];

const structuredData = withFaq(
  webPageJsonLd({ title: "...", description: "...", url: "..." }),
  faqJsonLd({ url: "https://significa.co/your-page", items: faqs }),
);
---

<BaseLayout ... structuredData={structuredData}>
  <FAQSection title="..." items={faqs} />
</BaseLayout>
```

---

## Function reference

| Function | Schema type | Use on |
|---|---|---|
| `webPageJsonLd()` | `WebPage` | About, Impact, B-Corp, Blog listing, generic pages |
| `servicePageJsonLd()` | `Service` | /services |
| `contactPageJsonLd()` | `ContactPage` | /say-hello |
| `articleJsonLd()` | `Article` | Individual blog posts |
| `creativeWorkJsonLd()` | `CreativeWork` | Individual project/case study pages |
| `portfolioCollectionJsonLd()` | `CollectionPage` | /projects listing |
| `breadcrumbJsonLd()` | `BreadcrumbList` | Any detail page (built into convenience functions) |
| `faqJsonLd()` | `FAQPage` | Any page with a FAQ section |
| `organizationJsonLd()` | `Organization` | **Injected automatically — never call manually** |

### Convenience functions (recommended)

| Function | Returns | Use on |
|---|---|---|
| `pageWithArticleJsonLd(articleOpts, breadcrumbs)` | `[Article, BreadcrumbList]` | Blog post pages |
| `pageWithProjectJsonLd(projectOpts, breadcrumbs)` | `[CreativeWork, BreadcrumbList]` | Project detail pages |
| `pageWithPortfolioJsonLd(projects)` | `CollectionPage` | Projects listing |
| `pageWithServiceJsonLd(serviceOpts, faqs?)` | `Service` or `[Service, FAQPage]` | Services page |

### Combiners

| Function | Use when |
|---|---|
| `withFaq(primarySchema, faqSchema)` | Adding FAQ to any page with a primary schema |
| `withBreadcrumbs(primarySchema, breadcrumbs)` | Adding breadcrumbs manually to any schema |
| `graph(...schemas)` | Three or more schemas on one page |

---

## BaseLayout props

```typescript
interface Props {
  title: string;              // Page title — auto-formatted as "{title} — Significa"
  description: string;        // Meta description (keep under 160 chars)
  ogImage?: string;           // Full CDN URL for Open Graph image
  type?: "website" | "article"; // Defaults to "website". Use "article" for blog posts
  publishedAt?: Date;         // Publication date — only for type="article"
  structuredData?: object | object[]; // JSON-LD schema(s) from @/lib/seo
}
```

---

## Rules

1. **Every public page gets structured data.** No exceptions.
2. **Organization is automatic.** Never import or call `organizationJsonLd()` yourself.
3. **Pull from content, never hardcode.** Use collection entry fields directly. If the frontmatter changes, the schema updates automatically.
4. **One `faqs` array, used twice.** Pass the same array to both `faqJsonLd()` and `<FAQSection>` so they can never drift out of sync.
5. **Use absolute URLs everywhere.** All `url` and `image` fields must be full `https://` URLs.
6. **Project frontmatter drives project schema quality.** The more complete the frontmatter (`client`, `tagline`, `tags`, `deliverable`, `industry`, `heroImage`), the richer the structured data.
7. **Breadcrumbs on all detail pages.** Blog posts and project pages always include `BreadcrumbList`. The convenience functions handle this automatically.

---

## Testing

After creating or updating a page, validate the output:

- **Google Rich Results Test** — https://search.google.com/test/rich-results
- **Schema.org Validator** — https://validator.schema.org/
- In the browser: view source, find `<script type="application/ld+json">`, paste into either tool.