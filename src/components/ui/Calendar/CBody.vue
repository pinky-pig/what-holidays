<script setup lang="ts">
import type { DateCell } from '~/utils/calendar'

const props = withDefaults(
  defineProps<{
    tableData: DateCell[]
  }>(),
  { },
)

// const todayDate = new Date()

// 这里多次一举 watch ，
// 而不是 computed 是因为加了一个 isPopoverVisible ，
// 控制 popover 显隐，需要改变状态
const bodyTableData = ref(initBodyTableData(props.tableData))

watch(() => props.tableData, () => {
  bodyTableData.value = initBodyTableData(props.tableData)
})

function initBodyTableData(tableData: DateCell[]) {
  return tableData?.flat()?.map((item) => {
    return {
      ...item,
      formatDate: item.date.format('YYYY-MM-DD'),
      isPopoverVisible: false,
    }
  })
}

// 1. 如果 item.isSelected true 才有 popover
// 2. 获取所有的 popover
// 3. 控制单独的 popover 显示。鼠标 hover 显示

// const elements = document.querySelectorAll('[id^=\'calendar-\'][id$=\'-popover\']')

function showPopover(item: typeof bodyTableData.value[0]) {
  if (item.isSelected) {
    // 说明有 popover
    item.isPopoverVisible = true
  }
}
function hidePopover(item: typeof bodyTableData.value[0]) {
  if (item.isSelected) {
    // 说明有 popover
    item.isPopoverVisible = false
  }
}
</script>

<template>
  <div
    class="grid grid-cols-7 h-full w-full gap-1px border border-[rgb(229,231,235)] rounded-lg bg-[rgb(229,231,235)]"
  >
    <button
      v-for="item, index in bodyTableData"
      :key="index"
      class="calendar-button relative flex items-center justify-center text-sm leading-8 hover:bg-[rgb(243,244,246)]"
      :class="
        item.type === 'normal'
          ? 'bg-white text-[rgb(17,24,39)]'
          : 'bg-[rgb(249,250,251)] text-[rgb(156,163,175)]'
      "
      @pointerover="showPopover(item)"
      @pointerleave="hidePopover(item)"
    >
      <div
        v-show="item.isSelected"
        class="absolute left-1/2 top-1/2 h-5 w-5 rounded-full bg-[#bbbeee] -translate-1/2"
      />
      <!-- <span v-if="dayjs(todayDate).format('YYYY-MM-DD') === item.formatDate">
        今天
      </span> -->
      <div class="z-10">
        {{ item.text }}
      </div>

      <div v-if="item.isSelected">
        <div
          v-show="item.isPopoverVisible"
          :id="`calendar-${item.formatDate}-popover`"
          :class=" item.type === 'normal' ? '' : 'border-[#944DFE02]!' "
          class="absolute left-1/2 z-11 h-8 min-w-50px flex flex-row flex-nowrap items-center justify-center whitespace-nowrap border border-[#944DFE] rounded-md bg-[#BBBEEE] px-2 -top-9 -translate-x-1/2"
        >
          <div>
            {{ item.holiday?.name || 66 }}
          </div>
          <svg
            :class=" item.type === 'normal' ? '' : 'fill-[#944DFE80]!' "
            class="absolute left-1/2 fill-#944DFE -bottom-12px -translate-1/2"
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
      </div>
    </button>
  </div>
</template>

<style scoped>
</style>
