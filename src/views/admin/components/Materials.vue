<script setup>
import { ref, reactive, computed, watch } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { required, minLength, helpers } from '@vuelidate/validators'

import { useItem } from '../../../stores/useItem'
import { useI18n } from '../../../stores/useI18n'

const { item } = useItem()
const { translate } = useI18n()

const materialsIds = [
  'marble','amethyst','jasper','labradorite','pyrite','agate','onyx','jade',
  'malachite','citrine','obsidian','serpentine','quartz','firestone','tigers-eye',
  'mountain-crystal','glass','wood','other'
]

// Use computed to make selectedMaterials reactive to Pinia changes
const selectedMaterials = computed({
  get: () => item.materials || [],
  set: (value) => { 
    item.materials = value
    console.log('Materials updated in Pinia (immediately):', item.materials)
  }
})

const selectedMaterialsTranslated = computed(() =>
  (selectedMaterials.value || [])
    .map(id => translate(`admin.form.materials.items.${id}`) || id)
    .join(', ')
)

const state = reactive({
  materials: selectedMaterials
})

const rules = {
    materials: {
        required: helpers.withMessage(() => translate('admin.form.errors.materialsRequired'), required),
        minLength: helpers.withMessage(() => translate('admin.form.errors.materialsMin'), minLength(2)),
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
        <legend class="legend">&nbsp; {{ translate('admin.form.materials.legend') }} &nbsp;</legend>    
        
        <!-- <p class="display">{{ selectedMaterials.join(', ') }}</p> -->
        <p class="display">{{ selectedMaterialsTranslated }}</p> 

        <div class="options">
            <label v-for="material in materialsIds" :key="material" class="label">
                <input type="checkbox" :value="material" v-model="selectedMaterials" class="input"/>
                <span class="span">{{ translate(`admin.form.materials.items.${material}`) || material }}</span>
            </label>
        </div>
                
        <ul v-if="v$.materials.$errors.length" id="materials-errors" class="errors">
            <li v-for="error of v$.materials.$errors" :key="error.$uid"  class="error" >
                <p class="message">{{ error.$message }}</p>
            </li>
        </ul>
    
        <button type="button" @click="resetSelectedMaterials" class="reset">{{ translate('admin.form.materials.buttons.reset') }}</button>
        <button type="button" @click="acceptMaterials" class="reset" :disabled="v$.materials.$invalid">{{ translate('admin.form.materials.buttons.accept') }}</button>
        
    </fieldset>

</template>