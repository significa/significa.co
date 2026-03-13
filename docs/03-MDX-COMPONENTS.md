# MDX Components

Custom components used inside `.mdx` content files. These are **Astro components** (not React): they run at build time with zero client JS.

## Registering Components for MDX

All MDX components are registered in a single file: `src/components/mdx/components.ts`. Every `[slug].astro` page imports from there — no duplication.

```ts
// src/components/mdx/components.ts
import MediaBlock from "./media-block.astro";
import MediaVideo from "./media-video.astro";
import ComparisonBlock from "./comparison-block.astro";
import Metrics from "./metrics.astro";
import ProjectCrossSell from "./project-cross-sell.astro";
import FAQSection from "./faq-section.astro";
import Callout from "./callout.astro";

export const mdxComponents = {
  MediaBlock,
  MediaImage: MediaBlock, // deprecated alias — use MediaBlock
  MediaVideo,
  ComparisonBlock,
  Metrics,
  ProjectCrossSell,
  FAQSection,
  Callout,
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

### MediaBlock

The primary component for all media — images **and** videos. Always use this instead of raw `![alt](url)` markdown or bare `<img>`/`<video>` tags. It handles CDN URL generation, responsive `srcset`, and layout width in one place.

**Auto-detects media type:** if `src` ends in `.mp4`, `.webm`, or `.mov`, a looping muted autoplay `<video>` is rendered. Otherwise an optimised `<img>` with `srcset` is rendered. The MDX syntax is identical for both.

#### layout (required)

`layout` is **required** on every `<MediaBlock>` call. It controls how wide the media renders relative to the narrow prose column. Never omit it — it forces you to make a conscious choice about the visual weight of each piece of media.

| Value | Width | Use when |
|---|---|---|
| `full` | 100vw — edge to edge | Hero shots, full-bleed atmosphere images, wide video reels |
| `wide` | 1152px centered | Multi-screen compositions, before/after, wide UI screenshots |
| `medium` | 768px — stays in prose column | Single screen, inline illustration, no breakout needed |
| `small` | ~384px centered | Detail shot, mobile screenshot, supporting visual |

#### Image example

```mdx
<MediaBlock
  src="https://cdn.significa.co/website/projects/mishmash/mishmash-website-cover-GKU6Zl.jpg"
  alt="mishmash e-commerce homepage showing redesigned product grid"
  width={1920}
  height={1080}
  layout="full"
  caption="The redesigned homepage — clean, product-first."
/>
```

#### Video example

```mdx
<MediaBlock
  src="https://cdn.significa.co/website/projects/mishmash/mismash-1-landing-page-4zhh1q.mp4"
  alt="mishmash landing page scroll animation"
  width={1920}
  height={1080}
  layout="wide"
/>
```

Videos autoplay muted and loop silently — no controls, no sound. This is intentional: they serve as ambient motion, not primary content.

**Required props:** `src`, `width`, `height`, `layout`
**Optional:** `alt` (empty by default — leave empty for decorative/ambient media), `caption`, `eager` (for above-the-fold LCP images), `sizes` (responsive sizes attr, images only), `quality` (0–100, default 80, images only)

> **Migrating from `MediaImage`?** Just rename to `MediaBlock` and add `layout="full"` (or whatever width is appropriate). `MediaImage` still works as a deprecated alias but will be removed in a future cleanup.

---

### MediaVideo

> **Prefer `MediaBlock` for new content.** Use `MediaVideo` only when you need explicit playback controls or a poster image — e.g. a long-form demo or tutorial video where the user should control playback.

```mdx
<MediaVideo
  src="/projects/cool-project/demo.mp4"
  poster="/projects/cool-project/demo-poster.jpg"
  caption="Prototype walkthrough"
/>
```

---

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

---

### Metrics

Key numbers/stats display. Breaks out of the prose column with a tinted background.

```mdx
<Metrics
  items={[
    { value: "3x", label: "Conversion rate increase" },
    { value: "40%", label: "Faster load time" },
    { value: "98", label: "Lighthouse score" },
  ]}
/>
```

---

### ProjectCrossSell

Card linking to another project. See `02-CONTENT-SCHEMA.md` for the implementation pattern.

```mdx
<ProjectCrossSell slug="another-project" />
```

---

### Callout

Highlighted note or tip within prose.

```mdx
<Callout>
  This approach works best when you have more than 3 product variants.
</Callout>
```

---

### FAQSection

Accordion-style FAQ block.

```mdx
<FAQSection
  items={[
    { question: "How long does a project take?", answer: "Typically 8–16 weeks." },
    { question: "Do you work remotely?", answer: "Yes, fully remote-capable." },
  ]}
/>
```

---

## Adding New MDX Components

1. Create the `.astro` file in `src/components/mdx/`
2. Define `interface Props` with TypeScript — every prop documented
3. Import and add to the `mdxComponents` map in `src/components/mdx/components.ts`
4. Add a usage example to this file
5. Run `pnpm build` to verify — broken slugs or missing required props must fail at build time, not runtime

All slug pages import from `components.ts`, so step 3 is the only wiring needed.

## Rules for MDX Components

1. **Astro components only.** No React unless the component needs client interactivity.
2. **Throw on bad data.** Missing props or unresolved slugs must throw with a clear error message at build time.
3. **No data fetching.** All data comes from props or content collections.
4. **Keep them simple.** Render what they receive. Business logic stays in page templates.
5. **Document the props interface.** Every component needs a clear `interface Props`.
6. **`layout` is always required on `MediaBlock`.** Never omit it. It is a content decision, not a default.