<script setup>
import { ref } from 'vue'

import useStorage from '../../composables/useStorage'
import useCollection from '../../composables/useCollection'
import getUser from '../../composables/getUser'
import { timestamp } from '../../config/firebase'

const title = ref('')
const author = ref('')
const file = ref(null)
const fileError = ref(null)
const imageUrl = ref(null)
const isPending = ref(false)

// allowed file types
const types = ['image/png', 'image/jpeg']

const { filePath, url, uploadImage } = useStorage()
const { error, addDoc } = useCollection('mosaics')
const { user } = getUser()

const handleCreate = async () => {
    isPending.value = true
    if (file.value) {
        await uploadImage(file.value)
    }
    await addDoc({
        title: title.value,
        author: author.value,
        userId: user.value.uid,
        userName: user.value.displayName,
        imageUrl: imageUrl.value,
        createdAt: timestamp()
    })
    isPending.value = false
    if (!error.value) {
        console.log('item added', title.value, author.value, imageUrl.value)
        // title.value = ''
        // author.value = ''
        // imageUrl.value = ''
    }


}

const handleChange = (e) => {
    const selected = e.target.files[0]
    console.log(selected)

    // if (selected && types.includes(selected.type)) {
    //     file.value = selected
    //     fileError.value = null
    // } else {
    //     file.value = null
    //     fileError.value = 'Please select an image file (png or jpeg)'
    // }
}
</script>

<template>
<form @submit.prevent="handleCreate" class="create">
    <h3>Create new panneaux</h3>
    <input type="text" v-model="title" placeholder="panneaux title" required>
    <input type="text" v-model="author" placeholder="author" required>

    <!-- <label>Upload an image</label>
    <input type="file" @change="handleChange" class="file">
    <div class="error">{{ fileError }}</div> -->

    <input type="text" v-model="imageUrl" placeholder="imageUrl" required>

    <div class="error"></div>

    <button v-if="!isPending" type="submit">Create</button>
    <button v-else disabled>Saving...</button>
</form>
</template>

<style lang='scss' scoped>
.create {

    .file {
        border: 0;
        padding: 0;
    }
}
</style>