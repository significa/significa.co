# MDX Components

Custom components used inside `.mdx` content files. These are **Astro components** (not React) — they run at build time with zero client JS.

## Registering Components for MDX

You must pass components to MDX when rendering. In your `[slug].astro` page:

```astro
---
import ProjectCrossSell from "../../components/mdx/ProjectCrossSell.astro";
import ComparisonBlock from "../../components/mdx/ComparisonBlock.astro";
import Metrics from "../../components/mdx/Metrics.astro";
import MediaImage from "../../components/mdx/MediaImage.astro";
import MediaVideo from "../../components/mdx/MediaVideo.astro";

const { project } = Astro.props;
const { Content } = await project.render();

const mdxComponents = {
  ProjectCrossSell,
  ComparisonBlock,
  Metrics,
  MediaImage,
  MediaVideo,
};
---

<Content components={mdxComponents} />
```

## Component Catalog

### MediaImage

Renders a CDN-hosted image with optional caption. Use this instead of raw `![alt](url)` when you need captions or custom sizing.

```mdx
<MediaImage
  src="https://cdn.significa.co/projects/cool-project/hero.jpg"
  alt="Dashboard overview"
  caption="The main dashboard after redesign"
/>
```

### MediaVideo

Embeds a video from CDN or YouTube/Vimeo.

```mdx
<MediaVideo
  src="https://cdn.significa.co/projects/cool-project/demo.mp4"
  caption="Prototype walkthrough"
/>
```

### ComparisonBlock

Side-by-side before/after or A/B comparison.

```mdx
<ComparisonBlock
  before={{
    src: "https://cdn.significa.co/projects/x/before.jpg",
    label: "Before redesign"
  }}
  after={{
    src: "https://cdn.significa.co/projects/x/after.jpg",
    label: "After redesign"
  }}
/>
```

### Metrics

Key numbers/stats display.

```mdx
<Metrics
  items={[
    { value: "3x", label: "Conversion rate increase" },
    { value: "40%", label: "Faster load time" },
    { value: "98", label: "Lighthouse score" },
  ]}
/>
```

### ProjectCrossSell

Card linking to another project. See `02-CONTENT-SCHEMA.md` for implementation.

```mdx
<ProjectCrossSell slug="another-project" />
```

## Rules for MDX Components

1. **Astro components only** — no React unless you need client interactivity (you almost never do for content components).
2. **Throw on bad data** — if a required prop is missing or a slug doesn't resolve, throw an error at build time. Never silently fail.
3. **No fetching external data** — all data comes from props or content collections.
4. **Keep them dumb** — a component renders what it receives. Business logic stays in the page template.
