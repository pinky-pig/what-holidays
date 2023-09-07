<script setup lang="ts">
import dayjs from 'dayjs'
import type { Holiday } from '~/types'

const props = withDefaults(
  defineProps<{
    holidays: Holiday[]
  }>(),
  {},
)

const tableHeaderItems = computed(() => Object.keys(props.holidays[0] || {}))

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
    <!-- table -->
    <div class="h-full w-full flex flex-col rounded-md bg-white">
      <div class="overflow-x-auto lg:-mx-8 sm:-mx-6">
        <div class="inline-block min-w-full py-2 lg:px-8 sm:px-6">
          <div class="overflow-hidden">
            <table class="min-w-full text-left text-sm font-light">
              <thead class="border-b font-medium dark:border-neutral-500">
                <tr>
                  <th v-for="item in tableHeaderItems" :key="item" scope="col" class="px-6 py-4">
                    {{ item }}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in formatHolidays" :key="item.name" class="border-b dark:border-neutral-500">
                  <td v-for="it in tableHeaderItems" :key="it" class="whitespace-nowrap px-6 py-4 font-medium">
                    {{ item[it as keyof typeof item] }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    <!-- <div v-for="item in holidays" :key="item.date" class="mb-2 border border-black">
      date: {{ item.date }}
      <br>
      name: {{ item.name }}
    </div> -->
  </div>
</template>

<style scoped>
</style>
