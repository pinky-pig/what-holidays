<script setup lang="ts">
const store = useAreaStore()

const areas = computed(() => store.allAreas || [])
</script>

<template>
  <div class="flex flex-col gap-4 p-4">
    <!-- 最小化 -->
    <div class="circle h-50px w-50px flex flex-row cursor-pointer items-center justify-center rounded-full">
      <div class="h-38px w-38px flex flex-row items-center justify-center rounded-full text-black">
        <div i-carbon:flag />
      </div>
    </div>
    <!-- 面板 -->
    <div class="panel h-420px w-548px flex flex-row flex-wrap gap-4 overflow-auto rounded-md bg-gray-300 p-4">
      <div
        v-for="item in areas"
        :key="item.name"
        class="h-30px w-60px flex flex-row items-center justify-center rounded-md bg-white"
      >
        <div class="w-fit flex cursor-pointer items-center overflow-hidden border-2 border-white rounded border-solid bg-[rgba(152,208,255,0.5)] px-1.5 py-[0.1875rem] shadow-[rgba(170,166,170,0.40)] shadow-md hover:animate-[shake_1.5s_ease-in-out_infinite] space-x-0.5">
          <img
            :src="item.flag"
            class="block h-2 w-2"
          >
        </div>

        <div>
          {{ item.code }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.circle {
  background: transparent url("~/assets/img/threat.png") center center no-repeat;
  background-size: cover;
}
.panel{
  mask: url(/src/assets/img/video-mask.png) no-repeat center center/100% 100%;
  -webkit-mask: url(/src/assets/img/video-mask.png) no-repeat center center/100% 100%;
  overflow: overlay;
  scrollbar-width: none;
  /* Firefox */
  -ms-overflow-style: none;
  /* IE10+ */
  &::-webkit-scrollbar {
    display: none;
  }
}
</style>
