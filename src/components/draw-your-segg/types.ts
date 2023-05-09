export type Point = [number, number];

export type Color = 'black' | 'yellow' | 'grey' | 'white';
export type Width = 'thinnest' | 'thin' | 'thick';

export type Tool = { color: Color; width: Width };
export type Stroke = Tool & { points: Point[] };

export type Drawing = Stroke[];

export const isValidDrawing = (payload: unknown): payload is Drawing => {
  return (
    Array.isArray(payload) &&
    payload.every(
      (stroke) =>
        typeof stroke === 'object' &&
        stroke !== null &&
        'color' in stroke &&
        'width' in stroke &&
        'points' in stroke &&
        typeof stroke.color === 'string' &&
        typeof stroke.width === 'string' &&
        Array.isArray(stroke.points) &&
        stroke.points.every(
          (point: unknown) =>
            Array.isArray(point) && point.every((coord) => typeof coord === 'number')
        )
    )
  );
};
