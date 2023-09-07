<script setup lang="ts">
import type { ManipulateType } from 'dayjs'
import dayjs from 'dayjs'
import WeekName from './WeekName.vue'
import Header from './CHeader.vue'
import Body from './CBody.vue'
import { generateMonthCalendar } from '~/utils/calendar'

const props = withDefaults(
  defineProps<{
    headerOption?: {
      showYear: boolean
      showMonth: boolean
      switchMonth: boolean
    }
    currentDate?: Date
    selectDate?: Date[]
  }>(),
  {
    headerOption: () => ({
      showYear: true,
      showMonth: true,
      switchMonth: true,
    }),
    currentDate: () => new Date(),
    selectDate: () => [new Date(), new Date()],
  },
)

const initialDate = ref(dayjs(props.currentDate))

const tableData = ref(generateMonthCalendar(initialDate.value))

// 当前日期改变的时候， 重新获取 table 数据
watch(() => props.currentDate, (v) => {
  tableData.value = generateMonthCalendar(dayjs(v))
})

watch(() => initialDate.value, (v) => {
  tableData.value = generateMonthCalendar(v)
})

const title = computed(() => {
  let result = ''

  if (props.headerOption.showYear)
    result += initialDate.value.get('year')

  if (props.headerOption.showMonth)
    result = `${result} ${initialDate.value.format('MMMM')}`

  return result
})

function changeMonth(type: ManipulateType, num: number) {
  if (props.headerOption.switchMonth)
    initialDate.value = dayjs(initialDate.value.toDate()).add(num, type)
}
</script>

<template>
  <div class="h-full w-full rounded-lg bg-white">
    <div class="h-full w-full flex flex-col items-center justify-center p-4">
      <Header :title="title" :switch-month="headerOption.switchMonth" @changeMonth="changeMonth" />
      <WeekName />

      <Body class="flex-1" :table-data="tableData?.flat()" />
    </div>
  </div>
</template>

<style scoped>
</style>
