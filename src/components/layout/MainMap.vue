<script setup lang="ts">
import type { LngLatLike } from 'mapbox-gl'
import mapboxgl from 'mapbox-gl'
import Holidays from 'date-holidays'
import type { IMarker } from '~/types'
import LOCATIONS from '~/assets/json/location.json'

const hd = new Holidays()

/**
 * 初始化地区数据
 */
const areas = computed(() => {
  const countriesObject = hd.getCountries()

  const countriesArray = Object.keys(countriesObject).map(countryCode => ({
    code: countryCode,
    name: countriesObject[countryCode],
    flag: `/flags/4x3/${countryCode.toLowerCase()}.svg`,
    location: LOCATIONS.find(item => item.code === countryCode),
  }))
  return countriesArray
})

/**
 * 地图加载完成
 */
let mapInstance: mapboxgl.Map | null = null

function marsOnloaded(map: mapboxgl.Map) {
  mapInstance = map
  mapInstance.on('load', () => {
    initUserPosition()

    initAreaPosition()
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
      const marker = new mapboxgl.Marker(el)
        .setLngLat([crd.longitude, crd.latitude] as LngLatLike)
        .addTo(mapInstance!) as IMarker

      marker.attributes = '测试数据'

      marker.getElement().addEventListener('click', (e) => {
        // 在这里执行您希望的点击事件处理逻辑
      })

      mapInstance!.flyTo({
        center: [crd.longitude, crd.latitude], // 您已经添加的点的坐标
        zoom: 1, // 目标缩放级别
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
    },
  )
}

/**
 * 获取到国家或地区后，从 location.json 获取对应的经纬度，添加点
 */
function initAreaPosition() {
  areas.value.forEach((area) => {
    if (area.location) {
      new mapboxgl.Marker()
        .setLngLat([area.location.longitude, area.location.latitude] as LngLatLike)
        .addTo(mapInstance!) as IMarker
    }
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
