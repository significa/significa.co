/**
 * Converts the server-rendered HTML of a page into Markdown for agents.
 *
 * Working from the rendered HTML (not from CMS data) means the Markdown has
 * exactly what the page shows, blocks and FAQs included, and stays in sync
 * with every template without extra code.
 */
import { parseHTML } from 'linkedom';
import TurndownService from 'turndown';
import { SITE_URL } from '$lib/seo/constants';

/** Elements that are not content, or that need JavaScript to mean anything. */
const NON_CONTENT = [
  'script',
  'style',
  'noscript',
  'template',
  'svg',
  'canvas',
  'iframe',
  'video',
  'audio',
  'object',
  'embed',
  'button',
  'form',
  'input',
  'select',
  'textarea',
  'dialog',
  'nav',
  'footer',
  '[aria-hidden="true"]',
  '[hidden]'
].join(',');

const BLOCK_CHILDREN = 'h1,h2,h3,h4,h5,h6,p,div,ul,ol,img,figure';
const HEADINGS = 'h1,h2,h3,h4,h5,h6';

type LinkedomElement = ReturnType<typeof parseHTML>['document']['documentElement'];

export type MarkdownPage = {
  markdown: string;
  title?: string;
  description?: string;
  canonical?: string;
  noIndex: boolean;
};

/** Makes a link absolute on the production site; leaves mailto:, tel: and external links alone. */
export function absoluteUrl(href: string, base = SITE_URL): string | undefined {
  const value = href.trim();
  if (!value || value.startsWith('#') || /^javascript:/i.test(value)) return undefined;
  try {
    return new URL(value, `${base}/`).toString();
  } catch {
    return undefined;
  }
}

function createTurndown(): TurndownService {
  const turndown = new TurndownService({
    headingStyle: 'atx',
    bulletListMarker: '-',
    codeBlockStyle: 'fenced',
    emDelimiter: '_',
    strongDelimiter: '**',
    hr: '---'
  });

  turndown.addRule('absoluteLinks', {
    filter: (node) => node.nodeName === 'A',
    replacement: (content, node) => {
      const href = absoluteUrl(node.getAttribute('href') ?? '');
      const text = content.trim();
      if (!text) return '';
      return href ? `[${text}](${href})` : text;
    }
  });

  // Compact list items ("- item"), with nested content indented under the marker.
  turndown.addRule('listItems', {
    filter: 'li',
    replacement: (content, node) => {
      const parent = node.parentNode;
      const ordered = parent?.nodeName === 'OL';
      const index = parent ? Array.prototype.indexOf.call(parent.children, node) + 1 : 1;
      const marker = ordered ? `${index}. ` : '- ';
      const body = content
        .replace(/^\n+/, '')
        .replace(/\n+$/, '')
        .replace(/\n/g, `\n${' '.repeat(marker.length)}`)
        .replace(/\n +\n/g, '\n\n');
      // Items with several paragraphs (FAQ question and answer) get a blank line after them.
      return `${marker}${body}\n${/\n\s*\n/.test(body) ? '\n' : ''}`;
    }
  });

  // Only images with a description carry information an agent can use.
  turndown.addRule('describedImages', {
    filter: 'img',
    replacement: (_, node) => {
      const element = node;
      const alt = element.getAttribute('alt')?.trim();
      const src = absoluteUrl(element.getAttribute('src') ?? '');
      return alt && src ? `![${alt.replace(/[[\]]/g, '')}](${src})` : '';
    }
  });

  // GitHub-flavoured tables: first row is the header.
  turndown.addRule('tables', {
    filter: 'table',
    replacement: (_, node) => {
      const rows = [...node.querySelectorAll('tr')].map((row) =>
        [...row.querySelectorAll('th,td')].map((cell) =>
          (cell.textContent ?? '').replace(/\s+/g, ' ').replace(/\|/g, '\\|').trim()
        )
      );
      if (!rows.length) return '';
      const width = Math.max(...rows.map((row) => row.length));
      const pad = (row: string[]) => [...row, ...Array(width - row.length).fill('')];
      const line = (row: string[]) => `| ${pad(row).join(' | ')} |`;
      const [head, ...body] = rows;
      return `\n\n${[line(head), line(Array(width).fill('---')), ...body.map(line)].join('\n')}\n\n`;
    }
  });

  return turndown;
}

const turndown = createTurndown();

type LinkedomDocument = ReturnType<typeof parseHTML>['document'];
type LinkedomNode = ReturnType<LinkedomDocument['querySelector']> & object;

/**
 * Rewrites interactive and decorative markup into plain content before
 * conversion:
 * - accordion triggers (`button[aria-controls]`, the FAQ questions) become
 *   bold paragraphs, since their text is content while buttons are not;
 * - non-content elements are removed, and line breaks inside headings become spaces;
 * - a link wrapping a whole card keeps the card as content and only links
 *   its title (first heading, or first paragraph), instead of wrapping blocks.
 */
function prepareContent(root: LinkedomNode, document: LinkedomDocument) {
  root.querySelectorAll('button[aria-controls]').forEach((button) => {
    const text = button.textContent?.replace(/\s+/g, ' ').trim();
    if (!text) return;
    const paragraph = document.createElement('p');
    const strong = document.createElement('strong');
    strong.textContent = text;
    paragraph.appendChild(strong);
    button.replaceWith(paragraph);
  });

  root.querySelectorAll(NON_CONTENT).forEach((node) => node.remove());

  // A Markdown heading is one line: visual line breaks inside headings become spaces.
  root
    .querySelectorAll(
      `${HEADINGS.split(',')
        .map((h) => `${h} br`)
        .join(',')}`
    )
    .forEach((br) => {
      br.replaceWith(document.createTextNode(' '));
    });

  root.querySelectorAll('a').forEach((link) => {
    if (!link.querySelector(BLOCK_CHILDREN)) return;
    const href = link.getAttribute('href');
    const title = link.querySelector(HEADINGS) ?? link.querySelector('p');
    if (href && title) {
      const inner = document.createElement('a');
      inner.setAttribute('href', href);
      while (title.firstChild) inner.appendChild(title.firstChild);
      title.appendChild(inner);
    }
    const container = document.createElement('div');
    while (link.firstChild) container.appendChild(link.firstChild);
    link.replaceWith(container);
  });
}

const cleanMarkdown = (markdown: string) =>
  markdown
    .replace(/[ \t]+\n/g, '\n')
    // Visual separators between inline facts ("20 Jan 2025 • 6 min read").
    .replace(/\n\n[•·|]\n\n/g, ' · ')
    .replace(/\n{3,}/g, '\n\n')
    .trim();

/** Converts an HTML fragment (for example a rich text body) to Markdown. */
export function htmlFragmentToMarkdown(html: string): string {
  const { document } = parseHTML(`<!doctype html><html><body><main>${html}</main></body></html>`);
  const main = document.querySelector('main');
  if (!main) return '';
  prepareContent(main, document);
  // linkedom implements the DOM interface Turndown needs, but its types are its own.
  return cleanMarkdown(turndown.turndown(main as unknown as HTMLElement));
}

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

const optionalString = (value: unknown) => (typeof value === 'string' ? value : undefined);

/** Dates of the page from its JSON-LD WebPage node (the one with `isPartOf` and dates). */
function pageDates(document: LinkedomElement['ownerDocument']) {
  for (const script of document.querySelectorAll('script[type="application/ld+json"]')) {
    let parsed: unknown;
    try {
      parsed = JSON.parse(script.textContent ?? '');
    } catch {
      continue; // Unparsable blocks are ignored; dates are optional.
    }
    const graph: unknown[] =
      isRecord(parsed) && Array.isArray(parsed['@graph']) ? parsed['@graph'] : [];
    const page = graph
      .filter(isRecord)
      .find(
        (node) =>
          'url' in node && 'isPartOf' in node && ('datePublished' in node || 'dateModified' in node)
      );
    if (page) {
      return {
        published: optionalString(page.datePublished),
        modified: optionalString(page.dateModified)
      };
    }
  }
  return {};
}

const yamlValue = (value: string) => JSON.stringify(value);

/**
 * Converts a full HTML page to Markdown: front matter with the page's title,
 * description, canonical URL and dates, then the content of `<main>`.
 */
export function pageHtmlToMarkdown(html: string): MarkdownPage {
  const { document } = parseHTML(html);

  const robots = document.querySelector('meta[name="robots"]')?.getAttribute('content') ?? '';
  const noIndex = /\b(noindex|none)\b/i.test(robots);
  const title = document.querySelector('title')?.textContent?.trim() || undefined;
  const description =
    document.querySelector('meta[name="description"]')?.getAttribute('content')?.trim() ||
    undefined;
  const canonical =
    document.querySelector('link[rel="canonical"]')?.getAttribute('href')?.trim() || undefined;
  const { published, modified } = pageDates(document);

  const main = document.querySelector('main') ?? document.body;
  prepareContent(main, document);
  // Turndown only needs the DOM interface; linkedom implements it.
  const body = cleanMarkdown(turndown.turndown(main as unknown as HTMLElement));

  const frontMatter = [
    title && `title: ${yamlValue(title)}`,
    description && `description: ${yamlValue(description)}`,
    canonical && `url: ${yamlValue(canonical)}`,
    published && `datePublished: ${yamlValue(published)}`,
    modified && `dateModified: ${yamlValue(modified)}`
  ].filter(Boolean);

  const markdown = frontMatter.length
    ? `---\n${frontMatter.join('\n')}\n---\n\n${body}\n`
    : `${body}\n`;
  return { markdown, title, description, canonical, noIndex };
}
