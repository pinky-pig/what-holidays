<script setup lang="ts">
import Holidays from 'date-holidays'
import dayjs from 'dayjs'
import RouterWrapper from '../../components/ui/RouterWrapper.vue'
import YearCalendar from './components/Year.vue'
import HolidayList from './components/List.vue'
import type { Holiday } from '~/types/holiday'

const route = useRoute()
const store = useAreaStore()

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

const isShowList = ref(true)
</script>

<template>
  <RouterWrapper>
    <template #title>
      {{ store.currentArea?.name || "Area" }}
    </template>

    <div class="h-auto w-full flex flex-col gap-10px rounded-3xl bg-[var(--card--placeholder-bg)]">
      <button
        type="button"
        class="w-100px btn"
        @click="isShowList = !isShowList"
      >
        Button
      </button>
      <div class="grid h-auto w-full place-items-center rounded-3xl text-black">
        <HolidayList v-show="isShowList" :holidays="holidays" />

        <YearCalendar v-show="!isShowList" :current-year="currentYear" :holidays="holidays" />
      </div>
    </div>
  </RouterWrapper>
</template>
