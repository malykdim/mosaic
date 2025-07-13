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

<style lang="scss" scoped>
.home {
    width: 100%;
    max-width: 100%;
    padding: 0;
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    gap: 5rem;
    background-color: #fff;

    @media screen and (max-width: 1023px) {
        gap: 3rem; 
    }

    @media screen and (max-width: 767px) {
        margin: 0 auto;
        grid-template-columns: repeat(6, 1fr); 
        gap: 2rem;
    }

    @media screen and (max-width: 500px) {
        margin: 0 auto;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 1rem; 
    }
}

.hero {
    grid-column: 1 / span 12;

    @media screen and (max-width: 767px) {
        grid-column: span 6; 
    }

    @media screen and (max-width: 500px) {
        grid-column: span 12; 
    }
}
.about {
    grid-column: 1 / -1;


    @media screen and (max-width: 500px) {
        grid-column: span 12; 
        padding: 1rem; 
    }
}
</style>
