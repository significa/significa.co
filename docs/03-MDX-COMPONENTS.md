# MDX Components

Custom components used inside `.mdx` content files. These are **Astro components** (not React): they run at build time with zero client JS.

## Registering Components for MDX

Components must be passed explicitly when rendering. In your `[slug].astro` page:

```astro
---
import ProjectCrossSell from "../../components/mdx/ProjectCrossSell.astro";
import ComparisonBlock from "../../components/mdx/ComparisonBlock.astro";
import Metrics from "../../components/mdx/Metrics.astro";
import MediaImage from "../../components/mdx/MediaImage.astro";
import MediaVideo from "../../components/mdx/MediaVideo.astro";

const { project } = Astro.props;
const { Content } = await render(project);

const mdxComponents = {
  ProjectCrossSell,
  ComparisonBlock,
  Metrics,
  MediaImage,
  MediaVideo,
  // Add new components here as they are created
};
---

<Content components={mdxComponents} />
```

## Component Catalog

### MediaImage

Renders an image with optional caption. Always use this instead of raw `![alt](url)` for captions, sizing control, and future CDN migration.

```mdx
<MediaImage
  src="/images/projects/cool-project/hero.jpg"
  alt="Dashboard overview"
  width={1200}
  height={630}
  caption="The main dashboard after redesign"
/>
```

**Required props:** `src`, `alt`, `width`, `height`
**Optional:** `caption`, `eager` (for above-the-fold images)

### MediaVideo

Embeds a video.

```mdx
<MediaVideo
  src="/images/projects/cool-project/demo.mp4"
  caption="Prototype walkthrough"
/>
```

### ComparisonBlock

Side-by-side before/after or A/B comparison.

```mdx
<ComparisonBlock
  before={{
    src: "/images/projects/x/before.jpg",
    label: "Before redesign"
  }}
  after={{
    src: "/images/projects/x/after.jpg",
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

Card linking to another project. See `02-CONTENT-SCHEMA.md` for the implementation pattern.

```mdx
<ProjectCrossSell slug="another-project" />
```

## Component Growth Strategy

We start with 5 components. New components are added when content demands them, not eagerly. When a content author needs a pattern that doesn't exist, that's the signal to build it.

**Components to consider adding (by priority):**

| Component | Justification | Priority |
|---|---|---|
| `ImageGrid` | Show multiple screens side by side (2-4 columns) | Must-have |
| `Section` | Background color changes, full-bleed, visual chapters | Must-have |
| `Testimonial` | Client voice: quote, name, role, company | Must-have |
| `CTA` | Conversion points within content | Must-have |
| `PullQuote` / `Callout` | Break monotony, highlight insights | Should-have |
| `DeviceFrame` | Contextualize screenshots (phone/desktop) | Should-have |

## Adding New MDX Components

1. Create the `.astro` file in `src/components/mdx/`
2. Define `interface Props` with TypeScript
3. Import and add to `mdxComponents` in every `[slug].astro` that needs it
4. Add usage example to this documentation
5. Test with `pnpm build` to verify

## Rules for MDX Components

1. **Astro components only.** No React unless the component needs client interactivity.
2. **Throw on bad data.** Missing props or unresolved slugs must throw with a clear error message at build time.
3. **No data fetching.** All data comes from props or content collections.
4. **Keep them simple.** Render what they receive. Business logic stays in page templates.
5. **Document the props interface.** Every component needs a clear `interface Props`.
