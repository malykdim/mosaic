<script setup>
import { ref } from 'vue'

// import supabase from '../../config/supabase';

const msg = ref('Home');

// console.log(supabase);

</script>

<template>
  <div class="home">
    <h2>{{ msg }}</h2>
   
    
    <!-- <div class="content">

        <div class="card">
          <img src="https://user-images.githubusercontent.com/38568843/189418857-0d16c482-8d90-4d63-a123-73812c8c3ade.jpg" alt="Gallery" class="img">
        </div>
      
        <p>
          Authors: 
          <a href="https://www.facebook.com/vladimir.damynov/" target="_blank"
            >Vladimir Damynov</a
          > &  
          <a href="https://www.facebook.com/damyan.damyanov.509/" target="_blank"
            >Damyan Damyanov</a
          >
        </p>

    </div> -->
  
  </div>
</template>

<style scoped>
.home {
  max-width: 100vw;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0;


  h2 {
    color: var(--primary);
  }
}
.card {
  background-color: transparent;
  width: 600px;
  height: auto;
}
.img {
  width: 100%;
  height: auto;
}
.read-the-docs {
  color: #888;
}
</style>
