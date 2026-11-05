/**
 * Maps Storyblok stories to schema input. This is the only file that knows
 * about CMS field names; builders only see typed, CMS-agnostic data.
 */
import type {
  BlogPostPage,
  CareerPage,
  DynamicPage,
  HandbookPage,
  LandingPage,
  Page,
  ProjectPage,
  TeamMemberPage
} from '$lib/content';
import type { ExternalAuthorStoryblok, FaqsStoryblok, TeamMemberStoryblok } from '$types/bloks';
import type { ISbStoryData } from '@storyblok/js';
import { HOME_SLUG } from '../constants';
import {
  collectVisibleText,
  imageFromAsset,
  richTextToPlainText,
  toIsoDate,
  type ImageInput
} from './content';
import { ORGANIZATION_FALLBACK, PROFILE_HOSTS, SERVICE_LANDING_PAGE_SLUGS } from './constants';
import type { AuthorInput, FaqItem, ListItemInput, OrganizationData, SchemaEntity } from './types';
import { canonicalFromSlug, normalizeUrl } from './urls';

/** Everything about a page's schema that comes from the CMS (title and description come from `<Seo>`). */
export type StorySchemaParts = {
  entity: SchemaEntity;
  breadcrumbName?: string;
  primaryImage?: ImageInput;
  datePublished?: string;
  dateModified?: string;
  faqs?: FaqItem[];
  manual?: string | null;
  visibleText?: string[];
  canonicalOverride?: string | null;
};

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

const str = (value: unknown): string | undefined =>
  typeof value === 'string' && value.trim() ? value.trim() : undefined;

type ResolvedTeamMember = Pick<ISbStoryData<TeamMemberStoryblok>, 'name' | 'slug' | 'content'>;

const isResolvedTeamMember = (value: unknown): value is ResolvedTeamMember =>
  isRecord(value) &&
  typeof value.slug === 'string' &&
  typeof value.name === 'string' &&
  isRecord(value.content);

const isFaqsBlock = (value: unknown): value is FaqsStoryblok =>
  isRecord(value) && value.component === 'faqs';

/** FAQs rendered by `faqs` blocks anywhere in the story content. */
export function faqsFromContent(content: unknown): FaqItem[] {
  const faqs: FaqItem[] = [];
  const walk = (value: unknown) => {
    if (Array.isArray(value)) return value.forEach(walk);
    if (!isRecord(value)) return;
    if (isFaqsBlock(value)) {
      for (const item of value.questions ?? []) {
        const question = str(item.question);
        const answer = richTextToPlainText(item.body);
        if (question && answer) faqs.push({ question, answer });
      }
      return;
    }
    Object.values(value).forEach(walk);
  };
  walk(content);
  return faqs;
}

const storyDates = (story: Pick<ISbStoryData, 'first_published_at' | 'published_at'>) => ({
  datePublished: toIsoDate(story.first_published_at),
  dateModified: toIsoDate(story.published_at) ?? toIsoDate(story.first_published_at)
});

const visibleText = (story: Pick<ISbStoryData, 'name' | 'content'>) => [
  story.name,
  ...collectVisibleText(story.content)
];

const stringList = (values: unknown): string[] =>
  Array.isArray(values)
    ? values
        .map((v) => (typeof v === 'number' ? String(v) : str(v)))
        .filter((v): v is string => !!v)
    : [];

function teamMemberToAuthor(member: ResolvedTeamMember): AuthorInput {
  return {
    kind: 'team-member',
    slug: member.slug,
    name: member.name,
    jobTitle: str(member.content.position),
    isActive: Boolean(member.content.is_active),
    image: imageFromAsset(member.content.photo)
  };
}

/** `reading_time` is free text in the CMS ("5", "5 min"); keep it only when it is a whole number. */
const readingMinutes = (value: unknown): number | undefined => {
  const match = typeof value === 'string' ? value.trim().match(/^(\d+)/) : null;
  const minutes = match ? Number(match[1]) : NaN;
  return Number.isInteger(minutes) && minutes > 0 ? minutes : undefined;
};

export function blogPostParts(story: BlogPostPage): StorySchemaParts {
  const authors: unknown[] = story.content.authors ?? [];
  const internal = authors.filter(isResolvedTeamMember).map(teamMemberToAuthor);
  // BlogPostPage is built with Omit<>, which widens CMS fields to `any`: re-type them here.
  const externalAuthors: ExternalAuthorStoryblok[] = story.content.external_authors ?? [];
  const external = externalAuthors
    .filter((author) => str(author.name))
    .map(
      (author): AuthorInput => ({
        kind: 'external',
        name: author.name.trim(),
        jobTitle: str(author.position)
      })
    );

  return {
    entity: {
      kind: 'blog-post',
      headline: story.name,
      authors: [...internal, ...external],
      keywords: story.tag_list ?? [],
      readingMinutes: readingMinutes(story.content.reading_time)
    },
    breadcrumbName: story.name,
    primaryImage: imageFromAsset(story.content.cover) ?? imageFromAsset(story.content.seo_og_image),
    ...storyDates(story),
    manual: story.content.structure_data_markup,
    visibleText: visibleText(story),
    canonicalOverride: story.content.seo_canonical_url
  };
}

export function projectParts(story: ProjectPage): StorySchemaParts {
  return {
    entity: {
      kind: 'project',
      name: story.name,
      description: str(story.content.intro) ?? str(story.content.seo_description),
      client: str(story.content.client),
      keywords: [
        ...new Set([
          ...stringList(story.content.services),
          ...stringList(story.content.deliverables)
        ])
      ],
      contributors: (story.content.team ?? [])
        .filter(isResolvedTeamMember)
        .map((member) => ({ slug: member.slug, name: member.name }))
    },
    breadcrumbName: story.name,
    primaryImage: imageFromAsset(story.content.cover) ?? imageFromAsset(story.content.seo_og_image),
    ...storyDates(story),
    manual: story.content.structure_data_markup,
    visibleText: visibleText(story)
  };
}

const isProfileUrl = (url: string) => {
  try {
    const host = new URL(url).host.replace(/^www\./, '');
    return PROFILE_HOSTS.some((allowed) => host === allowed || host.endsWith(`.${allowed}`));
  } catch {
    return false;
  }
};

export function teamMemberParts(story: TeamMemberPage): StorySchemaParts {
  const candidateLinks = [
    ...(story.content.links ?? []).map((link) => link.link),
    ...(story.content.buttons ?? [])
      .filter((button) => button.link_type === 'url')
      .map((button) => button.link)
  ];
  const sameAs = [
    ...new Set(
      candidateLinks
        .map((link) => (link ? normalizeUrl(link) : undefined))
        .filter((link): link is string => !!link && isProfileUrl(link))
    )
  ];

  return {
    entity: {
      kind: 'profile',
      person: {
        name: story.name,
        jobTitle: str(story.content.position),
        isActive: Boolean(story.content.is_active),
        description: str(story.content.bio),
        sameAs
      }
    },
    breadcrumbName: story.name,
    primaryImage: imageFromAsset(story.content.photo),
    ...storyDates(story),
    visibleText: visibleText(story)
  };
}

export const isServiceLandingPage = (slug: string) =>
  (SERVICE_LANDING_PAGE_SLUGS as readonly string[]).includes(slug.replace(/\/+$/, ''));

export function landingPageParts(story: LandingPage): StorySchemaParts {
  const entity: SchemaEntity = isServiceLandingPage(story.full_slug)
    ? { kind: 'service', name: story.name, description: str(story.content.seo_description) }
    : { kind: 'page', institutional: true };

  return {
    entity,
    breadcrumbName: story.name,
    primaryImage: imageFromAsset(story.content.seo_og_image),
    ...storyDates(story),
    faqs: faqsFromContent(story.content.blocks),
    manual: story.content.structure_data_markup,
    visibleText: visibleText(story),
    canonicalOverride: story.content.seo_canonical_url
  };
}

export function handbookParts(story: HandbookPage): StorySchemaParts {
  return {
    entity: { kind: 'page', institutional: true },
    breadcrumbName: story.name,
    primaryImage: imageFromAsset(story.content.cover) ?? imageFromAsset(story.content.seo_og_image),
    datePublished: toIsoDate(story.first_published_at),
    // `last_updated` is the date shown on the page.
    dateModified: toIsoDate(story.content.last_updated) ?? toIsoDate(story.published_at),
    manual: story.content.structure_data_markup,
    visibleText: visibleText(story),
    canonicalOverride: story.content.seo_canonical_url
  };
}

export function careerParts(story: CareerPage): StorySchemaParts {
  return {
    entity: { kind: 'page', institutional: true },
    breadcrumbName: story.name,
    primaryImage: imageFromAsset(story.content.cover) ?? imageFromAsset(story.content.seo_og_image),
    ...storyDates(story),
    manual: story.content.structure_data_markup,
    visibleText: visibleText(story)
  };
}

export function pageParts(story: Page, collectionItems?: ListItemInput[]): StorySchemaParts {
  const isHome = story.full_slug === HOME_SLUG;
  const entity: SchemaEntity = isHome
    ? { kind: 'home' }
    : collectionItems
      ? { kind: 'collection', items: collectionItems }
      : { kind: 'page', institutional: true };

  return {
    entity,
    breadcrumbName: story.name,
    primaryImage: imageFromAsset(story.content.seo_og_image),
    ...storyDates(story),
    faqs: faqsFromContent(story.content.blocks),
    manual: story.content.structure_data_markup,
    visibleText: visibleText(story),
    canonicalOverride: story.content.seo_canonical_url
  };
}

type StoryByComponent = {
  'blog-post': BlogPostPage;
  project: ProjectPage;
  'team-member': TeamMemberPage;
  'landing-page': LandingPage;
  handbook: HandbookPage;
  career: CareerPage;
  page: Page;
};

export const isStory = <K extends keyof StoryByComponent>(
  story: DynamicPage,
  component: K
): story is StoryByComponent[K] => story.content.component === component;

/** Default parts for any dynamic page, picked by content type. */
export function partsFromStory(story: DynamicPage): StorySchemaParts {
  if (isStory(story, 'blog-post')) return blogPostParts(story);
  if (isStory(story, 'project')) return projectParts(story);
  if (isStory(story, 'team-member')) return teamMemberParts(story);
  if (isStory(story, 'landing-page')) return landingPageParts(story);
  if (isStory(story, 'handbook')) return handbookParts(story);
  if (isStory(story, 'career')) return careerParts(story);
  if (isStory(story, 'page')) return pageParts(story);
  return { entity: { kind: 'page', institutional: true } };
}

export function storiesToListItems(
  stories: Pick<ISbStoryData, 'full_slug' | 'name'>[]
): ListItemInput[] {
  return stories.map((story) => ({ url: canonicalFromSlug(story.full_slug), name: story.name }));
}

/**
 * Organization data from the `configuration` story, falling back to the code
 * constants for any field that is not filled in. See README for the proposed
 * Storyblok fields.
 */
export function organizationFromConfiguration(content: unknown): OrganizationData {
  const config = isRecord(content) ? content : {};
  const fallback = ORGANIZATION_FALLBACK;

  const logoAsset = isRecord(config.org_logo) ? config.org_logo : undefined;
  const logo =
    logoAsset && typeof logoAsset.filename === 'string' && logoAsset.filename
      ? imageFromAsset({ filename: logoAsset.filename })
      : undefined;

  const sameAs = Array.isArray(config.org_same_as)
    ? config.org_same_as
        .map((entry) => (isRecord(entry) ? (str(entry.url) ?? str(entry.link)) : str(entry)))
        .map((url) => (url ? normalizeUrl(url) : undefined))
        .filter((url): url is string => !!url)
    : [];

  return {
    name: str(config.org_name) ?? fallback.name,
    url: normalizeUrl(str(config.org_url) ?? '')?.replace(/\/$/, '') ?? fallback.url,
    email: str(config.org_email) ?? fallback.email,
    logo: logo ? { url: logo.url, width: logo.width, height: logo.height } : { ...fallback.logo },
    address: {
      streetAddress: str(config.org_street_address) ?? fallback.address.streetAddress,
      addressLocality: str(config.org_address_locality) ?? fallback.address.addressLocality,
      postalCode: str(config.org_postal_code),
      addressCountry: str(config.org_address_country) ?? fallback.address.addressCountry
    },
    sameAs: sameAs.length ? sameAs : [...fallback.sameAs]
  };
}
