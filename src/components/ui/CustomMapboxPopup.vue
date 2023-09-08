<script setup lang="ts">
import Holidays from 'date-holidays'
import dayjs from 'dayjs'
import type { Holiday } from '~/types/holiday'

const store = useAreaStore()
let hd = null

const isHolidayInNow = ref<false | Holiday[]>(false)
const holidayInMonth = ref<false | Holiday[]>(false)
// 3. 最近的下個假日的信息（名字、時間）
const nextHoliday = ref<null | Holiday >(null)

onMounted(() => {
  main()
})
watch(() => store.currentArea?.code, (v) => {
  main()
})

// 主逻辑
function main() {
  if (store.currentArea?.code) {
    hd = new Holidays(store.currentArea?.code)
    const holidaysInYear = hd.getHolidays(2023)

    // 1. 今天這個地方是否是假日
    isHolidayInNow.value = hd.isHoliday(new Date('2023-01-01'))
    // 2. 這個月是否有假日，如果有，那麽信息（名字、時間）
    holidayInMonth.value = getHolidaysInMonth(holidaysInYear)
    // 3. 最近的下個假日的信息（名字、時間）
    nextHoliday.value = getHolidayNextToDay(holidaysInYear)
  }
}

function getHolidaysInMonth(holidaysInYear: Holiday[]): Holiday[] | [] {
  const currentMonth = dayjs(new Date()).month()

  // 过滤日期在当前月份的对象
  const filteredArray = holidaysInYear.filter((item) => {
    return dayjs(new Date(item.date)).month() === currentMonth
  })

  // 如果筛选结果为空，返回空数组，否则返回筛选后的结果
  return filteredArray.length > 0 ? filteredArray : []
}

function getHolidayNextToDay(holidaysInYear: Holiday[]): Holiday | null {
  const currentDate = new Date().getTime()

  // 过滤日期在今天之后的对象
  const filteredArray = holidaysInYear.filter((item) => {
    const itemDate = new Date(item.date).getTime()
    return itemDate > currentDate
  })

  // 如果找到了最近的日期，返回该对象，否则返回null
  return filteredArray.length > 0 ? filteredArray[0] : null
}
</script>

<template>
  <ScratchyBorder>
    <div class="popup">
      <p>今天是假日吗？{{ isHolidayInNow ? isHolidayInNow[0].name : '不是' }}</p>
    </div>
  </ScratchyBorder>
</template>

<style scoped>
.popup{
  width: 100%;
  height: 100%;
  padding: 5px;
  background: #99CCF0;
  backdrop-filter: blur(10px);
}
</style>
