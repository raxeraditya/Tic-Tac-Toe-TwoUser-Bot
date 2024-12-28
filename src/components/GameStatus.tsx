import { motion } from "framer-motion";
import { Player, Players } from "../types/game";

interface GameStatusProps {
  currentPlayer: Player;
  winningLine: number[] | null;
  isDraw: boolean;
  players: Players;
}

export function GameStatus({
  currentPlayer,
  winningLine,
  isDraw,
  players,
}: GameStatusProps) {
  const currentPlayerName =
    currentPlayer === "X" ? players.playerX : players.playerO;
  let message = `Current player: ${currentPlayerName} (${currentPlayer})`;

  if (winningLine) {
    const winner = currentPlayer === "X" ? players.playerX : players.playerO;
    message = `${winner} (${currentPlayer === "X" ? "X" : "O"}) wins!`;
  } else if (isDraw) {
    message = "It's a draw!";
  }

  return (
    <motion.div
      className="text-2xl font-bold text-center mb-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      key={message}
    >
      {message}
    </motion.div>
  );
}
