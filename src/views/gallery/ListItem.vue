<script setup>
import { computed, ref } from 'vue'
import { useI18n } from '../../stores/useI18n'

const props = defineProps({
    item: {
        type: Object,
        required: true
    }
})

const { locale } = useI18n()

const imageLoaded = ref(false)
const imageError = ref(false)

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

const handleImageLoad = () => {
  imageLoaded.value = true
}

const handleImageError = () => {
  imageError.value = true
  console.error('Failed to load image:', props.item.imageUrl)
}
</script>

<template>
    <div class="card"> 

        <router-link :to="{path: `/gallery/${item.id}`}" class="link">
        
            <figure class="figure"> 

                <div class="image-container"> 
                    <!-- Skeleton while loading -->
                    <div v-if="!imageLoaded && !imageError" class="image-skeleton"></div>
                    
                    <!-- Error state -->
                    <div v-if="imageError" class="image-error">
                        Изображението не може да се зареди
                    </div>
                    
                    <!-- Actual image with lazy loading -->
                    <img 
                      v-else
                      :src="item.imageUrl" 
                      :alt="displayTitle || 'Мозайка'"
                      loading="lazy"
                      @load="handleImageLoad"
                      @error="handleImageError"
                    />
                </div>
                
                <figcaption class="figure-caption"> 
                    <h4 class="title">{{ displayTitle }}</h4>                      
                </figcaption>

            </figure>

        </router-link>

    </div>
</template>