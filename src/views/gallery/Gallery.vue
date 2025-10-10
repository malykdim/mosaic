<script setup>
import { useGalleryListener } from '../../stores/useGalleryListener.js'
import ListItem from './ListItem.vue'
import ImageSkeleton from '../../components/ImageSkeleton.vue'
const { mosaics, isLoading, error, startListening } = useGalleryListener()

startListening()
</script>

<template>
    <div class="page gallery">
        <!-- Show error if it exists -->
        <!-- <div v-if="error" class="error">Could not fetch the data</div> -->
        <div v-if="error" class="error">Не можахме да заредим галерията. Моля, опитайте отново.</div>

        <!-- Show skeletons while loading -->
        <div v-else-if="isLoading" class="items">
            <div v-for="n in 6" :key="`skeleton-${n}`" class="item">
                <ImageSkeleton />
            </div>
        </div>

        <!-- Show actual content when loaded -->
        <div  v-else-if="mosaics.length" class="items">
            <div v-for="item in mosaics" :key="item.id" class="item">
                <ListItem :item="item" />
            </div>
        </div>

        <!-- Show empty state if no items -->
        <div v-else class="empty-state">
            Все още няма мозайки в галерията.
        </div>
    </div>
</template>

<style scoped>
.error {
  padding: 2rem;
  text-align: center;
  color: var(--warning);
  font-size: 1.1rem;
}

.empty-state {
  padding: 4rem 2rem;
  text-align: center;
  color: var(--input);
  font-size: 1.1rem;
}
</style>