export function intersectionObserver(
  node: HTMLElement,
  [callback, options]: [
    (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => void,
    IntersectionObserverInit | undefined
  ]
) {
  const observer = new IntersectionObserver(callback, options);

  observer.observe(node);

  return {
    destroy() {
      observer.disconnect();
    }
  };
}
