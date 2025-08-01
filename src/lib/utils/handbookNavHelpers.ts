import type { HandbookLevelStoryblok } from '$types/bloks';
import { sanitizeSlug } from './paths';
import { get } from 'svelte/store';
import type { Readable } from 'svelte/store';

/**
 * Returns the open state for handbook navigation panes, given the hierarchy and current path.
 * @param hierarchy The handbook hierarchy array
 * @param pageStore The Svelte page store (must be readable)
 */
export function getOpenPanes(
  hierarchy: HandbookLevelStoryblok[],
  pageStore: Readable<{ url: { pathname: string } }>
) {
  const $pageStore = get(pageStore);
  return hierarchy
    .map((chapter: HandbookLevelStoryblok) => chapter.children ?? [])
    .map((subchapters: HandbookLevelStoryblok[]) => ({
      open: subchapters.some(
        (subchapter: HandbookLevelStoryblok) =>
          $pageStore.url.pathname === sanitizeSlug(subchapter.homepage.full_slug) ||
          subchapter.children?.some(
            (childrenPage: HandbookLevelStoryblok) =>
              $pageStore.url.pathname === sanitizeSlug(childrenPage.homepage.full_slug)
          )
      ),
      children: subchapters.map(
        (subchapter) =>
          $pageStore.url.pathname === sanitizeSlug(subchapter.homepage.full_slug) ||
          subchapter.children?.some(
            (childrenPage) =>
              $pageStore.url.pathname === sanitizeSlug(childrenPage.homepage.full_slug)
          )
      )
    }));
}
