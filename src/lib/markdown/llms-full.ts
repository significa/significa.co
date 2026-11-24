/**
 * Builds /llms-full.txt: the full text of the public site in one Markdown
 * file, grouped by section, with each page's canonical URL under its heading
 * so an agent can cite the page rather than the file.
 */

export type LlmsFullEntry = {
  title: string;
  url: string;
  datePublished?: string;
  dateModified?: string;
  /** Page content as Markdown, starting at any heading level. */
  markdown: string;
};

export type LlmsFullSection = { title: string; entries: LlmsFullEntry[] };

/** Entries sit at `###`, so their own headings start at `####`. */
const ENTRY_HEADING_DEPTH = 3;

/** Removes YAML front matter from a Markdown twin. */
export const stripFrontMatter = (markdown: string) =>
  markdown.replace(/^---\n[\s\S]*?\n---\n+/, '');

/**
 * Shifts every ATX heading so the shallowest one becomes `####`, capped at
 * `######`. A leading heading equal to the entry title is dropped, since the
 * entry already has it.
 */
export function nestHeadings(markdown: string, title: string): string {
  const lines = markdown.split('\n');
  const normalize = (value: string) => value.replace(/\W+/g, '').toLowerCase();

  // The page's own title heading, when it is the first thing in the content.
  const firstContent = lines.findIndex((line) => line.trim());
  const titleLine =
    firstContent >= 0 &&
    /^#{1,6} /.test(lines[firstContent]) &&
    normalize(lines[firstContent].replace(/^#+ /, '')) === normalize(title)
      ? firstContent
      : -1;

  // Heading lines outside fenced code blocks, except the title line.
  let inFence = false;
  const headingLines = new Set<number>();
  lines.forEach((line, index) => {
    if (line.startsWith('```')) inFence = !inFence;
    else if (!inFence && /^#{1,6} /.test(line) && index !== titleLine) headingLines.add(index);
  });

  const levels = [...headingLines].map((index) => lines[index].match(/^#+/)?.[0].length ?? 1);
  const shift = ENTRY_HEADING_DEPTH + 1 - (levels.length ? Math.min(...levels) : 1);

  return lines
    .flatMap((line, index) => {
      if (index === titleLine) return [];
      if (!headingLines.has(index)) return [line];
      const [, hashes, text] = line.match(/^(#{1,6}) (.*)$/) ?? [];
      return [`${'#'.repeat(Math.min(6, (hashes?.length ?? 1) + shift))} ${text}`];
    })
    .join('\n')
    .replace(/^\n+/, '')
    .replace(/\n{3,}/g, '\n\n');
}

const day = (iso?: string) => (iso ? iso.slice(0, 10) : undefined);

function renderEntry(entry: LlmsFullEntry): string {
  const published = day(entry.datePublished);
  const modified = day(entry.dateModified);
  const dates = [
    published && `Published: ${published}`,
    modified && modified !== published && `Updated: ${modified}`
  ]
    .filter(Boolean)
    .join(' · ');
  const body = nestHeadings(entry.markdown.trim(), entry.title);
  return [`### ${entry.title}`, '', `URL: ${entry.url}`, dates, '', body]
    .filter((line, index) => index !== 3 || line)
    .join('\n')
    .trim();
}

export function buildLlmsFull(options: {
  name: string;
  summary: string;
  indexUrl: string;
  sections: LlmsFullSection[];
}): string {
  const intro = [
    `# ${options.name}`,
    '',
    `> ${options.summary}`,
    '',
    `The full text of ${options.indexUrl.replace(/\/llms\.txt$/, '')} for language models, one entry per page with its URL. The curated index is at ${options.indexUrl}.`
  ].join('\n');

  const sections = options.sections
    .filter((section) => section.entries.length)
    .map((section) => [`## ${section.title}`, ...section.entries.map(renderEntry)].join('\n\n'));

  return `${[intro, ...sections].join('\n\n')}\n`;
}
