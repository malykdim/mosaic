<script setup>
defineProps(['materials'])

const checkBoxHandler = (e) => {
    if (e.target.checked) {
        materials.value.push(e.target.value)
    } else {
        materials.value = materials.value.filter(material => material !== e.target.value)
    }
    console.log(materials.value)
}
</script>

<template>
    <fieldset>
        <legend>Materials used</legend>

        <input @change="checkBoxHandler" type="checkbox" id="marbel" name="marbel" value="Marbel" class="material"/>
        <label htmlFor="marbel">Marbel</label>
        
        <input @change="checkBoxHandler" type="checkbox" id="mountain crystal" name="mountain crystal" value="MountainCrystal" class="material"/>
        <label htmlFor="mountain crystal">Mountain Crystal</label>
        
        <input @change="checkBoxHandler" type="checkbox" id="amethyst" name="amethyst" value="Аmethyst" class="material"/>
        <label htmlFor="amethyst">Amethyst</label>
        
        <input @change="checkBoxHandler" type="checkbox" id="jasper" name="jasper" value="Jasper" class="material"/>
        <label htmlFor="jasper">Jasper</label>
        <br/>
        
        <input @change="checkBoxHandler" type="checkbox" id="labrador" name="labrador" value="Labrador" class="material"/>
        <label htmlFor="labrador">Labrador</label>
        
        <input @change="checkBoxHandler" type="checkbox" id="pyryt" name="pyryt" value="Pyryt" class="material"/>
        <label htmlFor="pyrite">Pyrite</label>
        
        <input @change="checkBoxHandler" type="checkbox" id="agate" name="agate" value="Аgate" class="material"/>
        <label htmlFor="agate">Agate</label>
        
        <input @change="checkBoxHandler" type="checkbox" id="onyx" name="onyx" value="Onyx" class="material"/>
        <label htmlFor="onyx">Onyx</label>
        <br/>
        
        <input @change="checkBoxHandler" type="checkbox" id="jade" name="jade" value="Jade" class="material"/>
        <label htmlFor="jade">Jade</label>
        
        <input @change="checkBoxHandler" type="checkbox" id="malachite" name="malachite" value="Malachite"class="material"/>
        <label htmlFor="malachite">Malachite</label>
        
        <input @change="checkBoxHandler" type="checkbox" id="citrine" name="citrine" value="Citrine"class="material"/>
        <label htmlFor="citrine">Citrine</label>
        
        <input @change="checkBoxHandler" type="checkbox" id="obsidian" name="obsidian" value="Obsidian"class="material"/>
        <label htmlFor="obsidian">Obsidian</label>
        <br/>
        
        <input @change="checkBoxHandler" type="checkbox" id="serpentine" name="serpentine" value="serpentine" class="material"/>
        <label htmlFor="serpentine">Serpentine</label>
        
        <input @change="checkBoxHandler" type="checkbox" id="quartz" name="quartz" value="quartz" class="material"/>
        <label htmlFor="quartz">Quartz</label>
        
        <input @change="checkBoxHandler" type="checkbox" id="firestone" name="firestone" value="Firestone" class="material"/>
        <label htmlFor="firestone">Firestone</label>
        
        <input @change="checkBoxHandler" type="checkbox" id="tiger's eye" name="tiger's eye" value="Tiger'sEye" class="material"/>
        <label htmlFor="tiger's eye">Tiger's eye</label>
        
        <input @change="checkBoxHandler" type="checkbox" id="other" name="other" value="Other" class="material"/>
        <label htmlFor="other">Other</label>

    </fieldset>
</template>

<style lang='scss' scoped>

</style>