<script setup lang="ts">

</script>

<template>
  <Background />
  <Suspense>
    <div class="fixed bottom-0 left-0 right-0 top-0 h-full w-full overflow-auto">
      <MainMap />

      <HolidaysCalendar />
    </div>
  </Suspense>
</template>

<style scoped>

</style>
