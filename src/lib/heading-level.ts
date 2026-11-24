/**
 * Heading level context.
 *
 * Shared blocks do not know where they are rendered: the same block can sit
 * right under the page H1 or inside an article section. Each scope declares
 * the level its headings start at, and blocks render `h{level}` from it, so the
 * outline never skips a level. The visual size stays in the class names (and,
 * inside `.rich-text`, in `data-heading-style`), never in the tag.
 *
 * The context holds a store, so a scope whose level changes (live Storyblok
 * preview, reactive props) updates every heading below it.
 */
import { getContext, setContext } from 'svelte';
import { readable, type Readable } from 'svelte/store';

export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

const KEY = Symbol('heading-level');

/** Top-level blocks on a page sit right under the page H1. */
export const DEFAULT_HEADING_LEVEL: HeadingLevel = 2;

const LEVELS = [1, 2, 3, 4, 5, 6] as const;

const defaultLevel = readable<HeadingLevel>(DEFAULT_HEADING_LEVEL);

/** Clamps any number into a valid heading level (1 to 6). */
export const toHeadingLevel = (value: number): HeadingLevel =>
  LEVELS[Math.min(5, Math.max(0, Math.round(value) - 1))];

/** The current scope's level, as a store. */
export const getHeadingLevel = (): Readable<HeadingLevel> =>
  getContext<Readable<HeadingLevel> | undefined>(KEY) ?? defaultLevel;

export const setHeadingLevel = (level: Readable<HeadingLevel>) => setContext(KEY, level);

/**
 * Maps the CMS levels of a document's headings, in document order, to
 * semantic levels that never skip: each heading is one level below the
 * closest preceding heading with a lower CMS level, or at `base` if there is
 * none. H3, H3 under the page H1 become H2, H2; H2, H4, H3 become H2, H3, H3.
 *
 * With `firstIsTitle`, the first heading is the page H1 and everything after
 * it starts at H2 (static pages whose body carries the title).
 */
export function normalizeHeadingLevels(
  levels: number[],
  base: HeadingLevel,
  options: { firstIsTitle?: boolean } = {}
): HeadingLevel[] {
  const open: { cms: number; level: HeadingLevel }[] = [];

  return levels.map((cms, index) => {
    if (index === 0 && options.firstIsTitle) {
      open.push({ cms: Number.NEGATIVE_INFINITY, level: 1 });
      return 1;
    }
    while (open.length && open[open.length - 1].cms >= cms) open.pop();
    const parent = open[open.length - 1];
    const level = parent ? toHeadingLevel(parent.level + 1) : base;
    open.push({ cms, level });
    return level;
  });
}
