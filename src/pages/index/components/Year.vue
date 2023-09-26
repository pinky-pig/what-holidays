<script setup lang="ts">
import dayjs from 'dayjs'
import type { Holiday } from '~/types'
import type { AllTableData, DateCell } from '~/utils/calendar'

withDefaults(
  defineProps<{
    currentYear?: number
    holidays?: Holiday[]
  }>(),
  {
    currentYear: () => dayjs(new Date()).year(),
  },
)

// 伪造 currentDate 遍历十二个月，渲染全年日历
const months = Array(12)

// 当前选中的节日
const currentHoliday = inject('currentHoliday') as Ref<Holiday>

const $calendars = ref<HTMLElement[]>([])

// 获取节日所在的月份
const currentHolidayInMonth = computed(() => {
  if (currentHoliday.value?.date)
    return new Date(currentHoliday.value?.date).getMonth() + 1
  else
    return 0
})

// --------------- Popover start----------------- //
const popoverItem = ref<DateCell & { el: HTMLElement; translateY: number; translateX: number } | null>(null)
function dayPointerover(item: DateCell) {
  if (item) {
    const el = document.getElementById(`${item.formatDate}-${item.type}-day`)
    // 判断是否是节日，然后选择是否渲染 popover
    if (item.isSelected && el) {
      // 说明当前 item 是节日，然后判断 dom 的位置，给 popover 定位
      const bound = el.getBoundingClientRect()
      popoverItem.value = {
        ...item,
        el,
        translateY: bound.top - bound.height, // 在其上面
        translateX: bound.left + (bound.width / 2), // 在其中间
      }
    }
  }
}
function dayPointerleave(item: DateCell, e: PointerEvent) {
  popoverItem.value = null
}
// 监听一下滚动，查看 DOM 的位置是否发生更改，然后改变 Popover 的位置 transform
// TODO: 改变位置好像是会触发重绘，帧率一卡一卡的。但是已经设置了transform 和 will-change
function handleScroll(e: Event) {
  popoverItem.value = null
}
// --------------- Popover end----------------- //

// 获取全年的日历数据。
// TODO: Array 改成 Map
const yearAllTableData: AllTableData[] = []
function getTableData(data: AllTableData) {
  yearAllTableData.push(data)
}

// 日历视野范围绑定当前节日
watch(currentHoliday, (v) => {
  if (v) {
    // 1. 滚到视野范围内，index 是从 0 开始
    $calendars.value[currentHolidayInMonth.value - 1]?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    // 2. 选中节日的 Popover 打开
    // if (yearAllTableData.length) {
    //   const formatHolidayDate = dayjs(new Date(v.date)).format('YYYY-MM-DD')
    //   yearAllTableData[currentHolidayInMonth.value - 1].tableData.flat().forEach((item) => {
    //     if (item.formatDate === formatHolidayDate) {
    //       setTimeout(() => {
    //         dayPointerover(item)
    //       }, 1000)
    //     }
    //   })
    // }
  }
})
</script>

<template>
  <div
    class="year-container h-full w-full gap-10px overflow-auto rounded-md bg-[#eee] p-10px"
    @scroll="handleScroll"
  >
    <div
      v-for="(_item, index) in months"
      :key="index"
      ref="$calendars"
    >
      <Calendar
        :header-option="{
          showYear: false,
          showMonth: true,
          switchMonth: false,
        }"
        :holidays="holidays"
        :current-date="new Date(`${currentYear}-${index + 1}-01`)"
        class="outline-3px outline-transparent outline-solid w-300px! transition-all! duration-300! ease-in-out!"
        :class="currentHolidayInMonth === (index + 1) ? 'outline-[#bbbeee]!' : 'outline-transparent'"
        @day-pointerover="dayPointerover"
        @day-pointerleave="dayPointerleave"
        @getTableData="getTableData"
      />
    </div>

    <!-- 目前需求只有一个 Popover ，如果是多个，只需遍历就行。使用的是 fixed 定位，位置信息是 pointermover 传过来的 DOM 获取 -->
    <Teleport to="body">
      <div
        v-if="popoverItem"
        id="calendar-popover"
        :class="popoverItem.type === 'normal' ? 'text-black' : 'border-[#944DFE02]! text-[rgb(156,163,175)]' "
        :style="{
          top: 0,
          left: 0,
          transform: `
            translateX(calc(${popoverItem.translateX}px - 50%))
            translateY(calc(${popoverItem.translateY}px - 0.25rem))`,
        }"
        class="absolute z-11 h-8 min-w-50px flex flex-row flex-nowrap items-center justify-center whitespace-nowrap border border-[#944DFE] rounded-md bg-[#BBBEEE] px-2"
      >
        <div>
          {{ popoverItem.holiday?.name || 66 }}
        </div>
        <svg
          :class=" popoverItem.type === 'normal' ? '' : 'fill-[#944DFE80]!' "
          class="pointer-events-none absolute left-1/2 fill-#944DFE -bottom-12px -translate-1/2"
          width="11"
          height="6"
          viewBox="0 0 11 6"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6.22775 5.70476L6.27736 5.64962L8.43923 3.25815L10.2203 1.28822L10.3859 1.10526C10.456 0.999499 10.5 0.880702 10.5 0.75188C10.5 0.336342 10.0839 -1.42759e-08 9.56977 -3.19134e-08L5.49411 -1.71737e-07L1.43023 -3.11156e-07C0.916746 -3.28772e-07 0.5 0.336341 0.5 0.75188C0.5 0.901253 0.555815 1.0396 0.648218 1.15689C0.661242 1.17343 0.676124 1.18847 0.690387 1.20401L2.54837 3.25865L4.70899 5.64962L4.76047 5.70627C4.93039 5.88371 5.19395 6 5.49349 6C5.79364 5.9995 6.05783 5.88321 6.22775 5.70476Z"
          />
        </svg>
      </div>
    </Teleport>
  </div>
</template>

<style scoped>
.year-container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  gap: 24px; /* 项目之间的间距 */
}
</style>
