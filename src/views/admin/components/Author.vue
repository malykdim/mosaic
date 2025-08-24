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