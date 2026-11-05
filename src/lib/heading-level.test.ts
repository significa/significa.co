import { describe, expect, it } from 'vitest';
import { mapHeadingLevels, toHeadingLevel } from './heading-level';

describe('heading levels', () => {
  it('clamps to 1..6', () => {
    expect(toHeadingLevel(0)).toBe(1);
    expect(toHeadingLevel(4)).toBe(4);
    expect(toHeadingLevel(9)).toBe(6);
  });

  it('maps CMS levels to consecutive levels from the scope', () => {
    // Handbook: only H3 under the page H1 -> H2.
    expect([...mapHeadingLevels([3, 3, 3], 2)]).toEqual([[3, 2]]);
    // Post with H2 and H4 -> H2 and H3.
    expect([...mapHeadingLevels([2, 4, 2, 4], 2)]).toEqual([
      [2, 2],
      [4, 3]
    ]);
    // Static page that owns its H1.
    expect([...mapHeadingLevels([1, 2, 3], 1)]).toEqual([
      [1, 1],
      [2, 2],
      [3, 3]
    ]);
  });
});
