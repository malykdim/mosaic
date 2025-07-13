<script setup>
import logo from '/logo.png'

</script>

<template>
    <div class="logo-wrapper">
        <img :src="logo" alt="site logo" class="logo">
    </div>
</template>

<style lang='scss' scoped>
.logo-wrapper {
    width: 50px;
    height: 50px;
    background-color: #fff;

    justify-self: center;


    .logo {
        width: 100%;
        height: 100%;
        object-fit: contain;
    }
}
</style>