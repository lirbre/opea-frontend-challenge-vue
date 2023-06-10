import { createApp } from 'vue'
import './style.css'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [{ path: '/', component: App }]
})

const app = createApp(App)

app.provide('router', router)
app.provide('route', router.currentRoute)

app.use(router)
app.mount('#app')
