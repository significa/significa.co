import type { components } from '$types/seggs-api';

export type ToolName = 'pencil' | 'black' | 'yellow' | 'grey' | 'white';

export type Tool = {
  color: string;
  width: number;
  cursor: string;
  name: ToolName;
};

export type Drawing = components['schemas']['DrawingReadResponse'];
export type DrawingContent = components['schemas']['DrawingContent'];
export type Stroke = DrawingContent['strokes'][number];
export type Point = [number, number];
