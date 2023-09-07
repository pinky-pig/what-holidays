<script setup lang="ts">
const months = Array(12)
</script>

<template>
  <div
    class="grid grid-cols-2 h-full max-w-1300px w-full gap-10px rounded-md bg-[#eee] p-10px md:grid-cols-4"
  >
    <div v-for="(_item, index) in months" :key="index">
      <Calendar />
    </div>
  </div>
</template>

<style scoped>
</style>
