<script setup>
import { onMounted } from 'vue'
import { useGalleryListener } from '../../../stores/useGalleryListener.js'
import MiniItem from './MiniItem.vue'
import ImageSkeleton from '../../../components/ImageSkeleton.vue'
const { mosaics, isLoading, error, startListening } = useGalleryListener()

onMounted(() => startListening())

</script>

<template>
  <div class="mini-gallery">
      <!-- Show error if it exists -->
      <div v-if="error" class="error">
        Не можахме да заредим галерията. Моля, опитайте отново.
      </div>

      <!-- Show skeletons while loading -->
      <div  v-if="isLoading" class="items">
        <div v-for="n in 6" :key="`skeleton-${n}`" class="item">
            <ImageSkeleton />
        </div>
      </div>

      <!-- Show actual content when loaded -->
      <div  v-if="mosaics.length" class="items">
        <MiniItem v-for="item in mosaics" :key="item.id" :item="item" />
      </div>

      <!-- Show empty state if no items -->
      <div v-else class="empty-state">
          Все още няма мозайки в галерията.
      </div>
  </div>
</template>