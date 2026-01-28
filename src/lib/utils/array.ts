export const sumArray = <T = unknown>(arr: T[], getter: (item: T) => number) => {
  return arr.reduce((acc, item) => acc + getter(item), 0);
};
