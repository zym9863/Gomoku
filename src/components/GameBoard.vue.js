import { ref, computed } from 'vue';
import Cell from './Cell.vue';
import { BOARD_SIZE, PLAYER, COMPUTER, initGameState, makeMove, isValidMove } from '../utils/gameLogic';
import { getComputerMove } from '../utils/computerAI';
// Import icons
import RestartIcon from '../assets/icons/restart.svg';
import PlayerIcon from '../assets/icons/player.svg';
import ComputerIcon from '../assets/icons/computer.svg';
import TrophyIcon from '../assets/icons/trophy.svg';
import InfoIcon from '../assets/icons/info.svg';
// Game state
const gameState = ref(initGameState());
// Status message and icon
const statusMessage = computed(() => {
    if (gameState.value.gameOver) {
        if (gameState.value.winner === PLAYER) {
            return '恭喜你赢了！';
        }
        else if (gameState.value.winner === COMPUTER) {
            return '电脑赢了！';
        }
        else {
            return '平局！';
        }
    }
    else {
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
    }
    else {
        return gameState.value.currentPlayer === PLAYER ? PlayerIcon : ComputerIcon;
    }
});
// Handle cell click
const handleCellClick = (row, col) => {
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
const isLastMove = (row, col) => {
    if (!gameState.value.lastMove)
        return false;
    const [lastRow, lastCol] = gameState.value.lastMove;
    return row === lastRow && col === lastCol;
};
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['board']} */ ;
/** @type {__VLS_StyleScopedClasses['reset-button']} */ ;
/** @type {__VLS_StyleScopedClasses['reset-button']} */ ;
/** @type {__VLS_StyleScopedClasses['instructions']} */ ;
/** @type {__VLS_StyleScopedClasses['instructions']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "game-container" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "status-container" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "status" },
});
if (__VLS_ctx.statusIcon) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.img)({
        src: (__VLS_ctx.statusIcon),
        alt: "Status Icon",
        ...{ class: "status-icon" },
    });
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
(__VLS_ctx.statusMessage);
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "board-container" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "board" },
});
for (const [row] of __VLS_getVForSourceType((__VLS_ctx.BOARD_SIZE))) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        key: (`row-${row}`),
        ...{ class: "board-row" },
    });
    for (const [col] of __VLS_getVForSourceType((__VLS_ctx.BOARD_SIZE))) {
        /** @type {[typeof Cell, ]} */ ;
        // @ts-ignore
        const __VLS_0 = __VLS_asFunctionalComponent(Cell, new Cell({
            ...{ 'onClick': {} },
            key: (`cell-${row}-${col}`),
            value: (__VLS_ctx.gameState.board[row - 1][col - 1]),
            row: (row - 1),
            col: (col - 1),
            isLastMove: (__VLS_ctx.isLastMove(row - 1, col - 1)),
        }));
        const __VLS_1 = __VLS_0({
            ...{ 'onClick': {} },
            key: (`cell-${row}-${col}`),
            value: (__VLS_ctx.gameState.board[row - 1][col - 1]),
            row: (row - 1),
            col: (col - 1),
            isLastMove: (__VLS_ctx.isLastMove(row - 1, col - 1)),
        }, ...__VLS_functionalComponentArgsRest(__VLS_0));
        let __VLS_3;
        let __VLS_4;
        let __VLS_5;
        const __VLS_6 = {
            onClick: (__VLS_ctx.handleCellClick)
        };
        var __VLS_2;
    }
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "controls" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
    ...{ onClick: (__VLS_ctx.resetGame) },
    ...{ class: "reset-button" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.img)({
    src: (__VLS_ctx.RestartIcon),
    alt: "Restart",
    ...{ class: "button-icon" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "instructions" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "instructions-header" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.img)({
    src: (__VLS_ctx.InfoIcon),
    alt: "Info",
    ...{ class: "info-icon" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "player-info" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "player-item" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.img)({
    src: (__VLS_ctx.PlayerIcon),
    alt: "Player",
    ...{ class: "piece-icon" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "player-item" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.img)({
    src: (__VLS_ctx.ComputerIcon),
    alt: "Computer",
    ...{ class: "piece-icon" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
/** @type {__VLS_StyleScopedClasses['game-container']} */ ;
/** @type {__VLS_StyleScopedClasses['status-container']} */ ;
/** @type {__VLS_StyleScopedClasses['status']} */ ;
/** @type {__VLS_StyleScopedClasses['status-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['board-container']} */ ;
/** @type {__VLS_StyleScopedClasses['board']} */ ;
/** @type {__VLS_StyleScopedClasses['board-row']} */ ;
/** @type {__VLS_StyleScopedClasses['controls']} */ ;
/** @type {__VLS_StyleScopedClasses['reset-button']} */ ;
/** @type {__VLS_StyleScopedClasses['button-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['instructions']} */ ;
/** @type {__VLS_StyleScopedClasses['instructions-header']} */ ;
/** @type {__VLS_StyleScopedClasses['info-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['player-info']} */ ;
/** @type {__VLS_StyleScopedClasses['player-item']} */ ;
/** @type {__VLS_StyleScopedClasses['piece-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['player-item']} */ ;
/** @type {__VLS_StyleScopedClasses['piece-icon']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            Cell: Cell,
            BOARD_SIZE: BOARD_SIZE,
            RestartIcon: RestartIcon,
            PlayerIcon: PlayerIcon,
            ComputerIcon: ComputerIcon,
            InfoIcon: InfoIcon,
            gameState: gameState,
            statusMessage: statusMessage,
            statusIcon: statusIcon,
            handleCellClick: handleCellClick,
            resetGame: resetGame,
            isLastMove: isLastMove,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
