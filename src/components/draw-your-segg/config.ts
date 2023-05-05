export type Point = [number, number];

type Color = 'black' | 'yellow' | 'grey' | 'white';
type Width = 'thinnest' | 'thin' | 'thick';

export const colors: Record<Color, string> = {
  black: '#000000',
  yellow: '#FFD722',
  grey: '#C6C6C8',
  white: '#FFFFFF'
};

export const widths: Record<Width, number> = {
  thinnest: 2,
  thin: 3,
  thick: 10
};

export type Tool = { color: Color; width: Width };
export type Stroke = Tool & { points: Point[] };

export const tools: Record<string, Tool> = {
  pencil: { color: 'black', width: 'thin' },
  black: { color: 'black', width: 'thick' },
  yellow: { color: 'yellow', width: 'thick' },
  grey: { color: 'grey', width: 'thick' },
  white: { color: 'white', width: 'thick' }
};
