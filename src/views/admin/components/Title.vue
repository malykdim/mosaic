<script setup>
import { reactive, watch, ref, computed } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { minLength, helpers } from '@vuelidate/validators'

import { useI18n } from '../../../stores/useI18n'
import { useItem } from '../../../stores/useItem'

const { item } = useItem()
console.log('Initial title:', item.title.bg)

const { translate } = useI18n()

const showErrors = ref(false)

// Use computed to make title reactive to Pinia changes and update immediately
const title = computed({
  get: () => item.title?.bg || '',
  set: (value) => {
    // Ensure title object exists
    if (!item.title) {
      item.title = { bg: '', en: '', de: '' }
    }
    
    item.title.bg = value
    console.log('Title BG updated in Pinia (immediately):', item.title)
  }
})

const state = reactive({
    title: title
})

const rules = {    
    title: { 
        minLength: helpers.withMessage(() => translate('admin.form.errors.titleLength'), minLength(3)),
    }
}

const v$ = useVuelidate(rules, state)

// Watch for Pinia changes and force Vuelidate to re-evaluate
watch(() => item.title.bg, (newValue) => {
  // Force Vuelidate to sync with the new value
  v$.value.title.$model = newValue
}, { immediate: true })

// Check if loaded data is invalid and show errors immediately
if (item.title?.bg && item.title.bg.length < 3) {
    showErrors.value = true
}

// Migration helper for old data format
if (typeof item.title === 'string') {
    const oldTitle = item.title
    item.title = {
        bg: oldTitle,
        en: '',
        de: ''
    }
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
        <legend class="legend">&nbsp; {{ translate('admin.form.title.legend') }} &nbsp;</legend>
        <p class="display">{{ item.title?.bg || '' }}</p>          
        <input 
            v-model.trim="v$.title.$model"
            type="text" 
            id="title" 
            class="input"
            :placeholder="translate('admin.form.title.titlePlaceholder')"
            aria-describedby="title-errors"
            @blur="onBlur"
            @focus="onFocus"
        />
        <!-- <input 
            v-model.trim="v$.title.$model"
            type="text" 
            id="title" 
            class="input"
            placeholder="EN: "
            aria-describedby="title-errors"
            @blur="onBlur"
            @focus="onFocus"
        />
        <input 
            v-model.trim="v$.title.$model"
            type="text" 
            id="title" 
            class="input"
            placeholder="DE: "
            aria-describedby="title-errors"
            @blur="onBlur"
            @focus="onFocus"
        /> -->
        <ul v-if="showErrors && v$.title.$errors.length" id="errors">
            <li v-for="error of v$.title.$errors" :key="error.$uid"  class="error" >
                <p class="message form-inline-error-display">{{ error.$message }}</p>
            </li>
        </ul>    
    </fieldset>
</template>