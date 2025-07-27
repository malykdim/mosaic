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

<style lang='scss' scoped>
.materials {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: center;
    gap: 1rem;
    padding-bottom: 1rem;

    .display {
        color: var(--primary);
        font-size: 0.8em;
        margin-top: 1rem;
    }
    
    .options {
        display: grid;
        grid-template-columns: auto auto auto;
        gap: 1.5em;
        margin-top: 1rem;
        
        .label {
            font-family: system-ui, sans-serif;
            font-size: .6em;
            font-weight: 100;
            line-height: 1.1;
            color: var(--input);
    
            display: flex;
            justify-content: start;
            align-items: center;
            gap: 0.5rem;
            padding: .5em;

            outline: 0;
            outline-offset: 0;

            .input {
                -webkit-appearance: none;
                appearance: none;
                background-color: #fff;
                margin: 0;
                color: var(--input);
                border: 1px solid var(--primary);
                border-radius: 0.15em;
                padding: 0.5em;
                cursor: pointer;

                display: grid;
                place-content: center;

                &::before {
                    content: "";
                    width: 0.8em;
                    height: 0.8em;
                    transform: scale(0);
                    transition: 120ms transform ease-in-out;
                    background-color: var(--primary);
                    
                    /* checkmark with clip-path */
                    transform-origin: center;
                    clip-path: polygon(14% 44%, 0 65%, 50% 100%, 100% 16%, 80% 0%, 43% 62%);
                }

                &:checked {
                    background-color: white;
                    border: 1px solid var(--primary);
                }

                &:checked::before {
                    transform: scale(1);
                    background-color: var(--primary);
                }

                &:focus {
                    border: 1px solid var(--primary);
                    box-shadow: inset 1em 1em white;
                    outline: max(2px, 0.15em) solid transparent;
                    outline-offset: max(1px, 0.15em);
                }

                &:disabled {
                    color: var(--hover);
                    cursor: not-allowed;
                }
            }
    
            .span {
                font-family: inherit;
                color: var(--input);
            }

            &:disabled {
                color: var(--hover);
                cursor: not-allowed;
            }
        }
    }

    .preview {
        font-size: 0.5em;
        color: var(--primary);
        margin-top: .5rem;
    }

    .reset {
        background-color: var(--primary);
        color: white;
        border: 1px solid var(--primary);
        box-shadow: var(--shadow);
        border-radius: var(--border-radius);
        width: 60%;
        margin: 0 auto;
    }
}
</style>