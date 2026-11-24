/**
 * Which URLs have a Markdown twin, and where it lives.
 *
 * Every public page at `/path` has a twin at `/path.md` (the home page at
 * `/index.md`). Agents find it through `<link rel="alternate">` and the `Link`
 * header, or get it by sending `Accept: text/markdown` (see `vercel.json`).
 *
 * Keep EXCLUDED_PREFIXES in sync with the negative lookahead in the Accept
 * rewrite in `vercel.json`; a test checks it.
 */

/** Routes that are not public content pages (private, utility or API routes). */
export const EXCLUDED_PREFIXES = [
  '/proposal',
  '/preview',
  '/exit-preview',
  '/get-signed-url',
  '/healthz',
  '/form',
  '/segg',
  '/handbook/search'
] as const;

const MARKDOWN_SUFFIX = '.md';

/**
 * Accept header values that prefer Markdown: `text/markdown` with no q, or q=1.
 * The same pattern is used by the rewrite in vercel.json (a test keeps them equal).
 */
export const MARKDOWN_ACCEPT_PATTERN =
  '(?:^|.*,)\\s*text/markdown\\s*(?:;\\s*q\\s*=\\s*1(?:\\.0{0,3})?\\s*)?(?:,.*)?$';

const markdownAccept = new RegExp(MARKDOWN_ACCEPT_PATTERN);

/** True when an Accept header asks for Markdown over HTML. */
export const prefersMarkdown = (accept: string | null) => markdownAccept.test(accept ?? '');

const isExcluded = (pathname: string) =>
  EXCLUDED_PREFIXES.some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`));

/**
 * A same-site absolute path: one leading slash, no backslashes. Rejects
 * protocol-relative values such as `//127.0.0.1/x`, which a URL parser or
 * fetch would treat as another host.
 */
const isSitePath = (pathname: string) =>
  pathname.startsWith('/') && !pathname.startsWith('//') && !pathname.includes('\\');

/** True when a page at this path gets a Markdown twin. */
export function hasMarkdownTwin(pathname: string): boolean {
  if (!isSitePath(pathname) || isExcluded(pathname)) return false;
  // Files (robots.txt, sitemap.xml, llms.txt, images...) have an extension in the last segment.
  const last = pathname.split('/').pop() ?? '';
  return !last.includes('.');
}

/** `/blog/post` -> `/blog/post.md`, `/` -> `/index.md`. */
export function markdownTwinPath(pathname: string): string {
  const clean = pathname.replace(/\/+$/, '');
  return clean ? `${clean}${MARKDOWN_SUFFIX}` : `/index${MARKDOWN_SUFFIX}`;
}

/**
 * The HTML page a Markdown twin request is for, or null when the path is not a
 * twin. `/blog/post.md` -> `/blog/post`, `/index.md` -> `/`.
 */
export function pageForMarkdownTwin(pathname: string): string | null {
  if (!pathname.endsWith(MARKDOWN_SUFFIX)) return null;
  const page = pathname.slice(0, -MARKDOWN_SUFFIX.length);
  const target = page === '/index' || page === '' ? '/' : page;
  return hasMarkdownTwin(target) ? target : null;
}
