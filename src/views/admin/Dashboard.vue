<script setup>
import MiniGallery from './components/MiniGallery.vue'

</script>

<template>
    <div class="dashboard">
        <nav class="admin-menu">
            <router-link to="/admin/create" class="btn">Create</router-link>
            <router-link to="/admin/edit" class="btn">Edit</router-link>
            <router-link to="/admin/blog" class="btn">Blog</router-link>
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

    .admin-menu {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        gap: 0.5rem;
        margin: 20px 0;
    }
}
</style>