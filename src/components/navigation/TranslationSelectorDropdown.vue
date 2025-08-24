<template>
  <div class="translation-selector" role="navigation" aria-label="Language selector">
    <select class="lang-select" v-model="selected" @change="onChange" aria-label="Select language">
      <option v-for="l in langs" :key="l" :value="l">{{ labelFor(l) }}</option>
    </select>
  </div>
</template>

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

<style scoped>
.translation-selector { display:flex; gap:0.4rem; align-items:center; }
.lang-select {
  padding: 0.35rem 0.6rem;
  border-radius: 6px;
  border: 1px solid rgba(0,0,0,0.02);
  background: white;
  color: var(--primary);
  opacity: 0.5;
  cursor: pointer;
  font-size: 0.95rem;
  height: 34px;
}
</style>