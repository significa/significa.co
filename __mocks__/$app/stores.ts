/* eslint-disable @typescript-eslint/no-explicit-any */
import { readable } from 'svelte/store';
import type * as stores from '$app/stores';
import type { Navigation, Page } from '@sveltejs/kit';

export const mockStores = (config: { page?: Partial<Page> } = {}) => {
  const getStores: typeof stores.getStores = () => {
    const navigating = readable<Navigation | null>(null);
    const page = readable<Page>({
      url: new URL('http://localhost'),
      params: { path: '' },
      route: {
        id: null
      },
      form: {},
      status: 200,
      error: null,
      data: {} as any,
      ...config.page
    });
    const updated = { subscribe: readable(false).subscribe, check: async () => false };

    return { navigating, page, updated };
  };

  const page: typeof stores.page = {
    subscribe(fn) {
      return getStores().page.subscribe(fn);
    }
  };

  const navigating: typeof stores.navigating = {
    subscribe(fn) {
      return getStores().navigating.subscribe(fn);
    }
  };
  const updated: typeof stores.updated = {
    subscribe(fn) {
      return getStores().updated.subscribe(fn);
    },
    check: async () => false
  };

  return {
    page,
    navigating,
    updated
  };
};

const { page, navigating, updated } = mockStores();
export { page, navigating, updated };
