import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import routes from 'virtual:generated-pages'
import { MotionPlugin } from '@vueuse/motion'

import 'splitpanes/dist/splitpanes.css'
import '@unocss/reset/tailwind.css'
import './styles/main.css'
import 'uno.css'
import 'leaflet/dist/leaflet.css'
import '~/components/lit'

import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import App from './App.vue'
import { i18n } from './i18n/index'

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
app.use(i18n)

app.mount('#app')
