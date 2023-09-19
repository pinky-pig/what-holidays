<script setup lang="ts">
import Holidays from 'date-holidays'
import dayjs from 'dayjs'
import type { Holiday } from '~/types/holiday'

const store = useAreaStore()
let hd = null

const isHolidayInNow = ref<false | Holiday[]>(false)
const holidayInMonth = ref<false | Holiday[]>(false)
// 3. 最近的下個假日的信息（名字、時間）
const nextHoliday = ref<null | Holiday>(null)

onMounted(() => {
  main()
})
watch(() => store.currentArea?.code, (v) => {
  if (v)
    main()
})

// 主逻辑
function main() {
  if (store.currentArea?.code) {
    hd = new Holidays(store.currentArea?.code)
    const holidaysInYear = hd.getHolidays(2023)

    // 1. 今天這個地方是否是假日
    isHolidayInNow.value = hd.isHoliday(new Date())
    // 2. 這個月是否有假日，如果有，那麽信息（名字、時間）
    holidayInMonth.value = getHolidaysInMonth(holidaysInYear)
    // 3. 最近的下個假日的信息（名字、時間）
    nextHoliday.value = getHolidayNextToDay(holidaysInYear)
  }
}

function getHolidaysInMonth(holidaysInYear: Holiday[]): Holiday[] | false {
  const currentMonth = dayjs(new Date()).month()

  // 过滤日期在当前月份的对象
  const filteredArray = holidaysInYear.filter((item) => {
    return dayjs(new Date(item.date)).month() === currentMonth
  })

  // 如果筛选结果为空，返回空数组，否则返回筛选后的结果
  return filteredArray.length > 0 ? filteredArray : false
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
  <div class="relative z-999 h-full w-full bg-[#eee] p-10px">
    <!-- 今天是节假日吗 -->
    <div
      v-if="isHolidayInNow"
      class="mb-2 flex flex-row cursor-pointer items-center gap-2 rounded-lg bg-white p-2 shadow-none hover:bg-[#fefefe] hover:shadow-md"
    >
      <div class="h-24px w-24px flex-shrink-0" i-fluent-emoji:beaming-face-with-smiling-eyes />
      <div class="w-36px flex-shrink-0 leading-5">
        今天：
      </div>
      <div class="flex">
        {{ isHolidayInNow[0].name }}
      </div>
    </div>
    <div
      v-else
      class="mb-2 flex flex-row cursor-pointer items-center gap-2 rounded-lg bg-white p-2 shadow-none hover:bg-[#fefefe] hover:shadow-md"
    >
      <div class="h-24px w-24px" i-fluent-emoji:loudly-crying-face />
      <p class="leading-5">
        今天没有放假
      </p>
    </div>
    <!-- 这个月有节假日吗 -->
    <div
      v-if="holidayInMonth"
      class="mb-2 flex flex-row cursor-pointer items-center gap-2 rounded-lg bg-white p-2 shadow-none hover:bg-[#fefefe] hover:shadow-md"
    >
      <div class="h-24px w-24px flex-shrink-0" i-fluent-emoji:smiling-face-with-hearts />
      <div class="w-36px flex-shrink-0 leading-5">
        本月
      </div>
      <div class="flex flex-row flex-wrap">
        <p v-for="item in holidayInMonth" :key="item.name">
          {{ item.name }}&nbsp;
        </p>
      </div>
    </div>
    <div
      v-else
      class="mb-2 flex flex-row cursor-pointer items-center gap-2 rounded-lg bg-white p-2 shadow-none hover:bg-[#fefefe] hover:shadow-md"
    >
      <div class="h-24px w-24px" i-fluent-emoji:face-with-spiral-eyes />
      <div> 这个月没有节假日了 </div>
    </div>

    <!-- 最近的下个节日 -->
    <div
      v-if="nextHoliday"
      class="mb-2 flex flex-row cursor-pointer items-center gap-2 rounded-lg bg-white p-2 shadow-none hover:bg-[#fefefe] hover:shadow-md"
    >
      <div class="h-24px w-24px flex-shrink-0" i-fluent-emoji:smiling-face-with-hearts />

      <div class="w-36px flex-shrink-0 leading-5">
        下个
      </div>
      <div class="flex">
        {{ nextHoliday.name }}
      </div>
    </div>
    <div
      v-else
      class="mb-2 flex flex-row cursor-pointer items-center gap-2 rounded-lg bg-white p-2 shadow-none hover:bg-[#fefefe] hover:shadow-md"
    >
      <div class="h-24px w-24px" i-fluent-emoji:face-holding-back-tears />
      <p class="leading-5">
        今年没有节假日了
      </p>
    </div>
  </div>
</template>
