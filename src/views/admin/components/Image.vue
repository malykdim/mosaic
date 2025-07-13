<script setup>
import { ref, watch, onUnmounted } from 'vue'
import { useItem } from '../../../stores/useItem'

const { item } = useItem()

let file = ref(null)
let previewUrl = ref(null)
let fileError = ref(null)

const handleFileChange = (e) => {
  fileError.value = null
  let selected = e.target.files[0]

  if (!selected) return

  const validTypes = ['image/jpeg', 'image/jpg', 'image/png']
  const maxSize = 1 * 1024 * 1024 // 1MB

  // Check file type
  if (!validTypes.includes(selected.type)) {
    fileError.value = 'Invalid file type. Only .jpg, .jpeg, or .png allowed.'
    return
  }

  // Check file size
  if (selected.size > maxSize) {
    fileError.value = 'File size exceeds 1MB.'
    return
  }

  // If validation passes, set the file
  file.value = selected
  item.file = selected
  previewUrl.value = URL.createObjectURL(selected)
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
  if (!newVal) resetPreviewUrl()
})
</script>

<template>
<fieldset class="fieldset file-upload">
    <legend class="legend">&nbsp; Upload an image &nbsp;</legend>
    
    
    <label class="label">
        <input type="file" @change="handleFileChange" class="file">
    </label>
    
    <p class="display">{{ file?.name || 'No file selected' }}</p> 
    
    <p v-if="fileError" class="error">{{ fileError }}</p>

    <div class="preview">
        <img v-if="item.imageUrl !== null" :src="item.imageUrl" alt="preview" class="image">
        <img v-else-if="previewUrl" :src="previewUrl" alt="preview" class="image">
        <img v-else src="/src/assets/images/dummy-900x600.jpg" alt="placeholder" class="image">
    </div>
  </fieldset>
</template>

<style lang='scss' scoped>
.file-upload {
  text-align: center;

  width: 100%;

  display: flex;
  flex-direction: column;

  .display {
    padding-bottom: 1rem;
    font-size: small;
  }

  .label {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1rem;
      padding: 1rem;

      .file {
        position: absolute;
        opacity: 0;
        width: 0.1px;
        height: 0.1px;
        overflow: hidden;
        // max-width: 100%;
        // box-sizing: border-box;
        // margin: 0 auto;
    
        &::before {
          position: absolute;
          pointer-events: none;
          top: 10px;
          left: 50%;
          transform: translateX(-50%);
          height: 20px;
          width: 20px;
          content: "";
          background-image: url("../../../assets/images/upload_20dp_42B883_FILL0_wght400_GRAD0_opsz20.svg");
          z-index: 1;
        }
    
        &::file-selector-button {
          width: 136px;
          color: transparent;
          border-radius: 2px;
          padding: 0 16px;
          height: 40px;
          cursor: pointer;
          background-color: white;
          border: 1px solid var(--primary);
          box-shadow: 0px 1px 0px rgba(0, 0, 0, 0.05);
          margin-right: 16px;
          transition: background-color 200ms;
        }
    
        &::file-selector-button:hover {
          background-color: var(--primary-accent);
        }
        &::file-selector-button:active {
          background-color: var(--primary);
        }
      }

    &::before {
    content: "";
    display: inline-block;
    width: 136px;
    height: 40px;
    background-image: url("../../../assets/images/upload_20dp_42B883_FILL0_wght400_GRAD0_opsz20.svg");
    background-repeat: no-repeat;
    background-position: center;
    background-color: white;
    border: 1px solid var(--primary);
    border-radius: 2px;
    cursor: pointer;
    transition: background-color 200ms;
    }

    &:hover::before {
    background-color: var(--primary-accent);
    }
  }
  

  .material-symbols-outlined {
    font-variation-settings:
    'FILL' 0,
    'wght' 200,
    'GRAD' 0,
    'opsz' 40
  }

  .preview {
    width: 100%;
    aspect-ratio: 3/2;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 1rem;
    .image {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  @media screen and (max-width: 1023) {
     width: 100%;
  }
}
</style>