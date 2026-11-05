import { collectDefinedIds } from './graph';
import { nodeTypes } from './manual';
import type { JsonLdGraph } from './types';
import { isCanonicalUrl } from './urls';

/** Types that may appear at most once per page as top-level nodes. */
export const SINGLETON_TYPES = [
  'Organization',
  'WebSite',
  'WebPage',
  'CollectionPage',
  'ProfilePage',
  'BreadcrumbList',
  'BlogPosting',
  'Article',
  'Person',
  'CreativeWork',
  'Service',
  'FAQPage',
  'ItemList',
  'HowTo'
] as const;

const WEBPAGE_TYPES = ['WebPage', 'CollectionPage', 'ProfilePage', 'AboutPage', 'ContactPage'];
const URL_KEYS = new Set(['url', 'item', 'contentUrl', 'mainEntityOfPage']);

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

/**
 * Checks the invariants every page graph must hold. Returns a list of
 * human-readable problems; an empty list means the graph is valid.
 */
export function validateGraph(graph: JsonLdGraph): string[] {
  const errors: string[] = [];
  const nodes = graph['@graph'];

  if (graph['@context'] !== 'https://schema.org')
    errors.push('@context must be https://schema.org');

  // Exactly one Organization with name and url.
  const orgs = nodes.filter((n) => nodeTypes(n).includes('Organization'));
  if (orgs.length !== 1) errors.push(`Expected exactly 1 Organization, found ${orgs.length}`);
  orgs.forEach((org) => {
    if (typeof org.name !== 'string' || !org.name) errors.push('Organization is missing name');
    if (typeof org.url !== 'string' || !org.url) errors.push('Organization is missing url');
  });

  // Duplicate @id between top-level nodes. Nested Person definitions (blog
  // authors, project contributors) describe other pages and are not counted.
  const topLevel = new Map<string, number>();
  nodes.forEach((n) => {
    if (typeof n['@id'] === 'string') topLevel.set(n['@id'], (topLevel.get(n['@id']) ?? 0) + 1);
  });
  topLevel.forEach((count, id) => {
    if (count > 1) errors.push(`Duplicate @id: ${id}`);
  });

  // At most one top-level node per main type.
  for (const type of SINGLETON_TYPES) {
    const count = nodes.filter((n) => nodeTypes(n).includes(type)).length;
    if (count > 1) errors.push(`More than one ${type} node (${count})`);
  }
  const webPages = nodes.filter((n) => nodeTypes(n).some((t) => WEBPAGE_TYPES.includes(t)));
  if (webPages.length > 1) errors.push(`More than one WebPage-like node (${webPages.length})`);

  // Every reference must resolve to a node in the graph.
  const defined = collectDefinedIds(nodes);
  const walkRefs = (value: unknown, path: string) => {
    if (Array.isArray(value)) return value.forEach((v, i) => walkRefs(v, `${path}[${i}]`));
    if (!isRecord(value)) return;
    if (typeof value['@id'] === 'string' && Object.keys(value).length === 1) {
      if (!defined.has(value['@id'])) errors.push(`Dangling reference at ${path}: ${value['@id']}`);
      return;
    }
    Object.entries(value).forEach(([k, v]) => walkRefs(v, `${path}.${k}`));
  };
  nodes.forEach((n, i) => walkRefs(n, `@graph[${i}]`));

  // BlogPosting required properties.
  nodes
    .filter((n) => nodeTypes(n).includes('BlogPosting'))
    .forEach((post) => {
      for (const key of ['headline', 'datePublished', 'author', 'publisher', 'image']) {
        if (post[key] === undefined || post[key] === '') {
          errors.push(`BlogPosting is missing ${key}`);
        }
      }
    });

  // URLs must be absolute and canonical; ids must be absolute https.
  const walkUrls = (value: unknown, path: string) => {
    if (Array.isArray(value)) return value.forEach((v, i) => walkUrls(v, `${path}[${i}]`));
    if (!isRecord(value)) return;
    for (const [key, child] of Object.entries(value)) {
      if (typeof child === 'string') {
        if (URL_KEYS.has(key) && (!isCanonicalUrl(child) || child.includes('#'))) {
          errors.push(`Non-canonical URL at ${path}.${key}: ${child}`);
        }
        if (key === '@id' && !child.startsWith('https://')) {
          errors.push(`@id is not an absolute https URL at ${path}: ${child}`);
        }
        if (key === 'sameAs' && !isCanonicalUrl(child)) {
          errors.push(`sameAs is not an absolute https URL at ${path}: ${child}`);
        }
      } else if (key === 'sameAs' && Array.isArray(child)) {
        child.forEach((url, i) => {
          if (typeof url !== 'string' || !isCanonicalUrl(url)) {
            errors.push(`sameAs is not an absolute https URL at ${path}.sameAs[${i}]`);
          }
        });
      } else {
        walkUrls(child, `${path}.${key}`);
      }
    }
  };
  nodes.forEach((n, i) => walkUrls(n, `@graph[${i}]`));

  return errors;
}
