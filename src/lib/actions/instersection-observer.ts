export function intersectionObserver(
  node: HTMLElement,
  [callback, options]: [
    (entry: IntersectionObserverEntry, observer: IntersectionObserver) => void,
    IntersectionObserverInit | undefined
  ]
) {
  const observer = new IntersectionObserver(
    ([entry], observer) => callback(entry, observer),
    options
  );

  observer.observe(node);

  return {
    destroy() {
      observer.disconnect();
    }
  };
}
