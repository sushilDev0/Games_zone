import React from "react";
import '../css/board.css'; // optional for styling

const Square = ({ value, onClick }) => {
  return (
    <button
      className="square"
      onClick={onClick}
      style={{
        width: "100%",
        aspectRatio: "1 / 1",
        fontSize: "clamp(1.5rem, 5vmin, 3rem)",
        fontWeight: "bold",
        cursor: "pointer",
        userSelect: "none",
        backgroundColor: "#576b5b",
        border: "2px solid #555",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "background-color 0.2s ease",
      }}
      onMouseEnter={e => e.currentTarget.style.backgroundColor = "#4d5fc4"}
      onMouseLeave={e => e.currentTarget.style.backgroundColor = "#576b5b"}
      onMouseDown={e => e.currentTarget.style.backgroundColor = "#ddd"}
      onMouseUp={e => e.currentTarget.style.backgroundColor = "#4d5fc4"}
    >
      {value}
    </button>
  );
};

export default Square;
