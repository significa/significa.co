# MDX Snippets — Copy & Paste

Use this file as your cheatsheet. Find what you need, copy it, paste it into your `.mdx` file, and swap the values.

---

## Images & Video

### Single image — full width (edge to edge)

```mdx
<MediaBlock
  src="https://cdn.significa.co/FOLDER/IMAGE.jpg"
  alt="Describe what's in the image"
  width={1920}
  height={1080}
  layout="full"
/>
```

### Single image — full width with caption

```mdx
<MediaBlock
  src="https://cdn.significa.co/FOLDER/IMAGE.jpg"
  alt="Describe what's in the image"
  width={1920}
  height={1080}
  layout="full"
  caption="This is the caption that appears below the image."
/>
```

### Single image — medium (stays in the text column)

```mdx
<MediaBlock
  src="https://cdn.significa.co/FOLDER/IMAGE.jpg"
  alt="Describe what's in the image"
  width={1260}
  height={840}
  layout="medium"
/>
```

### Single image — wide (wider than text, not full bleed)

```mdx
<MediaBlock
  src="https://cdn.significa.co/FOLDER/IMAGE.jpg"
  alt="Describe what's in the image"
  width={1920}
  height={1080}
  layout="wide"
/>
```

### Single image — small (half column, good for mobile screenshots)

```mdx
<MediaBlock
  src="https://cdn.significa.co/FOLDER/IMAGE.jpg"
  alt="Describe what's in the image"
  width={640}
  height={1280}
  layout="small"
/>
```

### Video (autoplays, muted, looping — no controls)

```mdx
<MediaBlock
  src="https://cdn.significa.co/FOLDER/VIDEO.mp4"
  alt="Describe what happens in the video"
  width={1920}
  height={1080}
  layout="full"
/>
```

### Video with controls and poster image

```mdx
<MediaVideo
  src="https://cdn.significa.co/FOLDER/VIDEO.mp4"
  poster="https://cdn.significa.co/FOLDER/POSTER.jpg"
  caption="Optional caption"
/>
```

---

## Grid of images

### 3-column grid (6 images)

```mdx
<MediaGrid
  columns={3}
  items={[
    { src: "https://cdn.significa.co/FOLDER/image-1.jpg", alt: "Description" },
    { src: "https://cdn.significa.co/FOLDER/image-2.jpg", alt: "Description" },
    { src: "https://cdn.significa.co/FOLDER/image-3.jpg", alt: "Description" },
    { src: "https://cdn.significa.co/FOLDER/image-4.jpg", alt: "Description" },
    { src: "https://cdn.significa.co/FOLDER/image-5.jpg", alt: "Description" },
    { src: "https://cdn.significa.co/FOLDER/image-6.jpg", alt: "Description" },
  ]}
/>
```

### 3-column grid with caption

```mdx
<MediaGrid
  columns={3}
  items={[
    { src: "https://cdn.significa.co/FOLDER/image-1.jpg", alt: "Description" },
    { src: "https://cdn.significa.co/FOLDER/image-2.jpg", alt: "Description" },
    { src: "https://cdn.significa.co/FOLDER/image-3.jpg", alt: "Description" },
    { src: "https://cdn.significa.co/FOLDER/image-4.jpg", alt: "Description" },
    { src: "https://cdn.significa.co/FOLDER/image-5.jpg", alt: "Description" },
    { src: "https://cdn.significa.co/FOLDER/image-6.jpg", alt: "Description" },
  ]}
  caption="Caption that appears below the whole grid."
/>
```

### 2-column grid (4 images)

```mdx
<MediaGrid
  columns={2}
  items={[
    { src: "https://cdn.significa.co/FOLDER/image-1.jpg", alt: "Description" },
    { src: "https://cdn.significa.co/FOLDER/image-2.jpg", alt: "Description" },
    { src: "https://cdn.significa.co/FOLDER/image-3.jpg", alt: "Description" },
    { src: "https://cdn.significa.co/FOLDER/image-4.jpg", alt: "Description" },
  ]}
/>
```

> You can add as many items as you want. The grid will wrap automatically.

---

## Before / After comparison

```mdx
<ComparisonBlock
  before={{
    src: "https://cdn.significa.co/FOLDER/before.jpg",
    label: "Before"
  }}
  after={{
    src: "https://cdn.significa.co/FOLDER/after.jpg",
    label: "After"
  }}
/>
```

---

## Metrics / Stats

```mdx
<Metrics
  items={[
    { value: "3x", label: "Conversion rate increase" },
    { value: "40%", label: "Faster load time" },
    { value: "98", label: "Lighthouse score" },
  ]}
/>
```

> Use between 2 and 5 metrics. More than that gets hard to read.

---

## Callout (highlighted note)

```mdx
<Callout>
  Write your note or tip here. Good for things that need extra attention.
</Callout>
```

### Callout with a title

```mdx
<Callout title="Important">
  Write your note or tip here.
</Callout>
```

---

## FAQ

```mdx
<FAQSection
  items={[
    { question: "How long does a project take?", answer: "Typically 8–16 weeks depending on scope." },
    { question: "Do you work remotely?", answer: "Yes, fully remote-capable." },
    { question: "What does the process look like?", answer: "We start with a kick-off, then design sprints, then build." },
  ]}
/>
```

---

## Cross-sell cards

### Link to a project (case study)

```mdx
<ProjectCrossSell project="PROJECT-SLUG" />
```

Replace `PROJECT-SLUG` with the filename of the project (without `.mdx`). For example, if the file is `mishmash.mdx`, use `project="mishmash"`.

### Link to a blog post

```mdx
<BlogCrossSell post="POST-SLUG" />
```

Replace `POST-SLUG` with the filename of the blog post (without `.mdx`). For example, if the file is `designing-for-fintech.mdx`, use `post="designing-for-fintech"`.

---

## Text formatting (plain Markdown — no component needed)

### Headings

```md
## Section heading

### Subsection heading
```

### Bold and italic

```md
This is **bold text** and this is _italic text_.
```

### Blockquote with attribution

```md
> "This is a quote from someone relevant to the article."
>
> **Full Name** — Their role or title
```

### Bullet list

```md
- First item
- Second item
- Third item
```

### Numbered list

```md
1. First step
2. Second step
3. Third step
```

### Horizontal rule (section divider)

```md
---
```

### Internal link

```md
[link text](/blog/post-slug)
[link text](/projects/project-slug)
[link text](/services/develop)
```

### External link

```md
[link text](https://example.com)
```

---

## Quick reference — which layout should I use?

| I want... | Use |
|---|---|
| Full-bleed hero image | `layout="full"` |
| Wide image, not edge-to-edge | `layout="wide"` |
| Image inside the text column | `layout="medium"` |
| Small detail / mobile screenshot | `layout="small"` |
| Multiple photos in a grid | `MediaGrid` |
| Before and after | `ComparisonBlock` |
| Numbers / stats | `Metrics` |
| Tip or warning | `Callout` |
| Link to a project | `ProjectCrossSell` |
| Link to a blog post | `BlogCrossSell` |
| FAQ section | `FAQSection` |
| Autoplay ambient video | `MediaBlock` with `.mp4` src |
| Video with play button | `MediaVideo` |