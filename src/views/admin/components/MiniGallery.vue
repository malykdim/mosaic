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