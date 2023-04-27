import { useState } from "react";
import "./styles.css";

const Info = ({ history, currentMove, jumpTo }) => {
  const [isTurned, setIsTurned] = useState(false);

  const turnHistory = () => {
    setIsTurned(!isTurned);
  };

  const moves = history.map((squares, move) => {
    if (isTurned) {
      move = history.length - 1 - move;
    }

    let description;
    if (currentMove === move && move > 0) {
      description = "You are at move # " + currentMove;
    } else if (move > 0) {
      description = "Go to move #" + move;
    } else {
      description = "Go to game start";
    }
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <>
      <button onClick={() => turnHistory()}>Turn History</button>
      <ol>{moves}</ol>
    </>
  );
};

export default Info;
