export enum PlausibleEvents {
  NAV_MENU = 'Navigation menu',
  NAV_LINK = 'Navbar link',
  GET_A_QUOTE_LINK = 'Get a quote link',
  HOME_HIGHLIGHT = 'Home highlight'
}

type EventOptions = {
  props?: { path?: string; to?: string; context?: string; [k: string]: unknown };
  callback?: VoidFunction;
};

export function plausible(event: PlausibleEvents, options?: EventOptions): void {
  console.log(event);
  console.log(options?.props);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  // return (window as any).plausible?.(event, options);
}
