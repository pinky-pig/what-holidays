<script setup lang="ts">
import type { DateCell } from '~/utils/calendar'

const props = withDefaults(
  defineProps<{
    tableData: DateCell[]
  }>(),
  { },
)

// const todayDate = new Date()

const bodyTableData = computed(() => {
  return props.tableData?.flat()?.map((item) => {
    return {
      ...item,
      formatDate: item.date.format('YYYY-MM-DD'),
    }
  })
})
</script>

<template>
  <div
    class="grid grid-cols-7 h-full w-full gap-1px overflow-hidden border border-[rgb(229,231,235)] rounded-lg bg-[rgb(229,231,235)]"
  >
    <button
      v-for="item, index in bodyTableData" :key="index"
      class="relative flex items-center justify-center text-sm leading-8 hover:bg-[rgb(243,244,246)]"
      :class="
        item.type === 'normal'
          ? 'bg-white text-[rgb(17,24,39)]'
          : 'bg-[rgb(249,250,251)] text-[rgb(156,163,175)]'
      "
    >
      <!-- <span v-if="dayjs(todayDate).format('YYYY-MM-DD') === item.formatDate">
        今天
      </span> -->
      <span>
        {{ item.text }}
      </span>

      <div
        v-show="item.isSelected"
        class="absolute left-1/2 top-1/2 h-5 w-5 rounded-full bg-black bg-opacity-20 -translate-1/2"
      />
    </button>
  </div>
</template>

<style scoped>
</style>
