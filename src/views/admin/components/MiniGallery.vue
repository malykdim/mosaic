<script setup>
import { onMounted } from 'vue'
import { useGalleryListener } from '../../../stores/useGalleryListener.js'
import MiniItem from './MiniItem.vue'

const { mosaics, startListening } = useGalleryListener()

onMounted(() => startListening())

</script>

<template>
<div class="mini-gallery">
    <div  v-if="mosaics.length" class="items">
      <MiniItem v-for="item in mosaics" :key="item.id" :item="item" />
    </div>
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

    .items {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 1rem;
    }    
}
</style>