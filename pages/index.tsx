import { useCallback, useState } from "react";
import { player2Layout } from "../playerLayout";
import classnames from "classnames";

function createBoard() {
  const grid = [];

  for (let i = 0; i < 10; i++) {
    grid[i] = [];
    for (let j = 0; j < 10; j++) {
      grid[i][j] = [i, j];
    }
  }

  return grid;
}

const grid = createBoard();

const { shipTypes, layout } = player2Layout;

export default function Home() {
  const [waterList, setWaterList] = useState([]);
  const [shipShotsList, setShipShotsList] = useState([]);
  const [ships, setShips] = useState({
    carrier: 0,
    battleship: 0,
    cruiser: 0,
    submarine: 0,
    destroyer: 0,
  });
  const onClickBoard = useCallback(
    (coord: [number, number]) => {
      let currentShipShot;
      let currenShipShotName;
      layout.forEach((shipData) => {
        const { positions, ship: shipName } = shipData;
        positions.forEach((shipCoord) => {
          if (shipCoord[0] === coord[0] && shipCoord[1] === coord[1]) {
            currentShipShot = shipCoord;
            currenShipShotName = shipName;
          }
        });
      });

      if (currentShipShot) {
        ships[currenShipShotName] = ships[currenShipShotName] + 1;
        setShips(ships);
        setShipShotsList([...shipShotsList, currentShipShot]);
      } else {
        setWaterList([...waterList, coord]);
      }
    },
    [ships, shipShotsList, waterList]
  );

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
            <div>
              <div>Carrier: {shipTypes.carrier.size - ships.carrier}</div>
              <div>
                Battlehsip: {shipTypes.battleship.size - ships.battleship}
              </div>
              <div>Cruiser: {shipTypes.cruiser.size - ships.cruiser}</div>
              <div>Submarine: {shipTypes.submarine.size - ships.submarine}</div>
              <div>Destroyer: {shipTypes.destroyer.size - ships.destroyer}</div>
            </div>
          </div>
          <div className="h-full md:w-8/12 p-20">
            <div className="w-full pb-full relative">
              <div className="top-0 left-0 absolute h-full w-full grid grid-cols-10 grid-rows-10 border-4 border-yellow-400">
                {grid.flat().map((coord) => {
                  return (
                    <div
                      className={classnames(
                        "col-span-1 row-span-1 border w-full h-full bg-gray-50",
                        {
                          "bg-blue-200": waterList.some(
                            (el) => el[0] === coord[0] && el[1] === coord[1]
                          ),
                        },
                        {
                          "bg-red-200": shipShotsList.some(
                            (el) => el[0] === coord[0] && el[1] === coord[1]
                          ),
                        }
                      )}
                      onClick={() => onClickBoard(coord)}
                    ></div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
