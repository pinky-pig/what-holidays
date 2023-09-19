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

// 伪造 currentDate 遍历十二个月，渲染全年日历
const months = Array(12)

// 当前选中的节日
const currentHoliday = inject('currentHoliday') as Ref<Holiday>

const $calendars = ref<HTMLElement[]>([])

watch(currentHoliday, (v) => {
  // 获取节日所在的月份。这个月份是从 0 开始的，刚好 index 也是从 0 开始
  const month = new Date(v.date).getMonth()
  // 滚到视野范围内
  $calendars.value[month].scrollIntoView({ behavior: 'smooth', block: 'center' })
})
</script>

<template>
  <div
    class="year-container h-auto w-full gap-10px rounded-md bg-[#eee] p-10px"
  >
    <div
      v-for="(_item, index) in months"
      :key="index"
      ref="$calendars"
    >
      <Calendar
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
