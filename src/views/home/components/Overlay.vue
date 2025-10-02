<script setup>
import { useI18n } from '../../../stores/useI18n'
const { translate } = useI18n()
</script>

<template>
    <div class="overlay">
        <h2 class="title">{{ translate('home.hero.title') }}</h2>        
        <p class="subtitle">
            {{ translate('home.hero.subtitle') }}
        </p>        
        <router-link :to="{name: 'gallery'}" class="link">{{ translate('home.hero.cta') }}</router-link>       
    </div>
</template>

<style lang="scss" scoped>
@use '../../../assets/partials/hero-overlay' as *
</style>