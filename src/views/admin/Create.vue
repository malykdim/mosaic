<script setup>
import { ref, computed } from 'vue'

import { useCollection } from '../../stores/useCollection'
import { useUserStore } from '../../stores/useUserStore'
import { useCreateItem } from '../../stores/useCreateItem'
import { useStorage } from '../../stores/useStorage'

import Image from './components/Image.vue'
import Title from './components/Title.vue'
import Author from './components/Author.vue'
import Dimensions from './components/Dimensions.vue'
import Materials from './components/Materials.vue'
import Notifications from '../../components/Notifications.vue'

const { user, checkUser } = useUserStore()
const { item } = useCreateItem()
const { error, addDoc } = useCollection('mosaics')
const { uploadImage, getImageUrl } = useStorage() // Storage

const isPending = ref(false)
const addDocError = ref(null)
const newItem = ref(null)
const selectedFile = ref(null)

const handleFileSelected = (file) => {
  selectedFile.value = file
}

const resetForm = () => {
    item.imageUrl.value = ''
    item.title.value = ''
    item.author.value = ''
    item.dimensions.value = { w: 0, h: 0, unit: '' }
    item.materials.value = []    
    emit('formSubmitted') // Emit event to reset preview URL
}

const handleCreate = async () => {
    // if (!item.value.title || !item.value.author || !selectedFile.value || !item.value.dimensions.w || !item.value.dimensions.h || !item.value.unit || item.value.materials.length < 2) {
    //     alert('Please fill in all fields')
    //     return
    // }
    console.log('item:', item.value)

    switch (true) {
        case !item.value.title:
            alert('Title is required')
            return
        case !item.value.author:
            alert('Author is required')
            return
        case !selectedFile.value:
            alert('Image file is required')
            return
        case !item.value.dimensions.w:
            alert('Width is required')
            return
        case !item.value.dimensions.h:
            alert('Height is required')
            return
        case !item.value.dimensions.unit:
            alert('Unit is required')
            return
        case item.value.materials.length < 2:
            alert('At least two materials are required')
            return
    }
    isPending.value = true

    try {
        const { data } = await addDoc(item)
        newItem.value = data
        isPending.value = false
        alert('Mosaic added successfully', newItem.value)
        resetForm()
    } catch (error) {
        console.error('Error adding document:', error)
        addDocError.value = error
        isPending.value = false        
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
            </div>


            <!-- RIGHT -->    
            <div class="info">
                <Title />
                <Author />
                <Dimensions />
                <Materials />
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