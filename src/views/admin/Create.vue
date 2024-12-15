<script setup>
import { ref } from 'vue'

import { useStorage } from '../../stores/useStorage'
import { useCollection } from '../../stores/useCollection'
// import { getUser } from '../../stores/getUser'
import { useUserStore } from '../../stores/useUserStore'

import Title from './components/Title.vue'
import Author from './components/Author.vue'
import Image from './components/Image.vue'
import Dimensions from './components/Dimensions.vue'
import Materials from './components/Materials.vue'

const { filePath, url, uploadImage } = useStorage()
const { error, addDoc } = useCollection('mosaics')
// const { user } = getUser()
const { user, checkUser } = useUserStore()

const isPending = ref(false)
const fileError = ref(null)
const uploadFileError = ref(null)
const addDocError = ref(null)

const title = ref('')
const author = ref('')
const image = ref(null)
const dimensions = ref('') // toDo: for width and height - type number with a dropdown for cm or inches
const materials = ref([])

const handleFileChange = (e) => {
    fileError.value = null

    const selected = e.target.files[0]
    console.log(selected)

    if (selected && selected.type==='image/jpeg' && selected.size < 1000000) {
        image.value = selected
        fileError.value = null
    } else {
        file.value = null
        fileError.value = 'Please select an image file (jpg or jpeg) of size less than 1MB'
    }
}

const handleCreate = async () => {
    if (!title.value || !author.value || !image.value) {
        alert('Please fill in all fields')
        return
    }

    // I want to have an input type radio for the author property.
    // I want to make a check if any of the radio buttons are checked as oppose to the default undefined/unchecked value
    // if (author.value === undefined) {
    //     alert('Please select an author')
    //     return
    // }

    // I want to check if the selected file is an image and has a .jpg extension
    // if (image.value.type !== 'image/jpeg') {
    //     alert('Please select a .jpg image with a file size less than 1MB')
    //     return
    // } else if (image.value.size > 1000000) {
    //     alert('The file size is too big. Please select an image with a file size less than 1MB')
    //     return
    // }

    // I want to check if there are any materials selected
    // if (materials.value.length === 0) {
    //     alert('Please select at least two materials')
    //     return
    // }

    isPending.value = true

    if (file.value) {    
        const { error: uploadError, filePath: uploadedFilePath } = await uploadImage(image.value)
        if (uploadError) {
            error.value = uploadError
            console.error('Error uploading image:', uploadError)
            isPending.value = false
            return
        }

        const imageUrl = url(uploadedFilePath)

        const { error: addDocError } = await addDoc({
            title: title.value,
            author: author.value,
            image: imageUrl,
            materials: materials.value,
            userId: user.value.id
        })

        if (addDocError) {
            error.value = addDocError
            console.error('Error adding document:', addDocError)
            isPending.value = false
        } else {
            alert('Mosaic added successfully')
        }

        if (!error.value) {
            Alert(`Mosaic added successfully: ${title.value} by ${author.value}`)
            console.log('Mosaic added successfully:', title.value, author.value, title.value, author.value)
        }
        
        // title.value = ''
        // author.value = ''
        // imageUrl.value = ''
        // materials.value = []
}
</script>

<template>
<div class="create-container">
    <h3>Create new panneaux</h3>

    <form @submit.prevent="handleCreate" class="create">
        <div class="formFields">
            <!-- LEFT -->
            <div class="info">
                <Title :title="title" />
                <Author :author="author" />
                <Dimensions :dimensions="dimensions" />
                <Materials :materials="materials" />
                <div class="error"></div>
            </div>

            <!-- RIGHT -->        
            <div class="picture">
                <Image :image="image" @change="handleFileChange" />   
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
.create {
    {/* I'll do that later */}
    .file {
        border: 0;
        padding: 0;
    }
}
</style>