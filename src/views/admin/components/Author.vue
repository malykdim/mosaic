<script setup>
import { ref, computed, watch } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import { useCreateItem } from '../../../stores/useCreateItem'

const { item } = useCreateItem()

const rules = {
  author: { required }
}

const v$ = useVuelidate(rules, item)

const errors = computed(() => {
  const errorMessages = []
  if (!v$.value.author.required) {
    errorMessages.push('Author is required')
  }
  return errorMessages
})

const picked = ref(item.value.author)

watch(picked, (newVal) => {
  item.value.author = newVal
})
</script>

<template>
    <fieldset class="left inline">
        <legend>Author</legend>                                        
            <input v-model="picked" type="radio" id="vladimir" value="Vladimir Damyanov" aria-describedby="author-errors"/>                        
            <label for="vladimir" class="radio">Vladimir</label>
                                            
            <input v-model="picked" type="radio" id="damyan" value="Damyan Damyanov" aria-describedby="author-errors" />
            <label for="damyan" class="radio">Damyan</label>

            <p class="picked">{{ picked }}</p>

            <div v-if="v$.$dirty && errors.length" class="error" id="author-errors">
                <span v-for="(error, index) in errors" :key="index">{{ error }}</span>
            </div>
    </fieldset>
</template>

<style lang='scss' scoped></style>