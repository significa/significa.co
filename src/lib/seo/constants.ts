/**
 * Site-wide constants for structured data.
 *
 * `SITE_URL` is the production origin. Every URL emitted in JSON-LD and in
 * `<link rel="canonical">` is built from it, so staging, previews and local dev
 * always point search engines and agents at the production page.
 */
export const SITE_URL = 'https://significa.co';

/** Must match the `lang` attribute in `src/app.html`. */
export const SITE_LANGUAGE = 'en';

export const SITE_NAME = 'Significa';

export const ORGANIZATION_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;
export const LOGO_ID = `${SITE_URL}/#logo`;

/** Fragment identifiers used for per-page nodes: `<canonical url>#<fragment>`. */
export const NODE_FRAGMENT = {
  webpage: 'webpage',
  article: 'article',
  person: 'person',
  project: 'project',
  breadcrumb: 'breadcrumb',
  primaryImage: 'primaryimage',
  service: 'service',
  faq: 'faq',
  itemList: 'itemlist'
} as const;

export type NodeFragment = (typeof NODE_FRAGMENT)[keyof typeof NODE_FRAGMENT];

/**
 * Fallback organisation data. Used until the `configuration` story in Storyblok
 * has the Organization fields (see README). Every value here is public and
 * visible on the site.
 */
export const ORGANIZATION_FALLBACK = {
  name: SITE_NAME,
  url: SITE_URL,
  email: 'newbusiness@significa.co',
  logo: {
    url: 'https://a.storyblok.com/f/198185/1600x1600/708e2e3a4f/logo_significa.png',
    width: 1600,
    height: 1600
  },
  address: {
    streetAddress: 'Rua da Torrinha 154',
    addressLocality: 'Porto',
    addressCountry: 'PT'
  },
  sameAs: [
    'https://www.linkedin.com/company/significadotco/',
    'https://www.instagram.com/significadotco/',
    'https://www.behance.net/significa',
    'https://github.com/significa',
    'https://www.youtube.com/@SignificaDotCo',
    'https://x.com/significadotco'
  ]
} as const;

/**
 * Labels for intermediate breadcrumb levels. Only sections that exist as real
 * pages are listed; unknown intermediate segments are skipped rather than
 * guessed.
 */
export const BREADCRUMB_SECTION_LABELS = {
  blog: 'Blog',
  projects: 'Projects',
  about: 'About',
  handbook: 'Handbook',
  careers: 'Careers'
} as const satisfies Record<string, string>;

/**
 * Landing pages that describe a service Significa sells (industries and
 * deliverables). These get a `Service` node generated from code. Landing pages
 * that are not services (for example /b-corp) are intentionally absent.
 *
 * Adding a new service landing page in Storyblok? Add its slug here.
 */
export const SERVICE_LANDING_PAGE_SLUGS = [
  // Industries
  'art-culture',
  'finance',
  'hospitality',
  'health-wellness',
  'sports',
  // Deliverables
  'web-app',
  'website',
  'mobile-app',
  'e-commerce',
  'e-commerce-design-development'
] as const;

/** Landing pages known not to be services. Used by tests to catch unclassified pages. */
export const NON_SERVICE_LANDING_PAGE_SLUGS = ['b-corp'] as const;

/** Social profile hosts accepted as `sameAs` for a Person. */
export const PROFILE_HOSTS = [
  'linkedin.com',
  'x.com',
  'twitter.com',
  'github.com',
  'behance.net',
  'dribbble.com',
  'instagram.com',
  'read.cv',
  'medium.com'
] as const;
