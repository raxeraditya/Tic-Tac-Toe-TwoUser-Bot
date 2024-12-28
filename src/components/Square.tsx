import { motion } from "framer-motion";
import { Player } from "../types/game";

interface SquareProps {
  value: Player | null;
  onClick: () => void;
  isWinning: boolean;
  position: number;
}

export function Square({ value, onClick, isWinning, position }: SquareProps) {
  const variants = {
    initial: { scale: 0.5, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    hover: { scale: 0.95 },
  };

  return (
    <motion.button
      className={`w-full h-full flex items-center justify-center text-4xl md:text-6xl font-bold border-2 rounded-lg
        ${
          isWinning
            ? "border-green-500 dark:border-green-400"
            : "border-gray-300 dark:border-gray-600"
        }
        ${
          value
            ? "cursor-not-allowed"
            : "cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
        }
        transition-colors duration-200`}
      onClick={onClick}
      variants={variants}
      initial="initial"
      animate="animate"
      whileHover={!value ? "hover" : undefined}
      transition={{ duration: 0.2, delay: position * 0.05 }}
    >
      {value && (
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className={
            value === "X"
              ? "text-blue-500 dark:text-blue-400"
              : "text-red-500 dark:text-red-400"
          }
        >
          {value}
        </motion.span>
      )}
    </motion.button>
  );
}
