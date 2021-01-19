type Coord = [number, number];

type Props = {
  grid: Coord[][];
  waterShotsList: Coord[];
  shipShotsList: Coord[];
  onClickBoard: (coord: Coord) => void;
};

const GameGrid: React.FC<Props> = ({
  grid,
  shipShotsList,
  waterShotsList,
  onClickBoard,
}) => {
  return (
    <div className="w-full pb-full relative">
      <div className="top-0 left-0 absolute h-full w-full grid grid-cols-10 grid-rows-10 border-4 border-yellow-400">
        {grid.flat().map((coord) => {
          return (
            <div
              className="col-span-1 row-span-1 border w-full h-full bg-gray-50"
              onClick={() => onClickBoard(coord)}
            >
              {waterShotsList.some(
                (el) => el[0] === coord[0] && el[1] === coord[1]
              ) ? (
                <img className="w-full" src="/images/miss.png" />
              ) : shipShotsList.some(
                  (el) => el[0] === coord[0] && el[1] === coord[1]
                ) ? (
                <img className="w-full" src="/images/hit.png" />
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default GameGrid;
