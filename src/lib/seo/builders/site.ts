import type { Organization, WebSite } from 'schema-dts';
import { buildImageObject, type ImageObjectNode } from '../content';
import { LOGO_ID, ORGANIZATION_ID, SITE_LANGUAGE, WEBSITE_ID } from '../constants';
import type { OrganizationData } from '../types';

export function buildOrganization(data: OrganizationData): Organization {
  const address = data.address;
  const hasAddress = Boolean(
    address &&
      (address.streetAddress ||
        address.addressLocality ||
        address.postalCode ||
        address.addressCountry)
  );

  return {
    '@type': 'Organization',
    '@id': ORGANIZATION_ID,
    name: data.name,
    url: data.url,
    logo: { '@id': LOGO_ID },
    image: { '@id': LOGO_ID },
    ...(data.email ? { email: data.email } : {}),
    ...(hasAddress && address
      ? {
          address: {
            '@type': 'PostalAddress',
            ...(address.streetAddress ? { streetAddress: address.streetAddress } : {}),
            ...(address.addressLocality ? { addressLocality: address.addressLocality } : {}),
            ...(address.postalCode ? { postalCode: address.postalCode } : {}),
            ...(address.addressCountry ? { addressCountry: address.addressCountry } : {})
          }
        }
      : {}),
    ...(data.sameAs.length ? { sameAs: [...data.sameAs] } : {})
  };
}

export function buildWebSite(data: OrganizationData): WebSite {
  return {
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    url: data.url,
    name: data.name,
    inLanguage: SITE_LANGUAGE,
    publisher: { '@id': ORGANIZATION_ID }
  };
}

/** The logo is its own node so Organization can reference it by @id. */
export function buildLogo(data: OrganizationData): ImageObjectNode {
  return buildImageObject({ ...data.logo, caption: data.name }, LOGO_ID);
}
