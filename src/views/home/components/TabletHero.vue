<script setup>
import Overlay from './Overlay.vue'

</script>

<template>    
<div class="tablet-hero">        
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
    <Overlay />
</div>       
</template>

<style lang='scss' scoped>
.tablet-hero {
    position: relative;
    width: 100%;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #413f3f; 

    .background-grid {
        width: 100%;

        display: grid;
        grid-template-columns: repeat(12, 1fr);
        grid-template-rows: repeat(2, minmax(200px, 1fr)); 
        gap: 0.25rem; 

        aspect-ratio: 4/3; 
        z-index: 10;

        .mosaic {
            overflow: hidden;
            border-radius: 2px;
            border: 1px solid #fff;
            box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.05);
            position: relative;

            .image {
                width: 100%;
                height: 100%;
                object-fit: cover;
                object-position: 50% 50%;
                filter:  grayscale(10%);
            }

        }  
        .moon {
            grid-column: 2 / span 3;
            grid-row: 1 / span 1;
        }
        .tear {
            grid-column: 5 / span 4;
            grid-row: 1 / span 2;
        }
        .dragon{
            grid-column: 9 / span 3;
            grid-row: 1 / span 1;
        }
        .four{
            grid-column: 9 / span 3;
            grid-row: 2 / span 1;
        }
        .sun{
            grid-column: 2 / span 3;
            grid-row: 2 / span 1;
        }
        .flower{
            grid-column: 9 / span 3;
            grid-row: 2 / span 1;
        }

    } 
}
</style>