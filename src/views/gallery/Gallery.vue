<script setup>
import { useGalleryListener } from '../../stores/useGalleryListener.js'
import ListItem from './ListItem.vue'
import ImageSkeleton from '../../components/ImageSkeleton.vue'
import { useI18n } from '../../stores/useI18n'
const { mosaics, isLoading, error, selectedAuthor, setAuthorFilter, startListening } = useGalleryListener()
const { translate } = useI18n()
startListening()
</script>

<template>
    <div class="page gallery">
        <!-- Show error if it exists -->
        <!-- <div v-if="error" class="error">Could not fetch the data</div> -->
        <div v-if="error" class="error">Не можахме да заредим галерията. Моля, опитайте отново.</div>

        <div v-if="mosaics.length" class="sort">
            <button 
                class="name" 
                :class="{ active: selectedAuthor === 'all' }"
                @click="setAuthorFilter('all')"
            >
                {{translate('filters.all')}}
            </button>
            <button 
                class="name" 
                :class="{ active: selectedAuthor === 'vladimir' }"
                @click="setAuthorFilter('vladimir')"
            >
                {{translate('filters.vladimir')}}
            </button>
            <button 
                class="name" 
                :class="{ active: selectedAuthor === 'damyan' }"
                @click="setAuthorFilter('damyan')"
            >
                {{translate('filters.damyan')}}
            </button>
        </div>

        <!-- Show skeletons while loading -->
        <div v-if="isLoading" class="items">
            <div v-for="n in 6" :key="`skeleton-${n}`" class="item">
                <ImageSkeleton />
            </div>
        </div>

        <!-- Show actual content when loaded -->
        <div  v-if="mosaics.length" class="items">
            <div v-for="item in mosaics" :key="item.id" class="item">
                <ListItem :item="item" :author="selectedAuthor"/>
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

.sort button.active {
    background-color: var(--input);
    font-weight: bold;
}
</style>