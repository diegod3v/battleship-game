type Ship = {
  size: number;
  count: number;
};

type Props = {
  shipTypes: {
    carrier: Ship;
    battleship: Ship;
    cruiser: Ship;
    submarine: Ship;
    destroyer: Ship;
  };
  shipShotsCount: {
    carrier: number;
    battleship: number;
    cruiser: number;
    submarine: number;
    destroyer: number;
  };
};

const ShipsCounter: React.FC<Props> = ({ shipTypes, shipShotsCount }) => {
  return (
    <div>
      {Object.keys(shipTypes)
        .reverse()
        .map((sType) => {
          const { size } = shipTypes[sType];
          const shots = shipShotsCount[sType];

          return (
            <div className="flex mt-4 items-center" key={sType}>
              <div className="w-1/2">
                <img src={`/images/ships/${sType}.png`} />
              </div>
              <div className="w-1/2 px-4 items-center">
                <div className="flex items-center">
                  {Array(shots)
                    .fill(null)
                    .map(() => (
                      <img
                        className="w-1/5 items-center"
                        src="/images/hit-small.png"
                      />
                    ))}
                  {Array(size - shots)
                    .fill(null)
                    .map(() => (
                      <img
                        className="w-1/5 items-center"
                        src="/images/miss-small.png"
                      />
                    ))}
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default ShipsCounter;
