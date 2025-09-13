<script setup>
import { computed } from 'vue'
import { useI18n } from '../../stores/useI18n'

const props = defineProps({
    item: {
        type: Object,
        required: true
    }
})

const { locale } = useI18n()

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
</script>

<template>
    <div class="card"> 

        <router-link :to="{path: `/gallery/${item.id}`}" class="link">
        
            <figure class="figure"> 

                <div class="image-container"> 
                    <img :src="item.imageUrl" :alt="item.title" />
                </div>
                
                <figcaption class="figure-caption"> 
                    <h4 class="title">{{ displayTitle }}</h4>                      
                </figcaption>

            </figure>

        </router-link>

    </div>
</template>