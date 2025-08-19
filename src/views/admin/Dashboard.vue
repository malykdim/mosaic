<script setup>
import { useUserStore } from '../../stores/useUserStore'

import MiniGallery from './components/MiniGallery.vue'

const userStore = useUserStore()
</script>

<template>
    <div class="dashboard">
        <nav class="admin-menu">
            <router-link to="/admin/create" class="btn" aria-label="Create mosaic">Create</router-link>
            <button v-if="userStore.user" @click="userStore.logout" class="btn" aria-label="Logout">Logout</button>
        </nav>
        <MiniGallery />
    </div>
</template>

<style lang='scss' scoped>
.dashboard {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    margin-bottom: 3rem;

    .admin-menu {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        gap: 1rem;
        margin: 20px 0;

        .btn {
            padding: 0.5rem 1rem;
            background-color: var(--primary);
            color: white;
            text-decoration: none;
            border-radius: 4px;
            transition: background-color 0.3s;
            font-size: 1.2em;

            &:hover {
                font-weight: 600;
            }
        }   
    }
}
</style>