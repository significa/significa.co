import { browser } from '$app/environment';
import { readable } from 'svelte/store';

const isTheme = (t: string): t is 'light' | 'dark' => {
  return t === 'light' || t === 'dark';
};

export const theme = readable<'light' | 'dark'>('light', (set) => {
  if (browser) {
    const t = localStorage.getItem('theme');

    if (t && isTheme(t)) set(t);

    const onChange = (e: Event) => set((e as CustomEvent<'light' | 'dark'>).detail);

    window.addEventListener('theme-change', onChange);

    return () => window.removeEventListener('theme-change', onChange);
  }
});
