<script setup lang="ts">
import Holidays from 'date-holidays'
import dayjs from 'dayjs'
import RouterWrapper from '../../components/ui/RouterWrapper.vue'
import YearCalendar from './components/Year.vue'
import HolidayList from './components/List.vue'
import type { Holiday } from '~/types/holiday'

const route = useRoute()
// const store = useAreaStore()

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

const isShowList = ref(false)
</script>

<template>
  <RouterWrapper>
    <!-- <template #title>
      {{ store.currentArea?.name || "Area" }}
    </template> -->

    <!-- 左右两侧，左侧文字，右侧全年日历。响应式先显示文字再显示日历 -->
    <div class="h-auto w-full flex flex-col gap-10px rounded-3xl bg-[var(--card--placeholder-bg)]">
      <div class="grid h-auto w-full place-items-center rounded-3xl text-black">
        <HolidayList v-show="isShowList" :holidays="holidays" />

        <YearCalendar v-show="!isShowList" :current-year="currentYear" :holidays="holidays" />
      </div>
    </div>
  </RouterWrapper>
</template>
