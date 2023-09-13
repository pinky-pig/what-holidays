<script setup lang="ts">
import type { LngLatLike } from 'mapbox-gl'
import mapboxgl from 'mapbox-gl'
import Holidays from 'date-holidays'
import type { IMarker, IPopup } from '~/types'
import LOCATIONS from '~/assets/json/location.json'
import CustomMapboxPopup from '~/components/ui/CustomMapboxPopup.vue'
import ScratchyModal from '~/components/ui/ScratchyModal.vue'

const store = useAreaStore()
const router = useRouter()

const hd = new Holidays()

/**
 * 定义弹窗
 */
const $ScratchyModal = ref<typeof ScratchyModal | null>(null)
// function open() {
//   $ScratchyModal.value!.open()
// }

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
    initMarkerPopup()

    initUserPosition()

    initAreaPosition()
  })
}

/**
 * 使用 marker 创建 popup
 */
function initMarkerPopup() {
  const el = document.createElement('div')
  el.id = 'customMapboxPopup'

  store.markerPopup = new mapboxgl.Marker(
    el,
    {
      offset: [0, -20], // [宽, 高]  这个值应该是 -50% ，数值是根据挂载的 div 的高度计算的
      anchor: 'bottom',
    },
  )
    .setLngLat([0, 0] as LngLatLike)
    .addTo(mapInstance!) as IPopup

  const popup = createApp(CustomMapboxPopup)
  popup.mount('#customMapboxPopup')

  // store.markerPopup.remove()

  store.markerPopup.attributes = {
    isShow: false,
    show(position: LngLatLike) {
      if (!store.markerPopup)
        return

      if (store.markerPopup.attributes.isShow) {
        // 说明已经显示了，设置位置就行了

        const popDom = document.getElementById('customMapboxPopup')
        if (popDom) {
          popDom.style.zIndex = '-1'
          store.markerPopup?.setLngLat(position as LngLatLike)
          popDom.style.animation = ''

          setTimeout(() => {
            popDom.style.zIndex = '99'
            popDom.style.animation = 'blur-show .4s'
          })
        }
      }
      else {
        // 说明选择没有显示，那么设置位置，再添加到地图上
        store.markerPopup?.setLngLat(position as LngLatLike)
        store.markerPopup.attributes.isShow = true
        // mapInstance && store.markerPopup!.addTo(mapInstance!)

        const popDom = document.getElementById('customMapboxPopup')
        if (popDom) {
          popDom.style.zIndex = '99'
          popDom.style.animation = 'blur-show .4s'
        }
      }
    },
    hide() {
      if (!store.markerPopup)
        return
      if (store.markerPopup.attributes.isShow) {
        // 说明已经显示了，移除
        store.markerPopup.attributes.isShow = false
        const popDom = document.getElementById('customMapboxPopup')
        if (popDom) {
          popDom.style.animation = 'blur-hide .4s'
          setTimeout(() => {
            popDom.style.zIndex = '-1'
          }, 300)
        }
        // store.markerPopup.remove()
      }
      else {
      // 说明选择没有显示，那么不需要操作
      }
    },
  }
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
        router.push('/area')
        // open()
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
      const el = document.createElement('div')
      el.innerHTML = `
      <div class="hover:scale-110 flex flex-col items-center space-y-0.5 w-fit" style="max-width: 150px;">
        <div class="hover:animate-[shake_1.5s_ease-in-out_infinite] border-2 rounded border-solid px-1.5 flex items-center space-x-0.5 overflow-hidden w-fit cursor-pointer shadow-[rgba(170,166,170,0.40)] shadow-md bg-[rgba(152,208,255,0.5)] border-white py-[0.1875rem]">
          <img
            src="${area.flag}"
            class="w-4 h-4 block "
          >
        </div>
      </div>
      `
      const marker = new mapboxgl.Marker(el)
        .setLngLat([area.location.longitude, area.location.latitude] as LngLatLike)
        .addTo(mapInstance!) as IMarker

      marker.attributes = area

      marker.getElement().addEventListener('click', (e) => {
        store.currentArea = area

        if (area.location?.longitude && area.location?.latitude)
          store.markerPopup!.attributes.show([area.location.longitude, area.location.latitude])

        // router.push({
        //   path: '/area',
        //   query: {
        //     code: area.code,
        //   },
        // })
      })
    }
  })
}
</script>

<template>
  <div class="h-full w-full overflow-hidden">
    <MapboxMap @onload="marsOnloaded" />

    <ScratchyModal ref="$ScratchyModal" />
  </div>
</template>

<style scoped>

</style>
