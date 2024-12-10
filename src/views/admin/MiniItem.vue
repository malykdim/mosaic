<script setup>
defineProps(['item'])
</script>

<template>    
    <div class="mini-item">Mini Item {{ item }}</div>
</template>

<style lang='scss' scoped>
.mini-item {
    width: 100px;
    height: 60px;
    background-color: #4b4a4a;
    padding: 0;
    border-radius: 2px;
    text-align: center;
}
</style>