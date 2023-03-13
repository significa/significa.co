import { writable, type Writable } from 'svelte/store';

export function bodyLock(_: HTMLElement, condition: Writable<boolean> = writable(true)) {
  condition.subscribe((value) => {
    if (value) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.removeProperty('overflow');
    }
  });

  return {
    destroy() {
      document.body.style.removeProperty('overflow');
    }
  };
}
