<script setup>
import { useUserStore } from '../../stores/useUserStore'

const userStore = useUserStore()
</script>

<template>
    <nav class="auth">
        <router-link v-if="!userStore.user" :to="{ name: 'admin-login'}" class="link btn">Login</router-link>
        <router-link v-if="!userStore.user" :to="{ name: 'admin-signup'}" class="link btn">Register</router-link>
        <button v-if="userStore.user" @click="userStore.logout" class="link btn">Logout</button>
    </nav>
</template>

<style lang='scss' scoped>
.auth {
    padding-left: 1rem;
    display: flex;
    gap: 0.5rem;
    border-radius: var(--border-radius);
    text-decoration: none;


    .link {
        font-size: 0.8em;
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

    @media screen and (max-width: 767px) and (min-width: 260px) {
        padding: 0;
    }
}
</style>