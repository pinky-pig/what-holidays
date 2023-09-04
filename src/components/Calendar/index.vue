<script setup lang="ts">
import type { ManipulateType } from 'dayjs'
import dayjs from 'dayjs'
import WeekName from './WeekName.vue'
import Header from './Header.vue'
import Body from './Body.vue'
import { generateMonthCalendar } from '~/utils/calendar'

const initialDate = ref(dayjs(new Date()))

const tableData = ref(generateMonthCalendar(initialDate.value))

watch(() => initialDate.value, (v) => {
  tableData.value = generateMonthCalendar(v)
})

const title = computed(() => `${initialDate.value.get('year')} ${initialDate.value.format('MMMM')}`)

function changeMonth(type: ManipulateType, num: number) {
  initialDate.value = dayjs(initialDate.value.toDate()).add(num, type)
}
</script>

<template>
  <div class="h-500px w-500px rounded-lg bg-white">
    <div class="h-full w-full flex flex-col items-center justify-center p-4">
      <Header :title="title" @changeMonth="changeMonth" />
      <WeekName />

      <Body
        class="flex-1"
        :table-data="tableData?.flat()"
      />
    </div>
  </div>
</template>

<style scoped>
</style>
