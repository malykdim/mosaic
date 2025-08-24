import { ref, computed } from 'vue'
import { useUserStore } from './useUserStore'

import en from '../locales/en.json'
import de from '../locales/de.json'
import bg from '../locales/bg.json'

const messages = { en, de, bg }
const defaultLocale = 'en'
const STORAGE_KEY = 'locale'

let _i18nInstance = null

export const useI18n = () => {
    if (_i18nInstance) return _i18nInstance

    const userStore = useUserStore()
    const availableLocales = Object.keys(messages)

    const locale = ref(localStorage.getItem(STORAGE_KEY) || defaultLocale)
    const missingKeys = new Set()

    const currentMessages = computed(() => messages[locale.value] || messages[defaultLocale])

    function _lookup(obj, path) {
        return path.split('.').reduce((o, k) => (o && k in o ? o[k] : undefined), obj)
    }

    function translate (key, vars = {}) {
        const value = _lookup(currentMessages.value, key) ?? _lookup(messages[defaultLocale], key)
        if (value == null) {
        if (!missingKeys.has(key)) {
            missingKeys.add(key)
            console.warn(`[i18n] missing key: ${key} for locale ${locale.value}`)
        }
        return key
        }
        return String(value).replace(/\{([^}]+)\}/g, (_, v) => (v in vars ? vars[v] : `{${v}}`))
    }

    async function setLocale(lang, { persistToProfile = true } = {}) {
        if (!messages[lang]) {
        console.warn(`[i18n] unknown locale: ${lang}`)
        return
        }
        locale.value = lang
        localStorage.setItem(STORAGE_KEY, lang)

        if (persistToProfile && userStore?.user) {
        if (typeof userStore.setPreferredLanguage === 'function') {
            try { await userStore.setPreferredLanguage(lang) } catch (e) { /* ignore */ }
        } else if (typeof userStore.updateProfile === 'function') {
            try { await userStore.updateProfile({ preferred_language: lang }) } catch (e) { /* ignore */ }
        } else if (typeof userStore.saveProfile === 'function') {
            try { await userStore.saveProfile({ preferred_language: lang }) } catch (e) { /* ignore */ }
        }
        }
    }

    async function loadLocale(lang) {
        if (messages[lang]) return messages[lang]
        return null
    }


    _i18nInstance = {
        locale,
        setLocale,
        translate,
        t: translate,
        availableLocales,
        loadLocale
    }
    return _i18nInstance
}