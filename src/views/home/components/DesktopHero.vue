<script setup>
import { ref } from 'vue'

// import Mosaic from './Mosaic.vue'
import Overlay from './Overlay.vue'
// import desktopGridItems from '../data/desktopGridItems.js'

</script>

<template>
    
<div class="desktop-hero">
    <Overlay />
    <div class="background-grid">
        <!-- <Mosaic 
            v-for="mosaic in desktopGridItems" 
            :key="mosaic.id" 
            :mosaic="mosaic" 
            :style="gridPositions[mosaic.id]"
        /> -->
        <div class="mosaic moon">
            <img src="https://zgryiqgcybclzdetpstg.supabase.co/storage/v1/object/public/mosaics//1745499821561-140363244_1824553297701225_7713860648211532736_n.jpg" alt="mosaic" class="image">
        </div>
        <div class="mosaic tear">
            <img src="https://zgryiqgcybclzdetpstg.supabase.co/storage/v1/object/public/mosaics/public/art-31-tear.jpg" alt="mosaic" class="image">
        </div>
        <div class="mosaic dragon">
            <img src="https://zgryiqgcybclzdetpstg.supabase.co/storage/v1/object/public/mosaics/public/art-13-dragon.jpg" alt="mosaic" class="image">
        </div>
        <div class="mosaic four">
            <img src="https://zgryiqgcybclzdetpstg.supabase.co/storage/v1/object/public/mosaics//1744420288796-art-10.jpg" alt="mosaic" class="image">
        </div>
        <div class="mosaic sun">
            <img src="https://zgryiqgcybclzdetpstg.supabase.co/storage/v1/object/public/mosaics/public/art-9-sun.jpg" alt="mosaic" class="image">
        </div>
        <div class="mosaic flower">
            <img src="https://zgryiqgcybclzdetpstg.supabase.co/storage/v1/object/public/mosaics//1744420288796-art-10.jpg" alt="mosaic" class="image">
        </div>
    </div>
</div>        

</template>