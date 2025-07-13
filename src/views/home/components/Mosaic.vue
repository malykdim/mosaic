<script setup>
const props = defineProps(['mosaic'])
</script>

<template>
<div class="mosaic">
    <img :src="mosaic.url" alt="mosaic" class="image">
</div>
</template>

<style lang='scss' scoped>
.mosaic {
    overflow: hidden;
    border-radius: 4px;
    border: 0.2rem solid #fff;
    box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.05);
    background-color: var(--primary);
    width: 300px;
    height: 300px;
}

.image {
    width: 100%;
    height: 100%;
    object-fit: contain;
    object-position: 50% 50%;
    filter:  grayscale(10%);
}
</style>