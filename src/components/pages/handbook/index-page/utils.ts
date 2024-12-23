import type { HandbookStoryblok } from '$types/bloks';
import type { ISbStoryData } from '@storyblok/js';
import type { ChapterCardsMap, HandbookItemCard, Ju_ChapterCardsMap } from './types';
import { isNestedPath, ju_isNestedPath, trimChapterNumber } from '../common/utils';

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

  const ju_transformed = stories
    .filter(({ full_slug }) => full_slug.includes('new')) //TODO: remove this
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
    .filter(({ full_slug }) => !ju_isNestedPath(full_slug)) satisfies HandbookItemCard[];

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
        .sort((a, b) => {
          if (!a || !b) return 0;
          return a.localeCompare(b);
        })
    )
  ];

  const chapters: ChapterCardsMap = new Map();
  const ju_chapters: Ju_ChapterCardsMap = new Map();

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

  ju_chaptersList.forEach((ch) => {
    ju_chapters.set(
      ch,
      ju_transformed.filter(({ full_slug }) => {
        const levels = full_slug.split('/');

        return !ju_isNestedPath(full_slug) && levels[1] === ch;
      })
    );
  });

  return ju_chapters;
};
