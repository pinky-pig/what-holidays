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

function closeMarkerPopup() {
  store.markerPopup!.attributes.hide()
}
</script>

<template>
  <div>
    <div class="close pointer-events-auto cursor-pointer" @click="closeMarkerPopup">
      <div i-carbon:close-filled />
    </div>
    <ScratchyBorder>
      <div class="popup">
        <!-- 今天是节假日吗 -->
        <div v-if="isHolidayInNow" class="flex flex-shrink-0 flex-row items-start gap-2">
          <div class="h-20px w-16px flex-shrink-0" i-fluent-emoji:beaming-face-with-smiling-eyes />
          <div class="w-36px flex-shrink-0 leading-5">
            今天：
          </div>
          <div class="flex">
            {{ isHolidayInNow[0].name }}
          </div>
        </div>
        <div v-else class="flex flex-row items-center gap-2">
          <div class="h-20px w-16px" i-fluent-emoji:loudly-crying-face />
          <p class="leading-5">
            今天没有放假
          </p>
        </div>
        <!-- 这个月有节假日吗 -->
        <div v-if="holidayInMonth" class="flex flex-row items-start gap-2">
          <div class="h-20px w-16px flex-shrink-0" i-fluent-emoji:smiling-face-with-hearts />
          <div class="w-36px flex-shrink-0 leading-5">
            本月：
          </div>
          <div class="flex flex-row flex-wrap">
            <p v-for="item in holidayInMonth" :key="item.name">
              {{ item.name }}&nbsp;
            </p>
          </div>
        </div>
        <div v-else class="flex flex-row items-center gap-2">
          <div class="h-20px w-16px" i-fluent-emoji:face-with-spiral-eyes />
          <div> 这个月没有节假日了 </div>
        </div>

        <!-- 最近的下个节日 -->
        <div v-if="nextHoliday" class="flex flex-row items-start gap-2">
          <div class="h-20px w-16px flex-shrink-0" i-fluent-emoji:smiling-face-with-hearts />

          <div class="w-36px flex-shrink-0 leading-5">
            下个：
          </div>
          <div class="flex">
            {{ nextHoliday.name }}
          </div>
        </div>
        <div v-else class="flex flex-row items-center gap-2">
          <div class="h-20px w-16px" i-fluent-emoji:face-holding-back-tears />
          <p class="leading-5">
            今年没有节假日了
          </p>
        </div>
      </div>
    </ScratchyBorder>
    <div class="mt-2px w-full flex items-center justify-center text-center">
      <svg class="fill-#944DFE" width="11" height="6" viewBox="0 0 11 6" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M6.22775 5.70476L6.27736 5.64962L8.43923 3.25815L10.2203 1.28822L10.3859 1.10526C10.456 0.999499 10.5 0.880702 10.5 0.75188C10.5 0.336342 10.0839 -1.42759e-08 9.56977 -3.19134e-08L5.49411 -1.71737e-07L1.43023 -3.11156e-07C0.916746 -3.28772e-07 0.5 0.336341 0.5 0.75188C0.5 0.901253 0.555815 1.0396 0.648218 1.15689C0.661242 1.17343 0.676124 1.18847 0.690387 1.20401L2.54837 3.25865L4.70899 5.64962L4.76047 5.70627C4.93039 5.88371 5.19395 6 5.49349 6C5.79364 5.9995 6.05783 5.88321 6.22775 5.70476Z"
        />
      </svg>
    </div>
  </div>
</template>

<style scoped>
.close {
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #944DFE;
  background: white;
  /* background: transparent url("http://species-in-pieces.com/img/textured-ui/threat.png") center center no-repeat; */
  margin-left: auto;
  margin-bottom: 5px;
  position: relative;
}

.close::after {
  content: '';
  position: absolute;
  left: 50%;
  bottom: -50%;
  width: 2px;
  height: 50%;
  background: white;
  transform: translate(-50%, 0%);
}

.popup {
  width: 100%;
  height: 100%;
  padding: 10px 15px;
  color: white;
  background: #944DFE;
  backdrop-filter: blur(10px);
}
</style>
