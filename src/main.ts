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
import piniaPluginPersist from 'pinia-plugin-persist'
import App from './App.vue'

const app = createApp(App)
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})
const store = createPinia()
store.use(piniaPluginPersist)
app.use(store)

app.use(MotionPlugin)
app.use(router)
app.mount('#app')
