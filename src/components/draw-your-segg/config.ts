import type { Color, Tool, Width } from './types';

import pencil from './cursors/pencil.svg';
import brushBlack from './cursors/brush-black.svg';
import brushYellow from './cursors/brush-yellow.svg';
import brushGrey from './cursors/brush-grey.svg';
import brushWhite from './cursors/brush-white.svg';

export const colors: Record<Color, string> = {
  black: '#000000',
  yellow: '#FFD722',
  grey: '#C6C6C8',
  white: '#FFFFFF'
};

export const widths: Record<Width, number> = {
  thinnest: 1,
  thin: 2,
  thick: 5
};

export const tools: Record<string, Tool> = {
  pencil: { color: 'black', width: 'thin' },
  black: { color: 'black', width: 'thick' },
  yellow: { color: 'yellow', width: 'thick' },
  grey: { color: 'grey', width: 'thick' },
  white: { color: 'white', width: 'thick' }
};

export const cursors = new Map<Tool, string>();
cursors.set(tools.pencil, pencil);
cursors.set(tools.black, brushBlack);
cursors.set(tools.yellow, brushYellow);
cursors.set(tools.grey, brushGrey);
cursors.set(tools.white, brushWhite);
