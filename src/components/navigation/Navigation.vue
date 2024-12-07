<script setup>
import { useRouter } from 'vue-router'

import useLogout from '../../composables/useLogout'
import getUser from '../../composables/getUser'

const router = useRouter()

const { user } = getUser()
const { logout } = useLogout()

const logOut = async () => {
    const response = await logout()
    console.log('user logged out')
    router.push({ name: 'login' })
}
</script>

<template>
    <nav class="nav">
        <router-link :to="{ name: 'home' }" class="logo-container">
            <img src="/logo.png" class="logo" alt="Logo" />
        </router-link>
        <router-link :to="{ name: 'gallery'}" class="link btn">Gallery</router-link>
        <div class="auth">
            <router-link v-if="!user" :to="{ name: 'login'}" class="link btn">Login</router-link>
            <router-link v-if="!user" :to="{ name: 'signup'}" class="link btn">Register</router-link>
            <button v-if="user" @click="logOut" class="link btn">Logout</button>
        </div>
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