<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useUserStore } from '../../stores/useUserStore'
import { useI18n } from '../../stores/useI18n'

// import TranslationSelectorButtons from './TranslationSelectorButtons.vue'
import TranslationSelectorDropdown from './TranslationSelectorDropdown.vue'

const userStore = useUserStore()
const { translate } = useI18n()

const mobileMenu = ref(window.innerWidth <= 667)
const isMenuOpen = ref(false)

const updateScreenSize = () => {
    mobileMenu.value = window.innerWidth <= 667
    if (!mobileMenu.value) {
        isMenuOpen.value = false // Close menu if screen is resized to larger
    }
}

const toggleMobileMenu = () => {
    isMenuOpen.value = !isMenuOpen.value
}

onMounted(() => {
    updateScreenSize()
    window.addEventListener('resize', updateScreenSize)
})

onUnmounted(() => {
    window.removeEventListener('resize', updateScreenSize)
})

</script>

<template>
    <nav class="nav" :class="{ 'menu-open': isMenuOpen }">
        <router-link :to="{ name: 'home' }" v-if="mobileMenu && !isMenuOpen" class="logo-container">
            <img src="/logo.png" class="logo" alt="Logo" />
        </router-link>

        <!-- Mobile menu -->
        <div v-if="mobileMenu && isMenuOpen" class="mobile-menu">
            <button 
                @click="toggleMobileMenu" 
                class="menu-toggle"
                aria-label="Close menu"
            >                
                ✖
            </button>
            <!-- <TranslationSelectorButtons /> -->
            <TranslationSelectorDropdown />
            <router-link :to="{ name: 'home' }" class="link" @click="toggleMobileMenu">{{translate('nav.home')}}</router-link>
            <router-link :to="{ name: 'gallery' }" class="link" @click="toggleMobileMenu">{{translate('nav.gallery')}}</router-link>
            <router-link v-if="userStore.user" :to="{ name: 'admin-dashboard' }" class="link" @click="toggleMobileMenu">{{translate('nav.dashboard')}}</router-link>
        </div>

        <!-- Hamburger or Close button -->
        <button 
            v-if="mobileMenu && !isMenuOpen" 
            class="menu-toggle" 
            @click="toggleMobileMenu"
            aria-label="Open menu"
        >
            ☰
        </button>

        <!-- Desktop links -->
        <div v-if="!mobileMenu" class="desktop-links">
            <router-link :to="{ name: 'home' }" class="link btn">{{translate('nav.home')}}</router-link>
            <router-link :to="{ name: 'gallery' }" :class="['link', { btn: !mobileMenu }]">{{translate('nav.gallery')}}</router-link>
            <router-link v-if="userStore.user" :to="{ name: 'admin-dashboard' }" :class="['link', { btn: !mobileMenu }]">{{translate('nav.dashboard')}}</router-link>
            <!-- <TranslationSelectorButtons /> -->
            <TranslationSelectorDropdown />
        </div>
    </nav>
</template>

<style lang='scss' scoped>
@use '../../assets/partials/navigation' as *;
</style>