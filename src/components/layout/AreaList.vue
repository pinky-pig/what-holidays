<script setup lang="ts">
const areas = [
  {
    name: 'China',
  },
  {
    name: 'Japan',
  },
]
</script>

<template>
  <div class="flex flex-col items-center p-4">
    <!-- Logo -->
    <div class="h-60px flex flex-row items-center justify-center gap-20px">
      <img class="h-40px w-40px" src="/favicon.svg" alt="">
    </div>

    <!-- List -->
    <div class="flex flex-1 flex-col items-center justify-center gap-4">
      <div v-for="item in areas" :key="item.name">
        {{ item.name }}
      </div>
    </div>

    <!-- Setting -->
    <div class="h-60px flex flex-row items-center justify-center">
      <div i-carbon:settings />
    </div>
  </div>
</template>

<style scoped>
</style>
