<script setup lang="ts">
import type { Map } from 'leaflet'
import L from 'leaflet'
import { onMounted, ref } from 'vue'

const props = withDefaults(
  defineProps<{
    options?: any
  }>(),
  {
    options: () => ({
      id: `leafletMapContainer${Math.ceil(Math.random() * 100000000)}`,
    }),
  },
)

const emit = defineEmits(['onload'])

let map: Map | null
const mapContainer = ref(null)

onMounted(() => {
  initMapbox(props.options)
})
onUnmounted(() => {
  map!.remove()
})
function initMapbox(option: any) {
  map = L.map(
    mapContainer.value!,
    {
      center: [51.505, -0.09],
      zoom: 6,
    },
  )

  emit('onload', map)

  L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png', {
    maxZoom: 10,
  }).addTo(map)

  // 添加标记
  L.marker([51.5, -0.09])
    .addTo(map)
    .bindPopup('Hello, Leaflet!')
    .openPopup()
}
</script>

<template>
  <div
    :id="props.options.id"
    ref="mapContainer"
    class="h-full w-full"
  />
</template>
