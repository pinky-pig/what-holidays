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
    class="year-container h-full max-w-1300px w-full gap-10px rounded-md bg-[#eee] p-10px"
  >
    <div v-for="(_item, index) in months" :key="index">
      <Calendar
        :header-option="{
          showYear: false,
          showMonth: true,
          switchMonth: false,
        }"
        :current-date="new Date(`${currentYear}-${index + 1}-01`)"
        :holidays="holidays"
      />
    </div>
  </div>
</template>

<style scoped>
.year-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); /* 1fr表示等分剩余空间 */
  gap: 16px; /* 项目之间的间距 */
}

/* 添加媒体查询以调整列数 */
@media screen and (min-width: 768px) {
  .year-container {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  }
}

@media screen and (min-width: 1024px) {
  .year-container {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  }
}

@media screen and (min-width: 1200px) {
  .year-container {
    grid-template-columns: repeat(4, 1fr); /* 每行最多4个项目 */
  }
}
</style>
