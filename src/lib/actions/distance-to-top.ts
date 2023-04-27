export function distanceToTop(node: HTMLElement, callback: (distance: number) => void) {
  let distance = 0;
  let element: HTMLElement | null = node;

  if (element.offsetParent) {
    do {
      distance += element.offsetTop;
      element = element.offsetParent as HTMLElement | null;
    } while (element);
  }

  callback(distance);
}
