<script setup lang="ts">
import dayjs from 'dayjs'
import type { Holiday } from '~/types'

withDefaults(
  defineProps<{
    currentYear?: number
    holidays?: Holiday[]
  }>(),
  {
    currentYear: () => dayjs(new Date()).year(),
  },
)

const months = Array(12)
</script>

<template>
  <div
    class="year-container h-auto w-full gap-10px rounded-md bg-[#eee] p-10px"
  >
    <Calendar
      v-for="(_item, index) in months"
      :key="index"
      :header-option="{
        showYear: false,
        showMonth: true,
        switchMonth: false,
      }"
      :current-date="new Date(`${currentYear}-${index + 1}-01`)"
      :holidays="holidays"
      class="w-300px! transition-all! duration-300! ease-in-out!"
    />
  </div>
</template>

<style scoped>
.year-container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  gap: 24px; /* 项目之间的间距 */
}
</style>
