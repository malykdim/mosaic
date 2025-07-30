import { createApp, markRaw } from 'vue'
import { createPinia } from 'pinia'

import router from './config/router'
import { useUserStore } from './stores/useUserStore'

import './assets/main.scss'
import App from './App.vue'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)
app.mount('#app')

const userStore = useUserStore()
userStore.checkUser()