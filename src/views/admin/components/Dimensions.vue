<script setup>
import { computed } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { required, minValue } from '@vuelidate/validators'
import { useCreateItem } from '../../../stores/useCreateItem'

const { item } = useCreateItem()

const rules = {
  dimensions: {
    w: { required, minValue: minValue(30) },
    h: { required, minValue: minValue(30) },
    unit: { required }
  }
}

const v$ = useVuelidate(rules, item)

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


// Computed property to recalculate dimensions based on the selected unit
const recalculatedDimensions = computed(() => {
  const { w, h, unit } = item.value.dimensions
  if (unit === 'cm') {
    return { w: w * 0.393701, h: h * 0.393701, unit: 'inches' }
  } else if (unit === 'inches') {
    return { w: w * 2.54, h: h * 2.54, unit: 'cm' }
  }
  return { w, h, unit }
})
</script>

<template>
<fieldset class="dim">
    <legend>Dimensions</legend>
    <label for="width">
        Width
        <input type="number" v-model="item.dimensions.w" min="30" id="width" placeholder="Width" width="30px" /> cm             
    </label>
    <br/>
    <label for="height">
        Height
        <input type="number" v-model="item.dimensions.h" min="30" id="height" placeholder="Height" width="30px" /> cm
    </label>
    <br/>
    <label for="unit">
        Unit
        <select v-model="item.dimensions.unit" id="unit" required aria-describedby="dimensions-errors">
            <option value="" disabled>Select unit</option>
            <option value="cm">cm</option>
            <option value="inches">inches</option>
        </select>
    </label>
    <div v-if="v$.$dirty && errors.length" class="error" id="dimensions-errors">
      <span v-for="(error, index) in errors" :key="index">{{ error }}</span>
    </div>
    <div class="recalculated-dimensions">
      <p>Recalculated Dimensions: {{ recalculatedDimensions.w }} x {{ recalculatedDimensions.h }} {{ recalculatedDimensions.unit }}</p>
    </div>
</fieldset>
</template>

<style lang='scss' scoped>
.dim {
    padding: .5rem 0 .5rem 1rem;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: center;
    
    label {
        width: 100%; 
    }
    
    input {
        width: 15%;
    }
}
</style>