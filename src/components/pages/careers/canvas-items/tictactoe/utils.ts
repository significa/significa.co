//from: https://betterprogramming.pub/how-i-created-my-first-ai-program-using-react-js-95fe54d994d6
export type Tile = -9 | 1 | 2;

export type GameState = 'in-progress' | 'win' | 'lose' | 'draw' | 'main-menu';

export type WinCondition =
  | 'diag1'
  | 'diag2'
  | 'horz1'
  | 'horz2'
  | 'horz3'
  | 'vert1'
  | 'vert2'
  | 'vert3';

const getOpenTiles = (board: Tile[]) => {
  const copy = [...board];

  const tiles = copy.reduce((open: number[], tile, index) => {
    if (tile === -9) {
      open.push(index);
    }
    return open;
  }, []);

  return tiles;
};

export const getAIPlay = (cur_board: Tile[]) => {
  const boardCopy = [...cur_board];
  const open_tiles = getOpenTiles(boardCopy);

  if (open_tiles.length) {
    const rand = Math.random() * open_tiles.length;
    return open_tiles[Math.floor(rand)];
  }

  return null;
};

export const checkWinner = (
  board: Tile[]
): { state: GameState; winCondition: WinCondition | null } => {
  let diag1, diag2, horz1, horz2, horz3, vert1, vert2, vert3;
  diag1 = diag2 = horz1 = horz2 = horz3 = vert1 = vert2 = vert3 = 0;

  let player1, player2;
  player1 = player2 = 0;

  for (let i = 0; i < board.length; i += 3) {
    diag1 += board[i + i / 3];
    diag2 += board[2 + (i / 3) * 2];
    horz1 += board[i / 3];
    horz2 += board[i / 3 + 3];
    horz3 += board[i / 3 + 6];
    vert1 += board[(i / 3) * 3];
    vert2 += board[(i / 3) * 3 + 1];
    vert3 += board[(i / 3) * 3 + 2];

    player1 =
      diag1 % 9 === 3 ||
      diag2 % 9 === 3 ||
      horz1 % 9 === 3 ||
      horz2 % 9 === 3 ||
      horz3 % 9 === 3 ||
      vert1 % 9 === 3 ||
      vert2 % 9 === 3 ||
      vert3 % 9 === 3;

    player2 =
      diag1 % 9 === 6 ||
      diag2 % 9 === 6 ||
      horz1 % 9 === 6 ||
      horz2 % 9 === 6 ||
      horz3 % 9 === 6 ||
      vert1 % 9 === 6 ||
      vert2 % 9 === 6 ||
      vert3 % 9 === 6;
  }

  let winCondition: WinCondition | null = null;

  if (player1) {
    if (diag1 % 9 === 3) winCondition = 'diag1';
    if (diag2 % 9 === 3) winCondition = 'diag2';
    if (horz1 % 9 === 3) winCondition = 'horz1';
    if (horz2 % 9 === 3) winCondition = 'horz2';
    if (horz3 % 9 === 3) winCondition = 'horz3';
    if (vert1 % 9 === 3) winCondition = 'vert1';
    if (vert2 % 9 === 3) winCondition = 'vert2';
    if (vert3 % 9 === 3) winCondition = 'vert3';

    return { state: 'win', winCondition };
  } else if (player2) {
    if (diag1 % 9 === 6) winCondition = 'diag1';
    if (diag2 % 9 === 6) winCondition = 'diag2';
    if (horz1 % 9 === 6) winCondition = 'horz1';
    if (horz2 % 9 === 6) winCondition = 'horz2';
    if (horz3 % 9 === 6) winCondition = 'horz3';
    if (vert1 % 9 === 6) winCondition = 'vert1';
    if (vert2 % 9 === 6) winCondition = 'vert2';
    if (vert3 % 9 === 6) winCondition = 'vert3';

    return { state: 'lose', winCondition };
  }

  return { state: 'in-progress', winCondition };
};
