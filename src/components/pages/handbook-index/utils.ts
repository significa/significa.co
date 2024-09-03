import type { HandbookStoryblok } from '$types/bloks';
import type { ISbStoryData } from '@storyblok/js';
import type { ChaptersMap, TransformedHandbookItem } from './types';

const SEPARATOR = ' – ' as const;

const isNestedPath = (path: string) => path.replace(/\/$/, '').split('/').length > 2;
const trimChapterNumber = (chapter: string) => +chapter.split(SEPARATOR)[0] || 1;

export const groupHandbookChapters = (stories: ISbStoryData<HandbookStoryblok>[]) => {
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
    }) satisfies TransformedHandbookItem;

  const chaptersList = [...new Set(transformed.map(({ chapter }) => chapter))];

  const chapters: ChaptersMap = new Map();

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
