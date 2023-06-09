import { useState } from "react";
import "./styles.css";

const Info = ({ history, pointsHistory, currentMove, jumpTo }) => {
  const [isTurned, setIsTurned] = useState(false);

  const turnHistory = () => {
    setIsTurned(!isTurned);
  };

  const moves = history.map((squares, move) => {
    if (isTurned) {
      move = history.length - 1 - move;
    }

    const points = pointsHistory[move - 1];
    let description;
    if (currentMove === move && move > 0) {
      description = "You are at move # " + currentMove + " [" + points + "]";
    } else if (move > 0) {
      description = "Go to move #" + move + " [" + points + "]";
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
