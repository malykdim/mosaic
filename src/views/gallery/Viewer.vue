<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useGalleryListener } from '../../stores/useGalleryListenerNew'
import { useI18n } from '../../stores/useI18n'
import Filters from '../../components/navigation/Filters.vue'

const route = useRoute()
const id = Number(route.params.id)

const singleItem = ref(null)
const currentIndex = ref(0)

const { locale, setLocale, availableLocales, translate } = useI18n()

const { 
    mosaics, 
    isLoading,
    selectedAuthor, 
    setAuthorFilter, 
    startListening, 
    getSingleItem,
} = useGalleryListener()

const goNext = () => {
    currentIndex.value++
    if (currentIndex.value === mosaics.value.length) currentIndex.value = 0
    singleItem.value = mosaics.value[currentIndex.value]
}
const goPrev = () => {
    currentIndex.value--
    if (currentIndex.value === -1) currentIndex.value = mosaics.value.length - 1
    singleItem.value = mosaics.value[currentIndex.value]
}

// const handleFilterChange = async (author) => {
//     await setAuthorFilter(author)
//     currentIndex.value = 0
//     singleItem.value = mosaics.value[0]
// }

// React whenever the shared filtered list changes — no matter who triggered it
watch(mosaics, (newMosaics) => {
    const stillVisible = newMosaics.some(m => m.id === singleItem.value?.id)

    if (stillVisible) {
        // Same artwork still matches — keep showing it, just refresh its index
        currentIndex.value = newMosaics.findIndex(m => m.id === singleItem.value.id)
    } else {
        // Filtered out — fall back to the first item in the new set
        currentIndex.value = 0
        singleItem.value = newMosaics[0] ?? null
    }
})

onMounted(async () => {
    const authorFilter = route.query.author || 'all'
    await setAuthorFilter(authorFilter)
    await startListening()
    
    currentIndex.value = mosaics.value.findIndex(m => m.id === id)
    singleItem.value = mosaics.value[currentIndex.value]
})
</script>

<template>
<section class="page viewer">
        <nav class="overlay-filters">
            <Filters />
        </nav>

        <div class="item">
            <div class="arrow left" @click="goPrev">
                <svg xmlns="http://www.w3.org/2000/svg" height="2em" viewBox="0 -960 960 960" width="2em" fill="rgba(210, 175, 93, 0.8)"><path d="M576-240 336-480l240-240 51 51-189 189 189 189-51 51Z"/></svg>
            </div>
            <div class="img-holder">
                <img :src="singleItem?.imageUrl" alt="exquisite mosaic panneau" class="img">
            </div>
            <div class="arrow right" @click="goNext">
                <svg xmlns="http://www.w3.org/2000/svg" height="2em" viewBox="0 -960 960 960" width="2em" fill="rgba(210, 175, 93, 0.8)"><path d="M522-480 333-669l51-51 240 240-240 240-51-51 189-189Z"/></svg>
            </div>
        </div>

        <nav class="overlay-back">
            <router-link to="/gallery" class="overlay-nav">{{translate('filters.back')}}</router-link>
        </nav>
</section>
</template>