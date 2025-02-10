import { browser } from '$app/environment';
import { readable } from 'svelte/store';

const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536
} as const;

export const createBreakpointMediaQueryStore = (
  breakpoint: keyof typeof breakpoints,
  condition: 'min-width' | 'max-width' = 'min-width'
) => {
  if (!browser) {
    return readable(false, () => {
      // noop
    });
  }
  const mediaQuery = window.matchMedia(`(${condition}: ${breakpoints[breakpoint]}px)`);
  const mediaStore = readable(mediaQuery.matches, (set) => {
    const listener = (e: MediaQueryListEvent) => set(e.matches);
    mediaQuery.addEventListener('change', listener);
    return () => mediaQuery.removeEventListener('change', listener);
  });
  return mediaStore;
};
