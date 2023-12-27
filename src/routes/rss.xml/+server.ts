import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { PREVIEW_COOKIE_KEY } from '$lib/constants';
import { getStoryblok } from '$lib/storyblok';
import type { BlogPostStoryblok } from '$types/bloks';

export const GET: RequestHandler = async ({ cookies }) => {
  const storyblok = getStoryblok();

  try {
    const posts: BlogPostStoryblok[] = await storyblok.getAll('cdn/stories', {
      version: cookies.get(PREVIEW_COOKIE_KEY) ? 'draft' : 'published',
      content_type: 'blog-post',
      sort_by: 'first_published_at:desc'
    });

    const headers = {
      'Cache-Control': `max-age=0, s-max-age=600`,
      'Content-Type': 'application/xml'
    };

    const body = render(posts);

    return new Response(body, { headers });
  } catch (err) {
    console.error(err);
    throw error(404, 'Not found');
  }
};

const render = (posts: BlogPostStoryblok[]) =>
  `<?xml version="1.0" encoding="UTF-8" ?>
    <rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
      <channel>
        <atom:link href="http://significa.co/rss.xml" rel="self" type="application/rss+xml" />
        <title>Blog - Significa</title>
        <link>https://www.significa.co/blog</link>
        <description>We write stuff too. Pretty good stuff, may we say. About Design, UX/UI, Development, and, of course, Significa.</description>
        <ttl>1800</ttl>
        ${posts
          .map(
            (post) =>
              `<item>
              <guid>https://www.significa.co/blog/${post.slug}</guid>
              <title>${post.name}</title>
              <link>https://www.significa.co/blog/${post.slug}</link>
              <description>${post?.content?.seo_description}</description>
              <pubDate>${new Date(post.published_at).toUTCString()}</pubDate>
              <category>${post.tag_list.join(', ')}</category>
          </item>`
          )
          .join('')}
      </channel>
    </rss>`;
