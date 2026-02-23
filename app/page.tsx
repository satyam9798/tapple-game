"use client";

import { useEffect, useState } from "react";

const categories = [
  { name: "Fruits", words: ["Apple", "Banana", "Mango", "Orange", "Grapes"] },
  { name: "Animals", words: ["Lion", "Tiger", "Elephant", "Zebra"] },
  { name: "Countries", words: ["India", "Brazil", "Canada", "France"] },
];

export default function Home() {
  const [category, setCategory] = useState(categories[0]);
  const [usedLetters, setUsedLetters] = useState<string[]>([]);
  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [timer, setTimer] = useState(10);

  useEffect(() => {
    if (timer === 0) {
      nextTurn();
      return;
    }
    const interval = setInterval(() => {
      setTimer((t) => t - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  const nextTurn = () => {
    setCurrentPlayer((p) => (p === 1 ? 2 : 1));
    setTimer(10);
  };

  const handleLetterClick = (letter: string) => {
    if (usedLetters.includes(letter)) return;
    setUsedLetters([...usedLetters, letter]);
    nextTurn();
  };

  const resetGame = () => {
    setUsedLetters([]);
    setCategory(categories[Math.floor(Math.random() * categories.length)]);
    setTimer(10);
    setCurrentPlayer(1);
  };

  return (
    <main className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-6">
      <h1 className="text-4xl font-bold mb-4">Tapple Game</h1>
      <div className="mb-4 text-lg">
       Developed by Satyam, exclusively for Pratishtha ❤️
      </div>

      <div className="mb-4 text-xl">
        Category: <span className="text-yellow-400">{category.name}</span>
      </div>

      <div className="mb-4 text-lg">
        Player {currentPlayer}'s Turn
      </div>

      <div className="mb-4 text-3xl font-bold text-red-500">
        {timer}s
      </div>

      <div className="grid grid-cols-7 gap-2 max-w-lg">
        {"ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map((letter) => (
          <button
            key={letter}
            onClick={() => handleLetterClick(letter)}
            disabled={usedLetters.includes(letter)}
            className={`p-3 rounded font-bold ${
              usedLetters.includes(letter)
                ? "bg-gray-700 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            {letter}
          </button>
        ))}
      </div>

      <button
        onClick={resetGame}
        className="mt-6 px-6 py-2 bg-green-500 rounded hover:bg-green-600"
      >
        Reset Game
      </button>
    </main>
  );
}