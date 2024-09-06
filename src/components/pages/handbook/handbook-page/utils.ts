import type { HandbookStoryblok } from '$types/bloks';
import type { ISbStoryData } from '@storyblok/js';
import { isNestedPath, trimChapterNumber } from '../common/utils';
import type { HandbookSidebarItem, SidebarMap } from './types';

export const groupHandbookEntriesByChapter = (stories: ISbStoryData<HandbookStoryblok>[]) => {
  const transformed = stories
    .map(({ content: { order, chapter, last_updated }, uuid, full_slug, name }) => ({
      name,
      last_updated,
      id: uuid,
      order: +order,
      chapter,
      full_slug
    }))
    .sort(({ chapter: a }, { chapter: b }) => {
      return trimChapterNumber(a) - trimChapterNumber(b);
    }) satisfies HandbookSidebarItem['children'];

  const chaptersList = [...new Set(transformed.map(({ chapter }) => chapter))];

  const subChapters: HandbookSidebarItem['children'] = [
    ...new Set(transformed.filter(({ full_slug }) => isNestedPath(full_slug)))
  ];

  const folderPaths = [
    ...new Set(
      transformed
        .filter(({ full_slug }) => full_slug.endsWith('/'))
        .map(({ full_slug }) => full_slug)
    )
  ];

  const childrenByPathname = new Map<string, HandbookSidebarItem['children']>();

  folderPaths.forEach((path) => {
    const childrenChapters = subChapters.filter(({ full_slug }) => full_slug.startsWith(path));
    childrenByPathname.set(path, childrenChapters);
  });

  const chapters: SidebarMap = new Map();

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

  return chapters;
};
