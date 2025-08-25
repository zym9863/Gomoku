<script setup lang="ts">
import { ref, computed } from 'vue';
import Cell from './Cell.vue';
import {
  BOARD_SIZE,
  PLAYER,
  COMPUTER,
  GameState,
  initGameState,
  makeMove,
  isValidMove
} from '../utils/gameLogic';
import { getComputerMove } from '../utils/computerAI';

// Import icons
import RestartIcon from '../assets/icons/restart.svg';
import PlayerIcon from '../assets/icons/player.svg';
import ComputerIcon from '../assets/icons/computer.svg';
import TrophyIcon from '../assets/icons/trophy.svg';
import InfoIcon from '../assets/icons/info.svg';

// Game state
const gameState = ref<GameState>(initGameState());

// Status message and icon
const statusMessage = computed(() => {
  if (gameState.value.gameOver) {
    if (gameState.value.winner === PLAYER) {
      return '恭喜你赢了！';
    } else if (gameState.value.winner === COMPUTER) {
      return '电脑赢了！';
    } else {
      return '平局！';
    }
  } else {
    return gameState.value.currentPlayer === PLAYER ? '轮到你下棋' : '电脑思考中...';
  }
});

// Status icon
const statusIcon = computed(() => {
  if (gameState.value.gameOver) {
    if (gameState.value.winner !== null) {
      return TrophyIcon;
    }
    return '';
  } else {
    return gameState.value.currentPlayer === PLAYER ? PlayerIcon : ComputerIcon;
  }
});

// Handle cell click
const handleCellClick = (row: number, col: number) => {
  // Only allow player to make moves on their turn and if the game is not over
  if (gameState.value.currentPlayer !== PLAYER || gameState.value.gameOver) {
    return;
  }

  // Check if the move is valid
  if (!isValidMove(gameState.value, row, col)) {
    return;
  }

  // Make the player's move
  gameState.value = makeMove(gameState.value, row, col);

  // If the game is not over and it's the computer's turn, make the computer's move
  if (!gameState.value.gameOver && gameState.value.currentPlayer === COMPUTER) {
    setTimeout(makeComputerMove, 500);
  }
};

// Make the computer's move
const makeComputerMove = () => {
  const [row, col] = getComputerMove(gameState.value);
  gameState.value = makeMove(gameState.value, row, col);
};

// Reset the game
const resetGame = () => {
  gameState.value = initGameState();
};

// Check if a cell is the last move
const isLastMove = (row: number, col: number) => {
  if (!gameState.value.lastMove) return false;
  const [lastRow, lastCol] = gameState.value.lastMove;
  return row === lastRow && col === lastCol;
};
</script>

<template>
  <div class="game-container">
    <div class="status-container">
      <div class="status">
        <img v-if="statusIcon" :src="statusIcon" alt="Status Icon" class="status-icon" />
        <span>{{ statusMessage }}</span>
      </div>
    </div>

    <div class="board-container">
      <div class="board">
        <div v-for="row in BOARD_SIZE" :key="`row-${row}`" class="board-row">
          <Cell
            v-for="col in BOARD_SIZE"
            :key="`cell-${row}-${col}`"
            :value="gameState.board[row-1][col-1]"
            :row="row-1"
            :col="col-1"
            :is-last-move="isLastMove(row-1, col-1)"
            @click="handleCellClick"
          />
        </div>
      </div>
    </div>

    <div class="controls">
      <button @click="resetGame" class="reset-button">
        <img :src="RestartIcon" alt="Restart" class="button-icon" />
        <span>重新开始</span>
      </button>
    </div>

    <div class="instructions">
      <div class="instructions-header">
        <img :src="InfoIcon" alt="Info" class="info-icon" />
        <h3>游戏说明：</h3>
      </div>
      <div class="player-info">
        <div class="player-item">
          <img :src="PlayerIcon" alt="Player" class="piece-icon" />
          <span>你的棋子（黑子先行）</span>
        </div>
        <div class="player-item">
          <img :src="ComputerIcon" alt="Computer" class="piece-icon" />
          <span>电脑的棋子</span>
        </div>
      </div>
      <p>先形成五子连线者获胜。</p>
    </div>
  </div>
</template>

<style scoped>
.game-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 25px;
  padding: 20px;
  max-width: 100%;
}

.status-container {
  width: 100%;
  display: flex;
  justify-content: center;
}

.status {
  font-size: 1.5rem;
  font-weight: bold;
  height: 40px;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 20px;
  background-color: var(--background-light);
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  color: var(--primary-color);
}

.status-icon {
  width: 24px;
  height: 24px;
}

.board-container {
  position: relative;
  padding: 10px;
  border-radius: 8px;
  background: linear-gradient(135deg, #d4b67c 0%, #e6c88e 50%, #d4b67c 100%);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
}

.board {
  display: flex;
  flex-direction: column;
  border: 2px solid var(--board-line);
  background-color: var(--board-color);
  background-image: url('../assets/board-texture.svg');
  background-size: cover;
  position: relative;
  z-index: 1;
}

.board::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 8px;
  height: 8px;
  background-color: var(--board-line);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
}

.board-row {
  display: flex;
}

.controls {
  margin-top: 10px;
  display: flex;
  justify-content: center;
}

.reset-button {
  padding: 10px 20px;
  font-size: 1rem;
  background-color: var(--accent-color);
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);
}

.reset-button:hover {
  background-color: var(--accent-dark);
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

.reset-button:active {
  transform: translateY(0);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.button-icon {
  width: 20px;
  height: 20px;
}

.instructions {
  margin-top: 10px;
  text-align: center;
  max-width: 500px;
  background-color: var(--background-light);
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.instructions-header {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-bottom: 12px;
}

.info-icon {
  width: 20px;
  height: 20px;
}

.instructions h3 {
  margin: 0;
  color: var(--primary-color);
}

.player-info {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin: 12px 0;
}

.player-item {
  display: flex;
  align-items: center;
  gap: 8px;
}

.piece-icon {
  width: 20px;
  height: 20px;
}

.instructions p {
  margin: 8px 0 0;
  color: var(--text-light);
}
</style>
