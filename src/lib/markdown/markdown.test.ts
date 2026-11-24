import { readFileSync } from 'node:fs';
import { describe, expect, it, vi } from 'vitest';
import type { RequestEvent } from '@sveltejs/kit';
import { markdownHandle } from './handle';
import { htmlFragmentToMarkdown, pageHtmlToMarkdown } from './html-to-markdown';
import { mapOutsideFences } from './fences';
import { buildLlmsFull, nestHeadings, parseTwin, stripFrontMatter } from './llms-full';
import { EXCLUDED_PREFIXES, hasMarkdownTwin, markdownTwinPath, pageForMarkdownTwin } from './paths';

const page = (main: string, head = '') => `<!doctype html><html lang="en"><head>
<title>Finance Digital Products.</title>
<meta name="description" content="Digital products for finance.">
<link rel="canonical" href="https://significa.co/finance">
<script type="application/ld+json">{"@context":"https://schema.org","@graph":[{"@type":"WebPage","url":"https://significa.co/finance","isPartOf":{"@id":"https://significa.co/#website"},"datePublished":"2026-07-09T13:26:56.811Z","dateModified":"2026-10-06T14:03:32.856Z"}]}</script>
${head}</head><body><nav><a href="/projects">Projects</a></nav><main>${main}</main><footer>Footer</footer></body></html>`;

describe('markdown twin paths', () => {
  it('maps pages to their twins and back', () => {
    expect(markdownTwinPath('/')).toBe('/index.md');
    expect(markdownTwinPath('/blog/post')).toBe('/blog/post.md');
    expect(markdownTwinPath('/blog/post/')).toBe('/blog/post.md');
    expect(pageForMarkdownTwin('/index.md')).toBe('/');
    expect(pageForMarkdownTwin('/.md')).toBe('/');
    expect(pageForMarkdownTwin('/blog/post.md')).toBe('/blog/post');
    expect(pageForMarkdownTwin('/blog/post')).toBeNull();
  });

  it('has no twin for files, private and utility routes', () => {
    expect(hasMarkdownTwin('/robots.txt')).toBe(false);
    expect(hasMarkdownTwin('/sitemap.xml')).toBe(false);
    expect(hasMarkdownTwin('/proposal/acme')).toBe(false);
    expect(hasMarkdownTwin('/handbook/search')).toBe(false);
    expect(hasMarkdownTwin('/formula')).toBe(true);
    expect(pageForMarkdownTwin('/proposal/acme.md')).toBeNull();
    expect(pageForMarkdownTwin('/robots.txt.md')).toBeNull();
  });

  it('rejects protocol-relative and backslash paths that would point at another host', () => {
    expect(pageForMarkdownTwin('//127.0.0.1:8443/internal.md')).toBeNull();
    expect(pageForMarkdownTwin('//evil.example/x.md')).toBeNull();
    expect(pageForMarkdownTwin('/\\evil.example/x.md')).toBeNull();
    expect(hasMarkdownTwin('//evil.example/x')).toBe(false);
  });
});

describe('HTML to Markdown', () => {
  it('adds front matter from the head and JSON-LD', () => {
    const { markdown, canonical, noIndex } = pageHtmlToMarkdown(page('<h1>Finance</h1>'));
    expect(
      markdown.startsWith(`---
title: "Finance Digital Products."
description: "Digital products for finance."
url: "https://significa.co/finance"
datePublished: "2026-07-09T13:26:56.811Z"
dateModified: "2026-10-06T14:03:32.856Z"
---

# Finance`)
    ).toBe(true);
    expect(canonical).toBe('https://significa.co/finance');
    expect(noIndex).toBe(false);
  });

  it('keeps only the main content', () => {
    const { markdown } = pageHtmlToMarkdown(
      page(
        '<h1>Title</h1><script>alert(1)</script><button>Menu</button><svg><text>x</text></svg><p aria-hidden="true">decor</p><p>Body</p>'
      )
    );
    expect(markdown).toContain('# Title\n\nBody');
    for (const text of ['Projects', 'Footer', 'alert', 'Menu', 'decor', '<svg']) {
      expect(markdown).not.toContain(text);
    }
  });

  it('turns FAQ accordion triggers into questions and keeps the answers', () => {
    const { markdown } = pageHtmlToMarkdown(
      page(`<h2>Frequently Asked Questions</h2><ul>
        <li><button aria-expanded="false" aria-controls="a1"><span>Do you do fintech?</span><svg/></button>
        <div id="a1" role="region" inert><p>Yes, end to end.</p></div></li>
        <li><button aria-controls="a2">Crypto?</button><div id="a2" inert><p>Yes.</p></div></li></ul>`)
    );
    expect(markdown).toContain(
      '## Frequently Asked Questions\n\n- **Do you do fintech?**\n\n  Yes, end to end.\n\n- **Crypto?**\n\n  Yes.'
    );
  });

  it('links the title of a card instead of wrapping blocks in a link', () => {
    const { markdown } = pageHtmlToMarkdown(
      page(`<a href="/projects/fcporto"><img src="x.jpg" alt=""><div><h3>FC Porto.</h3><p>Ticketing.</p></div></a>
            <a href="/blog/allo"><div><p>allO story.</p></div><p>From our blog</p></a>`)
    );
    expect(markdown).toContain(
      '### [FC Porto.](https://significa.co/projects/fcporto)\n\nTicketing.'
    );
    expect(markdown).toContain('[allO story.](https://significa.co/blog/allo)\n\nFrom our blog');
  });

  it('writes headings on one line, compact lists, tables and described images only', () => {
    const { markdown } = pageHtmlToMarkdown(
      page(`<h1>Think. Design.<br>Develop.</h1><ul><li><p>One</p></li><li>Two</li></ul>
        <table><tr><th>Plan</th><th>Price</th></tr><tr><td>A | B</td><td>1</td></tr></table>
        <img src="https://a.storyblok.com/f/1/a.png" alt="A cover"><img src="/decor.png" alt="">`)
    );
    expect(markdown).toContain('# Think. Design. Develop.');
    expect(markdown).toContain('- One\n- Two');
    expect(markdown).toContain('| Plan | Price |\n| --- | --- |\n| A \\| B | 1 |');
    expect(markdown).toContain('![A cover](https://a.storyblok.com/f/1/a.png)');
    expect(markdown).not.toContain('decor.png');
  });

  it('makes links absolute and keeps external, mailto and query strings', () => {
    const markdown = htmlFragmentToMarkdown(
      '<p><a href="/about">About</a> <a href="https://youtube.com/watch?v=abc">Video</a> <a href="mailto:hi@significa.co">Email</a> <a href="#top">Top</a></p>'
    );
    expect(markdown).toBe(
      '[About](https://significa.co/about) [Video](https://youtube.com/watch?v=abc) [Email](mailto:hi@significa.co) Top'
    );
  });

  it('uses the article as the document when the page has one', () => {
    const { markdown } = pageHtmlToMarkdown(
      page('<article><h1>Post</h1><p>Body</p></article><h2>Related articles</h2><p>Other post</p>')
    );
    expect(markdown).toContain('# Post\n\nBody');
    expect(markdown).not.toContain('Related articles');
  });

  it('leaves code blocks untouched', () => {
    const markdown = htmlFragmentToMarkdown(
      '<p>Example:</p><pre><code>const a = `line one\n\n\n\nline five`;   \n</code></pre>'
    );
    expect(markdown).toContain('const a = `line one\n\n\n\nline five`;   ');
  });

  it('detects pages kept out of search', () => {
    expect(
      pageHtmlToMarkdown(page('<h1>x</h1>', '<meta name="robots" content="noindex, nofollow">'))
        .noIndex
    ).toBe(true);
  });
});

type Fetch = (input: string, init?: RequestInit) => Promise<Response>;

function event(pathname: string, fetchImpl: Fetch, locals: App.Locals = { version: 'published' }) {
  return {
    url: new URL(`https://significa.co${pathname}`),
    request: new Request(`https://significa.co${pathname}`),
    locals,
    fetch: vi.fn(fetchImpl)
  } as unknown as RequestEvent; // Test mock: only the fields the handle reads.
}

const html = (body: string, status = 200) =>
  new Response(body, { status, headers: { 'content-type': 'text/html; charset=utf-8' } });

describe('markdown handle', () => {
  it('serves the twin as Markdown with canonical and Vary headers', async () => {
    const resolve = vi.fn();
    const response = await markdownHandle({
      event: event('/finance.md', async () => html(page('<h1>Finance</h1>'))),
      resolve
    });
    expect(resolve).not.toHaveBeenCalled();
    expect(response.status).toBe(200);
    expect(response.headers.get('content-type')).toBe('text/markdown; charset=utf-8');
    expect(response.headers.get('vary')).toBe('Accept');
    expect(response.headers.get('link')).toBe('<https://significa.co/finance>; rel="canonical"');
    expect(await response.text()).toContain('# Finance');
  });

  it('returns 404 for missing pages and pages kept out of search', async () => {
    const missing = await markdownHandle({
      event: event('/nope.md', async () => html('not found', 404)),
      resolve: vi.fn()
    });
    expect(missing.status).toBe(404);
    const hidden = await markdownHandle({
      event: event('/hidden.md', async () =>
        html(page('<h1>x</h1>', '<meta name="robots" content="noindex">'))
      ),
      resolve: vi.fn()
    });
    expect(hidden.status).toBe(404);
  });

  it('never fetches another origin, even from a protocol-relative path', async () => {
    const fetchSpy = vi.fn(async () => html(page('<h1>x</h1>')));
    const resolve = vi.fn(async () => new Response('routed normally', { status: 404 }));
    const response = await markdownHandle({
      event: event('//127.0.0.1:8443/internal.md', fetchSpy),
      resolve
    });
    expect(fetchSpy).not.toHaveBeenCalled();
    expect(response.status).toBe(404);
  });

  it('fetches the page from the same origin with only the path changed', async () => {
    const fetchSpy = vi.fn(async () => html(page('<h1>x</h1>')));
    await markdownHandle({ event: event('/finance.md?t=1', fetchSpy), resolve: vi.fn() });
    const [target] = fetchSpy.mock.calls[0] as unknown as [URL];
    expect(String(target)).toBe('https://significa.co/finance?t=1');
  });

  it('keeps server errors as errors instead of turning them into 404s', async () => {
    const response = await markdownHandle({
      event: event('/finance.md', async () => new Response('boom', { status: 500 })),
      resolve: vi.fn()
    });
    expect(response.status).toBe(502);
  });

  it('sends moved pages to the twin of their new location', async () => {
    const response = await markdownHandle({
      event: event(
        '/old.md',
        async () => new Response(null, { status: 308, headers: { location: '/new' } })
      ),
      resolve: vi.fn()
    });
    expect(response.status).toBe(308);
    expect(response.headers.get('location')).toBe('/new.md');
  });

  it('advertises the twin on HTML pages, except pages kept out of search', async () => {
    const resolve = vi.fn(async () => html('<p>page</p>'));
    const shown = await markdownHandle({ event: event('/finance', async () => html('')), resolve });
    expect(shown.headers.get('link')).toBe('</finance.md>; rel="alternate"; type="text/markdown"');
    expect(shown.headers.get('vary')).toBe('Accept');

    const hidden = await markdownHandle({
      event: event('/post', async () => html(''), { version: 'published', noMarkdownTwin: true }),
      resolve
    });
    expect(hidden.headers.get('link')).toBeNull();

    const file = await markdownHandle({ event: event('/rss.xml', async () => html('')), resolve });
    expect(file.headers.get('link')).toBeNull();
  });
});

describe('llms-full.txt', () => {
  it('nests page headings under the entry and drops a repeated title', () => {
    expect(
      nestHeadings('# Money matters\n\nIntro\n\n## Policy\n\n### Detail', 'Money matters')
    ).toBe('Intro\n\n#### Policy\n\n##### Detail');
    expect(nestHeadings('## A\n\n```\n# not a heading\n```', 'B')).toBe(
      '#### A\n\n```\n# not a heading\n```'
    );
  });

  it('drops the repeated title even after a date line, and keeps code blocks intact', () => {
    expect(nestHeadings('20 Jan 2025\n\n# Post\n\nBody\n\n## Part', 'Post')).toBe(
      '20 Jan 2025\n\nBody\n\n#### Part'
    );
    expect(nestHeadings('## A\n\n```js\nconst x = 1;\n\n\n\nconst y = 2;\n```', 'B')).toBe(
      '#### A\n\n```js\nconst x = 1;\n\n\n\nconst y = 2;\n```'
    );
    expect(
      mapOutsideFences('a\n\n\nb\n```\nx\n\n\ny\n```', (p) => p.replace(/\n{3,}/g, '\n\n'))
    ).toBe('a\n\nb\n```\nx\n\n\ny\n```');
  });

  it('reads the canonical URL and dates from a twin', () => {
    const twin = parseTwin(
      '---\ntitle: "Post"\nurl: "https://significa.co/blog/canonical-override"\ndatePublished: "2025-01-20T10:00:00Z"\n---\n\n# Post'
    );
    expect(twin).toEqual({
      url: 'https://significa.co/blog/canonical-override',
      datePublished: '2025-01-20T10:00:00Z',
      dateModified: undefined,
      body: '# Post'
    });
  });

  it('strips front matter from twins', () => {
    expect(stripFrontMatter('---\ntitle: "x"\n---\n\n# Body')).toBe('# Body');
  });

  it('writes one entry per page with its URL and dates', () => {
    const output = buildLlmsFull({
      name: 'Significa',
      summary: 'Design and development agency.',
      indexUrl: 'https://significa.co/llms.txt',
      sections: [
        {
          title: 'Blog',
          entries: [
            {
              title: 'Post',
              url: 'https://significa.co/blog/post',
              datePublished: '2025-01-20T10:00:00Z',
              dateModified: '2026-04-09T10:00:00Z',
              markdown: '# Post\n\nBody'
            }
          ]
        },
        { title: 'Empty', entries: [] }
      ]
    });
    expect(output).toContain(
      '## Blog\n\n### Post\n\nURL: https://significa.co/blog/post\nPublished: 2025-01-20 · Updated: 2026-04-09\n\nBody'
    );
    expect(output).not.toContain('## Empty');
    expect(output.startsWith('# Significa\n\n> Design and development agency.')).toBe(true);
  });
});

describe('Vercel and robots configuration', () => {
  const vercel = JSON.parse(readFileSync('vercel.json', 'utf8'));
  const robots = readFileSync('static/robots.txt', 'utf8');
  const [homeRewrite, pageRewrite] = vercel.rewrites;
  const accept = new RegExp(`^${homeRewrite.has[0].value}`);

  it('rewrites Markdown requests to the twins, before the cache', () => {
    expect(homeRewrite).toMatchObject({ source: '/', destination: '/index.md' });
    expect(pageRewrite.destination).toBe('/:path.md');
    expect(pageRewrite.has[0].value).toBe(homeRewrite.has[0].value);
  });

  it('only treats Accept headers that prefer Markdown as Markdown requests', () => {
    for (const value of [
      'text/markdown',
      'text/markdown, text/html;q=0.9, */*;q=0.8',
      'text/html, text/markdown',
      'text/plain;q=0.5, text/markdown;q=1.0'
    ]) {
      expect(accept.test(value), value).toBe(true);
    }
    for (const value of [
      'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
      '*/*',
      'text/html, text/markdown;q=0.5',
      'text/x-markdown-preview'
    ]) {
      expect(accept.test(value), value).toBe(false);
    }
  });

  it('excludes the same routes as the app and every file path', () => {
    const inner = pageRewrite.source.match(/^\/:path\((.*)\)$/)[1];
    const path = new RegExp(`^${inner}$`);
    for (const prefix of EXCLUDED_PREFIXES) {
      expect(path.test(prefix.slice(1)), prefix).toBe(false);
      expect(path.test(`${prefix.slice(1)}/x`), prefix).toBe(false);
    }
    for (const allowed of ['finance', 'blog/post', 'about/julieta-frade', 'formula']) {
      expect(path.test(allowed), allowed).toBe(true);
    }
    for (const file of ['robots.txt', 'llms.txt', 'blog/post.md', 'fonts/a.woff2']) {
      expect(path.test(file), file).toBe(false);
    }
  });

  it('states the content usage preferences in robots.txt and as a header', () => {
    expect(robots).toMatch(/^Content-Signal: search=yes, ai-input=yes, ai-train=yes$/m);
    expect(robots).toMatch(/^Content-Usage: search=y, ai-use=y, train-ai=y$/m);
    const headers = vercel.headers[0].headers;
    expect(headers).toContainEqual({
      key: 'Content-Usage',
      value: 'search=y, ai-use=y, train-ai=y'
    });
  });
});
