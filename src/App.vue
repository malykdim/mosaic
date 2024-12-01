<script setup>
import router from './config/router';
</script>

<template>
  <div class="nav">
      <router-link to="/">
        <img src="/logo.png" class="logo" alt="Logo" />
      </router-link>
      <router-link to="/gallery">Gallery</router-link>
  </div>

  <div class="content">
    <router-view />
  </div>

</template>

<style lang='scss' scoped>
.nav {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  margin: 0 auto;

  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;

  background-color: #f8f8f8;
  overflow: hidden;

  a {
    text-decoration: none;
    color: rgba(66, 184, 131, 0.667);
  }
}
.content {
  margin: 0 auto;
  max-width: 1200px;
  padding: 0 20px;

  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
}
.logo {
  height: 3em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em rgba(66, 184, 131, 0.667));
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
