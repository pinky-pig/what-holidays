<script setup lang="ts">
import type { LngLatLike } from 'mapbox-gl'
import mapboxgl from 'mapbox-gl'

let mapInstance: mapboxgl.Map | null = null

function marsOnloaded(map: mapboxgl.Map) {
  mapInstance = map

  mapInstance.on('load', () => {
    const el = document.createElement('div')
    el.innerHTML = `<logo-marker name="${'/logo.svg'}" />`
    new mapboxgl.Marker(el)
      .setLngLat([118.888175, 32.048268] as LngLatLike)
      .addTo(map!)
  })
}
</script>

<template>
  <Background />
  <Suspense>
    <div class="fixed bottom-0 left-0 right-0 top-0 h-full w-full flex flex-col overflow-auto p-10px">
      <div class="h-full w-full rounded-md">
        <MapboxMap @onload="marsOnloaded" />
      </div>
    </div>
  </Suspense>
</template>

<style scoped>

</style>
