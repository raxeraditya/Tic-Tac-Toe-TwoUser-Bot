import { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Bot } from 'lucide-react';

interface PlayerSetupProps {
  onGameStart: (players: { playerX: string; playerO: string } | null) => void;
}

export function PlayerSetup({ onGameStart }: PlayerSetupProps) {
  const [mode, setMode] = useState<'two-player' | 'bot'>('two-player');
  const [playerX, setPlayerX] = useState('');
  const [playerO, setPlayerO] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === 'two-player' && playerX && playerO) {
      onGameStart({ playerX, playerO });
    } else if (mode === 'bot' && playerX) {
      onGameStart({ playerX, playerO: 'Bot' });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-md mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md"
    >
      <div className="flex gap-4 mb-6">
        <button
          className={`flex-1 p-4 rounded-lg flex flex-col items-center gap-2 transition-colors
            ${mode === 'two-player' 
              ? 'bg-blue-500 text-white' 
              : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'}`}
          onClick={() => setMode('two-player')}
        >
          <Users className="w-6 h-6" />
          <span>Two Players</span>
        </button>
        <button
          className={`flex-1 p-4 rounded-lg flex flex-col items-center gap-2 transition-colors
            ${mode === 'bot' 
              ? 'bg-blue-500 text-white' 
              : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'}`}
          onClick={() => setMode('bot')}
        >
          <Bot className="w-6 h-6" />
          <span>Play vs Bot</span>
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">
            Player X Name
          </label>
          <input
            type="text"
            value={playerX}
            onChange={(e) => setPlayerX(e.target.value)}
            className="w-full p-2 rounded-md border border-gray-300 dark:border-gray-600 
              dark:bg-gray-700 focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {mode === 'two-player' && (
          <div>
            <label className="block text-sm font-medium mb-1">
              Player O Name
            </label>
            <input
              type="text"
              value={playerO}
              onChange={(e) => setPlayerO(e.target.value)}
              className="w-full p-2 rounded-md border border-gray-300 dark:border-gray-600 
                dark:bg-gray-700 focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        )}

        <motion.button
          type="submit"
          className="w-full py-2 px-4 bg-blue-500 text-white rounded-lg 
            hover:bg-blue-600 transition-colors"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Start Game
        </motion.button>
      </form>
    </motion.div>
  );
}