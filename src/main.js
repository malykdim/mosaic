import { createApp } from 'vue'
import router from './config/router'

import './style.css'
import App from './App.vue'

const app = createApp(App)

app.use(router)
app.mount('#app')
