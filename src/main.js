import { createApp } from 'vue'
import router from './config/router'

import './assets/main.scss'
import App from './App.vue'

import Navigation from './components/navigation/Navigation.vue'
import Footer from './components/footer/Footer.vue'

const app = createApp(App)

app.use(router)

app.component('Navigation', Navigation)
app.component('Footer', Footer)

app.mount('#app')
