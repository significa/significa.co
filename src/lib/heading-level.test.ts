import { describe, expect, it } from 'vitest';
import { normalizeHeadingLevels, toHeadingLevel } from './heading-level';

describe('heading levels', () => {
  it('clamps to 1..6', () => {
    expect(toHeadingLevel(0)).toBe(1);
    expect(toHeadingLevel(4)).toBe(4);
    expect(toHeadingLevel(9)).toBe(6);
  });

  it('starts at the scope: handbook H3s under the page H1 become H2', () => {
    expect(normalizeHeadingLevels([3, 3, 3], 2)).toEqual([2, 2, 2]);
  });

  it('never skips a level in document order', () => {
    expect(normalizeHeadingLevels([2, 4, 3], 2)).toEqual([2, 3, 3]);
    expect(normalizeHeadingLevels([2, 4, 2, 4], 2)).toEqual([2, 3, 2, 3]);
    expect(normalizeHeadingLevels([2, 5, 6, 3, 2], 2)).toEqual([2, 3, 4, 3, 2]);
  });

  it('goes back up to the closest lower heading', () => {
    expect(normalizeHeadingLevels([2, 3, 4, 3, 4], 2)).toEqual([2, 3, 4, 3, 4]);
  });

  it('promotes only the first heading to H1 when the body carries the title', () => {
    expect(normalizeHeadingLevels([2, 2, 3], 2, { firstIsTitle: true })).toEqual([1, 2, 3]);
    expect(normalizeHeadingLevels([1, 2, 3], 2, { firstIsTitle: true })).toEqual([1, 2, 3]);
    expect(normalizeHeadingLevels([1, 1, 2], 2, { firstIsTitle: true })).toEqual([1, 2, 3]);
  });
});
