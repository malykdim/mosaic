<script setup>
import { computed } from 'vue'
import { useI18n } from '../../stores/useI18n'

const { locale, setLocale, availableLocales } = useI18n()

// prefer availableLocales if you want dynamic list
const langs = computed(() => availableLocales || ['en','de','bg'])

const select = async (l) => {
  if (l === locale.value) return
  await setLocale(l)
}
</script>

<template>
  <div class="translation-selector" role="navigation" aria-label="Language selector">
    <button
      v-for="l in langs"
      :key="l"
      :class="['lang-btn', { active: locale.value === l }]"
      @click="select(l)"
      :aria-pressed="locale.value === l"
      type="button"
    >
      {{ l.toUpperCase() }}
    </button>
  </div>
</template>

<style scoped>
.translation-selector { display:flex; gap:0.4rem; align-items:center; }
.lang-btn {
  padding: 0.35rem 0.6rem;
  border-radius: 6px;
  border: 1px solid rgba(0,0,0,0.06);
  background: transparent;
  cursor: pointer;
  font-size: 0.9rem;
}
.lang-btn.active {
  background: var(--primary);
  color: white;
}
</style>