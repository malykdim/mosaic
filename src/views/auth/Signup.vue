<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

import supabase from '../../config/supabase'

const router = useRouter()

const email = ref('')
const password = ref('')

const signUp = async (email, password) => {
    const { user, error } = await supabase.auth.signUp({ email, password })
}

const handleSubmit = async () => {
    if (!email.value || !password.value) {
        error.value = 'Please fill in all fields'
        return
    }

    const response = await signUp(email.value, password.value)
    console.log(response)

    if (!error.value) {
        console.log('user signed up: ', response.user)
        router.push({ name: 'dashboard' })
    }
    if (response.error) {
        console.log('error:', response.error.message)
    }
}
</script>

<template>
    
    <form @submit.prevent="handleSubmit">
        <h3>Sign up</h3>
        <input type="email" placeholder="Email" v-model="email">
        <input type="password" placeholder="Password" v-model="password">
        <div v-if="error" class="error">
            {{ error }}
        </div>
        <button v-if="!isPending" type="submit">Sign up</button>
        <button v-if="isPending" type="submit" disabled>Loading...</button>
    </form>
</template>

<style lang='scss' scoped>

</style>