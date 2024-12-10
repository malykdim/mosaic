<script setup>
import { ref } from 'vue'

import MiniItem from './MiniItem.vue'

const arr = [1,2,3,4,5,6,7,8,9,10,11,12]
</script>

<template>
<div class="mini-gallery">
    <MiniItem  v-for="item of arr" :item="item" />
</div>
</template>

<style lang='scss' scoped>
.mini-gallery {
    width: 80%;
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: center;
    gap: 0.5rem;
}
</style>