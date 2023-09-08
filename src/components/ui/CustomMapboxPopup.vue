<script setup lang="ts">
import Holidays from 'date-holidays'
import type { Holiday } from '~/types/holiday'

const store = useAreaStore()
let hd = null

const isHolidayInNow = ref<false | Holiday[]>(false)
// const holidayInMonth = ref<false | Holiday[]>(false)
// 3. 最近的下個假日的信息（名字、時間）
// const nextHoliday = ref<Holiday[] | null>(null)

onActivated(() => {
  if (!store.currentArea)
    return

  hd = new Holidays(store.currentArea.code)

  // 1. 今天這個地方是否是假日
  isHolidayInNow.value = hd.isHoliday(new Date('2023-10-01'))

  // 2. 這個月是否有假日，如果有，那麽信息（名字、時間）
})
</script>

<template>
  <ScratchyBorder>
    <div class="popup">
      <p>No holidays in now {{ isHolidayInNow ? isHolidayInNow[0].name : 'No holiday' }}</p>
      <p>No holidays in month</p>
      <p>Next holiday is New Year,it's time is 2024/01/01</p>
    </div>
  </ScratchyBorder>
</template>

<style scoped>
.popup{
  width: 100%;
  height: 100%;
  padding: 5px;
  backdrop-filter: blur(10px);
}
</style>
