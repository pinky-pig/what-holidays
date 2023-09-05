<script setup lang="ts">
</script>

<template>
  <div class="fixed bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden">
    <BorderBackground>
      <div class="h-full w-full flex items-center justify-center">
        <MainMap class="pointer-events-auto absolute left-0 top-0" />
      </div>
    </BorderBackground>

    <RouterView />
  </div>
</template>

<style scoped>

</style>
