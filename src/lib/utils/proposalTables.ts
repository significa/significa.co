export function getColumnsWidthClassName(
  col: 'first' | 'central' | 'last' | 'sticky' | 'last-empty'
) {
  switch (col) {
    case 'first':
      return 'lg:w-[calc(var(--container-margin)+var(--section-title-width)+theme(padding.container)+3rem)]';
    case 'central':
      return 'lg:w-[--central-cols-width]';
    case 'last':
      return 'lg:w-[calc(var(--container-margin)+var(--last-col-content-width)+theme(padding.container))]';
    case 'sticky':
      return 'w-[--sticky-col-content-width]';
    case 'last-empty':
      return 'lg:w-[calc(var(--container-margin)+theme(padding.container))]';
    default:
      break;
  }
}

export function getContainersPaddingClassName(side: 'left' | 'right') {
  switch (side) {
    case 'left':
      return 'pl-[calc(theme(padding.container)+var(--container-margin))]';
    case 'right':
      return 'pr-[calc(theme(padding.container)+var(--container-margin))]';
    default:
      break;
  }
}

export function getHeaderCellTextClassName(side: 'left' | 'right') {
  switch (side) {
    case 'left':
      return 'text-xs uppercase tracking-wider text-foreground-secondary text-left';
    case 'right':
      return 'text-xs uppercase tracking-wider text-foreground-secondary text-right';
    default:
      break;
  }
}

export function getStickyColClassName() {
  return 'right-0 sticky md:relative bg-background md:bg-transparent drop-shadow-md md:drop-shadow-none';
}
