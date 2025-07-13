<script setup>
import { ref } from 'vue'
import ClaudeGridItem from './ClaudeGridItem.vue'

const items = ref([
    {url: 'https://zgryiqgcybclzdetpstg.supabase.co/storage/v1/object/public/mosaics//1744515094704-art-17.jpg', cl: 'square'},
    {url: 'https://zgryiqgcybclzdetpstg.supabase.co/storage/v1/object/public/mosaics//1745499821561-140363244_1824553297701225_7713860648211532736_n.jpg', cl: 'tall'},
    {url: 'https://zgryiqgcybclzdetpstg.supabase.co/storage/v1/object/public/mosaics//1744514819442-art-24.jpg', cl: 'square'},
    {url: 'https://zgryiqgcybclzdetpstg.supabase.co/storage/v1/object/public/mosaics/public/art-11.jpg', cl: 'tall', cl: 'square'},
    {url: 'https://zgryiqgcybclzdetpstg.supabase.co/storage/v1/object/public/mosaics/public/art-9-sun.jpg', cl: 'square'},
    {url: 'https://zgryiqgcybclzdetpstg.supabase.co/storage/v1/object/public/mosaics//1744339279574-art-14.jpg', cl: 'wide'},
    {url: 'https://zgryiqgcybclzdetpstg.supabase.co/storage/v1/object/public/mosaics//1744338842933-art-22.jpg', cl: 'wide'},
    {url: 'https://zgryiqgcybclzdetpstg.supabase.co/storage/v1/object/public/mosaics/public/art-31-tear.jpg', cl: 'tall'},
    {url: 'https://zgryiqgcybclzdetpstg.supabase.co/storage/v1/object/public/mosaics/public/art-13-dragon.jpg', cl: 'square'},
    {url: 'https://zgryiqgcybclzdetpstg.supabase.co/storage/v1/object/public/mosaics//1744420288796-art-10.jpg', cl: 'square'},
    {url: 'https://zgryiqgcybclzdetpstg.supabase.co/storage/v1/object/public/mosaics//1744339688477-art-8.jpg', cl: 'wide'},
  // More items...
])
</script>

<template>
    <div class="grid-container">
        <div class="image-grid">
          <ClaudeGridItem 
            v-for="(item, index) in items" 
            :key="index" 
            :item="item" 
            :index="index"
          />
        </div>
    </div>
</template>

<style lang='scss' scoped>
.grid-container {
    width: 100%;
    padding: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
}
.image-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  grid-auto-rows: 150px;
  grid-gap: .2rem;
  width: 100%;
  max-width: 1200px; 
}
@media (max-width: 768px) {
  .image-grid {
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
    grid-auto-rows: 120px;
    grid-gap: 8px;
  }
}
</style>