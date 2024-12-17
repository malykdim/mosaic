<script setup>
import { ref, computed, watch } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { minLength } from '@vuelidate/validators'
import { useCreateItem } from '../../../stores/useCreateItem'

const { item } = useCreateItem()

const rules = {
  materials: { minLength: minLength(2) }
}

const v$ = useVuelidate(rules, item)

const errors = computed(() => {
  const errorMessages = []
  if (!v$.value.materials.minLength) {
    errorMessages.push('Please select at least two materials')
  }
  return errorMessages
})

const selectedMaterials = ref([...item.value.materials])

watch(selectedMaterials, (newVal) => {
  item.value.materials = newVal
})
</script>

<template>
    <fieldset class="materials">
        <legend>Materials used</legend>

        <label>
            <input type="checkbox" value="Marbel" v-model="selectedMaterials" class="material"/>
            Marbel
        </label>
        
        <label>            
            <input type="checkbox" value="MountainCrystal" v-model="selectedMaterials" class="material"/>
            Mountain Crystal
        </label>
        
        <label>
            <input type="checkbox" value="Аmethyst" v-model="selectedMaterials" class="material"/>
            Amethyst
        </label>
        
        <label>
            <input type="checkbox" value="Jasper" v-model="selectedMaterials" class="material"/>
            Jasper
        </label>
        <br/><br>
        
        <label>
            <input type="checkbox" value="Labrador" v-model="selectedMaterials" class="material"/>
            Labrador
        </label>
        
        <label>
            <input type="checkbox" value="Pyryt" v-model="selectedMaterials" class="material"/>
            Pyrite
        </label>
        
        <label>
            <input type="checkbox" value="Agate" v-model="selectedMaterials" class="material"/>
            Agate
        </label>
        
        <label>
            <input type="checkbox" value="Onyx" v-model="selectedMaterials" class="material"/>
            Onyx
        </label>
        <br/>
        
        <label>
            <input type="checkbox" value="Jade" v-model="selectedMaterials" class="material"/>
            Jade
        </label>
        
        <label>
            <input type="checkbox" value="Malachite" v-model="selectedMaterials" class="material"/>
            Malachite
        </label>
        
        <label>
            <input type="checkbox" value="Citrine" v-model="selectedMaterials" class="material"/>
            Citrine
        </label>
        
        <label>
            <input type="checkbox" value="Obsidian" v-model="selectedMaterials" class="material"/>
            Obsidian
        </label>
        <br/>
        
        <label>
            <input type="checkbox" value="Serpentine" v-model="selectedMaterials" class="material"/>
            Serpentine
        </label>
        
        <label>
            <input type="checkbox" value="Quartz" v-model="selectedMaterials" class="material"/>
            Quartz
        </label>
        
        <label>
            <input type="checkbox" value="Firestone" v-model="selectedMaterials" class="material"/>
            Firestone
        </label>
        
        <label>
            <input type="checkbox" value="Tiger'sEye" v-model="selectedMaterials" class="material"/>
            Tiger's eye
        </label>
        
        <label>
            <input type="checkbox" value="Other" v-model="selectedMaterials" class="material"/>
            Other
        </label>
        <br/><br>

        
    </fieldset>
    <p class="preview">Selected materials: {{ selectedMaterials.join(', ') }}</p>
</template>

<style lang='scss' scoped>
.materials {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    gap: 1rem;
    padding: .5rem 0 .5rem 1rem;
    border: 1px solid var(--secondary);

    legend {
        padding: 0 .5rem;
        font-size: 1em;
        font-weight: 600;
        margin-bottom: .5rem;
        color: var(--input);
        display: inline-block;
    }

    input {
        margin-right: .5rem;
    }

    label {
        font-size: 0.8em;
        color: var(--input);
        display: flex;
        align-items: center;
    }
}
</style>