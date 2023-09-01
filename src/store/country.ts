import { defineStore } from 'pinia'

export const useCountryStore = defineStore({
  id: 'countryStore',
  state: () => {
    return {
      currentCountry: 'China',
    }
  },
  getters: {},
  actions: {},
})
