# Design Decisions — significa.co redesign

This document captures the design language and voice rules established on the `content-migration` branch during the design-engineering spike. Read this before touching design or copy on this branch so you don't re-derive (or accidentally regress) decisions already made.

Source docs:

- [north-star.md](./north-star.md) — manifesto
- [the-space-between.md](./the-space-between.md) — the overlap between idealism and revenue

Everything below is downstream of those two. If something here conflicts with the source docs, the source docs win.

---

## Type system

Three voices, all from Pangram Pangram. Trial weights are what we're designing against; full license when direction is settled.

| Role | Face | Used for |
|---|---|---|
| Display | **PP Editorial Old** | manifesto moments, section statements, featured project headings. Ultralight (200) for `display-1`. Italic (400 italic) reserved for the **one** manifesto moment per page. |
| Body | **PP Neue Montreal** | paragraphs, deck copy, prose. Default weight 400. |
| UI / meta | **PP Supply Mono** | eyebrows, labels, captions, nav, footnotes, metadata. Always uppercase with `tracking-wide`. |

**Italic rule:** italic + serif at heading size is hard to scan. Reserve italic-Editorial for exactly one manifesto moment per page. Body prose can use inline italic for emphasis on single words (*Red Dot*, etc.) — that's different.

Type scale tokens defined in `src/styles/tokens.css`. Display sizes (`--text-display-1`, `--text-display-2`) exist for the rare "single sentence holds a screen" treatment. Don't use them as headings.

---

## Color

Warm paper + near-black ink + one terracotta accent. Approximate budget on any page: **paper 80%, ink 18%, accent < 2%.**

- `--color-paper` — main surface. Essentially gray with a whisper of warmth (hue 70, chroma 0.003). Not yellow, not cream.
- `--color-paper-alt` — alt surface for cards, hover states.
- `--color-ink` — near-black, slightly softer than #000.
- `--color-accent` — muted terracotta (`oklch(58% 0.13 35)`). Used at **moments of attention only**: the egg mark at presence scale, link hover state, focus ring, `.qa-num` and `.wrong-num` numerals, section indicators. Never decorative.

Chroma on paper has been tuned twice — a warmer earlier version read as cream and was dialed back. The current value is the approved baseline.

---

## Motion

Default is no motion. When motion happens, it means something.

- `--duration-fast` 150ms — color shifts
- `--duration-normal` 280ms — hover bg fills
- `--duration-slow` / `--slower` / `--slowest` — editorial beats (460/720/1100ms)
- `--ease-editorial` — slow deliberate curve for arrow slides, image scale, manifesto reveals

Reduced-motion is respected absolutely in `global.css`. No exceptions.

---

## Components

### `ui/egg.astro` — signature mark

- Default variant is `outline` (the canonical Significa logo — drawn as two subpaths with nonzero fill rule creating the outlined egg).
- `variant="fill"` is the solid version, for inline marks (bullets, arrows, end-of-article, small sizes where the outline would disappear).
- Sized to `1em` height with baseline offset. Override via class.
- Never used side-by-side with the wordmark as a lockup — it's one or the other per context.

### `ui/wordmark.astro` — "Significa" custom wordmark

- Single SVG, viewBox `0 0 96 25`, currentColor.
- Default height `1.25em` to sit with running text.
- Used in the header and sparingly elsewhere.

### `components/header.astro`

- Wordmark left, four mono nav items right (Work / Studio / Journal / Hello). Not sticky. No CTA button in the chrome.
- Active page gets accent color in nav.
- Mobile: menu toggle + full-screen overlay with display-Editorial nav and per-item egg mark on hover/current.

### `components/footer.astro`

- Two cells at opposite ends (flex space-between):
  - Left: manifesto pull quote (*"Calm in complexity."* — deliberately a different axis from the homepage manifesto moment to avoid identity collision)
  - Right: Hello / Studio / Currently rows (contact email + address + rotating current-focus)
- Below: mono nav row, then legal row with B Corp + 1% + copyright + egg + terms link.

---

## Page patterns (homepage)

Established in `src/pages/index.astro`. Reuse for other pages:

1. **Eyebrow** — `<p class="eyebrow">` — mono xs, uppercase, ink-muted. Slash separators (`<span class="eyebrow-sep">/</span>`) between parts. No eggs inside eyebrows (they don't align cleanly).
2. **Hero statement** — display-1 Ultralight, max 18ch, roman (no italics).
3. **Hero deck** — text-xl ink-muted body, max `--max-width-prose`. Must ground abstraction with concrete substance — e.g. "We make digital products — platforms, e-commerce, apps, design systems — for businesses that want complexity met with care."
4. **Proof strip** — thin mono strips with hairlines. `<dl>` with `grid-template-columns: 10rem 1fr`. Labels left, comma-separated values right. No logos, no carousel.
5. **Featured project** — rich single section: eyebrow → statement → image (aspect 3/2, `border-radius: var(--radius-image)`) → 2-col grid (prose left, structured metadata `<dl>` right) → integrated client voice coda → case-study link. All one section; rhythm reads as a single case.
6. **Manifesto moment** — centered, display-2 italic Editorial, standalone. One per page. Small mono attribution with accent egg below.
7. **Project index** — compact editorial list. No leader lines, no per-row borders (only top + bottom on the list). Hover: row tints to paper-alt, text shifts to accent, accent arrow slides in from `-0.6em` into a reserved column.
8. **Numbers row** — `<dl>` with 4-col grid. Mono labels above Editorial Ultralight values.
9. **Questions / three-questions** — numbered `<ol>`, mono accent numerals, roman Editorial question heads (no italics), body paragraph answer. Border-top per row.
10. **Link-call** — the UI affordance for "go" actions. No underline, sans body text, arrow glyph, `translateX(0.45em)` on hover with slow editorial ease.

---

## Voice rules

These emerged from explicit iteration and are worth treating as hard rules:

- **Italics only at the manifesto moment.** Body prose can italicize single words. Heading italics at display size kill scannability.
- **No "we argued / pushed back / disagreed" framing.** It reads combative. Reframe in terms of discovery, reframing, or collaborative outcome. The story of a project should credit the thinking, not cast us as combatants. (The one place judgment gets stated bare is the manifesto moment — "Judgement is the work." One beat, not five.)
- **Links don't underline by default.** Use `.link-call` for "go" affordances. Prose links can opt back into underlines only where genuinely needed.
- **One beat per brand axis per page.** Don't repeat the same message in three different ways. If three sections all say variations of "we push back," that becomes the defining trait.
- **British English.** Rigour, judgement, recognised, organised, optimise.
- **No em-dashes** (per project CLAUDE.md). Use commas, periods, or rewrite.
- **The homepage lives in the overlap, not at the idealism pole.** Every section either says something only Significa would say OR provides a real business signal (proof, numbers, featured project, recognition). Manifesto without business reality is a hobby (per `the-space-between.md`).

---

## Rejected patterns — don't reintroduce

These all got considered and explicitly rejected with reasons:

- **Showreel hero.** Commoditizing; the gap the studio is moving toward is judgment, not eye-candy production. Case studies + typography do the capability signal better.
- **Awards carousel / testimonials carousel.** Generic agency-template. One editorial client quote integrated into the featured project is the move.
- **FAQ accordion, "Ask AI about Significa" buttons.** No content-doc justification.
- **"Ready to grow your business. Are you?" CTA.** The exact line the brand docs disavow.
- **Icon libraries (Lucide, Heroicons, Phosphor).** Custom marks only. Egg is the signature; arrows are Unicode glyphs for now with a note we may draw a custom arrow later.
- **Egg + wordmark side-by-side as a brand lockup.** Use one OR the other per context.
- **Default underlined links site-wide.** Noisy; replaced with `.link-call` UI affordance.
- **Hardcoded NDA filters on the clients collection.** Content curation is a content-side job; the homepage iterates over `getClients()` unchanged.
- **"We're the wrong choice when…" on the homepage.** Good content, wrong surface — it filters before credibility lands. Belongs on `/services` or `/about` when those get redesigned.

---

## Current state of pages

As of 2026-04-14:

**Rebuilt on this branch:**

- `/` (homepage)
- `/spike` (design language reference)
- Header + Footer (apply to all pages via BaseLayout)

**Still using old designs (need rebuild):**

- `/about` — values are currently generic (Craft/Honesty/Ownership/Simplicity). Rewrite using brand-doc specifics.
- `/services` — currently the Think/Design/Develop/Launch/Scale ladder. Rebuild around the three questions + "wrong-for-you" section that was pulled from the homepage.
- `/projects/*` — case study template needs redesign around the call-we-made format, not deliverable-led.
- `/projects` (index) — apply new design language.
- `/blog/*` and `/blog` — editorial long-form register.
- `/handbook/*` — internal docs register.
- `/playground/*`, `/say-hello`, `/404`, `/legal`, `/b-corp`, `/careers`, `/impact` — smaller surfaces, apply language systematically.

**Pre-existing issues unrelated to redesign:**

- `src/pages/[...slug].astro` references a `"pages"` collection that no longer exists (left over from an earlier migration commit). Causes typecheck warnings. Needs separate fix.
- Blog entry `designing-for-fintech` referenced in a related-posts query but missing. Data issue.

---

## Next moves (suggested order)

1. `/about` — rewrite values and identity register. Use North Star section headings verbatim where they work.
2. One case study (DIA or CometChat) — redesign the project template, lead with the call, imagery in service of argument.
3. `/services` — rebuild around three questions + "wrong-for-you" content, restructure from deliverable ladder to question-led.
4. `/projects` index — apply homepage index pattern at page scale.
5. Editorial register for `/blog/*` and `/handbook/*`.
6. Edges (`/404`, `/say-hello`, footer secondary surfaces) — the detail-attention surfaces.

Design language is settled enough that these can be done as focused pair-work (copy + layout in one move per page). Each page should be defensible by pointing to a specific paragraph in the brand docs.
