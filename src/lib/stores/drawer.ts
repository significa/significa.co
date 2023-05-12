import { goto } from '$app/navigation';
import { page } from '$app/stores';
import { derived } from 'svelte/store';

function createDrawer() {
  const { subscribe } = derived(page, ($page) => {
    return $page.url.searchParams.get('drawer') || null;
  });

  return {
    subscribe,
    open: (slug: string) => {
      const url = new URL(window.location.href);
      const searchParams = new URLSearchParams(url.searchParams);
      searchParams.set('drawer', slug);

      goto(`${url.pathname}?${searchParams.toString()}`, { noScroll: true });
    },
    close: () => {
      const url = new URL(window.location.href);
      const searchParams = new URLSearchParams(url.searchParams);
      searchParams.delete('drawer');

      history.back();
    }
  };
}

export const drawer = createDrawer();
