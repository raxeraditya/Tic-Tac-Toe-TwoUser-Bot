import { motion } from 'framer-motion';
import { Square } from './Square';
import { BoardState, WinningLine } from '../types/game';

interface BoardProps {
  board: BoardState;
  winningLine: WinningLine;
  onSquareClick: (index: number) => void;
}

export function Board({ board, winningLine, onSquareClick }: BoardProps) {
  return (
    <motion.div
      className="grid grid-cols-3 gap-2 w-full max-w-md aspect-square p-2"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {board.map((value, index) => (
        <Square
          key={index}
          value={value}
          position={index}
          isWinning={winningLine?.includes(index) || false}
          onClick={() => onSquareClick(index)}
        />
      ))}
    </motion.div>
  );
}