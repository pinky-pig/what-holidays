import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import routes from 'virtual:generated-pages'
import { MotionPlugin } from '@vueuse/motion'

import '@unocss/reset/tailwind.css'
import './styles/main.css'
import 'uno.css'
import 'cesium/Build/Cesium/Widgets/widgets.css'
import 'leaflet/dist/leaflet.css'
import '~/components/lit'

import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import App from './App.vue'

const app = createApp(App)
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
app.use(pinia)

app.use(MotionPlugin)
app.use(router)
app.mount('#app')
