<script setup lang="ts">
import { i18n } from '~/i18n'

const store = useAreaStore()

const isShowLittlePanel = ref(false)

/**
 * 给父盒子变形使用
 */
const route = useRoute()
watch(() => route.fullPath, (v) => {
  setAppRootScale(v)
})

/**
 * 当前地区是cn时，展示中文，否则展示英文
 */
watch(() => store.currentArea?.code, (v) => {
  if (v?.toLowerCase() === 'cn' || v?.toLowerCase() === 'hk' || v?.toLowerCase() === 'tw' || v?.toLowerCase() === 'jp')
    i18n.global.locale = 'cn'
  else
    i18n.global.locale = 'en'
})

/**
 * 设置弹窗缩小
 */
onMounted(() => {
  setAppRootScale(route.fullPath)
})

function setAppRootScale(v: string) {
  const rootDom = document.querySelector('#appRoot') as HTMLElement
  if (v.startsWith('/area')) {
    if (rootDom) {
      rootDom.style.transform = 'scale(0.95) translateY(20px)'
      rootDom.style.borderRadius = '20px'
      rootDom.style.overflow = 'hidden'
    }
  }
  else {
    if (rootDom) {
      rootDom.style.borderRadius = ''
      rootDom.style.overflow = ''
      rootDom.style.transform = ''
    }
  }
}
</script>

<template>
  <div id="appRoot" class="fixed relative bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden transition-all duration-300">
    <BorderBackground>
      <div class="h-full w-full flex flex-row items-start justify-center pt-20px">
        <MainMap class="pointer-events-auto absolute left-0 top-0" />
      </div>
    </BorderBackground>

    <div class="pointer-events-none absolute top-30px z-999 w-full flex items-center justify-center">
      <!-- <SearchInput class="pointer-events-auto" /> -->
    </div>

    <div class="pointer-events-none absolute top-30px z-999 w-full flex flex-row items-center justify-start">
      <AreaList class="pointer-events-auto" />
    </div>

    <div
      :class="isShowLittlePanel ? 'bottom-20px' : '-bottom-full'"
      class="pointer-events-none absolute left-20px z-999 transition-all duration-700 ease-in-out"
    >
      <MonthHoliday class="pointer-events-auto" />
    </div>
  </div>
  <RouterView />
</template>

<style scoped>

</style>
