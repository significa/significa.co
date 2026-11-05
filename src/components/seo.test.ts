/**
 * Renders <Seo> on the server (as SvelteKit does) and checks the JSON-LD that
 * ends up in the HTML, for one page of each content type.
 */
import { describe, expect, it, vi } from 'vitest';
import type { DynamicPage } from '$lib/content';
import {
  blogPostStory,
  careerStory,
  configurationContent,
  handbookStory,
  homeStory,
  institutionalLandingStory,
  projectStory,
  serviceLandingStory,
  servicesPageStory,
  teamMemberStory
} from '$lib/seo/__fixtures__/stories';
import { validateGraph } from '$lib/seo/validate';
import type { JsonLdGraph } from '$lib/seo/types';
import { isCanonicalUrl } from '$lib/seo/urls';

const state = vi.hoisted(() => ({ url: 'http://localhost/', data: {} as Record<string, unknown> }));

vi.mock('$app/stores', async () => {
  const { readable } = await import('svelte/store');
  return {
    page: {
      subscribe: (fn: (value: unknown) => void) =>
        readable({
          url: new URL(state.url),
          data: state.data,
          params: {},
          route: { id: null }
        }).subscribe(fn)
    }
  };
});

type SsrComponent = { render: (props?: Record<string, unknown>) => { head: string; html: string } };

const isSsrComponent = (value: unknown): value is SsrComponent =>
  typeof value === 'object' &&
  value !== null &&
  'render' in value &&
  typeof value.render === 'function';

async function renderSeo(story: DynamicPage, path: string, props: Record<string, unknown> = {}) {
  // ?utm_source simulates a tracked link: it must never reach the canonical or the schema.
  state.url = `http://localhost:5173${path}?utm_source=test`;
  state.data = { page: { story }, configuration: { content: configurationContent } };
  const mod = await import('./seo.svelte');
  const component: unknown = mod.default;
  if (!isSsrComponent(component)) throw new Error('seo.svelte was not compiled for SSR');
  return component.render(props).head;
}

function extractJsonLd(head: string): JsonLdGraph[] {
  return [...head.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map(
    (match) => JSON.parse(match[1])
  );
}

const pages: [string, DynamicPage, string, string][] = [
  ['home', homeStory, '/', 'WebPage'],
  ['services page', servicesPageStory, '/services', 'WebPage'],
  ['blog post', blogPostStory, '/blog/how-emotions-shape-our-shopping-habits', 'BlogPosting'],
  ['team member', teamMemberStory, '/about/julieta-frade', 'Person'],
  ['project', projectStory, '/projects/akasha', 'CreativeWork'],
  ['service landing page', serviceLandingStory, '/finance', 'Service'],
  ['institutional landing page', institutionalLandingStory, '/b-corp', 'WebPage'],
  ['handbook page', handbookStory, '/handbook/money-matters', 'WebPage'],
  ['career', careerStory, '/careers/designer', 'WebPage']
];

describe('<Seo> server-rendered JSON-LD', () => {
  it.each(pages)('%s: one valid, canonical graph in the HTML', async (_, story, path, mainType) => {
    const head = await renderSeo(story, path);
    const graphs = extractJsonLd(head);

    expect(graphs).toHaveLength(1);
    const [graph] = graphs;
    expect(validateGraph(graph)).toEqual([]);
    expect(graph['@graph'].filter((n) => n['@type'] === mainType)).toHaveLength(1);

    const canonical = head.match(/<link rel="canonical" href="([^"]+)"/)?.[1];
    expect(canonical).toBe(`https://significa.co${path === '/' ? '/' : path}`);
    expect(canonical && isCanonicalUrl(canonical)).toBe(true);

    const webPage = graph['@graph'].find((n) =>
      ['WebPage', 'ProfilePage', 'CollectionPage'].includes(String(n['@type']))
    );
    expect(webPage?.url).toBe(canonical);
    expect(webPage?.['@id']).toBe(`${canonical}#webpage`);

    const title = head
      .match(/<title>([^<]*)<\/title>/)?.[1]
      ?.replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'");
    expect(webPage?.name).toBe(title);
  });

  it('error pages only get the global nodes', async () => {
    const head = await renderSeo(homeStory, '/missing', { schema: { entity: { kind: 'none' } } });
    const [graph] = extractJsonLd(head);
    expect(graph['@graph'].map((n) => n['@type'])).toEqual([
      'Organization',
      'ImageObject',
      'WebSite'
    ]);
  });

  it('CMS content cannot break out of the script tag', async () => {
    const story = {
      ...blogPostStory,
      name: 'Hello </script><script>alert(1)</script>'
    };
    const head = await renderSeo(story, '/blog/how-emotions-shape-our-shopping-habits');
    expect(head).not.toContain('<script>alert(1)');
    expect(extractJsonLd(head)).toHaveLength(1);
  });
});
