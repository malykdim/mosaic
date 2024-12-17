<script setup>
import { ref } from 'vue'

import { useCollection } from '../../stores/useCollection'
import { useUserStore } from '../../stores/useUserStore'
import { useCreateItem } from '../../stores/useCreateItem'

import Title from './components/Title.vue'
import Author from './components/Author.vue'
import Image from './components/Image.vue'
import Dimensions from './components/Dimensions.vue'
import Materials from './components/Materials.vue'

const { error, addDoc } = useCollection('mosaics')
const { user, checkUser } = useUserStore()
const { item } = useCreateItem()

const isPending = ref(false)
const addDocError = ref(null)
const newItem = ref(null)

const handleCreate = async () => {
    if (!title.value || !author.value || !image.value || !materials.value || !dimensions.value) {
        alert('Please fill in all fields')
        return
    }
    
    if (!user.value) {
        alert('Please log in to create a new item')
        return
    }

    isPending.value = true

    try {
        const { data } = await addDoc(item)
        newItem.value = data
        isPending.value = false
        alert('Mosaic added successfully', newItem.value)

        item.title.value = ''
        item.author.value = ''
        item.dimensions.value = { w: 0, h: 0, unit: '' }
        item.materials.value = []
        item.imageUrl.value = ''
        // Emit event to reset preview URL
        emit('formSubmitted')
        resetPreviewUrl()
    } catch (error) {
        console.error('Error adding document:', error)
        addDocError.value = error
        isPending.value = false        
    }        
}

function resetPreviewUrl() {
  // This function will be called when the form is submitted to reset the preview URL
  const imageComponent = this.$refs.imageComponent
  if (imageComponent) {
    imageComponent.resetPreviewUrl()
  }
}
</script>

<template>
<div class="create-container">
    <h3 class="title">Create new panneaux</h3>

    <form @submit.prevent="handleCreate" class="create">
        <div class="formFields">
            <!-- LEFT -->
            <div class="picture">
                <Image />   
                <div class="error"></div>             
            </div>


            <!-- RIGHT -->    
            <div class="info">
                <Title />
                <Author />
                <Dimensions />
                <Materials />
                <div class="error"></div>
            </div>    
        </div>

        <Notifications />
        
        <div class="submit">
            <button v-if="!isPending" type="submit">Create</button>
            <button v-else disabled>Saving...</button>
        </div>
    </form>
</div>
</template>

<style lang='scss' scoped>
.create-container {
    width: 100%;
    margin: 0 auto;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .title {
        margin: -1rem 0 3rem 0;
    }

    .create {
        width: 100%;
        margin: 0 auto;

        .formFields {
            width: 100%;
            margin: 0 auto;

            display: flex;
            justify-content: center;
            align-items: flex-start;
            gap: 2rem;

            .info {
                width: 40%;
            }

            .picture {
                width: 40%;
            }
        }
    }
}
</style>