<script setup lang="ts">
import Holidays from 'date-holidays'
import dayjs from 'dayjs'
import { Pane, Splitpanes } from 'splitpanes'
import RouterWrapper from '../../components/ui/RouterWrapper.vue'

import YearCalendar from './components/Year.vue'
import HolidayList from './components/List.vue'
import Now from './components/Now.vue'

import type { Holiday } from '~/types/holiday'

const route = useRoute()
const store = useAreaStore()

const isHorizontal = ref(false)
const { width } = useWindowSize()

watch(width, (v) => {
  isHorizontal.value = v <= 500
})
// 当前选中的节日
const currentHoliday = ref<Holiday | null>(null)
provide('currentHoliday', currentHoliday)

const currentAreaCode = ref(route.query.code as string)
const currentYear = ref(dayjs(new Date()).year())
const hd = new Holidays(currentAreaCode.value)

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
</script>

<template>
  <RouterWrapper>
    <template #title>
      <div class="flex flex-row items-center justify-start gap-10px font-bold">
        <img
          :src="store.currentArea?.flag"
          class="block h-6 w-6"
        >
        {{ store.currentArea?.name || currentAreaCode }}
      </div>
    </template>
    <Splitpanes class="default-theme" :horizontal="isHorizontal">
      <Pane min-size="20">
        <Splitpanes class="default-theme editors-height" horizontal>
          <Pane size="30">
            <Container title="Now">
              <Now />
            </Container>
          </Pane>
          <Pane size="70">
            <Container title="Holiday">
              <HolidayList :holidays="holidays" />
            </Container>
          </Pane>
        </Splitpanes>
      </Pane>
      <Pane size="80" min-size="40">
        <Container title="Calendar">
          <YearCalendar :current-year="currentYear" :holidays="holidays" />
        </Container>
      </Pane>
    </Splitpanes>
  </RouterWrapper>
</template>
