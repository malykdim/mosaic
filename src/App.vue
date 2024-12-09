<script setup>
import Auth from './components/footer/Auth.vue';
import router from './config/router';
</script>

<template>
  <header class="header">
    <Navigation />
  </header>

  <main class="content">
    <router-view />
  </main>

  <footer class="footer">
    <Footer />
  </footer>

</template>

<style lang='scss' scoped>
.header {
  width: 100vw;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;

  // padding: 0;
  padding: var(--safe-area-inset-top) var(--safe-area-inset-right) var(--safe-area-inset-bottom) var(--safe-area-inset-left);      
  
  background-color: rgba(245, 245, 245, 0.569);
}
.content {
  margin: 5rem auto 0;
  max-width: 1200px;
  padding: 0 20px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}
.footer {
  position: absolute;
  bottom: 0;
  
  width: 100vw;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;

  // padding: 0;
  padding: var(--safe-area-inset-top) var(--safe-area-inset-right) var(--safe-area-inset-bottom) var(--safe-area-inset-left);      
  
  background-color: rgba(245, 245, 245, 0.569);
}
</style>
