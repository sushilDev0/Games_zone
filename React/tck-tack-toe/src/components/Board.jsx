import React from "react";
import Square from "./Square";
import '../css/board.css';

const Board = ({ board, onClick, size }) => {
  return (
    <div
      className="board"
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${size}, 1fr)`,
        gridTemplateRows: `repeat(${size}, 1fr)`,
        gap: "5px",
        width: "min(90vmin, 500px)",
        margin: "20px auto",
      }}
    >
      {board.map((value, index) => (
        <Square
          key={index}
          value={value}
          onClick={() => onClick(index)}
        />
      ))}
    </div>
  );
};

export default Board;
