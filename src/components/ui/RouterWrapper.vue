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

// 给父盒子变形使用
// watch(() => route.fullPath, (v) => {
//   const rootDom = document.querySelector('#appRoot') as HTMLElement
//   if (v === '/area') {
//     if (rootDom) {
//       rootDom.style.transform = 'scale(0.95) translateY(20px)'
//       rootDom.style.borderRadius = '20px'
//       rootDom.style.overflow = 'hidden'
//     }
//   }
//   else {
//     if (rootDom) {
//       rootDom.style.borderRadius = ''
//       rootDom.style.overflow = ''
//       rootDom.style.transform = ''
//     }
//   }
// })
</script>

<template>
  <div
    :class="isOpen ? 'bubbleCardUp' : 'bubbleCardDown'"
    class="fixed bottom-0 left-0 right-0 top-0 z-50 z-999 flex flex-col"
  >
    <div class="h-full w-full flex flex-col pt-60px">
      <nav class="overflow-hidden rounded-t-2xl bg-[#e3e3e3] px-4 py-3 font-medium md:px-8">
        <div class="flex items-center justify-between gap-2">
          <div class="flex items-center gap-4">
            <div class="return-arrow" @click="closeAndToHome">
              <div i-carbon:close />
            </div>
            <span>
              <slot name="title" />
            </span>
          </div>
        </div>
      </nav>
      <div class="flex-1 flex-grow-2 overflow-auto bg-[#ffffff] p-4">
        <slot />
      </div>
      <div class="bg-[#ffffff]">
        <slot name="bottom" />
      </div>
    </div>
  </div>
</template>

<style scoped>
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
  box-shadow: #944DFE90 0px 0px 0px 5px;
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
