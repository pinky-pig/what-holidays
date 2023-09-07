<script setup lang="ts">
import dayjs from 'dayjs'
import type { Holiday } from '~/types'

withDefaults(
  defineProps<{
    currentYear?: number
    holidays?: Holiday[]
  }>(),
  {
    currentYear: () => dayjs(new Date()).year(),
  },
)

const months = Array(12)
</script>

<template>
  <div
    class="grid grid-cols-1 h-full max-w-1300px w-full gap-10px rounded-md bg-[#eee] p-10px md:grid-cols-4 sm:grid-cols-2"
  >
    <div v-for="(_item, index) in months" :key="index">
      <Calendar
        :header-option="{
          showYear: false,
          showMonth: true,
          switchMonth: false,
        }"
        :current-date="new Date(`${currentYear}-${index + 1}-01`)"
        :holidays="holidays"
      />
    </div>
  </div>
</template>

<style scoped>
</style>
