export enum PlausibleEvents {
  NAV_MENU = 'Navigation menu',
  NAV_LINK = 'Navbar link',
  GET_A_QUOTE_LINK = 'Get a quote link',
  CTA_CLICK = 'CTA click',
  HOME_REEL = 'Home showreel play',
  HOME_HIGHLIGHT = 'Home highlight',
  PROJECT_CLICK = 'Project click',
  PROJECT_CAROUSEL = 'Project carousel interaction',
  PROJECT_FILTER_CLICK = 'Project filter click',
  PROJECT_AUTHOR_PAGE_CLICK = 'Project author page click',
  CAREER_CLICK = 'Career click',
  BLOG_POST_CLICK = 'Blog post click',
  BLOG_POST_TAG_CLICK = 'Blog post tag click',
  BLOG_INDEX_LOAD_MORE = 'Blog index load more',
  BLOG_POST_AUTHOR_PAGE_CLICK = 'Blog post author page click',
  SERVICES_AWARD_CLICK = 'Services award click',
  DRAWER_EXPAND = 'Drawer expand'
}

type EventOptions = {
  props?: { path?: string; to?: string; context?: string; [k: string]: unknown };
  callback?: VoidFunction;
};

export type PlausibleEventProps = { event: PlausibleEvents; options?: EventOptions };

export function plausible(event: PlausibleEvents, options?: EventOptions): void {
  console.log(event);
  console.log(options?.props);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  // return (window as any).plausible?.(event, options);
}
