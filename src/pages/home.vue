<script setup lang="ts">
const store = useAreaStore()
</script>

<template>
  <div class="fixed relative bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden">
    <BorderBackground>
      <div class="h-full w-full flex flex-row items-start justify-center pt-20px">
        <MainMap class="pointer-events-auto absolute left-0 top-0" />
      </div>
    </BorderBackground>

    <div class="pointer-events-none absolute top-30px z-999 w-full flex items-center justify-center">
      <SearchInput class="pointer-events-auto" />
    </div>

    <div
      :class="store.currentArea ? 'bottom-20px' : '-bottom-full'"
      class="pointer-events-none absolute left-20px z-999 transition-all duration-700 ease-in-out"
    >
      <MonthHoliday class="pointer-events-auto" />
    </div>

    <RouterView />
  </div>
</template>

<style scoped>

</style>
