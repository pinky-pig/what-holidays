<script setup lang="ts">
import Holidays from 'date-holidays'
import dayjs from 'dayjs'
import { Pane, Splitpanes } from 'splitpanes'
import RouterWrapper from '../../components/ui/RouterWrapper.vue'

import YearCalendar from './components/Year.vue'
import HolidayList from './components/List.vue'
import Now from './components/Now.vue'

import type { Holiday } from '~/types/holiday'

const isHorizontal = ref(false)

const route = useRoute()
const store = useAreaStore()

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

const isShowList = ref(false)
</script>

<template>
  <RouterWrapper>
    <template #title>
      {{ store.currentArea?.name || currentAreaCode }}
    </template>
    <Splitpanes class="default-theme" :horizontal="isHorizontal">
      <Pane min-size="20">
        <Splitpanes class="default-theme editors-height" horizontal>
          <Pane>
            <Container title="Now">
              <Now />
            </Container>
          </Pane>
          <Pane>
            <Container title="节日">
              <HolidayList :holidays="holidays" />
            </Container>
          </Pane>
        </Splitpanes>
      </Pane>
      <Pane size="80" min-size="40">
        <Container title="日历">
          <YearCalendar v-show="!isShowList" :current-year="currentYear" :holidays="holidays" />
        </Container>
      </Pane>
    </Splitpanes>
  </RouterWrapper>
</template>
