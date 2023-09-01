import { defineStore } from 'pinia'

export const useLayoutStore = defineStore({
  id: 'layoutStore',
  state: () => {
    return {
      isShowHolidaysCalendar: true,
    }
  },
  getters: {},
  actions: {
    setShowHolidaysCalendar(flag: boolean) {
      this.isShowHolidaysCalendar = flag
    },
  },
})
