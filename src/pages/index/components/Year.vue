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

// 获取节日所在的月份
const currentHolidayInMonth = computed(() => {
  if (currentHoliday.value?.date)
    return new Date(currentHoliday.value?.date).getMonth() + 1
  else
    return 0
})

// 日历视野范围绑定当前节日
watch(currentHoliday, (v) => {
  // 滚到视野范围内，index 是从 0 开始
  $calendars.value[currentHolidayInMonth.value - 1]?.scrollIntoView({ behavior: 'smooth', block: 'center' })
})
</script>

<template>
  <div
    class="year-container h-full w-full gap-10px overflow-auto rounded-md bg-[#eee] p-10px"
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
        :holidays="holidays"
        :current-date="new Date(`${currentYear}-${index + 1}-01`)"
        :show-popover-date="currentHoliday?.date ? [new Date(currentHoliday?.date)] : undefined"
        class="outline-3px outline-transparent outline-solid w-300px! transition-all! duration-300! ease-in-out!"
        :class="currentHolidayInMonth === (index + 1) ? 'outline-[#bbbeee]!' : 'outline-transparent'"
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
