import "./styles.css";
import classNames from "classnames";

interface SquareProps {
  value: string | null;
  isWinSquare: boolean;
  onSquareClick: Function;
}

const Square = ({ value, isWinSquare, onSquareClick }: SquareProps) => {
  const className = classNames("square", { win: isWinSquare });

  return (
    <button className={className} onClick={() => onSquareClick()}>
      {value}
    </button>
  );
};

export default Square;
