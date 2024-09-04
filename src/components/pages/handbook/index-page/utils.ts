import type { HandbookStoryblok } from '$types/bloks';
import type { ISbStoryData } from '@storyblok/js';
import type { ChapterCardsMap, HandbookItemCard } from './types';
import { isNestedPath, trimChapterNumber } from '../common/utils';

export const groupMainHandbookEntriesByChapter = (stories: ISbStoryData<HandbookStoryblok>[]) => {
  const transformed = stories
    .map(
      ({ content: { cover, order, chapter, last_updated, highlight }, uuid, full_slug, name }) => ({
        name,
        cover,
        last_updated,
        id: uuid,
        order: +order,
        chapter,
        highlight: !!highlight,
        full_slug
      })
    )
    .filter(({ full_slug }) => !isNestedPath(full_slug))
    .sort(({ chapter: a }, { chapter: b }) => {
      return trimChapterNumber(a) - trimChapterNumber(b);
    }) satisfies HandbookItemCard[];

  const chaptersList = [...new Set(transformed.map(({ chapter }) => chapter))];

  const chapters: ChapterCardsMap = new Map();

  chaptersList.forEach((ch) => {
    chapters.set(
      ch,
      transformed
        .filter(({ chapter }) => ch === chapter)
        .sort(({ order: a }, { order: b }) => {
          return a - b;
        })
    );
  });

  return chapters;
};
