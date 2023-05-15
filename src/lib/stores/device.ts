import { browser } from '$app/environment';
import { readable } from 'svelte/store';

export const device = readable<'touch' | 'pointer'>('pointer', (set) => {
  if (browser) {
    const isPointer = window.matchMedia('(hover: hover)').matches;

    if (isPointer) {
      set('pointer');
    } else {
      set('touch');
    }
  }
});
