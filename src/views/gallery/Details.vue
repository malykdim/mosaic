<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { useGalleryListener } from '../../stores/useGalleryListener.js'

const router = useRouter()
const route = useRoute()
const id = Number(route.params.id)
console.log(id)

const singleItem = ref(null)
const error = ref(null)

const { getSingleItem } = useGalleryListener()

onMounted(async () => {
    try {
        const { data, error: fetchError } = await getSingleItem('mosaics', id)
        
        if (fetchError) {
            console.error(`Error during getSingleItem: ${fetchError.message}`)
            error.value = fetchError.message
            router.replace({ name: 'not-found' })
            return
        } else if(!data){
            router.replace({ name: 'not-found' })
            return
        } else {
            singleItem.value = data
            // console.log(singleItem.value)
        }
    } catch (err) {
        console.error('Unexpected error fetching details:', err)
        router.replace({ name: 'not-found' })
    }    
})
</script>

<template>
    <section class="details">
        <div v-if="error" class="error">{{ error }}</div>

        <div v-else-if="singleItem" class="item">
            <div class="image">

                <img :src="singleItem.imageUrl" :alt="singleItem.title">
            </div>
            <div class="info">

                <h4 class="title">{{ singleItem.title }}</h4>
                <h5 class="author">{{ singleItem.author }}</h5>
                <hr>
                <p class="materials" v-for="mat in singleItem.materials" :key="mat">{{ mat }}</p>
                <hr>
                <p class="dimensions">{{ singleItem.dimensions.w }}{{ singleItem.dimensions.unit }} x {{ singleItem.dimensions.h }}{{ singleItem.dimensions.unit }}</p>
            </div>
        </div>

        <div v-else>Loading...</div>
    </section>
</template>