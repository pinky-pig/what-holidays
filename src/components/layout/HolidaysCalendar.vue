<script setup lang="ts">
const $container = ref<HTMLElement | null>()

const isShow = ref(false)

function setShow(flag: boolean) {
  isShow.value = flag
}

watch(isShow, (value) => {
  if (value) {
    // 显示
    $container.value!.style.transform = 'translateX(0px)'
  }
  else {
    $container.value!.style.transform = 'translateX(1000px)'
  }
})

defineExpose({
  isShow,
  setShow,
})
</script>

<template>
  <div
    ref="$container"
    class="absolute right-0 top-0 h-600px w-600px translate-x-full bg-gray-300 container"
  />
</template>

<style scoped>
.container{
  will-change: transform;
  transition: all .5s linear;
}
</style>
