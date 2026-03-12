// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import rehypeExternalLinks from "rehype-external-links";

export default defineConfig({
  site: "https://significa.co",
  integrations: [mdx(), sitemap()],
  markdown: {
    rehypePlugins: [
      [
        rehypeExternalLinks,
        {
          rel: ["noopener", "noreferrer"],
          target: "_blank",
        },
      ],
    ],
  },
});
