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
    <nav class="auth">
        <router-link v-if="!user" :to="{ name: 'login'}" class="link btn">Login</router-link>
        <router-link v-if="!user" :to="{ name: 'signup'}" class="link btn">Register</router-link>
        <button v-if="user" @click="logOut" class="link btn">Logout</button>
    </nav>
</template>

<style lang='scss' scoped>
.auth {
    padding-left: 1rem;
    display: flex;
    gap: 0.5rem;
    background: var(--hover);
    border-radius: var(--border-radius);
    .link {
        // margin: 0 0.5rem;
        background: transparent;
        font-size: 0.8em;
        color: transparent;
        text-decoration: none;

        &:hover {
            background: var(--primary);
            color: white;
        }
        &:disabled {
            background: var(--secondary);
            color: var(--primary);
            opacity: 0.5;
            cursor: not-allowed;
        }
    }
}
</style>