<script setup>
import { ref, computed, watch, reactive, onMounted } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { required, helpers } from '@vuelidate/validators'

import { useItem } from '../../../stores/useItem'
import { useI18n } from '../../../stores/useI18n'

const { item } = useItem()

const { translate } = useI18n()

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
    required: helpers.withMessage(() => translate('.admin.form.errors.authorRequired'), required) 
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
        <legend class="legend">&nbsp; {{ translate('admin.form.author.legend') }} &nbsp;</legend>   

        <p class="display">{{ state.author }}</p>  

        <div class="radio-buttons">
            <label class="radio-label">
                <input 
                    v-model="v$.author.$model" 
                    type="radio" 
                    :value="translate('admin.form.author.vladimir')" 
                    class="radio" 
                    aria-describedby="author-errors"                    
                    @change="onChange"
                />
                <span class="span">{{ translate('admin.form.author.vladimir') }}</span>
            </label>

            <label class="radio-label">
                <input 
                    v-model="v$.author.$model"                     
                    type="radio" 
                    :value="translate('admin.form.author.damyan')" 
                    class="radio" 
                    aria-describedby="author-errors" 
                    @change="onChange"
                />
                <span class="span">{{ translate('admin.form.author.damyan') }}</span> 
            </label>
        </div>

		<ul v-if="v$.author.$errors.length" id="author-errors" class="errors">
			<li v-for="error of v$.author.$errors" :key="error.$uid" class="error">
                <p class="message">{{ translate('admin.form.errors.authorRequired') }}</p>
            </li>
		</ul>
    </fieldset>
</template>