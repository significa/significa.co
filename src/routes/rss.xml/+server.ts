import type { RequestHandler } from './$types';
import { fetchBlogPosts, fetchPage } from '$lib/content';
import type { WordPressBlogPost } from '$lib/types/wordpress';

export const GET: RequestHandler = async ({ fetch }) => {
  const baseUrl = 'https://www.significa.co/blog/';

  // Fetch all blog posts from WordPress
  const posts = await fetchBlogPosts({ per_page: 100, fetch });

  // Try to fetch blog page for meta information
  let seo_title = 'Blog';
  let seo_description = '';

  try {
    const blogPage = await fetchPage('blog', { fetch });
    seo_title = blogPage.acf?.seo_title || blogPage.title?.rendered || 'Blog';
    seo_description = blogPage.acf?.seo_description || blogPage.excerpt?.rendered || '';
  } catch (error) {
    // If blog page doesn't exist, use defaults
    console.error('Could not fetch blog page for RSS feed:', error);
  }

  const body = render(baseUrl, seo_title, seo_description, posts);

  const headers = {
    'Cache-Control': `max-age=0, s-max-age=600`,
    'Content-Type': 'application/xml'
  };

  return new Response(body, { headers });
};

const render = (baseUrl: string, title: string, desc: string, posts: WordPressBlogPost[]) =>
  `<?xml version="1.0" encoding="UTF-8" ?>
    <rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
      <channel>
        <atom:link href="http://significa.co/rss.xml" rel="self" type="application/rss+xml" />
        <title>${title}</title>
        <link>${baseUrl}</link>
        <description>${desc}</description>
        <ttl>1800</ttl>
        ${posts
          .map(
            (post) =>
              `<item>
              <guid>${baseUrl}${post.slug}</guid>
              <title>${post.title?.rendered || ''}</title>
              <link>${baseUrl}${post.slug}</link>
              <description>${post.acf?.seo_description || post.excerpt?.rendered || ''}</description>
              <pubDate>${new Date(post.date).toUTCString()}</pubDate>
              <category></category>
          </item>`
          )
          .join('')}
      </channel>
    </rss>`;
