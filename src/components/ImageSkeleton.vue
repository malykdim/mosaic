<script lang="js" setup>
defineProps({
  aspectRatio: {
    default: '1 / 1'
  },
  showTitle: {
    default: true
  },
  size: {
    default: 'medium',
    validator: (value) => ['small', 'medium', 'large'].includes(value)
  }
})
</script>

<template>
  <div class="skeleton-wrapper" :class="`skeleton-${size}`">
    <div class="skeleton-image" :style="{ aspectRatio }"></div>
    <div v-if="showTitle" class="skeleton-title"></div>
  </div>
</template>

<style lang="scss" scoped>
@use '../assets/partials/image-skeleton' as *;
</style>