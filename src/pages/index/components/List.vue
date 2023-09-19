<script setup lang="ts">
import dayjs from 'dayjs'
import type { Holiday } from '~/types'

const props = withDefaults(
  defineProps<{
    holidays: Holiday[]
  }>(),
  {},
)

const formatHolidays = computed(() => {
  return props.holidays.map((item) => {
    return {
      ...item,
      start: dayjs(new Date(item.start)).format('YYYY-MM-DD'),
      end: dayjs(new Date(item.end)).format('YYYY-MM-DD'),
      date: dayjs(new Date(item.date)).format('YYYY-MM-DD'),
    }
  })
})

function handleSelectHoliday(item: typeof formatHolidays.value[0]) {
  // eslint-disable-next-line no-console
  console.log(item)
}
</script>

<template>
  <div
    class="h-full w-full gap-10px overflow-auto bg-[#eee] p-10px md:grid-cols-4 sm:grid-cols-2"
  >
    <!-- list -->
    <div
      v-for="item in formatHolidays"
      :key="item.name"
      class="mb-2 cursor-pointer rounded-lg bg-white p-2 shadow-none hover:bg-[#fefefe] hover:shadow-md"
      @click="handleSelectHoliday(item)"
    >
      <div>
        <span class="text-14px font-bold"> {{ item.name }}</span>
        <br>
        <span class="text-12px"> {{ item.date }}</span>
      </div>
    </div>
  </div>
</template>
