import { useState } from "react";
import Board from "./Board";
import Info from "./Info";
import "./styles.css";

const Game = () => {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [pointsHistory, setPointsHistory] = useState<number[]>([]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  const handlePlay = (nextSquares: string[], nextPoints: number) => {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setPointsHistory([...pointsHistory.slice(0, currentMove), nextPoints]);
    setCurrentMove(nextHistory.length - 1);
  };

  const jumpTo = (nextMove: number) => {
    setCurrentMove(nextMove);
  };

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <Info
          history={history}
          pointsHistory={pointsHistory}
          currentMove={currentMove}
          jumpTo={jumpTo}
        />
      </div>
    </div>
  );
};

export default Game;
