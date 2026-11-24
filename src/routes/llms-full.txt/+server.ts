import { BYPASS_TOKEN } from '$env/static/private';
import { error } from '@sveltejs/kit';
import { HOME_SLUG } from '$lib/constants';
import {
  buildLlmsFull,
  parseTwin,
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
import type { ISbStoryData } from '@storyblok/js';
import type { RequestHandler } from './$types';

type Story = ISbStoryData<Record<string, unknown>>;
type Page = { slug: string; title: string };

/** Company pages, in the order they appear in the file. */
const COMPANY_PAGES = [HOME_SLUG, 'about', 'services', 'careers', 'b-corp', 'legal'];

/** Twins requested at once; most are served from the ISR cache. */
const CONCURRENCY = 16;

/** Statuses worth retrying: rate limits and temporary server errors. */
const RETRYABLE = new Set([429, 500, 502, 503, 504]);
const RETRY_DELAYS_MS = [500, 2000];

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const hidden = (story: Story) =>
  story.content.no_index === true || story.content.hide_from_listings === true;

const toPage = (story: Story): Page => ({ slug: story.full_slug, title: story.name });

/**
 * Every entry is the page's Markdown twin, so the export has exactly what each
 * page renders (embedded blocks, guest authors, canonical URL overrides) and
 * cannot drift from the site. Storyblok is only read to know which pages exist
 * and in which order.
 */
export const GET: RequestHandler = async ({ fetch, locals, url: requestUrl }) => {
  const storyblok = getStoryblok({ fetch });

  async function stories(params: Record<string, string>): Promise<Story[]> {
    const all: Story[] = [];
    for (let page = 1; ; page++) {
      const res = await storyblok.get('cdn/stories', {
        version: locals.version,
        per_page: 100,
        page,
        excluding_fields: 'body,blocks,page,structure_data_markup',
        ...params
      });
      const batch: Story[] = res.data.stories;
      all.push(...batch);
      if (batch.length < 100) return all;
    }
  }

  /**
   * Twins are requested over HTTP from this deployment, not with SvelteKit's internal
   * fetch: on Vercel this endpoint runs in its own function (its own maxDuration), whose
   * manifest does not include the page routes, so an internal request would 404. Over HTTP
   * the request goes through Vercel's routing and the twins' ISR cache.
   *
   * A 404 means the page is intentionally left out (removed, or kept out of search) and is
   * skipped. Temporary failures (429, 5xx) are retried twice; any failure left fails the
   * whole request, so ISR keeps serving the last complete file instead of caching a partial one.
   */
  async function twin({ slug, title }: Page): Promise<LlmsFullEntry | undefined> {
    const pageUrl = canonicalFromSlug(slug);
    const twinUrl = new URL(markdownTwinPath(new URL(pageUrl).pathname), requestUrl.origin);
    // Right after a deploy every twin renders at once and Storyblok can rate-limit;
    // temporary failures are retried before giving up.
    let response = await globalThis.fetch(twinUrl, { headers: { accept: 'text/markdown' } });
    for (const delay of RETRY_DELAYS_MS) {
      if (!RETRYABLE.has(response.status)) break;
      await wait(delay);
      response = await globalThis.fetch(twinUrl, { headers: { accept: 'text/markdown' } });
    }
    if (response.status === 404) return undefined;
    if (!response.ok) {
      console.error(`[llms-full] ${twinUrl} returned ${response.status}`);
      throw error(503, `Could not render ${twinUrl.pathname}`);
    }
    const { url, datePublished, dateModified, body } = parseTwin(await response.text());
    return { title, url: url ?? pageUrl, datePublished, dateModified, markdown: body };
  }

  async function twins(pages: Page[]): Promise<LlmsFullEntry[]> {
    const entries: LlmsFullEntry[] = [];
    for (let i = 0; i < pages.length; i += CONCURRENCY) {
      const batch = await Promise.all(pages.slice(i, i + CONCURRENCY).map(twin));
      entries.push(...batch.filter((entry): entry is LlmsFullEntry => entry !== undefined));
    }
    return entries;
  }

  // The same page types as the sitemap (scripts/sitemap.ts), minus hidden and no_index stories.
  const [pages, landingPages, projects, posts, handbook, people, careers] = await Promise.all([
    stories({ content_type: 'page' }),
    stories({ content_type: 'landing-page' }),
    stories({ content_type: 'project', sort_by: 'first_published_at:desc' }),
    stories({ content_type: 'blog-post', sort_by: 'first_published_at:desc' }),
    stories({ content_type: 'handbook', starts_with: 'handbook/' }),
    stories({ content_type: 'team-member', sort_by: 'name:asc' }),
    stories({ content_type: 'career' })
  ]);

  const visible = (list: Story[]) => list.filter((story) => !hidden(story));
  const slugOf = (story: Story) => story.full_slug.replace(/\/$/, '');
  const serviceSlugs = new Set<string>([
    ...INDUSTRY_LANDING_PAGE_SLUGS,
    ...DELIVERABLE_LANDING_PAGE_SLUGS
  ]);
  const bySlug = new Map(
    visible([...pages, ...landingPages]).map((story) => [slugOf(story), story])
  );
  const named = (slugs: readonly string[]) =>
    slugs.flatMap((slug) => {
      const story = bySlug.get(slug);
      return story ? [toPage(story)] : [];
    });

  // Company: the main pages first, then every other page and landing page that is not a service.
  const otherCompanyPages = visible([...pages, ...landingPages])
    .filter((story) => !COMPANY_PAGES.includes(slugOf(story)) && !serviceSlugs.has(slugOf(story)))
    .sort((a, b) => a.name.localeCompare(b.name))
    .map(toPage);

  const groups: [string, Page[]][] = [
    ['Company', [...named(COMPANY_PAGES), ...otherCompanyPages]],
    ['Industries', named(INDUSTRY_LANDING_PAGE_SLUGS)],
    ['Deliverables', named(DELIVERABLE_LANDING_PAGE_SLUGS)],
    ['Careers', visible(careers).map(toPage)],
    ['Projects', visible(projects).map(toPage)],
    ['Blog', visible(posts).map(toPage)],
    // The handbook index is a route in the code, not a Storyblok story.
    ['Handbook', [{ slug: 'handbook', title: 'Handbook' }, ...visible(handbook).map(toPage)]],
    ['People', visible(people).map(toPage)]
  ];

  const sections: LlmsFullSection[] = [];
  for (const [title, group] of groups) {
    sections.push({ title, entries: await twins(group) });
  }

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
