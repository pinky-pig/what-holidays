<script setup lang="ts">

</script>

<template>
  <Background />
  <Suspense>
    <div class="fixed bottom-0 left-0 right-0 top-0 z-99 h-full w-full overflow-hidden p-4">
      <div class="h-full w-full flex flex-row overflow-hidden rounded-3xl outline-[#D8CBF7fe] outline">
        <AreaList class="h-full w-200px bg-[#fff]" />
        <MainMap class="flex-1" />
        <div class="h-full w-200px bg-[#fff]">
          test
        </div>
      </div>
    </div>
  </Suspense>
</template>

<style scoped>

</style>
