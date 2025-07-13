<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  item: {
    type: Object,
    required: true
  },
  index: {
    type: Number,
    required: true
  }
})

const aspectRatio = ref(1)
const imageLoaded = ref(false)

// Determine additional class based on actual aspect ratio
const customClassFromRatio = computed(() => {
  if (!imageLoaded.value) return ''
  
  if (aspectRatio.value >= 1.8) return 'very-wide'
  if (aspectRatio.value >= 1.3 && aspectRatio.value < 1.8) return 'moderately-wide'
  if (aspectRatio.value <= 0.6) return 'very-tall'
  if (aspectRatio.value > 0.6 && aspectRatio.value <= 0.8) return 'moderately-tall'
  
  return 'near-square'; // For images with ratio close to 1
})

const gridStyles = computed(() => {
  if (!imageLoaded.value) {
    // Default spans based on cl class before image loads
    if (props.item.cl === 'wide') return { gridColumnEnd: 'span 2' }
    if (props.item.cl === 'tall') return { gridRowEnd: 'span 2' }
    return {}
  }
  
  // After image loads, calculate spans based on actual dimensions
  let colSpan = 1
  let rowSpan = 1
  
  if (aspectRatio.value >= 1.3) {
    // Wide image
    colSpan = 2
  }
  if (aspectRatio.value <= 0.8) {
    // Tall image
    rowSpan = 2
  }
  
  return {
    gridColumnEnd: `span ${colSpan}`,
    gridRowEnd: `span ${rowSpan}`
  }
})

const onImageLoad = (event) => {
  const img = event.target
  aspectRatio.value = img.naturalWidth / img.naturalHeight
  imageLoaded.value = true
}
</script>

<template>
  <div 
    class="grid-item" 
    :class="[item.cl, customClassFromRatio]"
    :style="gridStyles"
  >
    <img 
      :src="item.url" 
      @load="onImageLoad"
      alt="mosaic image"
    />
  </div>
</template>

<style lang='scss' scoped>
.grid-item {
  overflow: hidden;
  position: relative;
  border-radius: 2px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }
    
  &:hover img {
    transform: scale(1.05);
  }

  // Default styles for different image types   // Default grid spans from cl property
  &.wide {
    grid-column-end: span 2;
  }
  
  &.tall {
    grid-row-end: span 2;
  }
  
// Additional styling based on actual aspect ratio
  &.very-wide {
    grid-column-end: span 2;
    
    img {
      object-position: center;
    }
  }
  
  &.moderately-wide {
    grid-column-end: span 2;
  }
  
  &.very-tall {
    grid-row-end: span 2;
  }
  
  &.moderately-tall {
    grid-row-end: span 2;
  }
  
  &.near-square {
    // Default 1x1 span
  }
}
</style>