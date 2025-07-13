import { createApp, markRaw } from 'vue'
import { createPinia } from 'pinia'

import router from './config/router'
import { useUserStore } from './stores/useUserStore'

import './assets/main.scss'
import App from './App.vue'

const pinia = createPinia()
pinia.use(({ store }) => {
    store.router = markRaw(router)
})

const app = createApp(App)

app.use(pinia)
app.use(router)

const userStore = useUserStore()
userStore.checkUser()

app.mount('#app')