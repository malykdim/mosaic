import { createApp } from 'vue'
import router from './config/router'

import './assets/main.scss'
import App from './App.vue'

import Navigation from './components/navigation/Navigation.vue'

const app = createApp(App)

app.use(router)

app.component('Navigation', Navigation)

app.mount('#app')
