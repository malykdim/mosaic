<script setup>
import { ref, computed, watch, reactive, onMounted } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { required, helpers } from '@vuelidate/validators'

import { useItem } from '../../../stores/useItem'

const { item } = useItem()

// Use computed to make state reactive to Pinia changes
const state = reactive({
  author: computed({
    get: () => item.author,
    set: (value) => { 
      item.author = value
      console.log('Author updated in Pinia (immediately):', item.author)
    }
  })
})

const rules = {
  author: { 
    required: helpers.withMessage('Author is required', required) 
  }
}

const v$ = useVuelidate(rules, state)

// Watch for Pinia changes and force Vuelidate to re-evaluate
watch(() => item.author, (newValue) => {
  // Force Vuelidate to sync with the new value
  v$.value.author.$model = newValue
}, { immediate: true })

async function onBlur() {
    const isValid = await v$.value.$validate()
    
    if (!isValid) {
        console.log('Validation failed')
    }
}

function validateSelection() {
    return state.author !== '' // Ensure a selection was made
}

function handleFocusOut(event) {
    console.log('Focus moved out of: ', event.target)
}

function onChange() {
    console.log('handleChange => state.author: ', state.author)
}

</script>

<template>
	<fieldset @blur="onBlur" class="fieldset author">
        <legend class="legend">&nbsp; Author &nbsp;</legend>   

        <p class="display">{{ state.author }}</p>  

        <div class="radio-buttons">
            <label class="radio-label">
                <input 
                    v-model="v$.author.$model" 
                    type="radio" 
                    value="Vladimir Damyanov" 
                    class="radio" 
                    aria-describedby="author-errors"                    
                    @change="onChange"
                />
                <span class="span">Vladimir</span>
            </label>

            <label class="radio-label">
                <input 
                    v-model="v$.author.$model"                     
                    type="radio" 
                    value="Damyan Damyanov" 
                    class="radio" 
                    aria-describedby="author-errors" 
                    @change="onChange"
                />
                <span class="span">Damyan</span> 
            </label>
        </div>

		<ul v-if="v$.author.$errors.length" id="author-errors" class="errors">
			<li v-for="error of v$.author.$errors" :key="error.$uid" class="error">
                <p class="message">{{ error.$message }}</p>
            </li>
		</ul>
    </fieldset>
</template>

<style lang='scss' scoped>
.author {
    .display {
        color: var(--primary);
        font-size: 0.8em;
    }

    .radio-buttons { 
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        gap: 1.5rem;
        margin: 1rem auto;

        .radio-label {
            width: 100%; 
            font-family: system-ui, sans-serif;
            font-size: 1em;
            font-weight: 400;
            line-height: 1.1;
            margin-bottom: .3rem;
            color: var(--input);

            display: flex;
            justify-content: center;
            align-items: center;
            gap: .5rem;
            cursor: pointer;

            .radio {
                /* Remove default browser styling */
                -webkit-appearance: none;
                appearance: none;
                margin: 0;
                cursor: pointer;

                /* Custom radio button design */
                width: 1.5em;
                height: 1.5em;
                border: 0.15em solid var(--primary);
                border-radius: 50%;
                transform: translateY(-0.075em);
                transition: 0.2s all ease-in-out;
                position: relative;
                background-color: transparent;
                
                display: grid;
                place-content: center;
                
                /* Override global accent-color */
                accent-color: transparent;
                
                &::before { 
                    content: '';
                    width: 0.65em;
                    height: 0.65em;
                    border-radius: 50%;
                    transform: scale(0);
                    transition: transform 0.2s ease-in-out;
                    background-color: var(--primary);
                }

                &:checked {
                    border: 0.15em solid var(--primary);
                    background-color: transparent !important;
                    outline: none;
                    box-shadow: none;
                    accent-color: transparent;
                }

                &:checked::before {
                    transform: scale(1);
                }

                &:focus {
                    outline: max(2px, 0.15em) solid var(--primary);
                    outline-offset: max(2px, 0.15em);
                }
            }

            .span {
                font-size: 1em;
                color: var(--input);
                opacity: .6;
                cursor: pointer;
            }
        }
    }
}
</style>