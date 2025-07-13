<script setup>

import { useGalleryListener } from '../../stores/useGalleryListener.js'
import ListItem from './ListItem.vue'

const { mosaics, startListening } = useGalleryListener()

startListening()

</script>

<template>
    <div class="page gallery">
        <!-- <div v-if="error" class="error">Could not fetch the data</div> -->
        <div  v-if="mosaics.length" class="items">
            <div v-for="item in mosaics" :key="item.id" class="item">
                <ListItem :item="item" />
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.gallery {
    width: 80%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    margin-top: 1rem;

    h2 {
        color: var(--primary);
    }
    .items {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
        gap: 1rem;

        .item {
            width: 300px;
            height: auto;

            img {
                width: 100%;
                height: 100%;
            }
        }
    }
}
@media screen and (max-width: 767px) and (min-width: 260px) {
    .gallery {
        width: 100%;

        .items {
            flex-direction: column;
            align-items: center;
            gap: 0;

            .item {
                width: 100%;
                max-width: 300px; 
            }
        }
    }
}
</style>