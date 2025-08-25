<script setup>
import { computed, reactive, watch, ref } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { required, minValue, helpers } from '@vuelidate/validators'

import { useItem } from '../../../stores/useItem'
import { useI18n } from '../../../stores/useI18n'

const { item } = useItem()
const { translate } = useI18n()

// Track the previous unit to detect changes
const previousUnit = ref(item.dimensions.unit)

const state = reactive({
  dimensions: item.dimensions
}) 

const rules = {
  dimensions: {
		w: { 
      required: helpers.withMessage(() => translate('admin.form.errors.widthRequired'), required),
      minValue: helpers.withMessage(() => translate('admin.form.errors.widthTooSmall'), minValue(30))
    },
		h: { 
      required: helpers.withMessage(() => translate('admin.form.errors.heightRequired'), required),
      minValue: helpers.withMessage(() => translate('admin.form.errors.heightTooSmall'), minValue(30)) 
    },
		unit: { required: helpers.withMessage(() => translate('admin.form.errors.unitRequired'), required) }
	}
}

const v$ = useVuelidate(rules, item)

// const errors = computed(() => {
//   const out = []
//   const wErrs = v$.value?.dimensions?.w?.$errors || []
//   const hErrs = v$.value?.dimensions?.h?.$errors || []
//   const uErrs = v$.value?.dimensions?.unit?.$errors || []
//   wErrs.forEach(e => out.push(e.$message))
//   hErrs.forEach(e => out.push(e.$message))
//   uErrs.forEach(e => out.push(e.$message))
//   return out
// })

// Watch for unit changes and convert the actual values
watch(() => item.dimensions.unit, (newUnit) => {
  console.log('Dimensions unit changed to:', newUnit)
  if (previousUnit.value && previousUnit.value !== newUnit) {
    if (previousUnit.value === 'cm' && newUnit === 'inches') {
      // Convert from cm to inches
      item.dimensions.w = Number((item.dimensions.w * 0.393701).toFixed(2))
      item.dimensions.h = Number((item.dimensions.h * 0.393701).toFixed(2))
    } else if (previousUnit.value === 'inches' && newUnit === 'cm') {
      // Convert from inches to cm
      item.dimensions.w = Number((item.dimensions.w * 2.54).toFixed(2))
      item.dimensions.h = Number((item.dimensions.h * 2.54).toFixed(2))
    }
    console.log('Dimensions converted to:', item.dimensions)
  }
  previousUnit.value = newUnit
})

// Watch for width and height changes
watch(() => item.dimensions.w, (newValue) => {
  console.log('Dimensions width changed to:', newValue)
})

watch(() => item.dimensions.h, (newValue) => {
  console.log('Dimensions height changed to:', newValue)
})

const errors = computed(() => {
  const errorMessages = []
  if (!v$.value.dimensions.w.required) {
    errorMessages.push('Width is required')
  }
  if (!v$.value.dimensions.w.minValue) {
    errorMessages.push('Width must be at least 30')
  }
  if (!v$.value.dimensions.h.required) {
    errorMessages.push('Height is required')
  }
  if (!v$.value.dimensions.h.minValue) {
    errorMessages.push('Height must be at least 30')
  }
  if (!v$.value.dimensions.unit.required) {
    errorMessages.push('Unit is required')
  }
  return errorMessages
})


// Computed property to show the opposite unit conversion
const recalculatedDimensions = computed(() => {
  const { w, h, unit } = item.dimensions
  if (unit === 'cm') {
    return { w: Number((w * 0.393701).toFixed(2)), h: Number((h * 0.393701).toFixed(2)), unit: 'inches' }
  } else if (unit === 'inches') {
    return { w: Number((w * 2.54).toFixed(2)), h: Number((h * 2.54).toFixed(2)), unit: 'cm' }
  }
  return { w, h, unit }
})
</script>

<template>
  <fieldset class="fieldset dimensions">
      <legend class="legend">&nbsp; {{ translate('admin.form.dimensions.legend') }} &nbsp;</legend>
      <label class="label">
          <span>{{ translate('admin.form.dimensions.width') }}: </span>
          <input type="number" v-model="item.dimensions.w" min="30" id="width" :placeholder="translate('admin.form.dimensions.width')" width="30px" />{{ item.dimensions.unit }}            
      </label>
      <br/>
      <label class="label">
          <span>{{ translate('admin.form.dimensions.height') }}: </span>
          <input type="number" v-model="item.dimensions.h" min="30" id="height" :placeholder="translate('admin.form.dimensions.height')" width="30px" />{{ item.dimensions.unit }}
      </label>
      <br/>
      <label class="label">
          <span>{{ translate('admin.form.dimensions.unit') }}: </span>
          <select v-model="item.dimensions.unit" id="unit" required aria-describedby="dimensions-errors">
              <option value="" disabled>{{ translate('admin.form.dimensions.unit') }}:</option>
              <option value="cm">{{ translate('admin.form.dimensions.cm') }}</option>
              <option value="inches">{{ translate('admin.form.dimensions.inch') }}</option>
          </select>
      </label>
      <div v-if="v$.$dirty && errors.length" class="error" id="dimensions-errors">
        <span v-for="(error, index) in errors" :key="index">{{ error }}</span>
      </div>
      <div class="recalculated-dimensions">
        <p class="text">{{ recalculatedDimensions.w }} x {{ recalculatedDimensions.h }} {{ recalculatedDimensions.unit }}</p>
      </div>
  </fieldset>
</template>