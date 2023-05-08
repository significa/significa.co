export const dragScrolling = (
  node: HTMLElement,
  options: { isActive: boolean; centerYOffset?: number; centerXOffset?: number }
) => {
  if (options.isActive) {
    // state
    let dragging = false;

    // overflow hidden allows forced scroll which is really nice
    node.style.overflow = 'hidden';
    node.style.cursor = 'grab';

    // center
    node.scrollLeft = (node.scrollWidth - node.clientWidth + (options.centerXOffset || 0)) / 2;
    node.scrollTop = (node.scrollHeight + (options.centerYOffset || 0)) / 2;

    // save initial state
    let left = node.scrollLeft;
    let top = node.scrollTop;

    node.addEventListener('mousedown', () => {
      dragging = true;
      node.style.cursor = 'grabbing';
      node.style.userSelect = 'none';
    });

    node.addEventListener('mousemove', (e) => {
      if (dragging) {
        left -= e.movementX;
        top -= e.movementY;

        node.scrollLeft = left;
        node.scrollTop = top;
      }
    });

    node.addEventListener('mouseup', () => {
      dragging = false;
      node.style.cursor = 'grab';
      node.style.userSelect = 'unset';
    });

    window.addEventListener('resize', () => {
      node.scrollLeft = (node.scrollWidth - node.clientWidth) / 2;
      node.scrollTop = (node.scrollHeight - 240) / 2;
    });

    // prevent stuck drag when leaving node still pressing
    node.addEventListener('mouseleave', () => {
      dragging = false;
      node.style.cursor = 'grab';
      node.style.userSelect = 'unset';
    });
  } else {
    node.style.overflow = 'auto';

    // center
    node.scrollLeft = (node.scrollWidth - node.clientWidth + (options.centerXOffset || 0)) / 2;
    node.scrollTop = (node.scrollHeight + (options.centerYOffset || 0)) / 2;
  }
};
