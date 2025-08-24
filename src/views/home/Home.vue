<script setup>
import { ref, defineAsyncComponent } from 'vue'

import Logo from './components/Logo.vue'
const MobileHero = defineAsyncComponent(() => import('./components/MobileHero.vue'))
const TabletHero = defineAsyncComponent(() => import('./components/TabletHero.vue'))
const DesktopHero = defineAsyncComponent(() => import('./components/DesktopHero.vue'))

import Authors from './components/Authors.vue'

const mobile = ref(window.innerWidth <= 767)
const tablet = ref(window.innerWidth >= 768 && window.innerWidth <= 1023)
const desktop = ref(window.innerWidth >= 1024)

</script>

<template>
    <section class="home">
        <section class="hero">
            <MobileHero v-if="mobile" />
            
            <TabletHero v-else-if="tablet" />
            
            <DesktopHero v-else-if="desktop" />        
        </section>
        <!-- <Logo /> -->
        <section class="about">
            <Authors /> 
        </section>    
    </section>
</template>