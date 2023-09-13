import { defineStore } from 'pinia'
import { parse, stringify } from 'zipson'
import type { AreaType, IPopup } from '~/types'

export const useAreaStore = defineStore(
  'areaStore',
  () => {
    const router = useRouter()

    // 在 setup 的写法中， state 定义成响应式的，才能使用下面这个 pinia-plugin-persistedstate
    const currentArea = ref< AreaType | null>(null)
    const markerPopup = null as IPopup | null

    function goRouter(routerPath: string) {
      router.push(routerPath)
    }

    return {
      currentArea,
      markerPopup,
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
