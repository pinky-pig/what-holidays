import { defineStore } from 'pinia'

export const useAreaStore = defineStore({
  id: 'areaStore',
  state: () => {
    return {
      currentArea: 'China',
    }
  },
  getters: {},
  actions: {},
})
