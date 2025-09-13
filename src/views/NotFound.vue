<script setup>

</script>

<template>
    <div class="page not-found">
        <h2 class="title">404</h2>
        <p class="subtitle">Page not found</p>  
        <router-link to="{name: 'home'}" class="link">Go to Home</router-link>
    </div>
</template>

<style lang='scss' scoped>
.not-found {
    margin-top: 15rem;
    color: #fff;
}
</style>