<script setup lang="ts">
import { useMotion } from '@vueuse/motion'
import type { AllAreaType } from '~/store/area'

const store = useAreaStore()

const searchText = ref('')

// 这里隐藏的时候，设置 opacity: 0; pointer-events: none;
// 打开动画是先扩展，然后 blur 显示
// 关闭动画是先 blur 隐藏，然后收缩
const isExpand = ref(false)
const isShowPanel = ref(false)

const $panel = ref<HTMLElement | null>(null)
const $container = ref<HTMLElement | null>(null)
const $areaListContainer = ref<HTMLElement | null>(null)
const $areaListBox = ref<HTMLElement | null>(null)
const $input = ref<HTMLElement | null>(null)
const $circleLine = ref<HTMLElement | null>(null)

const hasDragged = ref(false)
const lastedPosition = ref({ x: 40, y: 40 })
// 这里使用 x、y 是因为控制的是小球，移动的是 container 。而其中有 p-4 的内边距，所以需要计算一下
const { x, y } = useDraggable($container, {
  initialValue: lastedPosition.value,
  onEnd: (position, e) => {
    if (
      Math.abs(position.x - lastedPosition.value.x) > 5
      || Math.abs(position.y - lastedPosition.value.y) > 5
    )
      hasDragged.value = true

    lastedPosition.value = position
  },
})

const areaListContainerMotionInstance = useMotion($areaListContainer, {
  initial: {
    'opacity': 0,
    'scale': 0,
    'transform-origin': 'top left',
    'pointerEvents': 'none',
  },
  enter: {
    opacity: 1,
    scale: 1,
    pointerEvents: 'auto',
    transition: {
      duration: 100,
    },
  },
})
const areaListBoxMotionInstance = useMotion($areaListBox, {
  initial: {
    opacity: 0,
    filter: ' blur(1rem)',
    transition: {
      duration: 100,
    },
  },
  enter: {
    opacity: 1,
    filter: ' blur(0rem)',
    transition: {
      duration: 400,
    },
  },
})
const inputMotionInstance = useMotion($input, {
  initial: {
    x: -330,
    opacity: 0,
    pointerEvents: 'none',
  },
  enter: {
    x: 0,
    opacity: 1,
    pointerEvents: 'auto',
  },
})
const circleLineMotionInstance = useMotion($circleLine, {
  initial: {
    y: -27,
  },
  enter: {
    y: 0,
  },
})

watch(isExpand, async (v) => {
  if (v) {
    inputMotionInstance.apply('enter')
    circleLineMotionInstance.apply('enter')
    const enterPromises = [
      areaListContainerMotionInstance.apply('enter'),
    ]
    await Promise.all(enterPromises)
    await areaListBoxMotionInstance.apply('enter')
  }
  else {
    await areaListBoxMotionInstance.apply('initial')
    areaListContainerMotionInstance.apply('initial')
    circleLineMotionInstance.apply('initial')
    inputMotionInstance.apply('initial')
  }
})

function handleExpandPanel() {
  if (hasDragged.value) {
    hasDragged.value = false
  }
  else {
    isExpand.value = !isExpand.value
    hasDragged.value = false
  }
}

async function show() {
  isShowPanel.value = true
  if ($panel.value)
    $panel.value.style.animation = 'blur-show .4s'
}
async function close() {
  if ($panel.value)
    $panel.value.style.animation = 'blur-hide .4s'

  setTimeout(() => {
    isShowPanel.value = false
  }, 400)
}

onMounted(async () => {
  // 收缩，先初始化所有动画状态
  await areaListBoxMotionInstance.apply('initial')
  const enterPromises = [
    areaListContainerMotionInstance.apply('initial'),
    circleLineMotionInstance.apply('initial'),
    inputMotionInstance.apply('initial'),
  ]
  await Promise.all(enterPromises)
  // 再显示
  show()
})

defineExpose({
  show,
  close,
})

// -------检索逻辑 start----------//
const filterClosedAreas = ref<AllAreaType[]>(store.allAreas)
watch(searchText, (v) => {
  filterClosedAreas.value = filteredCountries(v.toUpperCase(), store.allAreas)
})

function filteredCountries(text: string, allAreas: AllAreaType[]) {
  return allAreas.filter(country =>
    country.code.includes(text),
  )
}
// -------检索逻辑 end----------//

// -------选择逻辑 start----------//
function selectedArea(item: AllAreaType) {
  store.currentArea = item

  if (item.location?.longitude && item.location?.latitude && window.mapInstance) {
    window.mapInstance!.flyTo({
      center: [item.location?.longitude, item.location?.latitude],
      zoom: 1,
      speed: 0.5,
      essential: true,
    })
  }
}
// -------选择逻辑 end----------//
</script>

<template>
  <div
    v-show="isShowPanel"
    ref="$panel"
    class="pointer-events-none fixed flex flex-col p-4"
    :style="{
      left: `calc(${x}px - 1rem)`,
      top: `calc(${y}px - 1rem)`,
    }"
  >
    <!-- 最小化 -->
    <div
      ref="$container"
      class="circle pointer-events-auto absolute z-99 h-50px w-50px flex flex-row cursor-pointer select-none items-center justify-center rounded-full"
      @click="handleExpandPanel"
    >
      <div class="h-38px w-38px flex flex-row items-center justify-center rounded-full bg-[#944DFEc0]">
        <div i-fluent-emoji:magnifying-glass-tilted-right />
      </div>
    </div>

    <div class="expand-panel pointer-events-none h-full w-full overflow-hidden">
      <div class="flex flex-row items-center overflow-hidden rounded-l-30px pl-50px">
        <!-- 检索 input 及 Code 跳转链接按钮 -->
        <div ref="$input" class="pointer-events-auto relative h-50px flex flex-1 flex-row items-center">
          <div class="searchBar relative z-98">
            <input
              v-model="searchText"
              placeholder="可以输入地区 CODE 检索"
              class="searchText placeholder-select-none"
              type="text"
            >
          </div>

          <!-- 打开 code 的外链 href="https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes" -->
          <a
            class="code-tag absolute left-210px top-16px z-99 h-24px w-56px flex select-none items-center justify-center rounded-8px bg-[#fed11b] -ml-15px"
            href="https://baike.baidu.com/item/ISO%20639-1/8292914?fr=ge_ala"
            target="_blank"
          >
            <span class="text-14px font-bold underline underline-black underline-offset-4">
              code
            </span>
          </a>
        </div>
      </div>
      <div ref="$circleLine" class="pointer-events-auto w-49px flex items-center justify-center">
        <div class="circle-line" />
      </div>
      <!-- 面板 -->
      <ScratchyBorder ref="$areaListContainer" class="bg-[#944dfe] h-420px! max-w-unset! w-478px!">
        <div ref="$areaListBox" class="area-list grid grid-auto-rows-[min-content] grid-cols-6 h-full select-none gap-4 rounded-md p-4">
          <div
            v-for="item in filterClosedAreas"
            :key="item.name"
            class="listItem pointer-events-auto h-30px w-60px flex flex-row cursor-pointer items-center justify-center gap-1 rounded-md bg-[#fff]"
            @click="selectedArea(item)"
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
      </ScratchyBorder>
    </div>
  </div>
</template>

<style scoped>
.circle {
  background: transparent url("~/assets/img/threat.png") center center no-repeat;
  background-size: cover;
}
.circle-line {
  width: 2px;
  height: 25px;
  background: white;
  /* transform: translate(-50%, 0%); */
}

.searchBar {
  width: 200px;
  position: relative;
  padding: 3px;
  height: 40px;
  background: url("~/assets/img/popout-mid.png") repeat-x left center;
  background-size: contain;
}

.searchBar::before {
  content: '';
  width: 100%;
  height: 100%;
  position: absolute;
  pointer-events: none;
  top: 0;
  left: -55%;
  background: url("~/assets/img/popout-left.png") no-repeat center center;
  background-size: contain;
}
.searchBar::after {
  content: '';
  width: 100%;
  height: 100%;
  position: absolute;
  pointer-events: none;
  top: 0;
  right: -55%;
  background: url("~/assets/img/popout-right.png") no-repeat center center;
  background-size: contain;
}
.searchText{
  width: 100%;
  height: 100%;
  border-radius: 5px;
  outline: 0px solid ;
  background: transparent;
}

/* tag code hover 样式 */
.code-tag{
  box-shadow: #fed11b 0px 0px 0px 2px;
  transition: box-shadow 0.2s ease-out 0s;
}
.code-tag:hover{
  cursor: pointer;
  box-shadow: #fed11bb0 0px 0px 0px 5px;
}
.code-tag:hover span{
  color: #944dfe;
  text-decoration-color: #944dfe;
}

.listItem{
  box-shadow: #ffffff 0px 0px 0px 1px;
  transition: box-shadow 0.2s ease-out 0s;
}
.listItem:hover{
  cursor: pointer;
  box-shadow: #ffffffb0 0px 0px 0px 4px;
}

.area-list{
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
