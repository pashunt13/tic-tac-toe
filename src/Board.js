import Square from "./Square";
import { useCallback, useMemo } from "react";
import "./styles.css";

const rows = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
];

const Board = ({ xIsNext, squares, onPlay }) => {
  const winner = useMemo(() => {
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
      return false;
    }
    return null;
  }, [squares]);

  let winPoints = [];
  let status;
  if (winner) {
    status = `Winner: ${winner.winner}`;
    winPoints = winner.winPoints;
  } else if (winner === false) {
    status = `Draw`;
  } else {
    status = `Next player: ${xIsNext ? "X" : "O"}`;
  }

  const handleClick = useCallback(
    (square, i, j) => {
      if (squares[square] || winner) {
        return;
      }

      const nextSquares = squares.slice();
      const nextPoints = [i + 1, j + 1];
      if (xIsNext) {
        nextSquares[square] = "X";
      } else {
        nextSquares[square] = "O";
      }
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
