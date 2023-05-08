import type { Point } from './types';

export const getMidBetween = ([x1, y1]: Point, [x2, y2]: Point): Point => {
  return [x1 + (x2 - x1) / 2, y1 + (y2 - y1) / 2];
};

export const simplify = (points: Point[], minDistance: number) => {
  return points.reduce<Point[]>((acc, [x, y], index) => {
    if (index === 0) return [[x, y]];

    const [prevX, prevY] = acc[acc.length - 1];

    const distance = Math.sqrt((x - prevX) ** 2 + (y - prevY) ** 2);

    if (distance > minDistance) {
      return [...acc, [x, y]];
    }

    return acc;
  }, []);
};
