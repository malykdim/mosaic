<script setup>
import { ref, reactive, computed, watch } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { required, minLength, helpers } from '@vuelidate/validators'

import { useItem } from '../../../stores/useItem'

const { item } = useItem()

const materialsArray = ['Marbel', 'Amethyst', 'Jasper', 'Labrador', 'Pyryt', 'Agate', 'Onyx', 'Jade', 
    'Malachite', 'Citrine', 'Obsidian', 'Serpentine', 'Quartz', 'Firestone', 'Tiger\'s Eye', 'Mountain Crystal', 'Glass', 'Wood','Other'
]

// Use computed to make selectedMaterials reactive to Pinia changes
const selectedMaterials = computed({
  get: () => item.materials || [],
  set: (value) => { 
    item.materials = value
    console.log('Materials updated in Pinia (immediately):', item.materials)
  }
})

const state = reactive({
  materials: selectedMaterials
})

const rules = {
    materials: {
        required: helpers.withMessage('Materials are required', required),
        minLength: helpers.withMessage('There must be at least 2 materials selected.', minLength(2)),
    }
}

const v$ = useVuelidate(rules, state)

// Watch for Pinia changes and force Vuelidate to re-evaluate
watch(() => item.materials, (newValue) => {
  // Force Vuelidate to sync with the new value
  v$.value.materials.$model = newValue || []
}, { immediate: true })

async function onBlur() {
    const isValid = await v$.value.$validate()
    
    if (!isValid) {
        console.log('Materials validation failed')
    }
}

function resetSelectedMaterials() {
    selectedMaterials.value = []
}

async function acceptMaterials(event) {
    event.preventDefault()
    event.stopPropagation()
    
    const isValid = await v$.value.$validate()
    
    if (isValid) {
        console.log('Materials accepted:', selectedMaterials.value)
        // Force update to ensure Pinia is in sync
        item.materials = [...selectedMaterials.value]
        console.log('Updated item.materials:', item.materials)
    } else {
        console.log('Materials validation failed - cannot accept')
    }
}

</script>

<template>
    <fieldset class="fieldset materials" @blur="onBlur">
        <legend class="legend">&nbsp; Materials used &nbsp;</legend>    
        
        <p class="display">{{ selectedMaterials.join(', ') }}</p>

        <div class="options">
            <label v-for="material in materialsArray" :key="material" class="label">
                <input type="checkbox" :value="material" v-model="selectedMaterials" class="input"/>
                <span class="span">{{material}}</span>
            </label>
        </div>
                
        <ul v-if="v$.materials.$errors.length" id="materials-errors" class="errors">
            <li v-for="error of v$.materials.$errors" :key="error.$uid"  class="error" ><p>{{ error.$message }}</p></li>
        </ul>
    
        <button type="button" @click="resetSelectedMaterials" class="reset">Reset Materials</button>
        <button type="button" @click="acceptMaterials" class="reset">Accept Materials</button>
        
    </fieldset>

</template>