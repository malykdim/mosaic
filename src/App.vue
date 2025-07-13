<script setup>
import Navigation from './components/navigation/Navigation.vue'
import Footer from './components/footer/Footer.vue'
</script>

<template>
  <header class="header">
    <Navigation />
  </header>

  <main class="page content">
    <router-view />
  </main>

  <footer class="footer">
    <Footer />
  </footer>
</template>

<style lang='scss' scoped>
@import './assets/partials/page';
.header {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--background);
  padding: var(--safe-area-inset-top) var(--safe-area-inset-right) var(--safe-area-inset-bottom) var(--safe-area-inset-left);      
}
.content {
  flex: 1;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  overflow-y: auto;   
  -webkit-overflow-scrolling: touch;

  width: 100%;
  max-width: 100%;

  @media (pointer: coarse) {
    .content {
      scrollbar-width: none;        /* Firefox */
      -ms-overflow-style: none;     /* IE */
    }
    .content::-webkit-scrollbar {
      display: none;                /* Chrome/Safari */
    }
  }
}
.footer {
  width: 100%;
  position: sticky;
  bottom: 0;
  left: 0;
  right: 0;
  
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--safe-area-inset-top) var(--safe-area-inset-right) var(--safe-area-inset-bottom) var(--safe-area-inset-left);      
  background-color: var(--background);
}
@media screen and (max-width: 767px) and (min-width: 260px) {
    .footer {
        padding: 0;
        max-width: 100vw;
        flex-direction: column;
        justify-content: center;
    }
}
</style>
