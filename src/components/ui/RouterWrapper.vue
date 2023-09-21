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
    <!-- 这个 wrapper-content 主要目的是设置一个 mask ，不用即可删除 -->
    <div class="wrapper-content relative w-full flex flex-col p-10px" style="height: calc(100% - 60px);">
      <div class="h-full w-full flex flex-col overflow-hidden rounded-2xl">
        <nav class="h-60px bg-[#e3e3e3] px-4 py-3 font-medium md:px-8">
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
        <div class="flex-1 overflow-hidden bg-[#ffffff] p-4">
          <slot />
        </div>
      </div>

      <!-- border 样式，直接复制粘贴 -->
      <div class="scratchyBorder">
        <div class="frames">
          <div />
          <div />
          <div />
          <div />
        </div>
        <div class="corners">
          <div />
          <div />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.wrapper-content{
  /* mask: url(/src/assets/img/video-mask.png) no-repeat center center/100% 100%;
  -webkit-mask: url(/src/assets/img/video-mask.png) no-repeat center center/100% 100%; */
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
  background: #8388d1;
  box-shadow: #8388d1 0px 0px 0px 2px;
  transition: box-shadow 0.2s ease-out 0s;
}
.return-arrow:hover{
  cursor: pointer;
  box-shadow: #8388d1b0 0px 0px 0px 5px;
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

/* --------------- border 样式 start --------------- */
.scratchyBorder {
  position: absolute;
  top: 0;
  left: 0;
  transition: all 0.25s cubic-bezier(0.62, 0.02, 0.34, 1);
  height: 100%;
  width: 100%;
  pointer-events: none;
  border-radius: 15px;
  overflow: hidden;
}

.scratchyBorder > div {
  height: 100%;
  width: 100%;
  z-index: 99;
  position: absolute;
}

.scratchyBorder .frames div {
  background: url("~/assets/svg/speciesBorder.svg") repeat-x 50% 50%;
  width: 100%;
  height: 20px;
  position: absolute;
  left: 0;
  top: 0;
}

.scratchyBorder .frames div:nth-child(2), .scratchyBorder .frames div:nth-child(4) {
  width: 20px;
  height: 100%;
  background: url("~/assets/svg/speciesBorderVert.svg") repeat-y 50% 50%;
}

.scratchyBorder .frames div:nth-child(3) {
  bottom: 0;
  top: auto;
}

.scratchyBorder .frames div:nth-child(3), .scratchyBorder .frames div:nth-child(4) {
  transform: rotate(179.99deg);
}

.scratchyBorder .frames div:nth-child(4) {
  right: 0;
  left: auto;
}

.scratchyBorder .corners div::before, .scratchyBorder .corners div::after {
  content: "";
  background: url("~/assets/svg/speciesCorner.svg") no-repeat center center;
  width: 50px;
  height: 50px;
  position: absolute;
  left: 10px;
  top: 11px;
}

.scratchyBorder .corners div:nth-child(1)::after {
  transform: rotate(90deg);
  left: auto;
  right: 10px;
  top: 11px;
}

.scratchyBorder .corners div:nth-child(2)::before {
  left: auto;
  right: 10px;
  top: auto;
  bottom: 11px;
  transform: rotate(180deg);
}

.scratchyBorder .corners div:nth-child(2)::after {
  top: auto;
  bottom: 11px;
  transform: rotate(270deg);
}
/* --------------- border 样式 end --------------- */
</style>
