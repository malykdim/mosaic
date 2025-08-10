<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

import { useGalleryListener } from '../../stores/useGalleryListener.js'

const route = useRoute()
const id = Number(route.params.id)
console.log(id)

const singleItem = ref(null)
const error = ref(null)

const { getSingleItem } = useGalleryListener()

onMounted(async () => {
    const { data, error: fetchError } = await getSingleItem('mosaics', id)
    
    if (fetchError) {
        console.error(`Error during getSingleItem: ${fetchError.message}`)
        error.value = fetchError.message
    } else {
        singleItem.value = data
        console.log(singleItem.value)
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
                <p class="dimensions">{{ singleItem.dimensions.w }}{{ singleItem.dimensions.unit }} x {{ singleItem.dimensions.h }}{{ singleItem.dimensions.unit }}</p>
                <hr>
                <p class="materials" v-for="mat in singleItem.materials" :key="mat">{{ mat }}</p>
            </div>
        </div>

        <div v-else>Loading...</div>
    </section>
</template>

<style lang='scss' scoped>
.details {
    background-color: #fff;

    display: flex;
    justify-content: center;
    align-items: center;

    width: 80%;
    margin-top: 3rem;
    
    .item {
        width: 100%;

        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        background-color: inherit;

        
        .image {
            display: flex;
            justify-content: center;
            align-items: center;
            
            border-radius: 4px;

            img {
                max-width: 100%;
                height: auto;
                border-radius: 4px;
                object-fit: cover;
            }
        }

        .info {
            text-align: center;
            padding: 5%;

            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            gap: 1rem;

            .title {
                font-size: 3.5em;
                font-weight: 300;
                color: var(--primary);
            }
            .author {
                font-size: 1.2rem;
                color: #666;
            }
            .dimensions {
                font-size: 1rem;
                color: #333;
            }
            .materials {
                font-size: 1rem;
                color: #888;
                text-transform: lowercase;
            }
        }

        @media screen and (max-width: 799px) {
            flex-direction: column;

            .image {
                width: 100%;
            }

            .info {
                width: 100%;
                padding: 2rem;
            }
            
        }
    }
}
</style>