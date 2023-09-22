export function getColumnsWidthClassName(col: 'first' | 'central' | 'last') {
  switch (col) {
    case 'first':
      return 'lg:w-[calc(var(--container-margin)+var(--section-title-width)+theme(padding.container))]';
    case 'central':
      return 'lg:w-[--central-cols-width]';
    case 'last':
      return 'lg:w-[calc(var(--container-margin)+var(--last-col-content-width)+theme(padding.container))]';
    default:
      break;
  }
}

export function getContainersPaddingClassName(side: 'pl' | 'pr') {
  return side + '-[calc(theme(padding.container)+var(--container-margin))]';
}

export function getHeaderCellTextClassName(side: 'left' | 'right') {
  return 'text-xs uppercase tracking-wider text-foreground-secondary text-' + side;
}
