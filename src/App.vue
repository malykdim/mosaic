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