import "./styles.css";

const Square = ({ value, isWinSquare, onSquareClick }) => {
  return (
    <button
      className={isWinSquare ? "square win" : "square"}
      onClick={onSquareClick}
    >
      {value}
    </button>
  );
};

export default Square;
