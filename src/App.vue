<script setup>
import Home from './components/Home.vue'
</script>

<template>
  <div class="container">

    <div>
      <a href="#" target="_blank">
        <img src="/logo.png" class="logo" alt="Logo" />
      </a>
    </div>

    <Home msg="MOSAIC" />
  </div>
</template>

<style scoped>
.container {
  max-width: 100vw;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
}
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
