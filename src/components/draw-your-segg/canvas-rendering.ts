import type { DrawingContent, Point, Stroke } from './types';

const getMidBetween = ([x1, y1]: Point, [x2, y2]: Point): Point => {
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

const setCanvasTool = (ctx: CanvasRenderingContext2D, stroke: Stroke, scale: number) => {
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';

  ctx.lineWidth = stroke.width * scale * 1;
  ctx.strokeStyle = stroke.color;
};

export const draw = (canvas: HTMLCanvasElement, stroke: Stroke, scale: number) => {
  const ctx = canvas?.getContext('2d', { alpha: false });
  if (!ctx) return;

  setCanvasTool(ctx, stroke, scale);

  ctx?.beginPath();

  for (let i = 0; i < stroke.path.length - 1; i++) {
    const p1 = stroke.path[i] as Point;
    const p2 = stroke.path[i + 1] as Point;

    const [midX, midY] = getMidBetween(p1, p2);

    ctx?.quadraticCurveTo(p1[0] * scale, p1[1] * scale, midX * scale, midY * scale);
  }

  ctx?.stroke();
};

const clear = (canvas: HTMLCanvasElement) => {
  const ctx = canvas?.getContext('2d', { alpha: false });
  if (!ctx) return;

  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
};

export const renderDrawing = (
  canvas: HTMLCanvasElement,
  drawing: DrawingContent,
  scale: number
) => {
  clear(canvas);

  drawing.strokes.forEach((stroke) => {
    draw(canvas, stroke, scale);
  });
};
