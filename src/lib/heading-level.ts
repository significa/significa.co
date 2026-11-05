/**
 * Heading level context.
 *
 * Shared blocks do not know where they are rendered: the same block can sit
 * right under the page H1 or inside an article section. Each scope declares
 * the level its headings start at, and blocks render `h{level}` from it, so the
 * outline never skips a level. The visual size stays in the class names (and,
 * inside `.rich-text`, in `data-heading-style`), never in the tag.
 */
import { getContext, setContext } from 'svelte';

export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

const KEY = Symbol('heading-level');

/** Top-level blocks on a page sit right under the page H1. */
export const DEFAULT_HEADING_LEVEL: HeadingLevel = 2;

const LEVELS = [1, 2, 3, 4, 5, 6] as const;

/** Clamps any number into a valid heading level (1 to 6). */
export const toHeadingLevel = (value: number): HeadingLevel =>
  LEVELS[Math.min(5, Math.max(0, Math.round(value) - 1))];

export const getHeadingLevel = (): HeadingLevel =>
  getContext<HeadingLevel | undefined>(KEY) ?? DEFAULT_HEADING_LEVEL;

export const setHeadingLevel = (level: HeadingLevel) => setContext(KEY, level);

/**
 * Maps the heading levels used in a rich text document to consecutive levels
 * starting at `base`. A handbook page that only uses H3 renders them as H2;
 * a post with H2 and H4 renders H2 and H3.
 */
export function mapHeadingLevels(levels: number[], base: HeadingLevel): Map<number, HeadingLevel> {
  const distinct = [...new Set(levels)].sort((a, b) => a - b);
  return new Map(distinct.map((level, index) => [level, toHeadingLevel(base + index)]));
}
