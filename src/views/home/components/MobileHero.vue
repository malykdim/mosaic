<script setup>
import Overlay from './Overlay.vue'
import desktopGridItems from '../data/desktopGridItems.js'
</script>

<template>
    <section class="mobile-hero">
        <Overlay />
        <div class="slider-container">
            <div class="slider-track">
                <div class="slide auto" v-for="item in desktopGridItems" :key="item.id">
                    <img :src="item.url" alt="mosaic" class="image">
                </div>
            </div>
        </div>
    </section>

</template>

<style lang='scss' scoped>
.mobile-hero {
    position: relative;
    width: 100%;
    aspect-ratio: 16/10; 


    .slider-container {
        width: 100%;
        height: 100%;
        overflow: hidden;
        scroll-snap-type: x mandatory;
        -webkit-overflow-scrolling: touch;
        padding: 0;

        .slider-track {
            height: 100%;
            
            display: flex;

            transition: transform 0.5s ease-in-out;

            .slide {
                flex: 0 0 100%;
                scroll-snap-align: center;
                height: 100%;
                animation: auto 16s infinite;

                .image {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    border-radius: 2px;
                    transition: all 16s ease;
                }
            }
        }
    }
}

@keyframes auto {
    0% {
        transform: translateX(0);
    }
    25% {
        transform: translateX(0);
    }
    26% {
        transform: translateX(-100%);
    }
    50% {
        transform: translateX(-100%);
    }
    51% {
        transform: translateX(-200%);
    }
    75% {
        transform: translateX(-200%);
    }
    76% {
        transform: translateX(-300%);
    }
    100% {
        transform: translateX(-300%);
    }
}
</style>