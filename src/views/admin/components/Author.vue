<script setup>
defineProps(['author'])
</script>

<template>
    <fieldset class="left inline">
        <legend>Author</legend>                                        
            <input v-model="author" type="radio" id="vladimir" name="author" value="Vladimir" />                        
            <label for="vladimir" class="radio">Vladimir</label>
                                            
            <input v-model="author" type="radio" id="damyan" name="author" value="Damyan" />
            <label for="damyan" class="radio">Damyan</label>
    </fieldset>
</template>

<style lang='scss' scoped>

</style>