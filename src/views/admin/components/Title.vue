<script setup>
import { reactive, watch } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { required, minLength } from '@vuelidate/validators'

import { useCreateItem } from '../../../stores/useCreateItem'

const { item } = useCreateItem()

const state = reactive({
    title: item.value.title
})
const rules = {
    title: { required, minLength: minLength(3)  }
}

const v$ = useVuelidate(rules, state)

watch(() => state.title, (newTitle) => {
  item.value.title = newTitle
})


</script>

<template>
<fieldset class="left">
    <legend>&nbsp; Panneau Name &nbsp;</legend>
        <label for="title"></label>
        <input 
            v-model.trim="state.title"
            type="text" 
            id="title" 
            placeholder="panneaux title"
            required
            aria-describedby="title-errors"
        />
        <div v-if="v$.$dirty && v$.title.$errors.length" class="error" id="title-errors">
            <span v-for="error in v$.title.$errors" :key="error.$uid">{{ error.$message }}</span>
        </div>              
</fieldset>
</template>

<style lang='scss' scoped>
.left {
    padding: .5rem 0 .5rem 1rem;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: center;
    border: 1px solid var(--secondary);

    legend {
        padding: 0 .5rem;
        font-size: 1em;
        font-weight: 600;
        margin-bottom: .5rem;
        color: var(--input);
    }
    
    label {
        width: 100%; 
        font-size: 1em;
        font-weight: 400;
        margin-bottom: .3rem;
        color: var(--hover);
    }
    
    input {
        width: 50%;
        padding: .5rem;
        margin-bottom: .5rem;
        border: 1px solid #ccc;
        border-radius: 5px;

        &::placeholder {
            font-size: 1rem;
            color: var(--secondary);
            text-align: center;
        }
    }
    
    .error {
        color: red;
        font-size: .8rem;
        margin-top: .5rem;
    }
}
</style>