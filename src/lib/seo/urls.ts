import { HOME_SLUG } from '../constants';
import { NODE_FRAGMENT, SITE_URL, type NodeFragment } from './constants';

const SITE_HOST = new URL(SITE_URL).host;

/**
 * Builds the canonical URL for a path: production origin, https, no query
 * string, no hash and no trailing slash (except the home page, which is `/`).
 */
export function canonicalFromPath(pathname: string): string {
  const clean = pathname.split(/[?#]/)[0].replace(/\/+$/, '').replace(/^\/+/, '');
  if (!clean || clean === HOME_SLUG) return `${SITE_URL}/`;
  return `${SITE_URL}/${clean}`;
}

/** Turns a Storyblok `full_slug` into the canonical page URL. */
export function canonicalFromSlug(fullSlug: string): string {
  return canonicalFromPath(fullSlug);
}

/** Query parameters that only track a visit and never identify a resource. */
const TRACKING_PARAMS =
  /^(utm_.+|fbclid|gclid|dclid|gbraid|wbraid|msclkid|mc_cid|mc_eid|igshid|_hsenc|_hsmi|yclid)$/i;

/**
 * Normalises any URL (absolute or relative).
 * Relative URLs and URLs on the Significa host become canonical page URLs on
 * `SITE_URL` (no query, no hash). External URLs are forced to https and lose
 * tracking parameters only: other query parameters can identify the resource
 * (for example YouTube's `?v=`). Returns `undefined` for values that are not URLs.
 */
export function normalizeUrl(value: string): string | undefined {
  const trimmed = value.trim();
  if (!trimmed) return undefined;

  if (trimmed.startsWith('/') && !trimmed.startsWith('//')) {
    return canonicalFromPath(trimmed);
  }

  let parsed: URL;
  try {
    parsed = new URL(trimmed);
  } catch {
    return undefined;
  }

  if (parsed.protocol !== 'https:' && parsed.protocol !== 'http:') return undefined;

  const host = parsed.host.replace(/^www\./, '');
  if (host === SITE_HOST) return canonicalFromPath(parsed.pathname);

  parsed.protocol = 'https:';
  [...parsed.searchParams.keys()]
    .filter((key) => TRACKING_PARAMS.test(key))
    .forEach((key) => parsed.searchParams.delete(key));
  return parsed.toString();
}

/** Resolves the canonical URL for a page, honouring the CMS override if set. */
export function resolveCanonical(pathname: string, override?: string | null): string {
  if (override) {
    const normalized = normalizeUrl(override);
    if (normalized) return normalized;
  }
  return canonicalFromPath(pathname);
}

/** `<canonical url>#<fragment>` */
export function nodeId(pageUrl: string, fragment: NodeFragment | string): string {
  return `${pageUrl}#${fragment}`;
}

export const pageNodeIds = (pageUrl: string) => ({
  webpage: nodeId(pageUrl, NODE_FRAGMENT.webpage),
  article: nodeId(pageUrl, NODE_FRAGMENT.article),
  person: nodeId(pageUrl, NODE_FRAGMENT.person),
  project: nodeId(pageUrl, NODE_FRAGMENT.project),
  breadcrumb: nodeId(pageUrl, NODE_FRAGMENT.breadcrumb),
  primaryImage: nodeId(pageUrl, NODE_FRAGMENT.primaryImage),
  service: nodeId(pageUrl, NODE_FRAGMENT.service),
  faq: nodeId(pageUrl, NODE_FRAGMENT.faq),
  itemList: nodeId(pageUrl, NODE_FRAGMENT.itemList)
});

/** The `#person` id of a team member's profile page. */
export const personIdFromSlug = (slug: string) =>
  nodeId(canonicalFromPath(`/about/${slug}`), NODE_FRAGMENT.person);

/** True when a URL is absolute https with no query string or hash. */
export function isCanonicalUrl(value: string): boolean {
  try {
    const url = new URL(value);
    return url.protocol === 'https:' && url.search === '' && !value.includes('?');
  } catch {
    return false;
  }
}

/** True when a URL is absolute https. */
export function isAbsoluteHttps(value: string): boolean {
  try {
    return new URL(value).protocol === 'https:';
  } catch {
    return false;
  }
}

/** True when a URL points at the Significa site. */
export function isSiteUrl(value: string): boolean {
  try {
    return new URL(value).host.replace(/^www\./, '') === SITE_HOST;
  } catch {
    return false;
  }
}
