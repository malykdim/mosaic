<script setup>
import { ref } from 'vue'
defineProps(['fileError', 'imageUrl', 'handleChange'])
const file = ref(null)
</script>

<template>
<fieldset>
    <label>Upload an image</label>
        <input type="file" @change="handleChange" class="file">
        <div class="error">{{ fileError }}</div>
        <p>imageUrl: </p>
</fieldset>
<div class="preview">
    <img v-if="imageUrl" :src="imageUrl" alt="preview">
    <p v-else>No image selected</p>
</div>
</template>

<style lang='scss' scoped>

</style>