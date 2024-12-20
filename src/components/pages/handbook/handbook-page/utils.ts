import type { HandbookStoryblok } from '$types/bloks';
import type { ISbStoryData } from '@storyblok/js';
import { isNestedPath, ju_isNestedPath, trimChapterNumber } from '../common/utils';
import type { HandbookSidebarItem, Ju_SidebarMap, SidebarMap } from './types';

export const groupHandbookEntriesByChapter = (stories: ISbStoryData<HandbookStoryblok>[]) => {
  const transformed = stories
    .map(({ content: { order, chapter, last_updated }, uuid, full_slug, name, position }) => ({
      name,
      last_updated,
      id: uuid,
      order: +order,
      chapter,
      full_slug,
      position
    }))
    .sort(({ chapter: a }, { chapter: b }) => {
      return trimChapterNumber(a) - trimChapterNumber(b);
    }) satisfies HandbookSidebarItem['children'];

  const ju_transformed = stories
    .filter(({ full_slug }) => full_slug.includes('new')) //TODO: remove this
    .map(({ content: { order, chapter, last_updated }, uuid, full_slug, name, position }) => ({
      name,
      last_updated,
      id: uuid,
      order: +order,
      chapter,
      full_slug,
      position
    })) satisfies HandbookSidebarItem['children'];

  const chaptersList = [...new Set(transformed.map(({ chapter }) => chapter))];

  const ju_chaptersList = [
    ...new Set(
      ju_transformed
        .map(({ full_slug }) => {
          const levels = full_slug.split('/');

          if (levels.length > 2) {
            return levels[1];
          } else return null;
        })
        .filter(Boolean)
    )
  ];

  const subChapters: HandbookSidebarItem['children'] = [
    ...new Set(transformed.filter(({ full_slug }) => isNestedPath(full_slug)))
  ];

  const ju_subChapters: HandbookSidebarItem['children'] = [
    ...new Set(ju_transformed.filter(({ full_slug }) => ju_isNestedPath(full_slug)))
  ];

  const folderPaths = [
    ...new Set(
      transformed
        .filter(({ full_slug }) => full_slug.endsWith('/'))
        .map(({ full_slug }) => full_slug)
    )
  ];

  const ju_folderPaths = [
    ...new Set(
      ju_transformed
        .filter(({ full_slug }) => full_slug.endsWith('/') && isNestedPath(full_slug))
        .map(({ full_slug }) => full_slug)
    )
  ];

  const childrenByPathname = new Map<string, HandbookSidebarItem['children']>();
  const ju_childrenByPathname = new Map<string, HandbookSidebarItem['children']>();

  folderPaths.forEach((path) => {
    const childrenChapters = subChapters.filter(({ full_slug }) => full_slug.startsWith(path));
    childrenByPathname.set(path, childrenChapters);
  });

  ju_folderPaths.forEach((path) => {
    const ju_childrenChapters = ju_subChapters.filter(({ full_slug }) =>
      full_slug.startsWith(path)
    );
    ju_childrenByPathname.set(path, ju_childrenChapters);
  });

  const chapters: SidebarMap = new Map();

  const ju_chapters: Ju_SidebarMap = new Map();

  chaptersList.forEach((ch) => {
    chapters.set(
      ch,
      transformed
        .filter(({ full_slug }) => !isNestedPath(full_slug))
        .filter(({ chapter }) => ch === chapter)
        .sort(({ order: a }, { order: b }) => {
          return a - b;
        })
        .map((t) => ({
          ...t,
          children:
            childrenByPathname.get(t.full_slug)?.sort(({ order: a }, { order: b }) => {
              return a - b;
            }) || []
        }))
    );
  });

  ju_chaptersList.forEach((ch) => {
    ju_chapters.set(
      ch,
      ju_transformed
        .filter(({ full_slug }) => {
          const levels = full_slug.split('/');

          return !ju_isNestedPath(full_slug) && levels[1] === ch;
        })
        .sort(({ position: a }, { position: b }) => {
          return a - b;
        })
        .map((t) => ({
          ...t,
          children:
            ju_childrenByPathname.get(t.full_slug)?.sort(({ position: a }, { position: b }) => {
              return a - b;
            }) || []
        }))
    );
  });

  return ju_chapters;
};
