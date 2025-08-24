<script setup>
import { ref, watch, onUnmounted } from 'vue'
import { useI18n } from '../../../stores/useI18n'
import { useItem } from '../../../stores/useItem'

const { translate } = useI18n()
const { item } = useItem()

let file = ref(null)
let previewUrl = ref(null)
let fileError = ref(null)

const handleFileChange = (e) => {
  fileError.value = null
  let selected = e.target.files[0]

  if (!selected) return

  const validTypes = ['image/jpeg','image/jpg','image/png']
  const maxSize = 1 * 1024 * 1024 // 1MB

  // Check file type
  if (!validTypes.includes(selected.type)) {
    fileError.value = translate('admin.form.errors.invalidType')
    return
  }

  // Check file size
  if (selected.size > maxSize) {
    fileError.value = translate('admin.form.errors.sizeExceeded')
    return
  }

  // If validation passes, set the file
  file.value = selected
  previewUrl.value = URL.createObjectURL(selected)
}  

const confirmImageSelection = () => {
  item.file = file.value
  console.log('Image confirmed:', file.value.name)
  // make the call to store
}

const resetPreviewUrl = () => {
  if (previewUrl.value) {
    URL.revokeObjectURL(previewUrl.value)
    previewUrl.value = null
  }
}

// Clean up on component unmount
onUnmounted(() => {
  resetPreviewUrl()
})

// Watch for external file clear
watch(() => item.file, (newVal) => {
  if (!newVal && !file.value) {
    resetPreviewUrl()
  }
})
</script>

<template>
<fieldset class="fieldset file-upload">

    <legend class="legend">&nbsp; {{ translate('admin.form.image.legend') }} &nbsp;</legend>    
    
    <label class="label">
        <input type="file" accept="image/jpeg, image/jpg, image/png" @change="handleFileChange" class="file">
    </label>
    
    <p class="display">{{ file?.name || translate('admin.form.image.display') }}</p> 
    
    <p v-if="fileError" class="error">{{ translate('admin.form.errors.fileError') }} {{ fileError }}</p>

    <div class="preview">
        <img v-if="previewUrl" :src="previewUrl" :alt="translate('admin.form.image.alt.previewNew')" class="image">
        <img v-else-if="item.imageUrl" :src="item.imageUrl" :alt="translate('admin.form.image.alt.previewExisting')" class="image">
        <img v-else src="/src/assets/images/dummy-900x600.jpg" :alt="translate('admin.form.image.alt.placeholder')" class="image">
    </div>

    <button 
      @click="confirmImageSelection"
      class="confirm-btn"
      type="button"
      :disabled="!file"
    >
      {{ translate('admin.form.image.confirmButton') }}
    </button>

  </fieldset>
</template>