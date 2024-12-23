import { useState, useCallback, useEffect } from 'react';
import { Player, BoardState, WinningLine } from '../types/game';
import { useBotMove } from './useBotMove';

const winningCombinations = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
  [0, 4, 8], [2, 4, 6] // Diagonals
];

export function useGameState(isBotMode: boolean = false) {
  const [board, setBoard] = useState<BoardState>(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState<Player>('X');
  const [winningLine, setWinningLine] = useState<WinningLine>(null);
  const [isDraw, setIsDraw] = useState(false);
  
  const getBotMove = useBotMove();

  const checkWinner = useCallback((boardState: BoardState): WinningLine => {
    for (const combination of winningCombinations) {
      const [a, b, c] = combination;
      if (
        boardState[a] &&
        boardState[a] === boardState[b] &&
        boardState[a] === boardState[c]
      ) {
        return combination;
      }
    }
    return null;
  }, []);

  const makeMove = useCallback((position: number) => {
    if (board[position] || winningLine) return false;

    const newBoard = [...board];
    newBoard[position] = currentPlayer;
    setBoard(newBoard);

    const winner = checkWinner(newBoard);
    if (winner) {
      setWinningLine(winner);
      return true;
    }

    if (!newBoard.includes(null)) {
      setIsDraw(true);
      return true;
    }

    setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
    return true;
  }, [board, currentPlayer, winningLine, checkWinner]);

  // Bot move effect
  useEffect(() => {
    if (isBotMode && currentPlayer === 'O' && !winningLine && !isDraw) {
      const timer = setTimeout(() => {
        const botMove = getBotMove(board);
        if (botMove !== -1) {
          makeMove(botMove);
        }
      }, 500); // Add a small delay to make it feel more natural

      return () => clearTimeout(timer);
    }
  }, [isBotMode, currentPlayer, board, winningLine, isDraw, getBotMove, makeMove]);

  const resetGame = useCallback(() => {
    setBoard(Array(9).fill(null));
    setCurrentPlayer('X');
    setWinningLine(null);
    setIsDraw(false);
  }, []);

  return {
    board,
    currentPlayer,
    winningLine,
    isDraw,
    makeMove,
    resetGame
  };
}