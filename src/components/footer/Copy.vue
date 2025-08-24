<script setup>
import { useI18n } from '../../stores/useI18n'
const { translate } = useI18n()
</script>

<template>
    <p class="copy">{{ translate('footer.copy', { year: new Date().getFullYear() }) }}</p>
</template>

<style lang='scss' scoped>
.copy {
    font-family: 'Caudex', sans-serif;
    color: var(--text, white); // fallback to white if --text not set
    font-size: 1.2em;
    opacity: 1;
    text-transform: lowercase;
}
</style>