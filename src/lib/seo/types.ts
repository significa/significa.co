import type { ImageInput } from './content';

export type OrganizationData = {
  name: string;
  url: string;
  email?: string;
  logo: { url: string; width?: number; height?: number };
  address?: {
    streetAddress?: string;
    addressLocality?: string;
    postalCode?: string;
    addressCountry?: string;
  };
  sameAs: readonly string[];
};

export type AuthorInput =
  | {
      kind: 'team-member';
      slug: string;
      name: string;
      jobTitle?: string;
      isActive: boolean;
      image?: ImageInput;
    }
  | { kind: 'external'; name: string; jobTitle?: string };

export type ListItemInput = { url: string; name: string };

export type FaqItem = { question: string; answer: string };

export type PersonInput = {
  name: string;
  jobTitle?: string;
  isActive: boolean;
  description?: string;
  email?: string;
  sameAs: string[];
};

/**
 * What the page is about. Each variant decides the main node the template
 * generates on top of the global ones (Organization, WebSite, WebPage,
 * BreadcrumbList).
 */
export type SchemaEntity =
  | { kind: 'home' }
  | { kind: 'page'; institutional: boolean }
  | { kind: 'collection'; items: ListItemInput[]; institutional?: boolean }
  | {
      kind: 'blog-post';
      headline: string;
      authors: AuthorInput[];
      keywords: string[];
      /** Reading time in minutes, as shown on the page. */
      readingMinutes?: number;
    }
  | { kind: 'profile'; person: PersonInput }
  | {
      kind: 'project';
      name: string;
      description?: string;
      client?: string;
      keywords: string[];
      contributors: { slug: string; name: string }[];
    }
  | { kind: 'service'; name: string; description?: string }
  /** Error pages and private pages (proposals): only the global nodes. */
  | { kind: 'none' };

export type PageSchemaInput = {
  /** Canonical URL, as emitted in `<link rel="canonical">`. */
  url: string;
  /** Exactly the `<title>` of the page. */
  title: string;
  /** Exactly the meta description of the page. */
  description?: string;
  /** Name of the last breadcrumb item. Defaults to the title. */
  breadcrumbName?: string;
  primaryImage?: ImageInput;
  datePublished?: string;
  dateModified?: string;
  entity: SchemaEntity;
  organization: OrganizationData;
  /** FAQs rendered by `faqs` blocks on the page. */
  faqs?: FaqItem[];
  /** Raw value of the Storyblok `structure_data_markup` field. */
  manual?: string | null;
  /** Visible text of the page, used to verify manual FAQPage questions. */
  visibleText?: string[];
};

/** A JSON-LD node as plain data. */
export type JsonLdNode = { '@type': string | string[]; '@id'?: string; [key: string]: unknown };

export type JsonLdGraph = { '@context': 'https://schema.org'; '@graph': JsonLdNode[] };
