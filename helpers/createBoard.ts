const GRID_SIZE = 10;

export function createBoard() {
  const grid = [];

  for (let i = 0; i < GRID_SIZE; i++) {
    grid[i] = [];
    for (let j = 0; j < GRID_SIZE; j++) {
      grid[i][j] = [i, j];
    }
  }

  return grid;
}
