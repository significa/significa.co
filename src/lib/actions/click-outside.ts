export function clickOutside(node: HTMLElement, callback: (event: Event) => void) {
  const handleClick = (event: Event) => {
    if (event.target instanceof HTMLElement && !node.contains(event.target)) {
      callback(event);
    }
  };

  document.addEventListener('click', handleClick, true);

  return {
    destroy() {
      document.removeEventListener('click', handleClick, true);
    }
  };
}
