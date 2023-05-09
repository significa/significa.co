import { writable, type Writable } from 'svelte/store';

export function debounced<T>(value: Writable<T>, delay = 500) {
  const debouncedValue = writable<T | null>(null);

  let timeout: NodeJS.Timeout;

  value.subscribe((value) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      debouncedValue.set(value);
    }, delay);
  });

  return debouncedValue;
}
