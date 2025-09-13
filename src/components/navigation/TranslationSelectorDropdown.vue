<script setup>
import { ref, computed, watch } from 'vue'
import { useI18n } from '../../stores/useI18n'

const { locale, setLocale, availableLocales } = useI18n()
const langs = computed(() => availableLocales || ['en','de','bg'])
const selected = ref(locale.value)

watch(locale, (v) => { selected.value = v })

const onChange = async () => {
  if (selected.value === locale.value) return
  await setLocale(selected.value)
}

const labelFor = (l) => l.toUpperCase()
</script>

<template>
  <div class="translation-select" role="navigation" aria-label="Language selector">
    <select class="lang-select" v-model="selected" @change="onChange" aria-label="Select language">
      <option v-for="l in langs" :key="l" :value="l" class="option">{{ labelFor(l) }}</option>
    </select>
  </div>
</template>