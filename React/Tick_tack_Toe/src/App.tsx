import { useState } from "react";
function App() {
  const [board, setBoard] = useState<(string | null)[]>(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState<string | null>(null);

  const handleClick = (index: number) => {
    if (board[index] || winner) return;

    const newBoard = board.slice();
    newBoard[index] = isXNext ? "X" : "O";
    setBoard(newBoard);
    setIsXNext(!isXNext);

    // Check for a winner after the move
    const winningPlayer = calculateWinner(newBoard);
    if (winningPlayer) {
      setWinner(winningPlayer);
    }
  };

  const calculateWinner = (squares: (string | null)[]): string | null => {
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
    for (let line of lines) {
      const [a, b, c] = line;
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  };

  const reset = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setWinner(null);
  };

  return (
    <div>
      <h1 className="text-center text-5xl font-bold p-4">Tic Tac Toe</h1>
      <div className="h-screen flex flex-col items-center justify-center">
        {winner ? (
          <h2 className="text-3xl font-bold">{`Winner: ${winner}`}</h2>
        ) : (
          <h2 className="text-3xl font-bold p-2">{` Player: ${
            isXNext ? "X" : "O"
          }`}</h2>
        )}
        <div className="grid grid-cols-3 gap-2 bg-slate-100 border-0">
          {board.map((value, index) => (
            <button
              key={index}
              className="h-20 w-20 bg-cyan-200 border-gray-500 hover:bg-sky-300"
              onClick={() => handleClick(index)}
            >
              {value}{" "}
            </button>
          ))}
          <div className="mt-8">
            <button
              className="block bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
              onClick={reset}
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
