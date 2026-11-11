/**
 * Read-only report of the Storyblok `structure_data_markup` field.
 *
 * For every published story with the field filled in, it lists whether the
 * JSON is valid, which node types it has, which are now used or ignored by
 * src/lib/seo, and which properties of ignored nodes the code does not
 * generate (content that would be lost).
 *
 * Only reads from the Storyblok CDN API. Writes docs/seo/jsonld-field-audit.md.
 *
 *   npm run seo:audit
 */
import fs from 'fs';
import * as dotenv from 'dotenv';
import { apiPlugin, storyblokInit, type ISbStoryData } from '@storyblok/js';
import type { DynamicPage } from '../src/lib/content';
import {
  isStory,
  organizationFromConfiguration,
  pageParts,
  partsFromStory
} from '../src/lib/seo/from-storyblok';
import { buildPageGraph, type ManualDecision } from '../src/lib/seo/graph';
import { nodeTypes, parseManualField } from '../src/lib/seo/manual';
import type { JsonLdGraph } from '../src/lib/seo/types';
import { canonicalFromSlug } from '../src/lib/seo/urls';

dotenv.config();

const OUTPUT = 'docs/seo/jsonld-field-audit.md';

// Same relations the site resolves for the fields the schema reads (src/lib/content.ts).
const RESOLVE_RELATIONS = 'blog-post.authors,project.team';

const token = process.env.PUBLIC_STORYBLOK_TOKEN;
if (!token) throw new Error('Missing required env var: PUBLIC_STORYBLOK_TOKEN');

const { storyblokApi } = storyblokInit({
  accessToken: token,
  use: [apiPlugin],
  apiOptions: { https: true }
});
if (!storyblokApi) throw new Error('Could not initialise the Storyblok client');

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

const isDynamicPage = (story: ISbStoryData): story is DynamicPage =>
  ['page', 'blog-post', 'project', 'team-member', 'career', 'landing-page', 'handbook'].includes(
    String(story.content?.component)
  );

/** Properties the code always owns or that carry no information on their own. */
const STRUCTURAL_KEYS = new Set(['@context', '@type', '@id', 'mainEntityOfPage', 'isPartOf']);

/** Properties deliberately not generated (see README). */
const EXCLUDED_KEYS = new Set(['articleBody']);

async function fetchAllStories(): Promise<ISbStoryData[]> {
  const stories: ISbStoryData[] = [];
  for (let page = 1; ; page++) {
    const res = await storyblokApi.get('cdn/stories', {
      version: 'published',
      per_page: 100,
      page,
      resolve_relations: RESOLVE_RELATIONS
    });
    const batch: ISbStoryData[] = res.data.stories;
    stories.push(...batch);
    if (batch.length < 100) break;
  }
  return stories;
}

function topLevelNodes(raw: string): Record<string, unknown>[] {
  try {
    const parsed: unknown = JSON.parse(raw);
    const list = Array.isArray(parsed)
      ? parsed
      : isRecord(parsed) && Array.isArray(parsed['@graph'])
        ? parsed['@graph']
        : [parsed];
    return list.filter(isRecord);
  } catch {
    return [];
  }
}

/** Keys of an ignored manual node that no generated node of the same type has. */
const WEBPAGE_LIKE = ['WebPage', 'CollectionPage', 'ProfilePage'];

/** Generated node types that cover a given manual type (WebPage subtypes all map to the WebPage). */
const equivalentTypes = (type: string): string[] =>
  type.endsWith('Page') || type === 'Blog' ? WEBPAGE_LIKE : [type];

function missingProperties(node: Record<string, unknown>, graph: JsonLdGraph): string[] {
  const types = nodeTypes(node).flatMap(equivalentTypes);
  const generated = graph['@graph'].filter((n) => nodeTypes(n).some((t) => types.includes(t)));
  const generatedKeys = new Set(generated.flatMap((n) => Object.keys(n)));
  return Object.keys(node).filter(
    (key) => !STRUCTURAL_KEYS.has(key) && !EXCLUDED_KEYS.has(key) && !generatedKeys.has(key)
  );
}

type Row = {
  slug: string;
  component: string;
  valid: boolean;
  error?: string;
  types: string[];
  decisions: ManualDecision[];
  losses: string[];
};

function auditStory(story: DynamicPage, configuration: unknown): Row {
  const raw = String(story.content.structure_data_markup ?? '');
  const url = canonicalFromSlug(story.full_slug);
  const parsed = parseManualField(raw, url);
  const nodes = topLevelNodes(raw);
  const row: Row = {
    slug: story.full_slug,
    component: String(story.content.component),
    valid: parsed.status !== 'invalid',
    error: parsed.status === 'invalid' ? parsed.error : undefined,
    types: nodes.map((n) => nodeTypes(n).join(' + ') || '(no @type)'),
    decisions: [],
    losses: []
  };
  if (!row.valid) return row;

  // Listings get their items at render time; an empty list is enough to apply the collection rules.
  const parts =
    isStory(story, 'page') &&
    ['blog-index', 'projects-index'].includes(String(story.content.page?.[0]?.component))
      ? pageParts(story, [])
      : partsFromStory(story);

  const graph = buildPageGraph(
    {
      ...parts,
      url,
      title: String(story.content.seo_title || story.name),
      description:
        typeof story.content.seo_description === 'string'
          ? story.content.seo_description
          : undefined,
      organization: organizationFromConfiguration(configuration)
    },
    { logger: { warn: () => undefined }, onManualDecision: (d) => row.decisions.push(d) }
  );

  // What ignored nodes carried that the generated graph does not.
  const ignoredTypes = row.decisions.filter((d) => d.outcome === 'ignored').map((d) => d.type);
  nodes.forEach((node) => {
    const label = nodeTypes(node).join(' + ');
    if (!ignoredTypes.includes(label)) return;
    if (label === 'FAQPage') {
      const decision = row.decisions.find((d) => d.type === 'FAQPage');
      if (decision?.reason === 'Questions or answers are not visible on the page') {
        row.losses.push(
          'FAQPage: questions or answers not visible on the page (FAQ schema dropped)'
        );
      }
      return;
    }
    const missing = missingProperties(node, graph);
    if (missing.length) row.losses.push(`${label}: ${missing.join(', ')}`);
  });

  return row;
}

const count = <T>(items: T[], key: (item: T) => string) =>
  items.reduce<Record<string, number>>((acc, item) => {
    const k = key(item);
    acc[k] = (acc[k] ?? 0) + 1;
    return acc;
  }, {});

function render(rows: Row[], totalStories: number): string {
  const decisions = rows.flatMap((r) => r.decisions);
  const used = count(
    decisions.filter((d) => d.outcome !== 'ignored'),
    (d) => `${d.type} (${d.outcome})`
  );
  const ignored = count(
    decisions.filter((d) => d.outcome === 'ignored'),
    (d) => `${d.type}: ${d.reason}`
  );
  const byComponent = count(rows, (r) => r.component);
  const invalid = rows.filter((r) => !r.valid);
  const withLosses = rows.filter((r) => r.losses.length);

  const lines: string[] = [];
  lines.push('# JSON-LD field audit');
  lines.push('');
  lines.push(
    'Generated by `npm run seo:audit` (read-only, published content). It lists every story with the Storyblok `structure_data_markup` field filled in and what `src/lib/seo` now does with each node. See `src/lib/seo/README.md` for the rules.'
  );
  lines.push('');
  lines.push(`- Published stories: ${totalStories}`);
  lines.push(`- Stories with the field filled in: ${rows.length}`);
  lines.push(`- Invalid JSON: ${invalid.length}`);
  lines.push(
    `- Stories where an ignored node has properties the code does not generate: ${withLosses.length}`
  );
  lines.push('');
  lines.push('## By content type');
  lines.push('');
  lines.push('| Content type | Stories with the field |');
  lines.push('| --- | --- |');
  Object.entries(byComponent)
    .sort((a, b) => b[1] - a[1])
    .forEach(([k, v]) => lines.push(`| ${k} | ${v} |`));
  lines.push('');
  lines.push('## Nodes kept');
  lines.push('');
  lines.push('| Node | Count |');
  lines.push('| --- | --- |');
  Object.entries(used)
    .sort((a, b) => b[1] - a[1])
    .forEach(([k, v]) => lines.push(`| ${k} | ${v} |`));
  if (!Object.keys(used).length) lines.push('| (none) | 0 |');
  lines.push('');
  lines.push('## Nodes ignored');
  lines.push('');
  lines.push('| Node and reason | Count |');
  lines.push('| --- | --- |');
  Object.entries(ignored)
    .sort((a, b) => b[1] - a[1])
    .forEach(([k, v]) => lines.push(`| ${k} | ${v} |`));
  lines.push('');

  if (invalid.length) {
    lines.push('## Invalid JSON');
    lines.push('');
    lines.push('These fields are ignored and logged as a warning when the page renders.');
    lines.push('');
    lines.push('| Story | Error |');
    lines.push('| --- | --- |');
    invalid.forEach((r) => lines.push(`| \`/${r.slug}\` | ${r.error?.replace(/\|/g, '\\|')} |`));
    lines.push('');
  }

  lines.push('## Possible losses');
  lines.push('');
  lines.push(
    'Properties found in ignored nodes that the generated graph does not have. Most are restatements of page content; review the ones worth keeping and decide whether the code should generate them.'
  );
  lines.push('');
  if (withLosses.length) {
    lines.push('| Story | Type | Not generated |');
    lines.push('| --- | --- | --- |');
    withLosses.forEach((r) =>
      r.losses.forEach((loss) => {
        const [type, ...rest] = loss.split(': ');
        lines.push(`| \`/${r.slug}\` | ${type} | ${rest.join(': ')} |`);
      })
    );
  } else {
    lines.push('None.');
  }
  lines.push('');

  lines.push('## All stories');
  lines.push('');
  lines.push('| Story | Type | Valid | Nodes in the field | Kept | Ignored |');
  lines.push('| --- | --- | --- | --- | --- | --- |');
  rows.forEach((r) => {
    const kept = r.decisions.filter((d) => d.outcome !== 'ignored').map((d) => d.type);
    const dropped = r.decisions.filter((d) => d.outcome === 'ignored').map((d) => d.type);
    lines.push(
      `| \`/${r.slug}\` | ${r.component} | ${r.valid ? 'yes' : 'no'} | ${r.types.join(', ') || '-'} | ${kept.join(', ') || '-'} | ${dropped.join(', ') || '-'} |`
    );
  });
  lines.push('');
  return lines.join('\n');
}

async function main() {
  const stories = await fetchAllStories();
  const configuration = stories.find(
    (s) => s.full_slug === 'configuration/' || s.full_slug === 'configuration'
  )?.content;

  const rows = stories
    .filter(isDynamicPage)
    .filter(
      (s) =>
        typeof s.content.structure_data_markup === 'string' &&
        s.content.structure_data_markup.trim()
    )
    .sort((a, b) => a.full_slug.localeCompare(b.full_slug))
    .map((story) => auditStory(story, configuration));

  fs.mkdirSync('docs/seo', { recursive: true });
  fs.writeFileSync(OUTPUT, render(rows, stories.length));
  console.log(`Wrote ${OUTPUT}: ${rows.length} stories with structure_data_markup`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
