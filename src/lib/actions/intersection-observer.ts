export function intersectionObserver(
  node: HTMLElement,
  {
    callback,
    options,
    querySelectorAll
  }: {
    callback: IntersectionObserverCallback;
    options?: IntersectionObserverInit;
    querySelectorAll?: string;
  }
) {
  const observer = new IntersectionObserver(callback, options);

  const nodes = querySelectorAll ? node.querySelectorAll(querySelectorAll) : [node];
  nodes.forEach((n) => {
    observer.observe(n);
  });

  return {
    destroy() {
      observer.disconnect();
    }
  };
}
