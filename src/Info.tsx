import { useState } from "react";
import "./styles.css";

interface InfoProps {
  history: string[][];
  pointsHistory: number[];
  currentMove: number;
  jumpTo: Function;
}

const Info = ({ history, pointsHistory, currentMove, jumpTo }: InfoProps) => {
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
      description = `You are at move #${currentMove} [${points}]`;
    } else if (move > 0) {
      description = `Go to move #${move} [${points}]`;
    } else {
      description = `Go to game start`;
    }
    return (
      <li key={`move-${move}`}>
        <button className="info-button" onClick={() => jumpTo(move)}>
          {description}
        </button>
      </li>
    );
  });

  return (
    <>
      <button className="info-button turn-history-button" onClick={turnHistory}>
        Turn History
      </button>
      <ol>{moves}</ol>
    </>
  );
};

export default Info;
