<script setup lang="ts">
const isOpen = ref(true)
const router = useRouter()

onMounted(() => {
  document.body.style.overflow = 'hidden'
  isOpen.value = true
})
onUnmounted(() => {
  document.body.style.overflow = 'auto'
})
onActivated(() => {
  document.body.style.overflow = 'hidden'
  isOpen.value = true
})

function closeAndToHome() {
  isOpen.value = false
  setTimeout(() => {
    router.go(-1)
  }, 500)
}
</script>

<template>
  <div
    :class="isOpen ? 'bubbleCardUp' : 'bubbleCardDown'"
    class="wrapper fixed bottom-0 left-0 right-0 top-0 z-50 z-999 flex flex-col"
  >
    <div class="h-60px w-full flex-shrink-0" @click="closeAndToHome" />
    <div class="h-full w-full flex flex-col">
      <nav class="overflow-hidden rounded-t-2xl bg-[#e3e3e3] px-4 py-3 font-medium md:px-8">
        <div class="flex items-center justify-between gap-2">
          <div class="flex items-center gap-4">
            <div class="return-arrow" @click="closeAndToHome">
              <div i-carbon:chevron-down />
            </div>
            <span>
              <slot name="title" />
            </span>
          </div>
        </div>
      </nav>
      <div class="flex-1 flex-grow-2 overflow-auto bg-[#ffffff] p-4">
        <main class="h-full w-full overflow-hidden rounded-lg">
          <slot />
        </main>
      </div>
      <div class="bg-[#ffffff]">
        <slot name="bottom" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.wrapper{
  mask: url(/src/assets/img/video-mask.png) no-repeat center center/100% 100%;
  -webkit-mask: url(/src/assets/img/video-mask.png) no-repeat center center/100% 100%;
}
.bubbleCardUp{
  animation: slide-up .6s ease-in-out;
}

.return-arrow{
  display: flex;
  justify-content: center;
  align-items: center;
  width: 36px;
  height: 36px;
  font-size: 16px;
  border-radius: 18px;
  color: #f0f2f8;
  background: #2a2f37;
  box-shadow: #2a2f37 0px 0px 0px 2px;
  transition: box-shadow 0.2s ease-out 0s;
}
.return-arrow:hover{
  cursor: pointer;
  box-shadow: #2a2f37b0 0px 0px 0px 5px;
}

.bubbleCardDown{
  animation: slide-down .6s ease-in-out;
}
@keyframes slide-up {
  0% {
    transform: translateY(100vh);
  }
  100% {
    transform: translateY(0%);
  }
}
@keyframes slide-down {
  0% {
    transform: translateY(0%);
    opacity: 1;
  }
  100% {
    transform: translateY(100vh);
    opacity: 0;
  }
}
</style>
