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
.header {
  display: flex;
  justify-content: center;
  align-items: center;
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
