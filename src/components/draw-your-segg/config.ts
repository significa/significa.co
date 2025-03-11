import type { Tool, ToolName } from './types';

import pencil from './cursors/pencil.svg';
import brushBlack from './cursors/brush-black.svg';
import brushYellow from './cursors/brush-yellow.svg';
import brushGrey from './cursors/brush-grey.svg';
import brushWhite from './cursors/brush-white.svg';

export const tools: Record<ToolName, Tool> = {
  pencil: {
    name: 'pencil',
    color: '#000',
    width: 2,
    cursor: pencil
  },
  black: {
    name: 'black',
    color: '#000',
    width: 5,
    cursor: brushBlack
  },
  yellow: {
    name: 'yellow',
    color: '#FFD722',
    width: 5,
    cursor: brushYellow
  },
  grey: {
    name: 'grey',
    color: '#C6C6C8',
    width: 5,
    cursor: brushGrey
  },
  white: {
    name: 'white',
    color: '#FFF',
    width: 10,
    cursor: brushWhite
  }
};
