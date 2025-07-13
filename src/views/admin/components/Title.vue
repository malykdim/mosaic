<script setup>
import { reactive, watch, ref, computed } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { minLength, helpers } from '@vuelidate/validators'

import { useItem } from '../../../stores/useItem'

const { item } = useItem()
console.log('Initial title:', item.title)

const showErrors = ref(false)

// Use computed to make title reactive to Pinia changes and update immediately
const title = computed({
  get: () => item.title,
  set: (value) => { 
    item.title = value
    console.log('Title updated in Pinia (immediately):', item.title)
  }
})

const state = reactive({
    title: title
})

const rules = {    
    title: { 
        minLength: helpers.withMessage('Title must be at least 3 characters long', minLength(3)),
    }
}

const v$ = useVuelidate(rules, state)

// Watch for Pinia changes and force Vuelidate to re-evaluate
watch(() => item.title, (newValue) => {
  // Force Vuelidate to sync with the new value
  v$.value.title.$model = newValue
}, { immediate: true })

// Check if loaded data is invalid and show errors immediately
if (item.title && item.title.length < 3) {
    showErrors.value = true
}

async function onBlur() {
    showErrors.value = true
    const isValid = await v$.value.$validate()
    
    if (!isValid) {
        console.log('Title validation failed')
    }
}

function onFocus() {
    // Reset validation state when user starts typing again
    showErrors.value = false
    v$.value.$reset()
}
</script>

<template>
<fieldset class="fieldset title">
    <legend class="legend">&nbsp; Panneau Name &nbsp;</legend>
    <p class="display">{{ item.title }}</p>          
    <input 
        v-model.trim="v$.title.$model"
        type="text" 
        id="title" 
        class="input"
        placeholder="panneaux title"
        aria-describedby="title-errors"
        @blur="onBlur"
        @focus="onFocus"
    />
    <ul v-if="showErrors && v$.title.$errors.length" id="errors">
        <li v-for="error of v$.title.$errors" :key="error.$uid"  class="error" >
            <p class="message">{{ error.$message }}</p>
        </li>
    </ul>    
</fieldset>
</template>

<style lang='scss' scoped>
.title {
        
    .input {
        width: 70%;
        margin-bottom: .5rem;
    }

    .error {
        font-size: x-small;
        color: red;
        padding-bottom: 0.5em;
    }

    .display {
        color: var(--primary);
        font-size: 0.8em;
    }
}
</style>