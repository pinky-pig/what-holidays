<script setup lang="ts">
import type { DateCell } from '~/utils/calendar'

const props = withDefaults(
  defineProps<{
    tableData: DateCell[]
  }>(),
  { },
)

const emit = defineEmits(['dayPointerover', 'dayPointerleave'])
const bodyTableData = computed(() => props.tableData?.flat())

function dayPointerover(item: typeof bodyTableData.value[0]) {
  emit('dayPointerover', item)
}
function dayPointerleave(item: typeof bodyTableData.value[0]) {
  emit('dayPointerleave', item)
}
</script>

<template>
  <div
    class="grid grid-cols-7 h-full w-full gap-1px overflow-hidden border border-[rgb(229,231,235)] rounded-lg bg-[rgb(229,231,235)]"
  >
    <button
      v-for="item, index in bodyTableData"
      :id="`${item.formatDate}-${item.type}-day`"
      :key="index"
      class="calendar-button relative flex items-center justify-center text-sm leading-8 hover:bg-[rgb(243,244,246)]"
      :class="
        item.type === 'normal'
          ? 'bg-white text-[rgb(17,24,39)]'
          : 'bg-[rgb(249,250,251)] text-[rgb(156,163,175)]'
      "
      @pointerover="e => dayPointerover(item)"
      @pointerleave="e => dayPointerleave(item)"
    >
      <div
        v-show="item.isSelected"
        class="pointer-events-none absolute left-1/2 top-1/2 h-5 w-5 rounded-full bg-[#bbbeee] -translate-1/2"
      />
      <!-- <span v-if="dayjs(todayDate).format('YYYY-MM-DD') === item.formatDate">
        今天
      </span> -->
      <div class="pointer-events-none z-10">
        {{ item.text }}
      </div>
    </button>
  </div>
</template>

<style scoped>
</style>
