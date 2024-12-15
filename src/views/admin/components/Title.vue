<script setup>
defineProps(['title'])

</script>

<template>
<fieldset class="left">
    <legend>Panneau Name</legend>
        <label for="title"></label>
        <input 
            v-model="title"
            type="text" 
            id="title" 
            name="title" 
            placeholder="panneaux title"
            required
        />                        
</fieldset>
</template>

<style lang='scss' scoped>

</style>