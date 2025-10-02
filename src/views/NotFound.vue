<script setup>

</script>

<template>
    <div class="page not-found background">
        <h1 class="title">404</h1>
        <p class="subtitle">Нямаме такава страница</p>  
        <router-link to="/" class="back">Начало</router-link>
    </div>
</template>

<style lang='scss' scoped>
.not-found {
    margin-top: 15rem;
    color: #fff;
    height: 100%;
    margin-top: 0;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: start;
    gap: 3.5rem;

    .title {
        margin-top: 10rem;
    }

    .subtitle {
        color: var(--primary);
        font-size: larger;
        font-weight: 900;
    }

    .back {
        border-radius: var(--border-radius);
        border: 0;
        padding: 8px 12px;
        font-weight: 300;
        cursor: pointer;
        color: white;
        background-color: var(--primary);
    }
}
</style>