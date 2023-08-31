<script setup lang="ts">
import mapboxgl from 'mapbox-gl'
import { onMounted, ref } from 'vue'
import { MapboxSetting } from '~/config'

const props = withDefaults(
  defineProps<{
    options?: any
  }>(),
  {
    options: () => ({}),
  },
)

const emit = defineEmits(['onload'])

let map: mapboxgl.Map | null
const mapContainer = ref(null)

onMounted(() => {
  initMapbox(props.options)
})
onUnmounted(() => {
  map!.remove()
})
function initMapbox(option: any) {
  map = new mapboxgl.Map({
    container: mapContainer.value!,
    ...option,
    style: MapboxSetting.mapDarkStyle,
    center: [118.888175, 32.048268],
    zoom: 6,
    accessToken: MapboxSetting.token,
  })
  emit('onload', map)
}
</script>

<template>
  <div ref="mapContainer" class="h-full w-full" />
</template>
