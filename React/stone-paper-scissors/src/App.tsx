import Button from "./Button";
import { FaFistRaised } from "react-icons/fa";
import { IoNewspaperOutline } from "react-icons/io5";
import { FaHandScissors } from "react-icons/fa";
import { useState } from "react";

function App() {
  const [playerScore, setPlayerScore] = useState(0);
  const [cpuScore, setCPUScore] = useState(0);
  const [result, setResult] = useState("");
  const [resultColor, setResultColor] = useState(""); // Track the result color

  const playGame = (playerChoice: string) => {
    const choices = ["rock", "paper", "scissors"];
    
    // CPU makes a random choice
    const cpuChoice = choices[Math.floor(Math.random() * choices.length)];

    // Check for a tie
    if (playerChoice === cpuChoice) {
      setResult(`It's a tie! CPU chooses ${cpuChoice}`);
      setResultColor("text-blue-500"); // Blue color for tie
      return;
    }

    // Determine win/loss based on choices
    if (
      (playerChoice === "rock" && cpuChoice === "scissors") ||
      (playerChoice === "paper" && cpuChoice === "rock") ||
      (playerChoice === "scissors" && cpuChoice === "paper")
    ) {
      setResult(`You win! CPU chose ${cpuChoice}`);
      setResultColor("text-green-500"); // Green color for win
      setPlayerScore(playerScore + 1);
    } else {
      setResult(`You lose! CPU chose ${cpuChoice}`);
      setResultColor("text-red-500"); // Red color for loss
      setCPUScore(cpuScore + 1);
    }
  };

  return (
    <>
      <h1 className="text-3xl font-bold text-center m-10 p-4">
        Stone Paper Scissors
      </h1>

      <div className="flex items-center justify-center space-x-10 flex-wrap">
        <Button
          image={<FaFistRaised style={{ height: "8.5rem", width: "10rem" }} />}
          onClick={() => playGame("rock")}
        />
        <Button
          image={<IoNewspaperOutline style={{ height: "8.5rem", width: "10rem" }} />}
          onClick={() => playGame("paper")}
        />
        <Button
          image={<FaHandScissors style={{ height: "8.5rem", width: "10rem" }} />}
          onClick={() => playGame("scissors")}
        />
      </div>

      <div className="text-center mb-4 grid gap-3 mt-5">
        <p className="text-xl sm:text-2xl">Player Score: {playerScore}</p>
        <p className="text-xl sm:text-2xl">CPU Score: {cpuScore}</p>
        <p className={`text-xl font-bold ${resultColor}`}>{result}</p>
      </div>
    </>
  );
}

export default App;
