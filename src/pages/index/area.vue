<script setup lang="ts">
import Holidays from 'date-holidays'
import dayjs from 'dayjs'
import { Pane, Splitpanes } from 'splitpanes'
import RouterWrapper from '../../components/ui/RouterWrapper.vue'

import YearCalendar from './components/Year.vue'
import HolidayList from './components/List.vue'
import Now from './components/Now.vue'
import { t } from '~/i18n'

import type { Holiday } from '~/types/holiday'

const route = useRoute()
const store = useAreaStore()

const isHorizontal = ref(false)
const { width } = useWindowSize()

watch(width, (v) => {
  isHorizontal.value = v <= 500
}, {
  immediate: true,
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
          v-if="store.currentArea?.code === 'HK' || store.currentArea?.code === 'TW' "
          src="/flags/4x3/cn.svg"
          class="block h-6 w-6"
          alt=""
        >
        <img
          :src="store.currentArea?.flag"
          class="block h-6 w-6"
        >
        <!-- {{ store.currentArea?.name || currentAreaCode }} -->
        {{ (
          store.currentArea?.code === 'TW'
            ? '中國台灣'
            : store.currentArea?.code === 'HK'
              ? '中國香港'
              : store.currentArea?.name
        ) || currentAreaCode }}
      </div>
    </template>
    <Splitpanes class="default-theme" :horizontal="isHorizontal">
      <Pane min-size="20">
        <Splitpanes class="default-theme editors-height" horizontal>
          <Pane size="30">
            <Container :title="t('areaLayout.now')">
              <Now />
            </Container>
          </Pane>
          <Pane size="70">
            <Container :title="`${t('areaLayout.holiday')} : ${holidays.length}`">
              <HolidayList :holidays="holidays" />
            </Container>
          </Pane>
        </Splitpanes>
      </Pane>
      <Pane size="80" min-size="40">
        <Container :title="t('areaLayout.calendar')">
          <YearCalendar :current-year="currentYear" :holidays="holidays" />
        </Container>
      </Pane>
    </Splitpanes>
  </RouterWrapper>
</template>
