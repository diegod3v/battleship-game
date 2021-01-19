import { useCallback, useState } from "react";
import { player2Layout } from "../playerLayout";
import classnames from "classnames";
import PlayersBoard from "../components/PlayersBoard";
import GameGrid from "../components/GameGrid";
import { createBoard } from "../helpers/createBoard";
import ShipsCounter from "../components/ShipsCounter";

const grid = createBoard();

const { shipTypes, layout } = player2Layout;

export default function Home() {
  const [p1Score, setP1Score] = useState(0);
  const [p2Score, setP2Score] = useState(0);
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

      if (
        waterList.some((el) => el[0] === coord[0] && el[1] === coord[1]) ||
        shipShotsList.some((el) => el[0] === coord[0] && el[1] === coord[1])
      ) {
        return;
      }

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

        if (ships[currenShipShotName] === shipTypes[currenShipShotName].size) {
          setP1Score((prev) => prev + 1);
        }
      } else {
        setWaterList([...waterList, coord]);
      }
    },
    [ships, shipShotsList, waterList]
  );

  return (
    <div>
      <div className="container mx-auto h-screen">
        <div className="flex flex-col md:flex-row flex-wrap md:flex-nowrap h-full">
          <div className="w-full md:w-8/12 md:order-2 md:h-full p-0 sm:p-8 md:p-20">
            <GameGrid
              grid={grid}
              shipShotsList={shipShotsList}
              waterShotsList={waterList}
              onClickBoard={onClickBoard}
            />
          </div>
          <div className="sm:w-full md:w-4/12 md:order-1 flex flex-wrap h-20 px-0 sm:px-4 md:px-8 md:py-20">
            <div className="w-full sm:w-1/4 md:w-full">
              <PlayersBoard scoreP1={p1Score} scoreP2={p2Score} />
            </div>
            <div className="w-full sm:w-3/4 md:w-full">
              <ShipsCounter shipTypes={shipTypes} shipShotsCount={ships} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
