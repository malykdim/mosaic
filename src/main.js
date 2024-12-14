import { createApp, markRaw } from 'vue'
import { createPinia } from 'pinia'

import router from './config/router'
import { useUserStore } from './stores/useUserStore'

import './assets/main.scss'
import App from './App.vue'

import Navigation from './components/navigation/Navigation.vue'
import Footer from './components/footer/Footer.vue'
import NotFound from './views/NotFound.vue'

const pinia = createPinia()
pinia.use(({ store }) => {
    store.router = markRaw(router)
})

const app = createApp(App)

app.use(pinia)
app.use(router)

const userStore = useUserStore()
userStore.checkUser()

app.component('Navigation', Navigation)
app.component('Footer', Footer)
app.component('NotFound', NotFound)

app.mount('#app')
