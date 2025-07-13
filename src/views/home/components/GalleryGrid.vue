<script setup>
import { ref } from 'vue'

import Mosaic from './Mosaic.vue'

const arr = ref([
    {url: 'https://zgryiqgcybclzdetpstg.supabase.co/storage/v1/object/public/mosaics//1745499821561-140363244_1824553297701225_7713860648211532736_n.jpg', cl: 'tall'},
    {url: 'https://zgryiqgcybclzdetpstg.supabase.co/storage/v1/object/public/mosaics/public/art-31-tear.jpg', cl: 'tall'},
    {url: 'https://zgryiqgcybclzdetpstg.supabase.co/storage/v1/object/public/mosaics//1744515094704-art-17.jpg', cl: 'tall'},
    {url: 'https://zgryiqgcybclzdetpstg.supabase.co/storage/v1/object/public/mosaics//1744514819442-art-24.jpg', cl: 'short'},
    {url: 'https://zgryiqgcybclzdetpstg.supabase.co/storage/v1/object/public/mosaics//1744339279574-art-14.jpg', cl: 'short'},
    {url: 'https://zgryiqgcybclzdetpstg.supabase.co/storage/v1/object/public/mosaics//1744338842933-art-22.jpg', cl: 'short'},
    {url: 'https://zgryiqgcybclzdetpstg.supabase.co/storage/v1/object/public/mosaics/public/art-9-sun.jpg', cl: 'short'},
    {url: 'https://zgryiqgcybclzdetpstg.supabase.co/storage/v1/object/public/mosaics/public/art-13-dragon.jpg', cl: 'short'},
    {url: 'https://zgryiqgcybclzdetpstg.supabase.co/storage/v1/object/public/mosaics//1744420288796-art-10.jpg', cl: 'short'},
    {url: 'https://zgryiqgcybclzdetpstg.supabase.co/storage/v1/object/public/mosaics//1744339688477-art-8.jpg', cl: 'short'},
    {url: 'https://zgryiqgcybclzdetpstg.supabase.co/storage/v1/object/public/mosaics/public/art-11.jpg', cl: 'tall'},
])

</script>

<template>
    
<div class="masonry">

    <Mosaic v-for="item in arr" :mosaic="item" />
    
</div>

</template>

<style lang='scss' scoped>
.masonry {
    --auto-grid-min-size: 16rem;

    justify-self: center;

    max-width: 1200px;
    padding: 0;
    
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(var(--auto-grid-min-size), 1fr));
    grid-auto-rows: 250px;
    gap: 1rem;
    
    margin: 0 auto;
    margin-top: 4rem;
    
    @media screen and (max-width: 890px) {
        grid-template-columns: repeat(2, 350px); 
        justify-self: center;
    }
    @media screen and (max-width: 767px) {
        grid-template-columns: repeat(2, 300px);
        justify-self: center;
        
        max-width: 768px;
        margin: 0; 
        padding: 0;    
    }
    @media screen and (max-width: 500px) {
        grid-template-columns: 350px;
        max-width: 100%;
        align-self: center;
        justify-self: center;
    }

}
</style>