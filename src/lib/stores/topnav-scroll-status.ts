import { browser } from '$app/environment';
import { readable } from 'svelte/store';

const SCROLL_DIR_THRESHOLD = 76;
const SCROLL_THRESHOLD = 200;

type ScrollStatus = {
  isPastZero: boolean;
  isPastThreshold: boolean;
  direction?: 'up' | 'down';
};

export const createTopNavScrollStatus = () => {
  let scrollY: number;
  let lastScrollY: number;
  let ticking = false;

  return readable<ScrollStatus>(
    {
      isPastZero: false,
      isPastThreshold: false,
      direction: undefined
    },
    (_, update) => {
      if (!browser) return;

      const updateScrollDir = () => {
        if (Math.abs(scrollY - lastScrollY) <= SCROLL_DIR_THRESHOLD) {
          ticking = false;
          return;
        }

        const nextDir = scrollY > lastScrollY ? 'down' : 'up';

        const last = scrollY > 0 ? scrollY : 0;
        lastScrollY = last;

        update((prev) => ({
          ...prev,
          isPastThreshold: last > SCROLL_THRESHOLD,
          direction: nextDir
        }));

        ticking = false;
      };

      const onScroll = () => {
        scrollY = window.scrollY;
        update((prev) => ({ ...prev, isPastZero: scrollY > 0 }));

        if (!ticking) {
          window.requestAnimationFrame(updateScrollDir);
          ticking = true;
        }
      };

      window.addEventListener('scroll', onScroll);

      return () => {
        window.removeEventListener('scroll', onScroll);
      };
    }
  );
};
