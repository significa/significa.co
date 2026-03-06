import MediaImage from "./media-image.astro";
import MediaVideo from "./media-video.astro";
import ComparisonBlock from "./comparison-block.astro";
import Metrics from "./metrics.astro";
import ProjectCrossSell from "./project-cross-sell.astro";
import FAQSection from "./faq-section.astro";

/**
 * MDX component registry.
 *
 * Import this in every `[slug].astro` page that renders MDX content
 * and pass it to `<Content components={mdxComponents} />`.
 *
 * When adding a new MDX component:
 * 1. Create the `.astro` file in `src/components/mdx/`
 * 2. Import and add it here
 * 3. That's it — all slug pages pick it up automatically
 */
export const mdxComponents = {
  MediaImage,
  MediaVideo,
  ComparisonBlock,
  Metrics,
  ProjectCrossSell,
  FAQSection,
};
