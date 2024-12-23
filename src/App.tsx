import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { RotateCcw } from 'lucide-react';
import { Board } from './components/Board';
import { GameStatus } from './components/GameStatus';
import { ThemeToggle } from './components/ThemeToggle';
import { PlayerSetup } from './components/PlayerSetup';
import { useGameState } from './hooks/useGameState';
import { Players } from './types/game';

export default function App() {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  const [players, setPlayers] = useState<Players | null>(null);
  const { board, currentPlayer, winningLine, isDraw, makeMove, resetGame } = useGameState(
    players?.playerO === 'Bot'
  );

  // Reset game when players change
  const handlePlayerChange = (newPlayers: Players | null) => {
    resetGame();
    setPlayers(newPlayers);
  };

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
  }, [isDark]);

  if (!players) {
    return (
      <div className={`min-h-screen w-full transition-colors duration-300
        ${isDark ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
        <ThemeToggle isDark={isDark} onToggle={() => setIsDark(!isDark)} />
        <div className="container mx-auto px-4 py-8 flex flex-col items-center justify-center min-h-screen">
          <h1 className="text-4xl font-bold mb-8">Tic Tac Toe</h1>
          <PlayerSetup onGameStart={handlePlayerChange} />
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen w-full transition-colors duration-300
      ${isDark ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <ThemeToggle isDark={isDark} onToggle={() => setIsDark(!isDark)} />
      
      <div className="container mx-auto px-4 py-8 flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-4xl font-bold mb-8">Tic Tac Toe</h1>
        
        <div className="mb-4 text-center">
          <p className="text-lg">
            {players.playerX} (X) vs {players.playerO} (O)
          </p>
        </div>
        
        <GameStatus
          currentPlayer={currentPlayer}
          winningLine={winningLine}
          isDraw={isDraw}
          players={players}
        />

        <Board
          board={board}
          winningLine={winningLine}
          onSquareClick={makeMove}
        />

        <div className="flex gap-4 mt-8">
          <motion.button
            className="px-6 py-2 bg-blue-500 text-white rounded-lg
              hover:bg-blue-600 transition-colors duration-200
              flex items-center gap-2"
            onClick={resetGame}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <RotateCcw className="w-5 h-5" />
            New Game
          </motion.button>

          <motion.button
            className="px-6 py-2 bg-gray-500 text-white rounded-lg
              hover:bg-gray-600 transition-colors duration-200"
            onClick={() => handlePlayerChange(null)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Change Players
          </motion.button>
        </div>
      </div>
    </div>
  );
}