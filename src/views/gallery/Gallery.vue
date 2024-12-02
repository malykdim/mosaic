<script setup>

import { ref } from 'vue';

const message = ref('Gallery');
</script>

<template>
    <div class="gallery">
        <h2>{{ message }}</h2>
    </div>
</template>

<style lang="scss" scoped>
.gallery {
    h2 {
        color: var(--primary);
    }
}
</style>