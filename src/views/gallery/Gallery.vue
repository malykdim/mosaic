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