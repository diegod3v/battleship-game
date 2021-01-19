type Props = {
  scoreP1: number;
  scoreP2: number;
};

const PlayersBoard: React.FC<Props> = ({scoreP1, scoreP2}) => {
  return (
    <div className="flex">
      <div className="w-1/2 text-center bg-yellow-400">
        <div className="text-4xl font-bold py-10 px-2 border-b">{scoreP1}</div>
        <span className="text-xl font-bold">Player 1</span>
      </div>
      <div className="w-1/2 text-center bg-green-400">
        <div className="text-4xl font-bold py-10 px-2 border-b">{scoreP2}</div>
        <span className="text-xl font-bold">Player 2</span>
      </div>
    </div>
  );
};

export default PlayersBoard;
