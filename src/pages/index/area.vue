<script setup lang="ts">
import Holidays from 'date-holidays'
import dayjs from 'dayjs'
import RouterWrapper from '../../components/ui/RouterWrapper.vue'
import YearCalendar from './components/Year.vue'
import type { Holiday } from '~/types/holiday'

const route = useRoute()

const currentArea = ref(route.query.code as string)
const currentYear = ref(dayjs(new Date()).year())
const hd = new Holidays(currentArea.value)

const holidays = ref<Holiday[]>([])

onMounted(() => {
  holidays.value = getYearHolidays(currentYear.value)
})

/**
 * 根据年份获取 holidays
 * @param year 年份
 */
function getYearHolidays(year: number) {
  const days = hd.getHolidays(year)
  return days
}

// onMounted(() => {
//   setTimeout(() => {
//     currentYear.value = 2022
//   }, 3000)
// })
</script>

<template>
  <RouterWrapper>
    <template #title>
      China
    </template>

    <div class="h-auto w-full flex items-center justify-center rounded-3xl bg-[var(--card--placeholder-bg)]">
      <div class="grid h-auto w-full place-items-center rounded-3xl text-black">
        <YearCalendar :current-year="currentYear" :holidays="holidays" />

        <div v-for="item in holidays" :key="item.date" class="mb-2 border border-black">
          date: {{ item.date }}
          <br>
          name: {{ item.name }}
        </div>
      </div>
    </div>
  </RouterWrapper>
</template>
