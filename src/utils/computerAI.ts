import { BOARD_SIZE, EMPTY, PLAYER, COMPUTER, GameState } from './gameLogic';

// Get all valid moves
function getValidMoves(state: GameState): [number, number][] {
  const validMoves: [number, number][] = [];
  
  // If there's a last move, focus on the area around it
  if (state.lastMove) {
    const [lastRow, lastCol] = state.lastMove;
    const radius = 2; // Look 2 cells around the last move
    
    for (let row = Math.max(0, lastRow - radius); row <= Math.min(BOARD_SIZE - 1, lastRow + radius); row++) {
      for (let col = Math.max(0, lastCol - radius); col <= Math.min(BOARD_SIZE - 1, lastCol + radius); col++) {
        if (state.board[row][col] === EMPTY) {
          validMoves.push([row, col]);
        }
      }
    }
    
    // If we found moves around the last move, return them
    if (validMoves.length > 0) {
      return validMoves;
    }
  }
  
  // Otherwise, consider all empty cells
  for (let row = 0; row < BOARD_SIZE; row++) {
    for (let col = 0; col < BOARD_SIZE; col++) {
      if (state.board[row][col] === EMPTY) {
        validMoves.push([row, col]);
      }
    }
  }
  
  return validMoves;
}

// Evaluate a position for a player
function evaluatePosition(board: number[][], row: number, col: number, player: number): number {
  // Directions: horizontal, vertical, diagonal, anti-diagonal
  const directions = [
    [0, 1],  // horizontal
    [1, 0],  // vertical
    [1, 1],  // diagonal
    [1, -1]  // anti-diagonal
  ];
  
  let totalScore = 0;
  
  for (const [dx, dy] of directions) {
    // Count consecutive pieces and open ends
    let consecutive = 0;
    let blocked = 0;
    let sequence = [];
    
    // Check in both directions
    for (let dir = -1; dir <= 1; dir += 2) {
      for (let i = 1; i < 5; i++) {
        const newRow = row + i * dx * dir;
        const newCol = col + i * dy * dir;
        
        // If out of bounds or blocked by opponent
        if (
          newRow < 0 || newRow >= BOARD_SIZE ||
          newCol < 0 || newCol >= BOARD_SIZE ||
          (board[newRow][newCol] !== player && board[newRow][newCol] !== EMPTY)
        ) {
          blocked++;
          break;
        }
        
        // If empty space
        if (board[newRow][newCol] === EMPTY) {
          break;
        }
        
        // If own piece
        if (board[newRow][newCol] === player) {
          consecutive++;
          sequence.push([newRow, newCol]);
        }
      }
    }
    
    // Calculate score based on consecutive pieces and blocked ends
    if (consecutive >= 4) {
      totalScore += 10000; // Win
    } else if (consecutive === 3 && blocked < 2) {
      totalScore += 1000; // Potential win
    } else if (consecutive === 2 && blocked < 2) {
      totalScore += 100; // Potential threat
    } else if (consecutive === 1 && blocked < 2) {
      totalScore += 10; // Minor advantage
    }
  }
  
  return totalScore;
}

// Get the best move for the computer
export function getComputerMove(state: GameState): [number, number] {
  const validMoves = getValidMoves(state);
  
  // If it's the first move, play near the center
  if (state.board.every(row => row.every(cell => cell === EMPTY))) {
    const center = Math.floor(BOARD_SIZE / 2);
    return [center, center];
  }
  
  let bestScore = -Infinity;
  let bestMove: [number, number] = validMoves[0];
  
  for (const [row, col] of validMoves) {
    // Try this move
    const newBoard = state.board.map(r => [...r]);
    newBoard[row][col] = COMPUTER;
    
    // Evaluate the move
    let score = evaluatePosition(newBoard, row, col, COMPUTER);
    
    // Also consider blocking the player
    const defensiveScore = evaluatePosition(state.board, row, col, PLAYER);
    score += defensiveScore * 0.8; // Slightly prioritize offense over defense
    
    // Update best move if this is better
    if (score > bestScore) {
      bestScore = score;
      bestMove = [row, col];
    }
  }
  
  return bestMove;
}
