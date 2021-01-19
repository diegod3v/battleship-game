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
        <div className="flex h-full">
          <div className="md:w-4/12 h-20 px-8 py-20">
            <PlayersBoard scoreP1={p1Score} scoreP2={p2Score} />
            <ShipsCounter shipTypes={shipTypes} shipShotsCount={ships} />
          </div>
          <div className="h-full md:w-8/12 p-20">
            <GameGrid
              grid={grid}
              shipShotsList={shipShotsList}
              waterShotsList={waterList}
              onClickBoard={onClickBoard}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
