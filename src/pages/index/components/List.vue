<script setup lang="ts">
import dayjs from 'dayjs'
import type { Holiday } from '~/types'

withDefaults(
  defineProps<{
    holidays: Holiday[]
  }>(),
  {},
)

const currentHoliday = inject('currentHoliday') as Ref<Holiday>

function handleSelectHoliday(item: Holiday) {
  currentHoliday.value = item
}
</script>

<template>
  <div
    class="h-full w-full gap-10px overflow-auto bg-[#eee] p-10px md:grid-cols-4 sm:grid-cols-2"
  >
    <!-- list -->
    <div
      v-for="item in holidays"
      :key="item.name"
      class="mb-2 cursor-pointer rounded-lg bg-white p-2 transition-all duration-300 ease-in-out hover:bg-[#fefefe] hover:shadow-md"
      :class="currentHoliday?.name === item?.name ? 'bg-[#bbbeee]!' : ''"
      @click="handleSelectHoliday(item)"
    >
      <div>
        <span class="text-14px font-bold"> {{ item.name }}</span>
        <br>
        <span class="text-12px"> {{ dayjs(new Date(item.date)).format('YYYY-MM-DD') }}</span>
      </div>
    </div>
  </div>
</template>
