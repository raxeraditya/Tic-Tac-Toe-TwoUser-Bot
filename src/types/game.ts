export type Player = 'X' | 'O';
export type BoardState = (Player | null)[];
export type WinningLine = number[] | null;

export interface Players {
  playerX: string;
  playerO: string;
}