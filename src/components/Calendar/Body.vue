<script setup lang="ts">
defineProps<{
  tableData: any[]
}>()
</script>

<template>
  <div
    class="grid grid-cols-7 h-full w-full gap-1px overflow-hidden border border-[rgb(229,231,235)] rounded-lg bg-[rgb(229,231,235)]"
  >
    <button
      v-for="item, index in tableData?.flat()"
      :key="index"
      class="flex items-center justify-center hover:bg-[rgb(243,244,246)]"
      :class="item.type === 'normal' ? 'bg-white text-[rgb(17,24,39)]' : 'bg-[rgb(249,250,251)] text-[rgb(156,163,175)]'"
    >
      {{ item.text }}
    </button>
  </div>
</template>

<style scoped>
</style>
