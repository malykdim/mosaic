<script setup>
import { ref } from 'vue'

const title = ref('')
const author = ref('')
const file = ref(null)
const fileError = ref(null)
const dimensions = ref('')
const materials = ref('')
const description = ref('')

// allowed file types
const types = ['image/png', 'image/jpeg']

const handleCreate = () => {
    if (file.value) {
        console.log(title.value, author.value, file.value, dimensions.value, materials.value, description.value)
    }
}

const handleChange = (e) => {
    const selected = e.target.files[0]
    console.log(selected)

    if (selected && types.includes(selected.type)) {
        file.value = selected
        fileError.value = null
    } else {
        file.value = null
        fileError.value = 'Please select an image file (png or jpeg)'
    }
}
</script>

<template>
<form @submit.prevent="handleCreate" class="create">
    <h3>Create new panneaux</h3>
    <input type="text" v-model="title" placeholder="panneaux title" required>
    <input type="text" v-model="author" placeholder="author" required>

    <label>Upload an image</label>
    <input type="file" @change="handleChange" class="file">
    <div class="error">{{ fileError }}</div>


    <input type="text" v-model="dimensions" placeholder="dimensions" required>
    <input type="text" v-model="materials" placeholder="materials" required>

    <textarea v-model="description" placeholder="description" required></textarea>

    <div class="error"></div>

    <button type="submit">Create</button>
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