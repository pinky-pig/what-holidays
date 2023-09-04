<script setup lang="ts">
import type { ManipulateType } from 'dayjs'

withDefaults(
  defineProps<{
    title?: string
  }>(),
  { title: '' },
)

const emit = defineEmits<{
  (e: 'changeMonth', month: ManipulateType, num: number): void
}>()
</script>

<template>
  <div class="w-full flex flex-row">
    <button class="h-8 w-8 flex items-center justify-center text-[rgb(156,163,175)]" @click="emit('changeMonth', 'month', -1)">
      <div class="h-5 w-5" i-carbon:chevron-left />
    </button>

    <div class="flex flex-1 items-center justify-center text-center font-semibold text-[rgb(17,24,39)]">
      {{ title }}
    </div>

    <button class="h-8 w-8 flex items-center justify-center text-[rgb(156,163,175)]" @click="emit('changeMonth', 'month', 1)">
      <div class="h-5 w-5" i-carbon:chevron-right />
    </button>
  </div>
</template>

<style scoped>
</style>
