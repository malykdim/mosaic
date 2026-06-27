<script setup>
import { useGalleryListener } from '../../stores/useGalleryListenerNew.js'
import { useI18n } from '../../stores/useI18n'

const { mosaics, isLoading, error, selectedAuthor, setAuthorFilter, startListening } = useGalleryListener()
const { translate } = useI18n()
startListening()
</script>

<template>
    <div v-if="mosaics.length" class="filters">
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
</template>