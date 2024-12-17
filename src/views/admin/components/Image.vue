<script setup>
import { ref, watch } from 'vue'
import { useStorage } from '../../../stores/useStorage'
import { useCreateItem } from '../../../stores/useCreateItem'

const { item } = useCreateItem()
const { uploadImage, getImageUrl } = useStorage()

const image = ref(null)
const previewUrl = ref(null)
const fileError = ref(null)

const emit = defineEmits(['formSubmitted'])

const handleFileChange = (e) => {
  fileError.value = null

  const selected = e.target.files[0]
  console.log(selected)

  if (selected && selected.type === 'image/jpeg' && selected.size < 1000000) {
    image.value = selected
    previewUrl.value = URL.createObjectURL(selected)
    fileError.value = null
    emit('fileSelected', selected)
  } else {
    image.value = null
    previewUrl.value = null
    fileError.value = 'Please select an image file (jpg or jpeg) of size less than 1MB'
  }
}  

const resetPreviewUrl = () => {
  if (previewUrl.value) {
    URL.revokeObjectURL(previewUrl.value)
    previewUrl.value = null
  }
}

watch(() => item.value.image, (newVal, oldVal) => {
  if (!newVal) {
    resetPreviewUrl()
  }
})
</script>

<template>
<fieldset>
    <label>Upload an image</label>
        <input type="file" @change="handleFileChange" class="file">
        <div class="error">{{ fileError }}</div>
</fieldset>
<div class="preview" style="margin-top: 1rem;">
    <img v-if="previewUrl" :src="previewUrl" alt="preview">
    <img v-else src="/src/assets/images/dummy-900x600.jpg" alt="placeholder" style="width: 470px;">
</div>
</template>

<style lang='scss' scoped>
.image {
  width: 470px;
  height: 313;
  object-fit: cover; /* Ensures the image covers the container while maintaining aspect ratio */
}
</style>