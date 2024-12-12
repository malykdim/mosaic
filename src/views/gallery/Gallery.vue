<script setup>
import { ref } from 'vue';

import getCollection from '../../composables/getCollection'

const { error, documents } = getCollection('mosaics')
console.log(documents)

</script>

<template>
    <div class="gallery">
        <div v-if="error" class="error">Could not fetch the data</div>
        <div v-if="documents" class="items">
            <div v-for="document in documents" :key="document.id">
                    <h4>{{ document.title }}</h4>
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

    h2 {
        color: var(--primary);
    }
    .items {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
        gap: 1rem;


    }
}
</style>