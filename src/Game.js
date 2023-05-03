import { useState } from "react";
import Board from "./Board";
import Info from "./Info";
import "./styles.css";

const Game = () => {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [pointsHistory, setPointsHistory] = useState([]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  const handlePlay = (nextSquares, nextPoints) => {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
    setPointsHistory([...pointsHistory, nextPoints]);

    console.log(nextPoints);
    // console.log("nextHistory", nextHistory);
    // console.log("currentMove", currentMove);
    // console.log("nextSquares", nextSquares);
  };

  const jumpTo = (nextMove) => {
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
