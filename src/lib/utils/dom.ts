export const getScrollSpeed = (function () {
  let lastPos: number | null,
    newPos: number,
    timer: any,
    delta: number,
    delay = 40;
  function clear() {
    lastPos = null;
    delta = 0;
  }
  clear();
  return function () {
    newPos = window.scrollY;
    if (lastPos != null) {
      delta = newPos - lastPos;
    }
    lastPos = newPos;
    clearTimeout(timer);
    timer = setTimeout(clear, delay);
    return delta;
  };
})();
