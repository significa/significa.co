import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { getStoryblok } from '$lib/storyblok';
import type { BlogPostStoryblok } from '$types/bloks';

export const GET: RequestHandler = async () => {
  const baseUrl = 'https://www.significa.co/blog/';
  const storyblok = getStoryblok();

  try {
    const posts: BlogPostStoryblok[] = await storyblok.getAll('cdn/stories', {
      version: 'published',
      content_type: 'blog-post',
      sort_by: 'first_published_at:desc'
    });

    const { data } = await storyblok.get('cdn/stories/blog');
    const { seo_title, seo_description } = data.story.content;

    const body = render(baseUrl, seo_title, seo_description, posts);

    const headers = {
      'Cache-Control': `max-age=0, s-max-age=600`,
      'Content-Type': 'application/xml'
    };

    return new Response(body, { headers });
  } catch (err) {
    console.error(err);
    throw error(500, 'Unable to fetch RSS feed');
  }
};

const render = (baseUrl: string, title: string, desc: string, posts: BlogPostStoryblok[]) =>
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
              <title>${post.name}</title>
              <link>${baseUrl}${post.slug}</link>
              <description>${post?.content?.seo_description}</description>
              <pubDate>${new Date(post.published_at).toUTCString()}</pubDate>
              <category>${post.tag_list.join(', ')}</category>
          </item>`
          )
          .join('')}
      </channel>
    </rss>`;
