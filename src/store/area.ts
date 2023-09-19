import { defineStore } from 'pinia'
import type { RouteLocationRaw } from 'vue-router'
import { parse, stringify } from 'zipson'
import type { AreaType, IPopup } from '~/types'

export interface AllAreaType {
  code: string
  name: string
  flag: string
  location: {
    code: string
    latitude: number
    longitude: number
    name: string
  } | undefined
}
export const useAreaStore = defineStore(
  'areaStore',
  () => {
    const router = useRouter()

    // 在 setup 的写法中， state 定义成响应式的，才能使用下面这个 pinia-plugin-persistedstate

    // 1. 所有的地区信息
    const allAreas = ref<AllAreaType[]>([])
    // 2. 当前的地区信息
    const currentArea = ref<AreaType | null>(null)
    // 3. 地图上的 popup
    const markerPopup = ref<IPopup | null>(null)
    // 4. 当前语言模式
    // 4.1 各地区对应的语言
    // 4.2 英文 'en'
    const currentLanguage = ref('')

    // 5. Mapbox 地图实例
    const mapInstance = ref<mapboxgl.Map | null>(null)

    // 路由跳转，popup 使用 createApp()
    function goRouter(options: RouteLocationRaw) {
      router.push(options)
    }

    return {
      allAreas,
      currentArea,
      markerPopup,
      currentLanguage,
      mapInstance,
      goRouter,
    }
  },
  {
    persist: {
      key: 'area',
      storage: localStorage,
      paths: ['currentArea'],
      serializer: {
        deserialize: parse,
        serialize: stringify,
      },
    },
  },
)
