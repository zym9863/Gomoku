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
  transition: background-color 0.2s ease;
}

.cell:hover.cell-empty::before,
.cell:hover.cell-empty::after {
  background-color: var(--board-line);
  opacity: 0.8;
}

.cell:hover.cell-empty {
  background-color: rgba(255, 255, 255, 0.1);
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
  transition: all 0.2s ease;
}

.cell-player .piece {
  background: radial-gradient(circle at 35% 35%, #333 0%, #000 60%);
  box-shadow: 0 3px 5px rgba(0, 0, 0, 0.5), inset 0 -2px 5px rgba(255, 255, 255, 0.2), inset 0 2px 5px rgba(0, 0, 0, 0.8);
  border: 1px solid #000;
}

.cell-computer .piece {
  background: radial-gradient(circle at 35% 35%, #fff 0%, #eee 60%);
  box-shadow: 0 3px 5px rgba(0, 0, 0, 0.3), inset 0 -2px 5px rgba(0, 0, 0, 0.1), inset 0 2px 5px rgba(255, 255, 255, 0.8);
  border: 1px solid #ccc;
}

.last-move .piece {
  box-shadow: 0 0 0 3px var(--highlight-color), 0 3px 5px rgba(0, 0, 0, 0.5);
  animation: pulse 1.5s infinite;
}

@keyframes pulse {
  0% {
    box-shadow: 0 0 0 3px var(--highlight-color), 0 3px 5px rgba(0, 0, 0, 0.5);
  }
  50% {
    box-shadow: 0 0 0 5px var(--highlight-color), 0 3px 5px rgba(0, 0, 0, 0.5);
  }
  100% {
    box-shadow: 0 0 0 3px var(--highlight-color), 0 3px 5px rgba(0, 0, 0, 0.5);
  }
}
</style>
