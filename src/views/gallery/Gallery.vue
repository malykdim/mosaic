<script setup>
import { ref } from 'vue'

const documents = ref([
    {
        id: 1,
        title: 'Document 1',
    },
    {
        id: 2,
        title: 'Document 2',
    },
    {
        id: 3,
        title: 'Document 3',
    },
    {
        id: 4,
        title: 'Document 4',
    },
    {
        id: 5,
        title: 'Document 5',
    }
])

</script>

<template>
    <div class="gallery">
        <div v-if="error" class="error">Could not fetch the data</div>
        <div v-if="documents" class="items">
            <div v-for="document in documents" :key="document.id" :item="document">
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