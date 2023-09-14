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
</script>

<template>
  <div
    class="h-full max-w-1300px w-full gap-10px rounded-md bg-[#eee] p-10px md:grid-cols-4 sm:grid-cols-2"
  >
    <!-- list -->

    <div v-for="item in formatHolidays" :key="item.date" class="mb-2 border border-black">
      date: {{ item.date }}
      <br>
      name: {{ item.name }}
    </div>
  </div>
</template>

<style scoped>
</style>
