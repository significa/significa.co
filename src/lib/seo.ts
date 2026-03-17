/**
 * Structured Data & JSON-LD Helpers
 *
 * Every public-facing page on significa.co should include at least one
 * JSON-LD schema block. The Organization schema is always injected
 * automatically by BaseLayout — you only need to pass page-specific schemas
 * via the `structuredData` prop.
 *
 * Usage pattern:
 *
 *   import { pageWithProjectJsonLd } from "@/lib/seo";
 *
 *   const structuredData = pageWithProjectJsonLd({ ... });
 *
 *   <BaseLayout structuredData={structuredData} ... />
 *
 * See docs/10-STRUCTURED-DATA.md for the full reference.
 */

// ============================================================
// SHARED TYPES
// ============================================================

export interface FAQItem {
  question: string;
  answer: string;
}

export interface BreadcrumbItem {
  name: string;
  url: string;
}

// ============================================================
// ORGANIZATION (injected on every page by BaseLayout)
// ============================================================

/**
 * Core identity schema for Significa.
 * Already included on every page via BaseLayout — you do not need to call
 * this manually unless you are building a combined schema with multiSchemaJsonLd.
 */
export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://significa.co/#organization",
    name: "Significa",
    url: "https://significa.co",
    logo: "https://significa.co/favicon.svg",
    description:
      "Significa is a product design and engineering agency based in Porto, building high-quality digital products and e-commerce stores for ambitious scale-ups worldwide.",
    foundingDate: "2015",
    numberOfEmployees: {
      "@type": "QuantitativeValue",
      minValue: 20,
      maxValue: 50,
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "new business",
      email: "hello@significa.co",
    },
    sameAs: [
      "https://www.linkedin.com/company/significadotco/",
      "https://github.com/significa",
      "https://twitter.com/significadotco",
      "https://instagram.com/significadotco/",
      "https://www.behance.net/significa",
      "https://www.youtube.com/@SignificaDotCo",
    ],
  };
}

// ============================================================
// WEBSITE (homepage only — enables Sitelinks Searchbox)
// ============================================================

/**
 * WebSite schema for the homepage.
 * Required on the homepage to enable Google Sitelinks Searchbox and
 * establish the site entity linked to the Organization.
 *
 * @example
 * // In pages/index.astro only
 * structuredData={[webSiteJsonLd(), faqPageJsonLd({ ... })]}
 */
export function webSiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://significa.co/#website",
    name: "Significa",
    url: "https://significa.co",
    publisher: {
      "@id": "https://significa.co/#organization",
    },
  };
}

// ============================================================
// WEBPAGE (generic pages: About, Impact, B-Corp, etc.)
// ============================================================

/**
 * Generic WebPage schema.
 * Use for pages that don't fit a more specific type (About, Impact, etc.).
 *
 * @example
 * structuredData={webPageJsonLd({
 *   title: "About Significa",
 *   description: "...",
 *   url: "https://significa.co/about",
 *   image: "https://cdn.significa.co/about-og.jpg",
 * })}
 */
export function webPageJsonLd(options: {
  title: string;
  description: string;
  url: string;
  image?: string;
  datePublished?: Date;
  dateModified?: Date;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: options.title,
    description: options.description,
    url: options.url,
    ...(options.image && { image: options.image }),
    ...(options.datePublished && {
      datePublished: options.datePublished.toISOString(),
    }),
    ...(options.dateModified && {
      dateModified: options.dateModified.toISOString(),
    }),
    isPartOf: {
      "@id": "https://significa.co",
    },
    publisher: {
      "@type": "Organization",
      name: "Significa",
      url: "https://significa.co",
    },
  };
}

// ============================================================
// SERVICE (Services page)
// ============================================================

/**
 * Service schema for the /services page.
 * areaServed is set to worldwide since Significa works globally.
 *
 * @example
 * structuredData={serviceJsonLd({
 *   name: "Digital Product Design & Development",
 *   description: "...",
 *   url: "https://significa.co/services",
 * })}
 */
export function serviceJsonLd(options: {
  name: string;
  description: string;
  url: string;
  image?: string;
  serviceTypes?: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: options.name,
    description: options.description,
    url: options.url,
    ...(options.image && { image: options.image }),
    ...(options.serviceTypes && { serviceType: options.serviceTypes }),
    provider: {
      "@type": "Organization",
      name: "Significa",
      url: "https://significa.co",
    },
    areaServed: "Worldwide",
    audience: {
      "@type": "Audience",
      audienceType: "Companies building digital products",
    },
  };
}

// ============================================================
// ARTICLE (blog posts)
// ============================================================

/**
 * Article schema for blog posts.
 * Always pair with breadcrumbJsonLd for best results.
 *
 * @example
 * structuredData={[
 *   articleJsonLd({
 *     title: post.data.title,
 *     description: post.data.description,
 *     url: `https://significa.co/blog/${post.id}`,
 *     image: post.data.thumbnail,
 *     publishedAt: post.data.date,
 *     author: post.data.author,
 *   }),
 *   breadcrumbJsonLd([
 *     { name: "Home", url: "https://significa.co" },
 *     { name: "Blog", url: "https://significa.co/blog" },
 *     { name: post.data.title, url: `https://significa.co/blog/${post.id}` },
 *   ]),
 * ]}
 */
export function articleJsonLd(options: {
  title: string;
  description: string;
  url: string;
  publishedAt: Date;
  image?: string;
  modifiedAt?: Date;
  author?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: options.title,
    description: options.description,
    url: options.url,
    datePublished: options.publishedAt.toISOString(),
    ...(options.modifiedAt && {
      dateModified: options.modifiedAt.toISOString(),
    }),
    ...(options.image && { image: options.image }),
    ...(options.author
      ? { author: { "@type": "Person", name: options.author } }
      : { author: { "@type": "Organization", name: "Significa", url: "https://significa.co" } }),
    publisher: {
      "@type": "Organization",
      name: "Significa",
      url: "https://significa.co",
      logo: {
        "@type": "ImageObject",
        url: "https://significa.co/favicon.svg",
      },
    },
  };
}

// ============================================================
// CREATIVE WORK (project / case study detail pages)
// ============================================================

/**
 * CreativeWork schema for project and case study detail pages.
 * This is the most important schema for your portfolio — it tells search
 * engines exactly what was built, for whom, when, and by whom.
 *
 * Pull data directly from the project's content collection entry so values
 * are always in sync and never manually maintained.
 *
 * @example
 * // In pages/projects/[slug].astro
 * import { creativeWorkJsonLd } from "@/lib/seo";
 *
 * const structuredData = creativeWorkJsonLd({
 *   title: project.data.title,
 *   description: project.data.tagline ?? project.data.title,
 *   url: `https://significa.co/projects/${project.id}`,
 *   image: project.data.heroImage ?? project.data.thumbnail,
 *   datePublished: project.data.date,
 *   client: project.data.client,
 *   tags: project.data.tags,
 *   deliverable: project.data.deliverable,
 *   industry: project.data.industry,
 * });
 */
export function creativeWorkJsonLd(options: {
  title: string;
  description: string;
  url: string;
  image?: string;
  datePublished?: Date;
  /** Client name from project frontmatter */
  client?: string;
  /** Tags from project frontmatter (e.g. ["Design", "Engineering"]) */
  tags?: string[];
  /** Deliverable types (e.g. ["website", "design-system"]) */
  deliverable?: string[];
  /** Industry categories (e.g. ["fintech", "e-commerce"]) */
  industry?: string[];
  /** Award names won for this project */
  awards?: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: options.title,
    description: options.description,
    url: options.url,
    ...(options.image && { image: options.image }),
    ...(options.datePublished && {
      dateCreated: options.datePublished.toISOString(),
      datePublished: options.datePublished.toISOString(),
    }),
    creator: {
      "@type": "Organization",
      name: "Significa",
      url: "https://significa.co",
    },
    ...(options.client && {
      // The entity this work was produced for
      producer: {
        "@type": "Organization",
        name: options.client,
      },
    }),
    ...(options.tags?.length && {
      // What disciplines were involved
      keywords: options.tags.join(", "),
    }),
    ...(options.deliverable?.length && {
      // What type of deliverable was produced
      genre: options.deliverable.join(", "),
    }),
    ...(options.industry?.length && {
      // What industry this work belongs to
      about: options.industry.map((i) => ({
        "@type": "Thing",
        name: i,
      })),
    }),
    ...(options.awards?.length && {
      award: options.awards,
    }),
  };
}

// ============================================================
// COLLECTION PAGE (projects listing)
// ============================================================

/**
 * CollectionPage schema for the /projects listing page.
 * Tells search engines this page is a curated list of portfolio items.
 *
 * Pull from the same getProjects() call you are already making so the list
 * is always accurate and complete.
 *
 * @example
 * // In pages/projects/index.astro
 * import { portfolioCollectionJsonLd } from "@/lib/seo";
 *
 * const structuredData = portfolioCollectionJsonLd({
 *   projects: projects.map((p) => ({
 *     title: p.data.title,
 *     description: p.data.tagline ?? p.data.title,
 *     url: `https://significa.co/projects/${p.id}`,
 *     image: p.data.thumbnail,
 *   })),
 * });
 */
export function portfolioCollectionJsonLd(options: {
  projects: Array<{
    title: string;
    description: string;
    url: string;
    image?: string;
  }>;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Projects | Significa",
    description:
      "Case studies and portfolio work from Significa. Digital product design and engineering for companies that care about craft.",
    url: "https://significa.co/projects",
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: options.projects.length,
      itemListElement: options.projects.map((project, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "CreativeWork",
          name: project.title,
          description: project.description,
          url: project.url,
          ...(project.image && { image: project.image }),
          creator: {
            "@type": "Organization",
            name: "Significa",
            url: "https://significa.co",
          },
        },
      })),
    },
  };
}

// ============================================================
// FAQ (any page with a FAQ section)
// ============================================================

/**
 * FAQPage schema for pages with FAQ sections.
 * Enables Google's FAQ rich snippet — questions appear directly in search results.
 *
 * The `items` array should be the same array you pass to <FAQSection>
 * so content is never duplicated or out of sync.
 *
 * @example
 * const faqs: FAQItem[] = [
 *   { question: "How long does a project take?", answer: "..." },
 *   { question: "Do you work remotely?", answer: "..." },
 * ];
 *
 * structuredData={faqPageJsonLd({
 *   title: "Services FAQ",
 *   description: "Common questions about working with Significa",
 *   url: "https://significa.co/services",
 *   items: faqs,
 * })}
 *
 * // Then in your template:
 * <FAQSection items={faqs} />
 */
export function faqPageJsonLd(options: { title: string; description: string; url: string; items: FAQItem[] }) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    name: options.title,
    description: options.description,
    url: options.url,
    mainEntity: options.items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

// ============================================================
// BREADCRUMBS (detail pages — blog post, project, handbook)
// ============================================================

/**
 * BreadcrumbList schema for navigation trails on detail pages.
 * Always start from Home and include every level up to the current page.
 *
 * @example
 * breadcrumbJsonLd([
 *   { name: "Home", url: "https://significa.co" },
 *   { name: "Projects", url: "https://significa.co/projects" },
 *   { name: project.data.title, url: `https://significa.co/projects/${project.id}` },
 * ])
 */
export function breadcrumbJsonLd(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

// ============================================================
// CONVENIENCE COMBINERS
// All of these return an array that you pass directly to
// the `structuredData` prop on BaseLayout. Organization is
// already merged in by BaseLayout — do not add it here.
// ============================================================

/**
 * About page — Organization + WebPage
 *
 * @example
 * <BaseLayout
 *   title="About"
 *   description="..."
 *   structuredData={pageWithWebPageJsonLd({
 *     title: "About Significa",
 *     description: "...",
 *     url: "https://significa.co/about",
 *   })}
 * />
 */
export function pageWithWebPageJsonLd(options: { title: string; description: string; url: string; image?: string }) {
  return webPageJsonLd(options);
}

/**
 * Services page — Service schema (optionally combined with FAQ)
 *
 * @example
 * // Without FAQ:
 * structuredData={pageWithServiceJsonLd({ name: "...", description: "...", url: "..." })}
 *
 * // With FAQ — define faqs once, use in both schema and component:
 * const faqs: FAQItem[] = [{ question: "...", answer: "..." }]
 * structuredData={pageWithServiceJsonLd({ ... }, faqs)}
 * <FAQSection items={faqs} />
 */
export function pageWithServiceJsonLd(
  serviceOptions: {
    name: string;
    description: string;
    url: string;
    image?: string;
    serviceTypes?: string[];
  },
  faqs?: FAQItem[]
) {
  if (faqs?.length) {
    return [
      serviceJsonLd(serviceOptions),
      faqPageJsonLd({
        title: serviceOptions.name,
        description: serviceOptions.description,
        url: serviceOptions.url,
        items: faqs,
      }),
    ];
  }
  return serviceJsonLd(serviceOptions);
}

/**
 * Blog post — Article + Breadcrumbs
 *
 * @example
 * structuredData={pageWithArticleJsonLd(
 *   {
 *     title: post.data.title,
 *     description: post.data.description ?? "",
 *     url: `https://significa.co/blog/${post.id}`,
 *     publishedAt: post.data.date,
 *     image: post.data.thumbnail,
 *     author: post.data.author,
 *   },
 *   [
 *     { name: "Home", url: "https://significa.co" },
 *     { name: "Blog", url: "https://significa.co/blog" },
 *     { name: post.data.title, url: `https://significa.co/blog/${post.id}` },
 *   ]
 * )}
 */
export function pageWithArticleJsonLd(
  articleOptions: {
    title: string;
    description: string;
    url: string;
    publishedAt: Date;
    image?: string;
    modifiedAt?: Date;
    author?: string;
  },
  breadcrumbs: BreadcrumbItem[]
) {
  return [articleJsonLd(articleOptions), breadcrumbJsonLd(breadcrumbs)];
}

/**
 * Project / case study detail — CreativeWork + Breadcrumbs
 * This is the most important schema on the site. Use on every project page.
 *
 * @example
 * // In pages/projects/[slug].astro
 * structuredData={pageWithProjectJsonLd(
 *   {
 *     title: project.data.title,
 *     description: project.data.tagline ?? project.data.title,
 *     url: `https://significa.co/projects/${project.id}`,
 *     image: project.data.heroImage ?? project.data.thumbnail,
 *     datePublished: project.data.date,
 *     client: project.data.client,
 *     tags: project.data.tags,
 *     deliverable: project.data.deliverable,
 *     industry: project.data.industry,
 *   },
 *   [
 *     { name: "Home", url: "https://significa.co" },
 *     { name: "Projects", url: "https://significa.co/projects" },
 *     { name: project.data.title, url: `https://significa.co/projects/${project.id}` },
 *   ]
 * )}
 */
export function pageWithProjectJsonLd(
  projectOptions: {
    title: string;
    description: string;
    url: string;
    image?: string;
    datePublished?: Date;
    client?: string;
    tags?: string[];
    deliverable?: string[];
    industry?: string[];
    awards?: string[];
  },
  breadcrumbs: BreadcrumbItem[]
) {
  return [creativeWorkJsonLd(projectOptions), breadcrumbJsonLd(breadcrumbs)];
}

/**
 * Projects listing — CollectionPage
 *
 * @example
 * // In pages/projects/index.astro
 * const projects = await getProjects();
 *
 * structuredData={pageWithPortfolioJsonLd(
 *   projects.map((p) => ({
 *     title: p.data.title,
 *     description: p.data.tagline ?? p.data.title,
 *     url: `https://significa.co/projects/${p.id}`,
 *     image: p.data.thumbnail,
 *   }))
 * )}
 */
export function pageWithPortfolioJsonLd(
  projects: Array<{
    title: string;
    description: string;
    url: string;
    image?: string;
  }>
) {
  return portfolioCollectionJsonLd({ projects });
}
