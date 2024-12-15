<script setup>
defineProps(['dimensions'])
</script>

<template>
<fieldset class="dim">
    <legend>Dimensions</legend>
    <label htmlFor="width">
        Width
        <input type="number" name="width" defaultValue="" id="width" placeholder=""/> cm                    
    </label>
    <br/>
    <label htmlFor="height">
        Height
        <input type="number" name="height" defaultValue="" id="height" placeholder=""/> cm
    </label>
</fieldset>
</template>

<style lang='scss' scoped>

</style>