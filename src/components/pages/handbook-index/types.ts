import type { AssetStoryblok, HandbookStoryblok } from '$types/bloks';

export type TransformedHandbookItem = {
  name: string;
  cover: AssetStoryblok;
  last_updated: string;
  id: string;
  order: number;
  chapter: HandbookStoryblok['chapter'];
  highlight: boolean;
  full_slug: string;
}[];

export type ChaptersMap = Map<HandbookStoryblok['chapter'], TransformedHandbookItem[number][]>;
