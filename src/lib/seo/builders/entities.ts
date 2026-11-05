import type { BlogPosting, CreativeWork, FAQPage, Person, Question, Service } from 'schema-dts';
import { ORGANIZATION_ID, SITE_LANGUAGE, WEBSITE_ID } from '../constants';
import type { AuthorInput, FaqItem, PageSchemaInput, PersonInput } from '../types';
import { canonicalFromPath, pageNodeIds, personIdFromSlug } from '../urls';

function buildAuthor(author: AuthorInput): Person {
  if (author.kind === 'external') {
    return {
      '@type': 'Person',
      name: author.name,
      ...(author.jobTitle ? { jobTitle: author.jobTitle } : {})
    };
  }

  return {
    '@type': 'Person',
    '@id': personIdFromSlug(author.slug),
    name: author.name,
    url: canonicalFromPath(`/about/${author.slug}`),
    ...(author.jobTitle ? { jobTitle: author.jobTitle } : {}),
    ...(author.image ? { image: author.image.url } : {}),
    ...(author.isActive ? { worksFor: { '@id': ORGANIZATION_ID } } : {})
  };
}

export function buildBlogPosting(
  input: PageSchemaInput,
  data: { headline: string; authors: AuthorInput[]; keywords: string[]; readingMinutes?: number }
): BlogPosting {
  const ids = pageNodeIds(input.url);
  const author = data.authors.length ? data.authors.map(buildAuthor) : { '@id': ORGANIZATION_ID };

  return {
    '@type': 'BlogPosting',
    '@id': ids.article,
    headline: data.headline,
    ...(input.description ? { description: input.description } : {}),
    url: input.url,
    ...(input.primaryImage ? { image: { '@id': ids.primaryImage } } : {}),
    ...(input.datePublished ? { datePublished: input.datePublished } : {}),
    ...(input.dateModified ? { dateModified: input.dateModified } : {}),
    author,
    publisher: { '@id': ORGANIZATION_ID },
    mainEntityOfPage: { '@id': ids.webpage },
    isPartOf: { '@id': WEBSITE_ID },
    ...(data.keywords.length ? { keywords: data.keywords.join(', ') } : {}),
    ...(data.readingMinutes ? { timeRequired: `PT${data.readingMinutes}M` } : {}),
    inLanguage: SITE_LANGUAGE
  };
}

export function buildPerson(input: PageSchemaInput, person: PersonInput): Person {
  const ids = pageNodeIds(input.url);

  return {
    '@type': 'Person',
    '@id': ids.person,
    name: person.name,
    url: input.url,
    ...(person.jobTitle ? { jobTitle: person.jobTitle } : {}),
    ...(person.description ? { description: person.description } : {}),
    ...(input.primaryImage ? { image: { '@id': ids.primaryImage } } : {}),
    ...(person.isActive ? { worksFor: { '@id': ORGANIZATION_ID } } : {}),
    ...(person.sameAs.length ? { sameAs: person.sameAs } : {}),
    mainEntityOfPage: { '@id': ids.webpage }
  };
}

export function buildProject(
  input: PageSchemaInput,
  data: {
    name: string;
    description?: string;
    client?: string;
    keywords: string[];
    contributors: { slug: string; name: string }[];
  }
): CreativeWork {
  const ids = pageNodeIds(input.url);

  return {
    '@type': 'CreativeWork',
    '@id': ids.project,
    name: data.name,
    ...(data.description ? { description: data.description } : {}),
    url: input.url,
    ...(input.primaryImage ? { image: { '@id': ids.primaryImage } } : {}),
    creator: { '@id': ORGANIZATION_ID },
    ...(data.client ? { sourceOrganization: { '@type': 'Organization', name: data.client } } : {}),
    ...(data.contributors.length
      ? {
          contributor: data.contributors.map(
            (member): Person => ({
              '@type': 'Person',
              '@id': personIdFromSlug(member.slug),
              name: member.name,
              url: canonicalFromPath(`/about/${member.slug}`)
            })
          )
        }
      : {}),
    ...(data.keywords.length ? { keywords: data.keywords.join(', ') } : {}),
    ...(input.datePublished ? { datePublished: input.datePublished } : {}),
    ...(input.dateModified ? { dateModified: input.dateModified } : {}),
    inLanguage: SITE_LANGUAGE,
    mainEntityOfPage: { '@id': ids.webpage }
  };
}

export function buildService(
  input: PageSchemaInput,
  data: { name: string; description?: string }
): Service {
  return {
    '@type': 'Service',
    '@id': pageNodeIds(input.url).service,
    name: data.name,
    ...(data.description ? { description: data.description } : {}),
    url: input.url,
    provider: { '@id': ORGANIZATION_ID }
  };
}

export function buildFaqPage(input: PageSchemaInput, faqs: FaqItem[]): FAQPage {
  return {
    '@type': 'FAQPage',
    '@id': pageNodeIds(input.url).faq,
    isPartOf: { '@id': pageNodeIds(input.url).webpage },
    mainEntity: faqs.map(
      (faq): Question => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: { '@type': 'Answer', text: faq.answer }
      })
    )
  };
}
