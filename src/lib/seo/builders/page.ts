import type { BreadcrumbList, ItemList, ListItem, WebPage } from 'schema-dts';
import {
  BREADCRUMB_SECTION_LABELS,
  ORGANIZATION_ID,
  SITE_LANGUAGE,
  SITE_URL,
  WEBSITE_ID
} from '../constants';
import type { ListItemInput, PageSchemaInput } from '../types';
import { canonicalFromPath, pageNodeIds } from '../urls';

const isSection = (segment: string): segment is keyof typeof BREADCRUMB_SECTION_LABELS =>
  Object.hasOwn(BREADCRUMB_SECTION_LABELS, segment);

export type WebPageType = 'WebPage' | 'CollectionPage' | 'ProfilePage';

type WebPageOptions = {
  type: WebPageType;
  /** Points `about` at the Organization (institutional pages). */
  aboutOrganization: boolean;
  /** `@id` of the node the page is mainly about. */
  mainEntityId?: string;
  hasBreadcrumb: boolean;
  hasPrimaryImage: boolean;
};

export function buildWebPage(input: PageSchemaInput, options: WebPageOptions): WebPage {
  const ids = pageNodeIds(input.url);

  return {
    '@type': options.type,
    '@id': ids.webpage,
    url: input.url,
    name: input.title,
    ...(input.description ? { description: input.description } : {}),
    inLanguage: SITE_LANGUAGE,
    isPartOf: { '@id': WEBSITE_ID },
    publisher: { '@id': ORGANIZATION_ID },
    ...(options.aboutOrganization ? { about: { '@id': ORGANIZATION_ID } } : {}),
    ...(options.mainEntityId ? { mainEntity: { '@id': options.mainEntityId } } : {}),
    ...(options.hasBreadcrumb ? { breadcrumb: { '@id': ids.breadcrumb } } : {}),
    ...(options.hasPrimaryImage
      ? {
          primaryImageOfPage: { '@id': ids.primaryImage },
          image: { '@id': ids.primaryImage }
        }
      : {}),
    ...(input.datePublished ? { datePublished: input.datePublished } : {}),
    ...(input.dateModified ? { dateModified: input.dateModified } : {})
  };
}

/**
 * Breadcrumbs follow the URL hierarchy. Intermediate levels are only included
 * when they are a known section page (see `BREADCRUMB_SECTION_LABELS`).
 * Returns undefined for the home page.
 */
export function buildBreadcrumb(input: PageSchemaInput): BreadcrumbList | undefined {
  const url = new URL(input.url);
  if (url.origin !== SITE_URL) return undefined;

  const segments = url.pathname.split('/').filter(Boolean);
  if (segments.length === 0) return undefined;

  const crumbs: ListItemInput[] = [{ url: `${SITE_URL}/`, name: 'Home' }];

  segments.slice(0, -1).forEach((segment, index) => {
    if (index === 0 && isSection(segment)) {
      crumbs.push({
        url: canonicalFromPath(`/${segment}`),
        name: BREADCRUMB_SECTION_LABELS[segment]
      });
    }
  });

  crumbs.push({ url: input.url, name: input.breadcrumbName || input.title });

  return {
    '@type': 'BreadcrumbList',
    '@id': pageNodeIds(input.url).breadcrumb,
    itemListElement: crumbs.map(
      (crumb, index): ListItem => ({
        '@type': 'ListItem',
        position: index + 1,
        name: crumb.name,
        item: crumb.url
      })
    )
  };
}

export function buildItemList(pageUrl: string, items: ListItemInput[]): ItemList {
  return {
    '@type': 'ItemList',
    '@id': pageNodeIds(pageUrl).itemList,
    numberOfItems: items.length,
    itemListElement: items.map(
      (item, index): ListItem => ({
        '@type': 'ListItem',
        position: index + 1,
        url: item.url,
        name: item.name
      })
    )
  };
}
