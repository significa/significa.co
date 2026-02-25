# MDX Components

Custom components used inside `.mdx` content files. These are **Astro components** (not React): they run at build time with zero client JS.

## Registering Components for MDX

All MDX components are registered in a single file: `src/components/mdx/components.ts`. Every `[slug].astro` page imports from there — no duplication.

```ts
// src/components/mdx/components.ts
import MediaImage from "./media-image.astro";
import MediaVideo from "./media-video.astro";
import ComparisonBlock from "./comparison-block.astro";
import Metrics from "./metrics.astro";
import ProjectCrossSell from "./project-cross-sell.astro";

export const mdxComponents = {
  MediaImage,
  MediaVideo,
  ComparisonBlock,
  Metrics,
  ProjectCrossSell,
};
```

In your `[slug].astro` page, import and pass:

```astro
---
import { mdxComponents } from "../../components/mdx/components";

const { Content } = await render(entry);
---

<Content components={mdxComponents} />
```

## Component Catalog

### MediaImage

Renders an optimized image via the CDN with responsive `srcset`. Always use this instead of raw `![alt](url)` for captions, sizing control, and automatic image optimization.

The `src` prop takes the asset path (as returned by the asset manager). The component prepends the CDN hostname (`https://cdn.significa.co`) and appends optimization query parameters automatically.

```mdx
<MediaImage
  src="/projects/cool-project/hero.jpg"
  alt="Dashboard overview"
  width={1200}
  height={630}
  caption="The main dashboard after redesign"
/>
```

**Required props:** `src`, `alt`, `width`, `height`
**Optional:** `caption`, `eager` (for above-the-fold images), `sizes` (responsive sizes attr), `quality` (0-100, default 80)

### MediaVideo

Embeds a video served via the CDN. The `poster` image goes through the same transform pipeline as `MediaImage`.

```mdx
<MediaVideo
  src="/projects/cool-project/demo.mp4"
  poster="/projects/cool-project/demo-poster.jpg"
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
3. Import and add to the `mdxComponents` map in `src/components/mdx/components.ts`
4. Add usage example to this documentation
5. Test with `pnpm build` to verify

All slug pages import from `components.ts`, so step 3 is the only wiring needed.

## Rules for MDX Components

1. **Astro components only.** No React unless the component needs client interactivity.
2. **Throw on bad data.** Missing props or unresolved slugs must throw with a clear error message at build time.
3. **No data fetching.** All data comes from props or content collections.
4. **Keep them simple.** Render what they receive. Business logic stays in page templates.
5. **Document the props interface.** Every component needs a clear `interface Props`.
