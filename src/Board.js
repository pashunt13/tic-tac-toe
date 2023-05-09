import Square from "./Square";
import { useCallback, useMemo } from "react";
import "./styles.css";

const lines = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const rows = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
];

const Board = ({ xIsNext, squares, onPlay }) => {
  const { winner, winPoints = [] } = useMemo(() => {
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return {
          winner: squares[a],
          winPoints: [a, b, c],
        };
      }
    }

    if (!squares.includes(null)) {
      return { winner: false };
    }
    return {};
  }, [squares]);

  const status = useMemo(() => {
    if (winner) {
      return `Winner: ${winner}`;
    } else if (winner === false) {
      return "Draw";
    } else {
      return `Next player: ${xIsNext ? "X" : "O"}`;
    }
  }, [xIsNext, winner]);

  const handleClick = useCallback(
    (square, i, j) => {
      if (squares[square] || winner) {
        return;
      }

      const nextSquares = Array.from(squares);
      const nextPoints = [i + 1, j + 1];
      nextSquares[square] = xIsNext ? "X" : "O";
      onPlay(nextSquares, nextPoints);
    },
    [xIsNext, winner, squares, onPlay]
  );

  return (
    <>
      <div className="status">{status}</div>
      {rows.map((row, i) => {
        return (
          <div className="board-row" key={`row${i}`}>
            {row.map((square, j) => {
              return (
                <Square
                  key={`col${j}`}
                  value={squares[square]}
                  isWinSquare={
                    winPoints.length !== 0 && winPoints.includes(square)
                  }
                  onSquareClick={() => handleClick(square, i, j)}
                />
              );
            })}
          </div>
        );
      })}
    </>
  );
};

export default Board;
