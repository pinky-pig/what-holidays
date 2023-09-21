<script setup lang="ts">
import type { ManipulateType } from 'dayjs'
import dayjs from 'dayjs'
import WeekName from './WeekName.vue'
import Header from './CHeader.vue'
import Body from './CBody.vue'
import type { DateCell } from '~/utils/calendar'
import { generateMonthCalendar } from '~/utils/calendar'
import type { Holiday } from '~/types'

const props = withDefaults(
  defineProps<{
    headerOption?: {
      showYear: boolean
      showMonth: boolean
      switchMonth: boolean
    }
    currentDate?: Date
    holidays?: Holiday[]
  }>(),
  {
    headerOption: () => ({
      showYear: true,
      showMonth: true,
      switchMonth: true,
    }),
    currentDate: () => new Date(),
    holidays: () => [], // 这个月被选中的
  },
)

const emit = defineEmits(['dayPointerover', 'dayPointerleave', 'getTableData'])

const initialDate = ref(dayjs(props.currentDate))

const tableData = ref(generateMonthCalendar(initialDate.value, props.holidays))

// 当前日期改变的时候， 重新获取 table 数据
watch(() => props.currentDate, (v) => {
  tableData.value = generateMonthCalendar(dayjs(v), props.holidays)
})

watch(() => initialDate.value, (v) => {
  tableData.value = generateMonthCalendar(v, props.holidays)
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

function dayPointerover(item: DateCell & { formatDate: string }) {
  emit('dayPointerover', item)
}
function dayPointerleave(item: DateCell & { formatDate: string }) {
  emit('dayPointerleave', item)
}
watch(tableData, (v) => {
  emit('getTableData', {
    name: unref(title.value),
    tableData: unref(tableData.value),
  })
})
</script>

<template>
  <div class="h-full w-full rounded-lg bg-white">
    <div class="h-full w-full flex flex-col items-center justify-center p-4">
      <Header :title="title" :switch-month="headerOption.switchMonth" @changeMonth="changeMonth" />
      <WeekName />

      <Body
        class="flex-1"
        :table-data="tableData?.flat()"
        :current-date="currentDate"
        @dayPointerover="dayPointerover"
        @dayPointerleave="dayPointerleave"
      />
    </div>
  </div>
</template>

<style scoped>
</style>
