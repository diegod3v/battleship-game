function createBoard() {
  const grid = [];

  for (let i = 0; i < 10; i++) {
    grid[i] = [];
    for (let j = 0; j < 10; j++) {
      grid[i][j] = `i:${i},j:${j}`;
    }
  }

  return grid;
}

const grid = createBoard();

export default function Home() {
  return (
    <div>
      <div className="container mx-auto h-screen">
        <div className="flex h-full">
          <div className="md:w-4/12 h-20 px-8 py-20">
            <div className="flex">
              <div className="w-1/2 text-center bg-yellow-400">
                <div className="text-4xl font-bold py-10 px-2 border-b">00</div>
                <span className="text-xl font-bold">Player 1</span>
              </div>
              <div className="w-1/2 text-center bg-green-400">
                <div className="text-4xl font-bold py-10 px-2 border-b">00</div>
                <span className="text-xl font-bold">Player 2</span>
              </div>
            </div>
          </div>
          <div className="h-full md:w-8/12 p-20">
            <div className="w-full pb-full relative">
              <div className="top-0 left-0 absolute h-full w-full grid grid-cols-10 grid-rows-10 border-4 border-yellow-400">
                {grid.flat().map((coord) => (
                  <div className="col-span-1 row-span-1 border">{coord}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
