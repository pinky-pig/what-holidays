<script setup lang="ts">
import type { LngLatLike } from 'mapbox-gl'
import mapboxgl from 'mapbox-gl'

let mapInstance: mapboxgl.Map | null = null

function marsOnloaded(map: mapboxgl.Map) {
  mapInstance = map

  mapInstance.on('load', () => {
    initUserPosition()
  })
}

/**
 * 初始化当前用户的经纬度坐标头像，并飞到当前用户所在的经纬度
 */
function initUserPosition() {
  window.navigator.geolocation.getCurrentPosition(
    (pos) => {
      const crd = pos.coords

      const el = document.createElement('div')
      el.innerHTML = `<logo-marker name="${'/avatar.svg'}" />`
      new mapboxgl.Marker(el)
        .setLngLat([crd.longitude, crd.latitude] as LngLatLike)
        .addTo(mapInstance!)

      mapInstance!.flyTo({
        center: [crd.longitude, crd.latitude], // 您已经添加的点的坐标
        zoom: 4, // 目标缩放级别
        speed: 0.8, // 飞行速度（可选）
        essential: true, // 如果设置为 true，将会在大多数设备上触发浏览器内置的滑动/缩放动画（可选）
      })
    },
    (err) => {
      console.warn(`ERROR(${err.code}): ${err.message}`)
    },
    {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    })
}
</script>

<template>
  <div class="h-full w-full overflow-hidden">
    <MapboxMap @onload="marsOnloaded" />
  </div>
</template>

<style scoped>

</style>