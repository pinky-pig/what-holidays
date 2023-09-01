<script setup lang="ts">
const $container = ref<HTMLElement | null>()

const layoutstore = useLayoutStore()

const store = useCountryStore()

watch(() => layoutstore.isShowHolidaysCalendar, (value) => {
  if (value)
    $container.value!.style.transform = 'translateX(-20px)'
  else
    $container.value!.style.transform = 'translateX(1000px)'
})

function handleClose() {
  layoutstore.setShowHolidaysCalendar(false)
}
</script>

<template>
  <div
    ref="$container"
    class="absolute right-0 top-3.2rem h-[calc(100vh-6.4rem)] w-500px translate-x-full rounded-3xl bg-gray-300 container"
  >
    {{ store.currentCountry }}

    <button class="btn" @click="handleClose">
      关闭
    </button>
  </div>
</template>

<style scoped>
.container{
  will-change: transform;
  transition-property: all;
  transition-duration: 0.5s;
  transition-timing-function: cubic-bezier(.4,0,.2,1);
}
</style>
