export function drawerLinks(node: HTMLElement) {
  const handleClick = (event: MouseEvent) => {
    if (!(event.target instanceof HTMLAnchorElement)) return;

    // meta key pressed. we can ignore to open in new tab
    if (event.metaKey) return;

    if (event.target.href.startsWith('/')) {
      event.preventDefault();

      // TODO: open drawer
    }
  };

  const links = node.querySelectorAll('a[href]');

  links.forEach((link) => {
    if (link instanceof HTMLElement) {
      link.addEventListener('click', handleClick, true);
    }
  });

  return {
    destroy() {
      links.forEach((link) => {
        if (link instanceof HTMLElement) {
          link.removeEventListener('click', handleClick, true);
        }
      });
    }
  };
}
