import type { HandbookStoryblok } from '$types/bloks';

export type HandbookSidebarItem = {
  name: string;
  last_updated: string;
  id: string;
  order: number;
  position: number;
  chapter: HandbookStoryblok['chapter'];
  full_slug: string;
  children: Omit<HandbookSidebarItem, 'children'>[];
};

export type SidebarMap = Map<HandbookStoryblok['chapter'], HandbookSidebarItem[]>;

export type Ju_SidebarMap = Map<string | null, HandbookSidebarItem[]>;
