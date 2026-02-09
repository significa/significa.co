import rss from "@astrojs/rss";
import type { APIContext } from "astro";
import { getPublishedPosts } from "../../lib/collections";

export async function GET(context: APIContext) {
  const posts = await getPublishedPosts();

  return rss({
    title: "Significa Blog",
    description: "Thoughts on design, engineering, and building products.",
    site: context.site!.href,
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.date,
      link: `/blog/${post.id}`,
    })),
  });
}
