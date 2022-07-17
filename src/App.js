import { useEffect, useState } from "react";
import { WORDS } from "./palabras";

const API_URL = WORDS;
const WORD_LENGTH = 5;

export default function App() {
  const [solution, setSolution] = useState("");
  const [guesses, setGuesses] = useState(Array(6).fill(null));
  const [curretGuess, setCurrentGuess] = useState("");
  const [isGameOver, setGameOver] = useState(false);

  useEffect(() => {
    const handleType = (event) => {
      if (isGameOver) {
        return;
      }

      if (event.key === "Enter") {
        if (curretGuess.length !== 5) {
          return;
        }
        const newGuesses = [...guesses];
        newGuesses[guesses.findIndex((val) => val == null)] = curretGuess;
        setGuesses(newGuesses);
        setCurrentGuess("");

        const isCorrect = solution === curretGuess;
        if (isCorrect) setGameOver(true);
      }
      if (event.key === "Backspace") {
        setCurrentGuess(curretGuess.slice(0, -1));
        return;
      }
      if (curretGuess.length >= 5) {
        return;
      }
      const isLetter = event.key.match(/^[a-z]{1}$/) != null;
      if (isLetter) {
        setCurrentGuess((oldGuess) => oldGuess + event.key);
      }
    };
    window.addEventListener("keydown", handleType);
    return () => window.removeEventListener("keydown", handleType);
  }, [curretGuess, isGameOver, solution, guesses]);

  useEffect(() => {
    const fetchWord = async () => {
      const response = await fetch(API_URL);
      //const words = await response.json();
      const randomWord = WORDS[Math.floor(Math.random() * WORDS.length)];
      setSolution(randomWord);
    };

    fetchWord();
  }, []);
  return (
    <div className="board">
      {guesses.map((guess, i) => {
        const isCurrentess = i === guesses.findIndex((val) => val == null);
        return (
          <Line
            guess={isCurrentess ? curretGuess : guess ?? ""}
            isFinal={!curretGuess && guess != null}
            solution={solution}
          />
        );
      })}
    </div>
  );
}

function Line({ guess, isFinal, solution }) {
  const tiles = [];
  for (let i = 0; i < WORD_LENGTH; i++) {
    const char = guess[i];
    let className = "tile";

    if (isFinal) {
      if (char === solution[i]) {
        className += " correct";
      } else if (solution.includes(char)) {
        className += " close";
      } else {
        className += " incorrect";
      }
    }
    tiles.push(
      <div key={i} className={className}>
        {" "}
        {char}
      </div>
    );
    console.log(solution);
  }
  return <div className="line">{tiles}</div>;
}
