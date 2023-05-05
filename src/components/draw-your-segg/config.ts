import pencil from './cursors/pencil.svg';
import brushBlack from './cursors/brush-black.svg';
import brushYellow from './cursors/brush-yellow.svg';
import brushGrey from './cursors/brush-grey.svg';
import brushWhite from './cursors/brush-white.svg';

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

export type Tool = { color: Color; width: Width; cursor: string };
export type Stroke = Tool & { points: Point[] };

export const tools: Record<string, Tool> = {
  pencil: { color: 'black', width: 'thin', cursor: pencil },
  black: { color: 'black', width: 'thick', cursor: brushBlack },
  yellow: { color: 'yellow', width: 'thick', cursor: brushYellow },
  grey: { color: 'grey', width: 'thick', cursor: brushGrey },
  white: { color: 'white', width: 'thick', cursor: brushWhite }
};
