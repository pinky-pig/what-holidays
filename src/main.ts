import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import routes from 'virtual:generated-pages'
import { MotionPlugin } from '@vueuse/motion'
import App from './App.vue'

import '@unocss/reset/tailwind.css'
import './styles/main.css'
import 'uno.css'
import 'cesium/Build/Cesium/Widgets/widgets.css'
import '~/components/lit'

const app = createApp(App)
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})
app.use(MotionPlugin)
app.use(router)
app.mount('#app')
