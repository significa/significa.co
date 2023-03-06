import { writable } from 'svelte/store';

function createDrawer() {
  const { subscribe, set } = writable<string | null>(null);

  return {
    subscribe,
    open: (slug: string) => set(slug),
    close: () => set(null)
  };
}

export const drawer = createDrawer();
