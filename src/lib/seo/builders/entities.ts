import type {
  Article,
  BlogPosting,
  CreativeWork,
  FAQPage,
  Person,
  Question,
  Service
} from 'schema-dts';
import { ARTICLE_IMAGE_CROPS, ORGANIZATION_ID, SITE_LANGUAGE, WEBSITE_ID } from '../constants';
import { storyblokCrop } from '../content';
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

/**
 * Article images: the primary ImageObject plus the 16:9, 4:3 and 1:1 crops
 * Google recommends for article results.
 */
function articleImages(input: PageSchemaInput) {
  if (!input.primaryImage) return undefined;
  const image = input.primaryImage;
  const crops = ARTICLE_IMAGE_CROPS.map(([w, h]) => storyblokCrop(image, w, h)).filter(
    (url): url is string => !!url
  );
  return [{ '@id': pageNodeIds(input.url).primaryImage }, ...crops];
}

export function buildBlogPosting(
  input: PageSchemaInput,
  data: {
    headline: string;
    authors: AuthorInput[];
    keywords: string[];
    readingMinutes?: number;
    wordCount?: number;
  }
): BlogPosting {
  const images = articleImages(input);
  const ids = pageNodeIds(input.url);
  const author = data.authors.length ? data.authors.map(buildAuthor) : { '@id': ORGANIZATION_ID };

  return {
    '@type': 'BlogPosting',
    '@id': ids.article,
    headline: data.headline,
    ...(input.description ? { description: input.description } : {}),
    url: input.url,
    ...(images ? { image: images } : {}),
    ...(input.datePublished ? { datePublished: input.datePublished } : {}),
    ...(input.dateModified ? { dateModified: input.dateModified } : {}),
    author,
    publisher: { '@id': ORGANIZATION_ID },
    mainEntityOfPage: { '@id': ids.webpage },
    isPartOf: { '@id': WEBSITE_ID },
    ...(data.keywords.length ? { keywords: data.keywords.join(', ') } : {}),
    ...(data.readingMinutes ? { timeRequired: `PT${data.readingMinutes}M` } : {}),
    ...(data.wordCount ? { wordCount: data.wordCount } : {}),
    inLanguage: SITE_LANGUAGE
  };
}

/** Long-form pages written by Significa itself (handbook). */
export function buildArticle(input: PageSchemaInput, data: { headline: string }): Article {
  const ids = pageNodeIds(input.url);
  const images = articleImages(input);

  return {
    '@type': 'Article',
    '@id': ids.article,
    headline: data.headline,
    ...(input.description ? { description: input.description } : {}),
    url: input.url,
    ...(images ? { image: images } : {}),
    ...(input.datePublished ? { datePublished: input.datePublished } : {}),
    ...(input.dateModified ? { dateModified: input.dateModified } : {}),
    author: { '@id': ORGANIZATION_ID },
    publisher: { '@id': ORGANIZATION_ID },
    mainEntityOfPage: { '@id': ids.webpage },
    isPartOf: { '@id': WEBSITE_ID },
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
    awards: string[];
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
    ...(data.awards.length ? { award: data.awards } : {}),
    ...(input.datePublished ? { datePublished: input.datePublished } : {}),
    ...(input.dateModified ? { dateModified: input.dateModified } : {}),
    inLanguage: SITE_LANGUAGE,
    mainEntityOfPage: { '@id': ids.webpage }
  };
}

export function buildService(
  input: PageSchemaInput,
  data: { name: string; description?: string; audience?: string; serviceType?: string }
): Service {
  return {
    '@type': 'Service',
    '@id': pageNodeIds(input.url).service,
    name: data.name,
    ...(data.description ? { description: data.description } : {}),
    url: input.url,
    ...(data.serviceType ? { serviceType: data.serviceType } : {}),
    ...(data.audience
      ? { audience: { '@type': 'BusinessAudience', audienceType: data.audience } }
      : {}),
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
