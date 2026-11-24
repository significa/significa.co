import { BYPASS_TOKEN } from '$env/static/private';
import { resolver } from '$components/rich-text.svelte';
import { HOME_SLUG } from '$lib/constants';
import { htmlFragmentToMarkdown } from '$lib/markdown/html-to-markdown';
import {
  buildLlmsFull,
  stripFrontMatter,
  type LlmsFullEntry,
  type LlmsFullSection
} from '$lib/markdown/llms-full';
import { markdownTwinPath } from '$lib/markdown/paths';
import {
  DELIVERABLE_LANDING_PAGE_SLUGS,
  INDUSTRY_LANDING_PAGE_SLUGS,
  ORGANIZATION_FALLBACK,
  SITE_URL
} from '$lib/seo/constants';
import { canonicalFromSlug } from '$lib/seo/urls';
import { getStoryblok } from '$lib/storyblok';
import type { ISbRichtext, ISbStoryData } from '@storyblok/js';
import type { RequestHandler } from './$types';

type Story = ISbStoryData<Record<string, unknown>>;

/** Company pages built from blocks, in the order they appear in the file. */
const COMPANY_PAGES = [HOME_SLUG, 'about', 'services', 'careers', 'b-corp', 'legal'];

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

const text = (value: unknown) => (typeof value === 'string' && value.trim() ? value.trim() : '');

const isRichText = (value: unknown): value is ISbRichtext =>
  isRecord(value) && value.type === 'doc' && Array.isArray(value.content);

const richText = (value: unknown) =>
  isRichText(value) ? htmlFragmentToMarkdown(resolver.render(value)) : '';

const list = (values: unknown) =>
  Array.isArray(values) ? values.map((value) => text(String(value))).filter(Boolean) : [];

const hidden = (story: Story) =>
  story.content.no_index === true || story.content.hide_from_listings === true;

export const GET: RequestHandler = async ({ fetch, locals }) => {
  const storyblok = getStoryblok({ fetch });

  async function stories(params: Record<string, string>): Promise<Story[]> {
    const all: Story[] = [];
    for (let page = 1; ; page++) {
      const res = await storyblok.get('cdn/stories', {
        version: locals.version,
        per_page: 100,
        page,
        ...params
      });
      const batch: Story[] = res.data.stories;
      all.push(...batch);
      if (batch.length < 100) return all;
    }
  }

  /** Pages built from blocks reuse their Markdown twin, so the text is what the page renders. */
  async function twin(slug: string, title: string): Promise<LlmsFullEntry | undefined> {
    const url = canonicalFromSlug(slug);
    const path = new URL(url).pathname;
    const response = await fetch(markdownTwinPath(path));
    if (!response.ok) return undefined;
    const markdown = await response.text();
    const dates = markdown.match(/^---\n([\s\S]*?)\n---/)?.[1] ?? '';
    const field = (name: string) => dates.match(new RegExp(`^${name}: "(.*)"$`, 'm'))?.[1];
    return {
      title,
      url,
      datePublished: field('datePublished'),
      dateModified: field('dateModified'),
      markdown: stripFrontMatter(markdown)
    };
  }

  async function twins(items: { slug: string; title: string }[]) {
    const entries: LlmsFullEntry[] = [];
    // A few at a time: each twin renders a full page.
    for (let i = 0; i < items.length; i += 4) {
      const batch = await Promise.all(
        items.slice(i, i + 4).map((item) => twin(item.slug, item.title))
      );
      entries.push(...batch.filter((entry): entry is LlmsFullEntry => entry !== undefined));
    }
    return entries;
  }

  const [pages, landingPages, projects, posts, handbook] = await Promise.all([
    stories({ content_type: 'page' }),
    stories({ content_type: 'landing-page' }),
    stories({ content_type: 'project', sort_by: 'first_published_at:desc' }),
    stories({
      content_type: 'blog-post',
      sort_by: 'first_published_at:desc',
      resolve_relations: 'blog-post.authors'
    }),
    stories({ content_type: 'handbook', starts_with: 'handbook/' })
  ]);

  const bySlug = new Map(
    [...pages, ...landingPages].map((story) => [story.full_slug.replace(/\/$/, ''), story])
  );
  const landing = (slugs: readonly string[]) =>
    slugs
      .map((slug) => bySlug.get(slug))
      .filter((story): story is Story => story !== undefined)
      .map((story) => ({ slug: story.full_slug, title: story.name }));

  const [company, industries, deliverables] = await Promise.all([
    twins(landing(COMPANY_PAGES)),
    twins(landing(INDUSTRY_LANDING_PAGE_SLUGS)),
    twins(landing(DELIVERABLE_LANDING_PAGE_SLUGS))
  ]);

  const projectEntries: LlmsFullEntry[] = projects
    .filter((story) => !hidden(story))
    .map((story) => {
      const facts = [
        text(story.content.client) && `Client: ${text(story.content.client)}`,
        list(story.content.services).length &&
          `Services: ${list(story.content.services).join(', ')}`,
        list(story.content.deliverables).length &&
          `Deliverables: ${list(story.content.deliverables).join(', ')}`
      ].filter(Boolean);
      return {
        title: story.name,
        url: canonicalFromSlug(story.full_slug),
        datePublished: story.first_published_at ?? undefined,
        dateModified: story.published_at ?? undefined,
        markdown: [
          text(story.content.tagline),
          facts.join('\n\n'),
          text(story.content.intro),
          richText(story.content.body)
        ]
          .filter(Boolean)
          .join('\n\n')
      };
    });

  const postEntries: LlmsFullEntry[] = posts
    .filter((story) => !hidden(story))
    .map((story) => {
      const authors = (Array.isArray(story.content.authors) ? story.content.authors : [])
        .map((author) => (isRecord(author) ? text(author.name) : ''))
        .filter(Boolean);
      const facts = [
        authors.length && `By ${authors.join(', ')}`,
        story.tag_list.length && `Topics: ${story.tag_list.join(', ')}`
      ].filter(Boolean);
      return {
        title: story.name,
        url: canonicalFromSlug(story.full_slug),
        datePublished: story.first_published_at ?? undefined,
        dateModified: story.published_at ?? undefined,
        markdown: [facts.join('\n\n'), text(story.content.intro), richText(story.content.body)]
          .filter(Boolean)
          .join('\n\n')
      };
    });

  const handbookEntries: LlmsFullEntry[] = handbook.map((story) => ({
    title: story.name,
    url: canonicalFromSlug(story.full_slug),
    datePublished: story.first_published_at ?? undefined,
    dateModified: text(story.content.last_updated) || story.published_at || undefined,
    markdown: richText(story.content.body)
  }));

  const sections: LlmsFullSection[] = [
    { title: 'Company', entries: company },
    { title: 'Industries', entries: industries },
    { title: 'Deliverables', entries: deliverables },
    { title: 'Projects', entries: projectEntries },
    { title: 'Blog', entries: postEntries },
    { title: 'Handbook', entries: handbookEntries }
  ];

  const body = buildLlmsFull({
    name: ORGANIZATION_FALLBACK.name,
    summary: ORGANIZATION_FALLBACK.description,
    indexUrl: `${SITE_URL}/llms.txt`,
    sections
  });

  return new Response(body, {
    headers: { 'content-type': 'text/plain; charset=utf-8' }
  });
};

// Rebuilt at most once an hour; content changes in Storyblok show up after that.
export const config = {
  isr: { expiration: 3600, bypassToken: BYPASS_TOKEN },
  maxDuration: 60
};
