import { defineStore } from 'pinia'

export const countryStore = defineStore({
  id: 'countryStore',
  state: () => {
    return {
      currentCountry: 'China',
    }
  },
  getters: {},
  actions: {},
})
