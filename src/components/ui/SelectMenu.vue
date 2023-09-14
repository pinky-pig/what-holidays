<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    modelValue?: boolean
    ignoreElement?: HTMLElement | null
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
  { ignore: [computed(() => props.ignoreElement)] },
)
</script>

<template>
  <div ref="$selectMenuContainer" class="select-menu-container" :class="modelValue ? 'h-300px!' : 'h-0!'">
    <div>666</div>
  </div>
</template>

<style scoped>
.select-menu-container {
  width: 400px;
  height: 0px;
  background: #fff;
  mask: url(/src/assets/img/video-mask.png) no-repeat center center/100% 100%;
  -webkit-mask: url(/src/assets/img/video-mask.png) no-repeat center center/100% 100%;
  transition: all .3s ease-in-out;
}
</style>
