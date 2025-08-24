<script setup>
const props = defineProps(['mosaic'])
</script>

<template>
<div class="mosaic">
    <img :src="mosaic.url" alt="mosaic" class="image">
</div>
</template>

<style lang='scss' scoped>
@use 'partials/mosaic' as *;
</style>