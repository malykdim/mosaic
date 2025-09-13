<script setup>
import { computed } from 'vue'
import { useI18n } from '../../../stores/useI18n.js'
import { useCollection } from '../../../stores/useCollection.js'
import { useGalleryListener } from '../../../stores/useGalleryListener.js'

const props = defineProps({
    item: {
        type: Object,
        required: true
    }
})

const { locale } = useI18n()
const { delDoc } = useCollection()
const { startListening } = useGalleryListener()

const getBackgroundStyle = (url) => ({
  background: `linear-gradient(rgba(75, 74, 74, 0.9), rgba(75, 75, 75, 0.3), rgba(75, 75, 75, 0.5)), url('${url}')`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat"
})

const displayTitle = computed(() => {
  console.log('Current locale:', locale.value)
  console.log('Available locales:', Object.keys(props.item?.title || {}))
  
  if (!props.item?.title) return ''
  
  const titleData = props.item.title
  console.log('Title data:', titleData)
  
  if (typeof titleData === 'object' && titleData !== null) {
    const currentLang = locale.value
    const translation = titleData[currentLang]
    console.log(`Looking for '${currentLang}', found:`, translation)
    
    return (translation && String(translation).trim()) ? String(translation).trim() : ''
  }
  
  return String(titleData).trim()
})

const handleDelete = async () => {
    await delDoc('mosaics', props.item.id)
    startListening()
}
</script>

<template>    
    <div class="mini-item" :style="getBackgroundStyle(item.imageUrl)">
        <h2 class="title">{{ displayTitle }}</h2>

        <div class="actions-wrapper">
            <div class="icon-holder modify">
                <router-link :to="{path: `/admin/edit/${item.id}`}" class="edit-link">
                    <i class="icon material-icons" aria-label="Edit mosaic">edit</i>
                </router-link>
            </div>
    
            <div class="icon-holder remove">
                <button @click="handleDelete" class="del-btn">
                    <i class="icon material-icons" aria-label="Delete mosaic">delete</i>
                </button>
            </div>
        </div>
    </div>
</template>