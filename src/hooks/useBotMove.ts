import { useCallback } from 'react';
import { BoardState } from '../types/game';

export function useBotMove() {
  return useCallback((board: BoardState): number => {
    // Check for winning move
    const winningMove = findWinningMove(board, 'O');
    if (winningMove !== -1) return winningMove;

    // Block opponent's winning move
    const blockingMove = findWinningMove(board, 'X');
    if (blockingMove !== -1) return blockingMove;

    // Try to take center
    if (board[4] === null) return 4;

    // Try to take corners
    const corners = [0, 2, 6, 8];
    const emptyCorners = corners.filter(i => board[i] === null);
    if (emptyCorners.length > 0) {
      return emptyCorners[Math.floor(Math.random() * emptyCorners.length)];
    }

    // Take any available space
    const emptySquares = board
      .map((square, index) => square === null ? index : null)
      .filter((index): index is number => index !== null);
    
    if (emptySquares.length === 0) return -1;
    
    return emptySquares[Math.floor(Math.random() * emptySquares.length)];
  }, []);
}

// Helper function to find winning moves
function findWinningMove(board: BoardState, player: 'X' | 'O'): number {
  const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6] // Diagonals
  ];

  for (const pattern of winPatterns) {
    const [a, b, c] = pattern;
    const squares = [board[a], board[b], board[c]];
    const playerSquares = squares.filter(square => square === player).length;
    const emptySquares = squares.filter(square => square === null).length;

    if (playerSquares === 2 && emptySquares === 1) {
      return pattern[squares.findIndex(square => square === null)];
    }
  }

  return -1;
}