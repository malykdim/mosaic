<script setup>
import MiniGallery from './components/MiniGallery.vue'

</script>

<template>
    <div class="dashboard">
        <nav class="admin-menu">
            <router-link to="/admin/create" class="btn">Create</router-link>
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
    gap: 1rem;
    margin-bottom: 3rem;

    .admin-menu {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        gap: 0.5rem;
        margin: 20px 0;

        .btn {
            padding: 0.5rem 1rem;
            background-color: var(--primary);
            color: white;
            text-decoration: none;
            border-radius: 4px;
            transition: background-color 0.3s;

            &:hover {
                font-weight: 600;
            }
        }   
    }
}
</style>