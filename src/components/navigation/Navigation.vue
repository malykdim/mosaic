<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useUserStore } from '../../stores/useUserStore'

const userStore = useUserStore()

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
            <button v-if="mobileMenu && isMenuOpen" @click="toggleMobileMenu" class="menu-toggle">✖</button>
            <router-link :to="{ name: 'home' }" class="link" @click="toggleMobileMenu">Home</router-link>
            <router-link :to="{ name: 'gallery' }" class="link" @click="toggleMobileMenu">Gallery</router-link>
            <router-link v-if="userStore.user" :to="{ name: 'dashboard' }" class="link" @click="toggleMobileMenu">Dashboard</router-link>
        </div>

        <!-- Hamburger or Close button -->
        <button v-if="mobileMenu && !isMenuOpen" class="menu-toggle" @click="toggleMobileMenu">
            {{ isMenuOpen ? '✖' : '☰' }}
        </button>

        <!-- Desktop links -->
        <div v-if="!mobileMenu" class="desktop-links">
            <router-link :to="{ name: 'home' }" class="link btn">Home</router-link>
            <router-link :to="{ name: 'gallery' }" :class="['link', { btn: !mobileMenu }]">Gallery</router-link>
            <router-link v-if="userStore.user" :to="{ name: 'dashboard' }" :class="['link', { btn: !mobileMenu }]">Dashboard</router-link>
        </div>
    </nav>
</template>

<style lang='scss' scoped>
@import '../../assets/partials/_link.scss';
@import '../../assets/partials/_button.scss';
.nav {
    width: 100vw;
    background-color: var(--background);
    color: var(--secondary);
    text-transform: lowercase;
    
    display: flex;
    justify-content: space-around;
    align-items: center;
    gap: 5rem;

    padding: 1rem 0;    

    overflow: hidden;

    .logo-container {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0;
        padding-bottom: 0;
        will-change: filter;
        transition: filter 300ms;

        .logo {
            height: 2em;
            will-change: filter;
            transition: filter 300ms;
    
            &:hover {
                filter: drop-shadow(0 0 2em var(--hover));
            }
            &.vue:hover {
                filter: drop-shadow(0 0 2em var(--primary));
            }
        }        
    }

    .menu-toggle {
        background-color: white;
        color: var(--background);
        border: none;
    }

    &.menu-open {
        padding: 0;
    }
    
    .mobile-menu {
        max-width: 100%;
        margin: 0 auto;
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 1rem;
        align-items: center; 
        padding: 0;
        background-color: #fff;
        color: var(--background);
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); 
        z-index: 10; 
        font-size: 1.2em;
        letter-spacing: .2em;
        text-transform: uppercase; 
        padding: 1rem 0;
        
        .link {
            background-color: white;
            color: var(--background);
            border: none;
            padding: .5em 2em;

            &:hover {
                font-weight: bold;
                transition: all 250ms ease-in;
                box-shadow: var(--shadow);
            }
        }
    }

    .desktop-links {
        display: flex;
        justify-content: space-around;
        align-items: center;
        gap: 10rem;
        padding: 0 1rem;

        .link, .btn {
            font-size: 1.2em;
            letter-spacing: .2em;
            text-transform: uppercase;    

            &:hover {
                filter: drop-shadow(0 0 2em var(--hover));
            }
        }
    }

    @media screen and (max-width: 667px) {
        max-width: 100%;
        width: 100%;
        flex-direction: row;
        justify-content: space-around;
        gap: 0.5rem;
        padding: 0.5rem 1rem;
    }
}
</style>
