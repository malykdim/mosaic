import { createApp } from 'vue'
import { createPinia } from 'pinia'

import router from './config/router'
import { useI18n } from './stores/useI18n'
import { useUserStore } from './stores/useUserStore'

import './assets/main.scss'
import App from './App.vue'

const app = createApp(App)

console.log('app:', app)
console.log('app.mount:', app.mount)
console.log('typeof app.mount:', typeof app.mount)

const pinia = createPinia()

app.use(pinia)
app.use(router)

const i18n = useI18n()
const userStore = useUserStore()

// set initial locale synchronously to avoid UI flash
const initLangCandidate = localStorage.getItem('locale') || navigator.language?.slice(0,2) || i18n.availableLocales[0] || 'en'
let initLang = String(initLangCandidate).slice(0,2).toLowerCase()
if (!i18n.availableLocales.includes(initLang)) initLang = i18n.availableLocales[0] ?? 'en'
i18n.setLocale(initLang, { persistToProfile: false })

app.mount('#app');

(async () => {
    try {
        await userStore.checkUser()
        const userPref = userStore.user?.value?.preferred_language ?? userStore.user?.preferred_language
        
        if (userPref) {
            const pref = String(userPref).slice(0,2).toLowerCase()
            if (i18n.availableLocales.includes(pref)) {
                await i18n.setLocale(pref, { persistToProfile: false })
                return
            }
        }
        
        // if nothing stored for user, prefer localStorage/browser
        if (!localStorage.getItem('locale')) {
            const browserLang = String(navigator.language || '').slice(0,2).toLowerCase()
            if (i18n.availableLocales.includes(browserLang)) await i18n.setLocale(browserLang, { persistToProfile: false })
            }
    } catch (err) {
        console.error('i18n init failed:', err)
    }
})()