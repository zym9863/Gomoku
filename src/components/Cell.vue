<script setup lang="ts">
import { computed } from 'vue';
import { EMPTY, PLAYER, COMPUTER } from '../utils/gameLogic';

const props = defineProps<{
  value: number;
  row: number;
  col: number;
  isLastMove: boolean;
}>();

const emit = defineEmits<{
  (e: 'click', row: number, col: number): void;
}>();

const handleClick = () => {
  emit('click', props.row, props.col);
};

const cellClass = computed(() => {
  return {
    'cell-empty': props.value === EMPTY,
    'cell-player': props.value === PLAYER,
    'cell-computer': props.value === COMPUTER,
    'last-move': props.isLastMove
  };
});
</script>

<template>
  <div class="cell" :class="cellClass" @click="handleClick" :data-row="row" :data-col="col">
    <div v-if="value !== EMPTY" class="piece"></div>
  </div>
</template>

<style scoped>
.cell {
  width: 30px;
  height: 30px;
  position: relative;
  cursor: pointer;
  background-color: transparent;
  box-sizing: border-box;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.cell:hover.cell-empty::before,
.cell:hover.cell-empty::after {
  background-color: var(--board-line);
  opacity: 1;
  box-shadow: 0 0 5px rgba(139, 69, 19, 0.3);
}

.cell:hover.cell-empty {
  background-color: rgba(255, 255, 255, 0.2);
  transform: scale(1.05);
}

/* Create grid lines */
.cell::before, .cell::after {
  content: '';
  position: absolute;
  background-color: var(--board-line);
  opacity: 0.7;
  transition: opacity 0.2s ease;
}

.cell::before {
  width: 1px;
  height: 100%;
  left: 50%;
  transform: translateX(-50%);
}

.cell::after {
  width: 100%;
  height: 1px;
  top: 50%;
  transform: translateY(-50%);
}

/* Star points (special positions) */
.cell[data-row="3"][data-col="3"]::before,
.cell[data-row="3"][data-col="11"]::before,
.cell[data-row="11"][data-col="3"]::before,
.cell[data-row="11"][data-col="11"]::before,
.cell[data-row="7"][data-col="7"]::before {
  content: '';
  position: absolute;
  width: 6px;
  height: 6px;
  background-color: var(--board-line);
  border-radius: 50%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
}

.piece {
  position: absolute;
  width: 26px;
  height: 26px;
  border-radius: 50%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.cell-player .piece {
  background: radial-gradient(circle at 30% 30%, #444 0%, #000 70%);
  box-shadow: 
    0 4px 8px rgba(0, 0, 0, 0.6), 
    inset 0 -2px 6px rgba(255, 255, 255, 0.3), 
    inset 0 2px 6px rgba(0, 0, 0, 0.9);
  border: 1px solid #000;
}

.cell-computer .piece {
  background: radial-gradient(circle at 30% 30%, #fff 0%, #e0e0e0 70%);
  box-shadow: 
    0 4px 8px rgba(0, 0, 0, 0.4), 
    inset 0 -2px 6px rgba(0, 0, 0, 0.15), 
    inset 0 2px 6px rgba(255, 255, 255, 0.9);
  border: 1px solid #ccc;
}

.last-move .piece {
  box-shadow: 
    0 0 0 3px var(--highlight-color), 
    0 4px 8px rgba(0, 0, 0, 0.6),
    0 0 20px rgba(239, 68, 68, 0.4);
  animation: pulseGlow 1.5s ease-in-out infinite;
}

@keyframes pulseGlow {
  0%, 100% {
    box-shadow: 
      0 0 0 3px var(--highlight-color), 
      0 4px 8px rgba(0, 0, 0, 0.6),
      0 0 20px rgba(239, 68, 68, 0.4);
  }
  50% {
    box-shadow: 
      0 0 0 5px var(--highlight-color), 
      0 4px 8px rgba(0, 0, 0, 0.6),
      0 0 30px rgba(239, 68, 68, 0.6);
  }
}
</style>
