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