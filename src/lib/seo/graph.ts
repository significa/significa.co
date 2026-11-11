import { buildImageObject, squashText } from './content';
import {
  buildArticle,
  buildBlogPosting,
  buildFaqPage,
  buildPerson,
  buildProject,
  buildService
} from './builders/entities';
import { buildBreadcrumb, buildItemList, buildWebPage, type WebPageType } from './builders/page';
import { buildLogo, buildOrganization, buildWebSite } from './builders/site';
import { ORGANIZATION_ID } from './constants';
import { faqEntries, parseManualField, remapReferences, type ManualNode } from './manual';
import type { JsonLdGraph, JsonLdNode, PageSchemaInput, SchemaEntity } from './types';
import { pageNodeIds } from './urls';

type Logger = Pick<Console, 'warn'>;

export type ManualDecision = {
  type: string;
  outcome: 'used' | 'merged' | 'ignored';
  reason: string;
};

type BuildOptions = {
  logger?: Logger;
  /** Called once per node found in the manual field (used by the field audit). */
  onManualDecision?: (decision: ManualDecision) => void;
};

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

/** Builders return plain JSON objects with a `@type`; this checks and widens them. */
const toNode = (thing: unknown): JsonLdNode => {
  if (!isRecord(thing)) throw new Error('JSON-LD builder returned a non-object');
  const type = thing['@type'];
  if (typeof type !== 'string' && !Array.isArray(type)) {
    throw new Error('JSON-LD builder returned a node without @type');
  }
  return { ...thing, '@type': type };
};

type MainNode = { node: JsonLdNode; webPageType: WebPageType; aboutOrganization: boolean };

function buildMainNode(input: PageSchemaInput, entity: SchemaEntity): MainNode | undefined {
  switch (entity.kind) {
    case 'home':
      return undefined;
    case 'page':
      return undefined;
    case 'none':
      return undefined;
    case 'collection':
      return {
        node: toNode(buildItemList(input.url, entity.items)),
        webPageType: 'CollectionPage',
        aboutOrganization: entity.institutional ?? false
      };
    case 'blog-post':
      return {
        node: toNode(buildBlogPosting(input, entity)),
        webPageType: 'WebPage',
        aboutOrganization: false
      };
    case 'profile':
      return {
        node: toNode(buildPerson(input, entity.person)),
        webPageType: 'ProfilePage',
        aboutOrganization: false
      };
    case 'article':
      return {
        node: toNode(buildArticle(input, entity)),
        webPageType: 'WebPage',
        aboutOrganization: true
      };
    case 'project':
      return {
        node: toNode(buildProject(input, entity)),
        webPageType: 'WebPage',
        aboutOrganization: false
      };
    case 'service':
      return {
        node: toNode(buildService(input, entity)),
        webPageType: 'WebPage',
        aboutOrganization: true
      };
    default: {
      const exhaustive: never = entity;
      return exhaustive;
    }
  }
}

const isReference = (value: Record<string, unknown>) =>
  typeof value['@id'] === 'string' && Object.keys(value).length === 1;

/** Every `@id` defined by a node (top level or nested) in the graph. */
export function collectDefinedIds(nodes: unknown[]): Set<string> {
  const ids = new Set<string>();
  const walk = (value: unknown) => {
    if (Array.isArray(value)) return value.forEach(walk);
    if (!isRecord(value)) return;
    if (typeof value['@id'] === 'string' && !isReference(value)) ids.add(value['@id']);
    Object.values(value).forEach(walk);
  };
  nodes.forEach(walk);
  return ids;
}

/** Removes references (`{"@id": ...}`) that point at nodes not present in the graph. */
function dropDanglingReferences(value: unknown, defined: Set<string>): unknown {
  if (Array.isArray(value)) {
    return value
      .map((item) => dropDanglingReferences(item, defined))
      .filter((item) => item !== undefined);
  }
  if (!isRecord(value)) return value;
  if (isReference(value)) {
    return defined.has(String(value['@id'])) ? value : undefined;
  }

  const out: Record<string, unknown> = {};
  for (const [key, child] of Object.entries(value)) {
    const cleaned = dropDanglingReferences(child, defined);
    if (cleaned === undefined) continue;
    if (Array.isArray(cleaned) && cleaned.length === 0 && Array.isArray(child) && child.length) {
      continue;
    }
    out[key] = cleaned;
  }
  return out;
}

/** A manual FAQPage is kept only when every question and every answer is rendered on the page. */
function manualFaqIsVisible(node: JsonLdNode, visibleText: string[] | undefined): boolean {
  const entries = faqEntries(node);
  if (!entries.length || !visibleText?.length) return false;
  const haystack = squashText(visibleText.join(' '));
  return entries.every(
    ({ question, answer }) =>
      question &&
      answer &&
      haystack.includes(squashText(question)) &&
      haystack.includes(squashText(answer))
  );
}

/**
 * Builds the full `@graph` for a page: global nodes, the WebPage, the
 * breadcrumb, the main entity and the accepted extras from the manual field.
 */
export function buildPageGraph(
  input: PageSchemaInput,
  options: BuildOptions | Logger = {}
): JsonLdGraph {
  const { logger = console, onManualDecision } =
    'warn' in options ? { logger: options, onManualDecision: undefined } : options;
  const decide = (type: string, outcome: ManualDecision['outcome'], reason: string) =>
    onManualDecision?.({ type, outcome, reason });

  const nodes: JsonLdNode[] = [
    toNode(buildOrganization(input.organization)),
    toNode(buildLogo(input.organization)),
    toNode(buildWebSite(input.organization, input.siteDescription))
  ];

  if (input.entity.kind === 'none') {
    return { '@context': 'https://schema.org', '@graph': nodes };
  }

  const ids = pageNodeIds(input.url);
  const entity = input.entity;
  const main = buildMainNode(input, entity);
  const breadcrumb = buildBreadcrumb(input);

  const extras: JsonLdNode[] = [];
  let service = main && entity.kind === 'service' ? main.node : undefined;
  const hasCodeFaq = Boolean(input.faqs?.length);
  if (input.faqs?.length) extras.push(toNode(buildFaqPage(input, input.faqs)));

  const manual = parseManualField(input.manual, input.url);
  if (manual.status === 'invalid') {
    logger.warn(`[seo] Ignoring invalid structure_data_markup on ${input.url}: ${manual.error}`);
  }

  if (manual.status === 'ok') {
    manual.ignored.forEach((node) => decide(node.type, 'ignored', node.reason));
  }

  const acceptedTypes = new Set<string>();
  // Manual node ids replaced by generated ones, so references to them follow.
  const replacedIds = new Map<string, string>();
  const replaceId = (from: unknown, to: string) => {
    if (typeof from === 'string' && from !== to) replacedIds.set(from, to);
  };
  const accept = ({ type, node }: ManualNode) => {
    switch (type) {
      case 'FAQPage':
        // Generated from the visible `faqs` block when there is one.
        if (hasCodeFaq) return decide(type, 'ignored', 'Generated from the faqs block on the page');
        if (acceptedTypes.has(type)) return decide(type, 'ignored', 'Duplicate FAQPage');
        if (!manualFaqIsVisible(node, input.visibleText)) {
          decide(type, 'ignored', 'Questions or answers are not visible on the page');
          logger.warn(
            `[seo] Ignoring FAQPage on ${input.url}: questions or answers are not visible on the page`
          );
          return;
        }
        replaceId(node['@id'], ids.faq);
        extras.push({ ...node, '@id': ids.faq });
        break;
      case 'Service':
        if (service && entity.kind === 'service') {
          // Enrich the generated Service; code keeps control of identity and provider.
          const merged: JsonLdNode = {
            ...service,
            ...node,
            '@type': 'Service',
            '@id': ids.service,
            url: input.url,
            provider: { '@id': ORGANIZATION_ID }
          };
          replaceId(node['@id'], ids.service);
          service = merged;
          if (main) main.node = merged;
          return decide(type, 'merged', 'Merged into the generated Service');
        }
        if (acceptedTypes.has(type)) return decide(type, 'ignored', 'Duplicate Service');
        service = {
          ...node,
          url: typeof node.url === 'string' ? node.url : input.url,
          provider: { '@id': ORGANIZATION_ID }
        };
        extras.push(service);
        break;
      case 'ItemList':
        if (entity.kind === 'collection') {
          return decide(type, 'ignored', 'Generated from the listed items');
        }
        if (acceptedTypes.has(type)) return decide(type, 'ignored', 'Duplicate ItemList');
        extras.push(node);
        break;
      case 'HowTo':
        if (acceptedTypes.has(type)) return decide(type, 'ignored', 'Duplicate HowTo');
        extras.push(node);
        break;
      default: {
        const exhaustive: never = type;
        return exhaustive;
      }
    }
    acceptedTypes.add(type);
    decide(type, 'used', 'Added to the page graph');
  };
  manual.accepted.forEach(accept);

  const mainEntityId =
    entity.kind === 'home' ? ORGANIZATION_ID : main ? String(main.node['@id']) : undefined;

  // Google only recognises a ProfilePage when the Person is nested in mainEntity.
  const nestMain = entity.kind === 'profile' && main !== undefined;

  const webPage = toNode(
    buildWebPage(input, {
      type: input.webPageType ?? main?.webPageType ?? 'WebPage',
      aboutOrganization:
        entity.kind === 'home' ||
        (entity.kind === 'page' && entity.institutional) ||
        (main?.aboutOrganization ?? false),
      mainEntityId,
      hasBreadcrumb: Boolean(breadcrumb),
      hasPrimaryImage: Boolean(input.primaryImage)
    })
  );

  if (nestMain && main) {
    // Nested, the back reference to the page is redundant.
    const person: JsonLdNode = { ...main.node };
    delete person.mainEntityOfPage;
    webPage.mainEntity = person;
    if (webPage.datePublished) webPage.dateCreated = webPage.datePublished;
  }

  nodes.push(webPage);
  if (breadcrumb) nodes.push(toNode(breadcrumb));
  if (input.primaryImage)
    nodes.push(toNode(buildImageObject(input.primaryImage, ids.primaryImage)));
  if (main && !nestMain) nodes.push(main.node);
  nodes.push(...extras);

  // One node per @id: the first (code-generated) wins.
  const seen = new Set<string>();
  const unique = nodes.filter((node) => {
    const id = node['@id'];
    if (typeof id !== 'string') return true;
    if (seen.has(id)) return false;
    seen.add(id);
    return true;
  });

  const relinked = unique.map((node) => toNode(remapReferences(node, replacedIds, input.url)));
  const defined = collectDefinedIds(relinked);
  const cleaned = relinked
    .map((node) => dropDanglingReferences(node, defined))
    .filter((node): node is JsonLdNode => isRecord(node) && '@type' in node)
    .map(toNode);

  return { '@context': 'https://schema.org', '@graph': cleaned };
}
