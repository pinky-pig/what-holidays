<script setup lang="ts">
import type { AllAreaType } from '~/store/area'

const props = withDefaults(
  defineProps<{
    modelValue?: boolean
    ignoreElement?: HTMLElement | null
    listData?: any[] | AllAreaType[]
  }>(),
  { modelValue: false, ignoreElement: null },
)
const emit = defineEmits(['update:modelValue'])

function close() {
  emit('update:modelValue', false)
}
const $selectMenuContainer = ref<HTMLElement | null>(null)

onClickOutside($selectMenuContainer,
  () => {
    close()
  },
  { ignore: [computed(() => props.ignoreElement)] }, // 也可以传 querySelector 的值，要确保传进去的有值
)
</script>

<template>
  <div ref="$selectMenuContainer" class="select-menu-container" :class="modelValue ? 'h-300px!' : 'h-0!'">
    <div class="select-menu-content">
      <div
        v-for="item in listData" :key="item"
        class="h-30px w-full flex flex-shrink-0 flex-row items-center justify-start bg-blue-100"
      >
        {{ item.name }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.select-menu-container {
  margin-top: 10px;
  width: 400px;
  height: 0px;
  background: #fff;
  mask: url(/src/assets/img/video-mask.png) no-repeat center center/100% 100%;
  -webkit-mask: url(/src/assets/img/video-mask.png) no-repeat center center/100% 100%;
  transition: all .3s ease-in-out;
}
.select-menu-content{
  width: 100%;
  height: 100%;
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
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
