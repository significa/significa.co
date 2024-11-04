import { drawer } from '$lib/stores/drawer';

export function drawerLinks(node: HTMLElement) {
  const createHandleClick = (el: HTMLAnchorElement) => (event: MouseEvent) => {
    // meta key pressed. we can ignore to open in new tab
    if (event.metaKey) return;

    const url = new URL(el.href);

    // check if the link is internal
    if (url.origin === window.location.origin) {
      event.preventDefault();

      const drawerLink = el.getAttribute('href');
      if (drawerLink) drawer.open(drawerLink);
    }
  };

  const links = node.querySelectorAll('a[href]');

  links.forEach((link) => {
    if (link instanceof HTMLAnchorElement) {
      link.addEventListener('click', createHandleClick(link), true);
    }
  });

  return {
    destroy() {
      links.forEach((link) => {
        if (link instanceof HTMLAnchorElement) {
          link.removeEventListener('click', createHandleClick(link), true);
        }
      });
    }
  };
}
