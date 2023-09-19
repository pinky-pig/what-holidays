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
    class="wrapper fixed left-0 top-0 z-50 z-999 h-screen w-screen flex flex-col"
  >
    <div class="h-60px w-full flex-shrink-0" @click="closeAndToHome" />
    <div class="wrapper-content w-full flex flex-col" style="height: calc(100% - 60px);">
      <!-- <ScratchyBorder class="bg-[#944dfe] h-auto! max-w-unset! w-auto!"> -->
      <div class="h-full w-full flex flex-col">
        <nav class="h-60px rounded-t-2xl bg-[#e3e3e3] px-4 py-3 font-medium md:px-8">
          <div class="flex items-center justify-between gap-2">
            <span>
              <slot name="title" />
            </span>
            <div class="flex items-center gap-4">
              <div class="return-arrow" @click="closeAndToHome">
                <div i-carbon:chevron-down />
              </div>
            </div>
          </div>
        </nav>
        <div class="flex-1 overflow-auto rounded-b-2xl bg-[#ffffff] p-4">
          <slot />
        </div>
      </div>

      <!-- </ScratchyBorder> -->
    </div>
  </div>
</template>

<style scoped>
.wrapper-content{
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
  background: #944DFE;
  box-shadow: #944DFE 0px 0px 0px 2px;
  transition: box-shadow 0.2s ease-out 0s;
}
.return-arrow:hover{
  cursor: pointer;
  box-shadow: #944DFEb0 0px 0px 0px 5px;
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
