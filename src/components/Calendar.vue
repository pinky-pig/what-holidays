<script setup lang="ts">
import type { ManipulateType } from 'dayjs'
import dayjs from 'dayjs'
import { generateMonthCalendar } from '~/utils/calendar'

const initialDate = ref(dayjs(new Date()))

const tableData = ref(generateMonthCalendar(initialDate.value))

watch(() => initialDate.value, (v) => {
  tableData.value = generateMonthCalendar(v)
})

const title = computed(() => `${initialDate.value.get('year')} ${initialDate.value.format('MMMM')}`)

function change(type: ManipulateType, num: number) {
  initialDate.value = dayjs(initialDate.value.toDate()).add(num, type)
}
</script>

<template>
  <div class="h-500px w-500px bg-green-200">
    <div class="h-full w-full flex flex-col items-center justify-center p-4">
      <!-- 年份、月份 -->
      <div class="h-6 w-full flex flex-row bg-red-200">
        <button class="h-8 w-8 flex items-center justify-center text-white" @click="change('month', -1)">
          <svg
            xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"
            class="h-5 w-5"
          >
            <path
              fill-rule="evenodd"
              d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
              clip-rule="evenodd"
            />
          </svg>
        </button>

        {{ title }}
        <button class="h-8 w-8 flex items-center justify-center text-white" @click="change('month', 1)">
          <svg
            xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"
            class="h-5 w-5"
          >
            <path
              fill-rule="evenodd"
              d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
      </div>
      <!-- 星期 -->
      <div class="h-6 w-full bg-blue-200" />
      <!-- table -->
      <div class="grid grid-cols-7 w-full flex-1 gap-1px overflow-hidden rounded-lg bg-[rgb(229,231,235)] bg-purple-200">
        <div
          v-for="item, index in tableData?.flat()"
          :key="index"
          class="flex items-center justify-center"
          :class="item.type === 'normal' ? 'bg-white text-[rgb(17,24,39)]' : 'bg-[rgb(249,250,251)] text=[rgb(156,163,175)]'"
        >
          {{ item.text }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
