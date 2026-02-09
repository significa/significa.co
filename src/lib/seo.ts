/**
 * Generate JSON-LD structured data for Organization.
 */
export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Significa",
    url: "https://significa.co",
    logo: "https://significa.co/favicon.svg",
  };
}

/**
 * Generate JSON-LD structured data for an Article (blog post).
 */
export function articleJsonLd(options: {
  title: string;
  description: string;
  url: string;
  publishedAt: Date;
  image?: string;
  author?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: options.title,
    description: options.description,
    url: options.url,
    datePublished: options.publishedAt.toISOString(),
    ...(options.image && { image: options.image }),
    ...(options.author && {
      author: { "@type": "Person", name: options.author },
    }),
    publisher: {
      "@type": "Organization",
      name: "Significa",
      url: "https://significa.co",
    },
  };
}

/**
 * Generate JSON-LD BreadcrumbList.
 */
export function breadcrumbJsonLd(
  items: Array<{ name: string; url: string }>
) {
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
