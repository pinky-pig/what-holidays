<script setup lang="ts">
const weekName = [
  'M',
  'T',
  'W',
  'T',
  'F',
  'S',
  'S',
]
</script>

<template>
  <div class="grid grid-cols-7 m-[15px_0_10px] h-6 w-full">
    <div
      v-for="(item, index) in weekName"
      :key="index + item"
      class="flex items-center justify-center text-3 text-[rgb(107,114,128)]"
    >
      {{ item }}
    </div>
  </div>
</template>

<style scoped>

</style>
