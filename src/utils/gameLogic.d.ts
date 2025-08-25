export declare const BOARD_SIZE = 15;
export declare const EMPTY = 0;
export declare const PLAYER = 1;
export declare const COMPUTER = 2;
export interface GameState {
    board: number[][];
    currentPlayer: number;
    winner: number | null;
    gameOver: boolean;
    lastMove: [number, number] | null;
}
export declare function initGameState(): GameState;
export declare function isValidMove(state: GameState, row: number, col: number): boolean;
export declare function makeMove(state: GameState, row: number, col: number): GameState;
export declare function checkWin(board: number[][], row: number, col: number): number | null;
