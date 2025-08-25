import { computed } from 'vue';
import { EMPTY, PLAYER, COMPUTER } from '../utils/gameLogic';
const props = defineProps();
const emit = defineEmits();
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
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['cell']} */ ;
/** @type {__VLS_StyleScopedClasses['cell']} */ ;
/** @type {__VLS_StyleScopedClasses['cell-empty']} */ ;
/** @type {__VLS_StyleScopedClasses['cell']} */ ;
/** @type {__VLS_StyleScopedClasses['cell-empty']} */ ;
/** @type {__VLS_StyleScopedClasses['cell']} */ ;
/** @type {__VLS_StyleScopedClasses['cell']} */ ;
/** @type {__VLS_StyleScopedClasses['cell']} */ ;
/** @type {__VLS_StyleScopedClasses['cell']} */ ;
/** @type {__VLS_StyleScopedClasses['cell']} */ ;
/** @type {__VLS_StyleScopedClasses['cell']} */ ;
/** @type {__VLS_StyleScopedClasses['cell']} */ ;
/** @type {__VLS_StyleScopedClasses['cell']} */ ;
/** @type {__VLS_StyleScopedClasses['cell']} */ ;
/** @type {__VLS_StyleScopedClasses['piece']} */ ;
/** @type {__VLS_StyleScopedClasses['piece']} */ ;
/** @type {__VLS_StyleScopedClasses['piece']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ onClick: (__VLS_ctx.handleClick) },
    ...{ class: "cell" },
    ...{ class: (__VLS_ctx.cellClass) },
    'data-row': (__VLS_ctx.row),
    'data-col': (__VLS_ctx.col),
});
if (__VLS_ctx.value !== __VLS_ctx.EMPTY) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "piece" },
    });
}
/** @type {__VLS_StyleScopedClasses['cell']} */ ;
/** @type {__VLS_StyleScopedClasses['piece']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            EMPTY: EMPTY,
            handleClick: handleClick,
            cellClass: cellClass,
        };
    },
    __typeEmits: {},
    __typeProps: {},
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
    __typeEmits: {},
    __typeProps: {},
});
; /* PartiallyEnd: #4569/main.vue */
