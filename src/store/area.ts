import { defineStore } from 'pinia'
import type { AreaType } from '~/types'

export const useAreaStore = defineStore({
  id: 'areaStore',
  state: () => {
    return {
      currentArea: null as AreaType | null,
    }
  },
  getters: {},
  actions: {},
  persist: {
    // 开启数据缓存。默认session
    enabled: true,
    strategies: [
      {
        key: 'area',
        storage: localStorage,
        paths: ['currentArea'],
      },
    ],
  },
})
