import "./styles.css";
import classNames from "classnames";

const Square = ({ value, isWinSquare, onSquareClick }) => {
  const className = classNames("square", { "square win": isWinSquare });

  return (
    <button className={className} onClick={onSquareClick}>
      {value}
    </button>
  );
};

export default Square;
