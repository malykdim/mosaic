<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from '../../stores/useI18n.js'
import { useGalleryListener } from '../../stores/useGalleryListener.js'

const router = useRouter()
const route = useRoute()
const id = Number(route.params.id)
console.log(id)

const singleItem = ref(null)
const error = ref(null)

const { getSingleItem } = useGalleryListener()
const { translate, locale } = useI18n()

onMounted(async () => {
    try {
        const { data, error: fetchError } = await getSingleItem('mosaics', id)
        
        if (fetchError) {
            console.error(`Error during getSingleItem: ${fetchError.message}`)
            error.value = fetchError.message
            router.replace({ name: 'not-found' })
            return
        } else if(!data){
            router.replace({ name: 'not-found' })
            return
        } else {
            singleItem.value = data
        }
    } catch (err) {
        console.error('Unexpected error fetching details:', err)
        router.replace({ name: 'not-found' })
    }    
})

const localeKey = (document.documentElement.lang || navigator.language || 'en').split('-')[0]

const displayTitle = computed(() => {
  console.log('Current locale:', locale.value)
  // Only show title if current language is 'bg'
  if (locale.value !== 'bg') return ''

  console.log('Available locales:', Object.keys(singleItem.value?.title.bg || {}))
  
  if (!singleItem.value?.title) return ''
  
  const titleData = singleItem.value.title.bg
  console.log('Title data:', titleData)
  
  if (typeof titleData === 'object' && titleData !== null) {
    const currentLang = locale.value
    const translation = titleData[currentLang]
    console.log(`Looking for '${currentLang}', found:`, translation)
    
    return (translation && String(translation).trim()) ? String(translation).trim() : ''
  }
  
  return String(titleData).trim()
})

const displayAuthor = computed(() => {
  const a = singleItem.value?.author
  if (!a) return ''
  if (typeof a === 'object') {
    // stored as translations object { en: "...", bg: "...", de: "..." }
    return a[translate('locale')] || a.en || Object.values(a)[0]
  }
  // normalize label -> simple id
  const norm = String(a).toLowerCase().replace(/[^a-zа-я0-9]+/gi, '')
  const map = {
    'vladimir': 'vladimir',
    'vladimirdamyanov': 'vladimir',
    'damyan': 'damyan',
    'damyandamyanov': 'damyan'
  }
  const id = map[norm] || norm
  return translate(`home.authors.${id}.name`) || a
})

// translate materials for display
const translatedMaterials = computed(() => {
  const list = singleItem.value?.materials || []
  return list.map(m => translate(`admin.form.materials.items.${m}`) || m)
})

// formatted dimensions
const formattedDimensions = computed(() => {
  const d = singleItem.value?.dimensions
  if (!d) return ''
  const unit = d.unit || ''
  return `${d.w} ${unit} x ${d.h} ${unit}`.trim()
})

watch(singleItem, (val) => {
  console.log('Details.vue singleItem:', val)
  console.log('Details.vue displayTitle:', displayTitle.value)
}, { immediate: true })
</script>

<template>
    <section class="details">
        <div v-if="error" class="error">{{ error }}</div>

        <div v-else-if="singleItem" class="item">
            <div class="image">
                <img :src="singleItem.imageUrl" :alt="singleItem.title">
            </div>
            <div class="info">

                <h4 class="title">{{ displayTitle }}</h4>
                <h5 class="author">{{ displayAuthor }}</h5>
                <hr>
                <p class="materials" v-for="mat in translatedMaterials" :key="mat">{{ mat }}</p>
                <hr>
                <p class="dimensions">{{ formattedDimensions }}</p>
            </div>
        </div>

        <div v-else>{{ translate('messages.loading') }}</div>
    </section>
</template>