//from: https://betterprogramming.pub/how-i-created-my-first-ai-program-using-react-js-95fe54d994d6
export type Tile = -9 | 1 | 2;

const getOpenTiles = (board: Tile[]) => {
  let copy = [...board];

  const tiles = copy.reduce((open: number[], tile, index) => {
    if (tile === -9) {
      open.push(index);
    }
    return open;
  }, []);

  return tiles;
};

export const getAIPlay = (cur_board: Tile[]) => {
  let boardCopy = [...cur_board];
  const open_tiles = getOpenTiles(boardCopy);

  if (open_tiles.length) {
    const rand = Math.random() * open_tiles.length;
    return open_tiles[Math.floor(rand)];
  }

  return null;
};

export const checkWinner = (board: Tile[]) => {
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

  if (player1) {
    return 1;
  } else if (player2) {
    return 2;
  }

  return 0;
};
