<script setup>
import { useUserStore } from '../../stores/useUserStore'

const userStore = useUserStore()
</script>

<template>
    <nav class="nav">
        <router-link :to="{ name: 'home' }" class="logo-container">
            <img src="/logo.png" class="logo" alt="Logo" />
        </router-link>
        <router-link :to="{ name: 'gallery'}" class="link btn">Gallery</router-link>
        <router-link v-if="userStore.user" :to="{ name: 'dashboard'}" class="link btn">Dashboard</router-link>
    </nav>
</template>

<style lang='scss' scoped>
.nav {
    width: 100%;
    max-width: 1200px;

    display: flex;
    justify-content: center;
    align-items: center;
    gap: 5rem;

    // padding: 0; 
    padding: var(--safe-area-inset-top) var(--safe-area-inset-right) var(--safe-area-inset-bottom) var(--safe-area-inset-left);   

    overflow: hidden;

    .logo-container {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 1em;
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

    .link {
        text-decoration: none;
        color: var(--primary);

        &:hover {
            color: white;
            background: var(--primary);
        }
    }

    .auth {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-left: auto;

        .link {
            margin: 0 0.5em;
        }
    }
}
</style>