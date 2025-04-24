// Game constants
export const BOARD_SIZE = 15;
export const EMPTY = 0;
export const PLAYER = 1;
export const COMPUTER = 2;

// Game state type
export interface GameState {
  board: number[][];
  currentPlayer: number;
  winner: number | null;
  gameOver: boolean;
  lastMove: [number, number] | null;
}

// Initialize a new game state
export function initGameState(): GameState {
  const board = Array(BOARD_SIZE).fill(0).map(() => Array(BOARD_SIZE).fill(EMPTY));
  
  return {
    board,
    currentPlayer: PLAYER,
    winner: null,
    gameOver: false,
    lastMove: null
  };
}

// Check if a move is valid
export function isValidMove(state: GameState, row: number, col: number): boolean {
  // Check if the position is within the board
  if (row < 0 || row >= BOARD_SIZE || col < 0 || col >= BOARD_SIZE) {
    return false;
  }
  
  // Check if the position is empty
  return state.board[row][col] === EMPTY;
}

// Make a move
export function makeMove(state: GameState, row: number, col: number): GameState {
  if (!isValidMove(state, row, col) || state.gameOver) {
    return state;
  }
  
  // Create a deep copy of the board
  const newBoard = state.board.map(row => [...row]);
  newBoard[row][col] = state.currentPlayer;
  
  // Check for win
  const winner = checkWin(newBoard, row, col);
  const gameOver = winner !== null || isBoardFull(newBoard);
  
  return {
    board: newBoard,
    currentPlayer: state.currentPlayer === PLAYER ? COMPUTER : PLAYER,
    winner,
    gameOver,
    lastMove: [row, col]
  };
}

// Check if the board is full
function isBoardFull(board: number[][]): boolean {
  return board.every(row => row.every(cell => cell !== EMPTY));
}

// Check for a win starting from the last move
export function checkWin(board: number[][], row: number, col: number): number | null {
  const player = board[row][col];
  if (player === EMPTY) return null;
  
  // Directions: horizontal, vertical, diagonal, anti-diagonal
  const directions = [
    [0, 1],  // horizontal
    [1, 0],  // vertical
    [1, 1],  // diagonal
    [1, -1]  // anti-diagonal
  ];
  
  for (const [dx, dy] of directions) {
    let count = 1;  // Count the current piece
    
    // Check in the positive direction
    for (let i = 1; i < 5; i++) {
      const newRow = row + i * dx;
      const newCol = col + i * dy;
      
      if (
        newRow < 0 || newRow >= BOARD_SIZE ||
        newCol < 0 || newCol >= BOARD_SIZE ||
        board[newRow][newCol] !== player
      ) {
        break;
      }
      
      count++;
    }
    
    // Check in the negative direction
    for (let i = 1; i < 5; i++) {
      const newRow = row - i * dx;
      const newCol = col - i * dy;
      
      if (
        newRow < 0 || newRow >= BOARD_SIZE ||
        newCol < 0 || newCol >= BOARD_SIZE ||
        board[newRow][newCol] !== player
      ) {
        break;
      }
      
      count++;
    }
    
    // If there are 5 or more in a row, the player wins
    if (count >= 5) {
      return player;
    }
  }
  
  return null;
}
