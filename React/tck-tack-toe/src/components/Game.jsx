import { useState, useEffect } from "react";
import Board from "./Board";

const Game = () => {
  const [size, setSize] = useState(3);
  const [board, setBoard] = useState(Array(size * size).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [lastMove, setLastMove] = useState(null); // track last move index

  useEffect(() => {
    setBoard(Array(size * size).fill(null));
    setIsXNext(true);
    setLastMove(null);
  }, [size]);

  // Check if all cells in the given indexes have the same non-null value
  const checkLine = (indexes) => {
    const first = board[indexes[0]];
    if (!first) return false;
    return indexes.every(index => board[index] === first);
  };

  // Check winner by analyzing only lines related to last move
  const calculateWinner = () => {
    if (lastMove === null) return null;

    const row = Math.floor(lastMove / size);
    const col = lastMove % size;

    // Check row
    const rowIndexes = Array.from({ length: size }, (_, i) => row * size + i);
    if (checkLine(rowIndexes)) return board[lastMove];

    // Check column
    const colIndexes = Array.from({ length: size }, (_, i) => i * size + col);
    if (checkLine(colIndexes)) return board[lastMove];

    // Check diagonal (top-left to bottom-right)
    if (row === col) {
      const diag1Indexes = Array.from({ length: size }, (_, i) => i * size + i);
      if (checkLine(diag1Indexes)) return board[lastMove];
    }

    // Check anti-diagonal (top-right to bottom-left)
    if (row + col === size - 1) {
      const diag2Indexes = Array.from({ length: size }, (_, i) => i * size + (size - 1 - i));
      if (checkLine(diag2Indexes)) return board[lastMove];
    }

    return null;
  };

  const winner = calculateWinner();
  const isDraw = !winner && board.every(cell => cell !== null);

  const handleSquareClick = (index) => {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = isXNext ? "X" : "O";

    setBoard(newBoard);
    setIsXNext(!isXNext);
    setLastMove(index);
  };

  const resetGame = () => {
    setBoard(Array(size * size).fill(null));
    setIsXNext(true);
    setLastMove(null);
  };

  const handleSizeChange = (e) => {
    let val = Number(e.target.value);
    if (val < 3) val = 3;
    if (val > 10) val = 10;
    setSize(val);
  };

  return (
    <div>
      <label>
        Board Size:{" "}
        <input
          type="number"
          min="3"
          max="10"
          value={size}
          onChange={handleSizeChange}
          style={{ width: "60px" }}
        />
      </label>

      <div style={{ margin: "10px 0" }}>
        {winner
          ? `Winner: ${winner}`
          : isDraw
          ? "It's a draw!"
          : `Next player: ${isXNext ? "X" : "O"}`}
      </div>

      <Board board={board} onClick={handleSquareClick} size={size} />

      <button onClick={resetGame} style={{ marginTop: "15px" }}>
        Restart
      </button>
    </div>
  );
};

export default Game;
