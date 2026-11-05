/**
 * Sanitiser for the Storyblok `structure_data_markup` field.
 *
 * The field is only for extras the templates cannot generate. Everything the
 * code owns (Organization, WebSite, WebPage, BreadcrumbList, articles, people,
 * projects) is ignored here, so the code stays the single source of truth.
 */
import { ORGANIZATION_ID, SITE_URL, WEBSITE_ID } from './constants';
import type { JsonLdNode } from './types';
import { normalizeUrl, pageNodeIds } from './urls';

/** Node types the manual field may contribute to the page graph. */
export const ACCEPTED_MANUAL_TYPES = ['FAQPage', 'HowTo', 'Service', 'ItemList'] as const;
export type AcceptedManualType = (typeof ACCEPTED_MANUAL_TYPES)[number];

const DEFAULT_FRAGMENT: Record<AcceptedManualType, string> = {
  FAQPage: 'faq',
  HowTo: 'howto',
  Service: 'service',
  ItemList: 'itemlist'
};

const SITE_HOST = new URL(SITE_URL).host;

export type IgnoredManualNode = { type: string; reason: string };

export type ManualFieldResult =
  | { status: 'empty'; accepted: []; ignored: [] }
  | { status: 'invalid'; error: string; accepted: []; ignored: [] }
  | { status: 'ok'; accepted: ManualNode[]; ignored: IgnoredManualNode[] };

export type ManualNode = { type: AcceptedManualType; node: JsonLdNode };

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

const isAcceptedType = (value: string): value is AcceptedManualType =>
  (ACCEPTED_MANUAL_TYPES as readonly string[]).includes(value);

export const nodeTypes = (node: Record<string, unknown>): string[] => {
  const type = node['@type'];
  if (typeof type === 'string') return [type];
  if (Array.isArray(type)) return type.filter((t): t is string => typeof t === 'string');
  return [];
};

const isSignificaUrl = (value: string) => {
  try {
    return new URL(value, SITE_URL).host.replace(/^www\./, '') === SITE_HOST;
  } catch {
    return false;
  }
};

/** Maps an `@id` written by hand to the canonical id the code uses, when it is a known node. */
function mapKnownId(id: string, pageUrl: string): string | undefined {
  if (!isSignificaUrl(id)) return undefined;
  const fragment = id.split('#')[1]?.toLowerCase();
  if (fragment === 'organization') return ORGANIZATION_ID;
  if (fragment === 'website') return WEBSITE_ID;
  if (fragment === 'webpage' || fragment === 'homepage') return pageNodeIds(pageUrl).webpage;
  return undefined;
}

const isInlineSignificaOrganization = (value: Record<string, unknown>) => {
  if (!nodeTypes(value).includes('Organization')) return false;
  const name = typeof value.name === 'string' ? value.name.trim().toLowerCase() : '';
  const url = typeof value.url === 'string' ? value.url : '';
  const id = typeof value['@id'] === 'string' ? value['@id'] : '';
  // An id only identifies Significa when it is on the Significa host.
  return (
    name === 'significa' ||
    (url && isSignificaUrl(url)) ||
    (id.endsWith('#organization') && isSignificaUrl(id))
  );
};

const isInlineSignificaWebSite = (value: Record<string, unknown>) => {
  if (!nodeTypes(value).includes('WebSite')) return false;
  const url = typeof value.url === 'string' ? value.url : '';
  const id = typeof value['@id'] === 'string' ? value['@id'] : '';
  return (url && isSignificaUrl(url)) || (id.endsWith('#website') && isSignificaUrl(id));
};

/**
 * Rewrites references (`{"@id": ...}`) using `ids` (old id to new id). Ids
 * are compared as written and resolved against `baseUrl`, so "#steps" and
 * "https://significa.co/page#steps" both match.
 */
export function remapReferences(
  value: unknown,
  ids: Map<string, string>,
  baseUrl: string
): unknown {
  if (!ids.size) return value;
  const resolve = (id: string) => {
    try {
      return new URL(id, baseUrl).href;
    } catch {
      return id;
    }
  };
  const walk = (current: unknown): unknown => {
    if (Array.isArray(current)) return current.map(walk);
    if (!isRecord(current)) return current;
    if (typeof current['@id'] === 'string' && Object.keys(current).length === 1) {
      const id = current['@id'];
      const mapped = ids.get(id) ?? ids.get(resolve(id));
      return mapped ? { '@id': mapped } : current;
    }
    return Object.fromEntries(Object.entries(current).map(([key, child]) => [key, walk(child)]));
  };
  return walk(value);
}

const URL_KEYS = new Set(['url', 'item', 'contentUrl']);

/** Deep-normalises a value inside an accepted manual node. */
function normalizeValue(value: unknown, pageUrl: string): unknown {
  if (Array.isArray(value)) return value.map((item) => normalizeValue(item, pageUrl));
  if (!isRecord(value)) return value;

  if (isInlineSignificaOrganization(value)) return { '@id': ORGANIZATION_ID };
  if (isInlineSignificaWebSite(value)) return { '@id': WEBSITE_ID };

  const out: Record<string, unknown> = {};
  for (const [key, child] of Object.entries(value)) {
    if (key === '@context') continue;

    if (key === '@id' && typeof child === 'string') {
      out[key] = mapKnownId(child, pageUrl) ?? child;
      continue;
    }

    if (URL_KEYS.has(key) && typeof child === 'string') {
      out[key] = normalizeUrl(child) ?? child;
      continue;
    }

    out[key] = normalizeValue(child, pageUrl);
  }
  return out;
}

function extractNodes(parsed: unknown): unknown[] {
  if (Array.isArray(parsed)) return parsed.flatMap(extractNodes);
  if (isRecord(parsed) && Array.isArray(parsed['@graph'])) return parsed['@graph'];
  return [parsed];
}

/**
 * Parses and filters the manual field. Never throws: invalid JSON returns
 * `status: 'invalid'` so the caller can log a warning and carry on.
 */
export function parseManualField(
  raw: string | null | undefined,
  pageUrl: string
): ManualFieldResult {
  if (!raw || !raw.trim()) return { status: 'empty', accepted: [], ignored: [] };

  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch (err) {
    return {
      status: 'invalid',
      error: err instanceof Error ? err.message : String(err),
      accepted: [],
      ignored: []
    };
  }

  const accepted: ManualNode[] = [];
  const ignored: IgnoredManualNode[] = [];
  // Original id (as written and resolved) to the canonical id assigned below.
  const idMap = new Map<string, string>();

  for (const candidate of extractNodes(parsed)) {
    if (!isRecord(candidate)) {
      ignored.push({ type: '(not an object)', reason: 'Not a JSON-LD node' });
      continue;
    }

    const types = nodeTypes(candidate);
    const label = types.join(', ') || '(no @type)';
    const acceptedType = types.find(isAcceptedType);
    const ownedType = types.find((t) => !isAcceptedType(t));

    if (!acceptedType || ownedType) {
      ignored.push({
        type: label,
        reason: acceptedType
          ? `Mixed with a type the template generates (${ownedType})`
          : 'Generated by the template or not allowed in the manual field'
      });
      continue;
    }

    const normalized = normalizeValue(candidate, pageUrl);
    if (!isRecord(normalized)) continue;

    const originalId = typeof candidate['@id'] === 'string' ? candidate['@id'] : '';
    const fragment = originalId.includes('#')
      ? originalId.split('#').pop() || DEFAULT_FRAGMENT[acceptedType]
      : DEFAULT_FRAGMENT[acceptedType];

    const finalId = `${pageUrl}#${fragment}`;
    if (originalId) {
      idMap.set(originalId, finalId);
      try {
        idMap.set(new URL(originalId, pageUrl).href, finalId);
      } catch {
        // Not a URL: the id as written is enough.
      }
    }

    accepted.push({
      type: acceptedType,
      node: { ...normalized, '@type': acceptedType, '@id': finalId }
    });
  }

  // References between manual nodes follow the ids they were given.
  const remapped = accepted.map(({ type, node }) => {
    const next = remapReferences(node, idMap, pageUrl);
    return { type, node: isRecord(next) ? { ...node, ...next } : node };
  });

  return { status: 'ok', accepted: remapped, ignored };
}

/** Question and answer pairs of a manual FAQPage node. */
export function faqEntries(node: JsonLdNode): { question: string; answer: string }[] {
  const entities = Array.isArray(node.mainEntity) ? node.mainEntity : [node.mainEntity];
  return entities.filter(isRecord).map((q) => {
    const answers = Array.isArray(q.acceptedAnswer) ? q.acceptedAnswer : [q.acceptedAnswer];
    const answer = answers.find(isRecord);
    return {
      question: typeof q.name === 'string' ? q.name : '',
      answer: answer && typeof answer.text === 'string' ? answer.text : ''
    };
  });
}

/** Questions of a manual FAQPage node. */
export function faqQuestions(node: JsonLdNode): string[] {
  const entities = Array.isArray(node.mainEntity) ? node.mainEntity : [node.mainEntity];
  return entities
    .filter(isRecord)
    .map((q) => (typeof q.name === 'string' ? q.name : ''))
    .filter(Boolean);
}
