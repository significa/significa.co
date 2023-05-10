export enum Goals {
  hi = 'Hi'
}

type EventOptions = {
  props?: Record<string, unknown>;
  callback?: VoidFunction;
};

export function plausible(goal: Goals, options?: EventOptions): void {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (window as any).plausible?.(goal, options);
}
