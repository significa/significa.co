import type { Handle, RequestEvent } from '@sveltejs/kit';
import { pageHtmlToMarkdown } from './html-to-markdown';
import { hasMarkdownTwin, markdownTwinPath, pageForMarkdownTwin, prefersMarkdown } from './paths';

/**
 * Routes whose Accept negotiation happens here rather than in vercel.json.
 * Vercel matches the handbook's own routes before vercel.json rewrites, so the
 * rewrite never reaches them. They are not ISR-cached (max-age=0), so answering
 * by Accept here cannot mix HTML and Markdown in a cache. The marketing
 * catch-all is ISR-cached and must keep negotiating in vercel.json.
 */
const NEGOTIATED_IN_APP = ['/(handbook)'];

const REDIRECT = new Set([301, 302, 303, 307, 308]);

const notFound = () =>
  new Response('Not found\n', {
    status: 404,
    headers: { 'content-type': 'text/plain; charset=utf-8' }
  });

/** Serves `/path.md` by rendering `/path` and converting its HTML to Markdown. */
export async function serveMarkdownTwin(event: RequestEvent, page: string): Promise<Response> {
  // Only the path changes: the page is always fetched from this site, never another origin.
  const target = new URL(event.url);
  target.pathname = page;
  if (target.origin !== event.url.origin) return notFound();

  const response = await event.fetch(target, {
    headers: { accept: 'text/html' },
    redirect: 'manual'
  });

  // A page that moved: send the agent to the twin of the new page.
  const location = response.headers.get('location');
  if (REDIRECT.has(response.status) && location) {
    const target = new URL(location, event.url);
    if (target.origin === event.url.origin && hasMarkdownTwin(target.pathname)) {
      return new Response(null, {
        status: response.status,
        headers: { location: `${markdownTwinPath(target.pathname)}${target.search}` }
      });
    }
    return notFound();
  }

  // Server errors stay errors, so callers (llms-full.txt) can tell them from missing pages.
  if (response.status >= 500) {
    return new Response('Upstream error\n', {
      status: response.status === 503 ? 503 : 502,
      headers: { 'content-type': 'text/plain; charset=utf-8' }
    });
  }
  const contentType = response.headers.get('content-type') ?? '';
  if (response.status !== 200 || !contentType.includes('text/html')) return notFound();

  const { markdown, canonical, noIndex } = pageHtmlToMarkdown(await response.text());
  // Pages kept out of search are kept out of the Markdown twins too.
  if (noIndex) return notFound();

  const headers = new Headers({
    'content-type': 'text/markdown; charset=utf-8',
    vary: 'Accept'
  });
  // The HTML page stays the one search engines index and cite.
  if (canonical) headers.set('link', `<${canonical}>; rel="canonical"`);
  return new Response(event.request.method === 'HEAD' ? null : markdown, { headers });
}

/**
 * Markdown twins for agents:
 * - `GET /path.md` returns the page as Markdown;
 * - HTML pages advertise their twin with a `Link: rel="alternate"` header.
 * Requests with `Accept: text/markdown` are rewritten to `/path.md` by
 * `vercel.json`, before the ISR cache, so HTML and Markdown are cached apart.
 */
export const markdownHandle: Handle = async ({ event, resolve }) => {
  const readable = event.request.method === 'GET' || event.request.method === 'HEAD';
  const page = pageForMarkdownTwin(event.url.pathname);
  if (page && readable) return serveMarkdownTwin(event, page);

  if (
    readable &&
    NEGOTIATED_IN_APP.some((group) => event.route.id?.startsWith(group)) &&
    hasMarkdownTwin(event.url.pathname) &&
    prefersMarkdown(event.request.headers.get('accept'))
  ) {
    return serveMarkdownTwin(event, event.url.pathname);
  }

  const response = await resolve(event);
  const contentType = response.headers.get('content-type') ?? '';
  if (
    response.status === 200 &&
    contentType.includes('text/html') &&
    hasMarkdownTwin(event.url.pathname) &&
    !event.locals.noMarkdownTwin
  ) {
    response.headers.append(
      'link',
      `<${markdownTwinPath(event.url.pathname)}>; rel="alternate"; type="text/markdown"`
    );
    response.headers.append('vary', 'Accept');
  }
  return response;
};
