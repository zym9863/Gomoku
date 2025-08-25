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
  gap: 30px;
  padding: 25px;
  max-width: 100%;
}

.status-container {
  width: 100%;
  display: flex;
  justify-content: center;
}

.status {
  font-size: 1.6rem;
  font-weight: 700;
  height: 50px;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 15px 30px;
  background: var(--card-bg);
  backdrop-filter: blur(10px);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-medium);
  color: var(--primary-color);
  border: 1px solid var(--card-border);
  position: relative;
  overflow: hidden;
}

.status::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(45deg, transparent 49%, rgba(255, 255, 255, 0.1) 50%, transparent 51%);
  background-size: 20px 20px;
  animation: statusShine 2s linear infinite;
}

@keyframes statusShine {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}

.status-icon {
  width: 28px;
  height: 28px;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
}

.board-container {
  position: relative;
  padding: 20px;
  border-radius: var(--border-radius-lg);
  background: linear-gradient(135deg, var(--board-gradient-start) 0%, var(--board-color) 50%, var(--board-gradient-end) 100%);
  box-shadow: var(--shadow-heavy), inset 0 1px 0 rgba(255, 255, 255, 0.2);
  border: 3px solid var(--board-line);
}

.board-container::before {
  content: '';
  position: absolute;
  top: -3px;
  left: -3px;
  right: -3px;
  bottom: -3px;
  background: linear-gradient(45deg, var(--board-shadow), transparent, var(--board-shadow));
  border-radius: var(--border-radius-lg);
  z-index: -1;
}

.board {
  display: flex;
  flex-direction: column;
  border: 3px solid var(--board-line);
  background: linear-gradient(135deg, var(--board-color) 0%, var(--board-gradient-end) 100%);
  background-image: 
    radial-gradient(circle at 20% 20%, rgba(255, 255, 255, 0.1) 1px, transparent 1px),
    radial-gradient(circle at 80% 80%, rgba(139, 69, 19, 0.1) 1px, transparent 1px);
  background-size: 15px 15px, 25px 25px;
  position: relative;
  z-index: 1;
  border-radius: 8px;
  overflow: hidden;
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
  padding: 12px 24px;
  font-size: 1.1rem;
  font-weight: 600;
  background: linear-gradient(135deg, var(--accent-color) 0%, var(--accent-dark) 100%);
  color: white;
  border: none;
  border-radius: var(--border-radius);
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  align-items: center;
  gap: 10px;
  box-shadow: var(--shadow-medium);
  position: relative;
  overflow: hidden;
}

.reset-button::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  transition: left 0.5s;
}

.reset-button:hover::before {
  left: 100%;
}

.reset-button:hover {
  background: linear-gradient(135deg, var(--accent-light) 0%, var(--accent-color) 100%);
  transform: translateY(-3px);
  box-shadow: var(--shadow-heavy);
}

.reset-button:active {
  transform: translateY(-1px);
  box-shadow: var(--shadow-light);
}

.button-icon {
  width: 22px;
  height: 22px;
  filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.2));
}

.instructions {
  margin-top: 15px;
  text-align: center;
  max-width: 550px;
  background: var(--card-bg);
  backdrop-filter: blur(10px);
  padding: 20px;
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-medium);
  border: 1px solid var(--card-border);
  position: relative;
  overflow: hidden;
}

.instructions::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, var(--primary-color), var(--secondary-color), var(--accent-color));
  background-size: 200% 100%;
  animation: gradientSlide 3s linear infinite;
}

@keyframes gradientSlide {
  0% { background-position: 0% 0%; }
  100% { background-position: 200% 0%; }
}

.instructions-header {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-bottom: 15px;
}

.info-icon {
  width: 22px;
  height: 22px;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
}

.instructions h3 {
  margin: 0;
  color: var(--primary-color);
  font-weight: 600;
}

.player-info {
  display: flex;
  justify-content: center;
  gap: 30px;
  margin: 15px 0;
  flex-wrap: wrap;
}

.player-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 12px;
  background: rgba(255, 255, 255, 0.3);
  border-radius: var(--border-radius);
  transition: transform 0.2s ease;
}

.player-item:hover {
  transform: translateY(-2px);
}

.piece-icon {
  width: 22px;
  height: 22px;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
}

.instructions p {
  margin: 12px 0 0;
  color: var(--text-light);
  font-weight: 500;
}
</style>
