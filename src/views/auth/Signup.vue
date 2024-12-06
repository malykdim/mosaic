<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

import useSignup from '../../composables/useSignup'

const router = useRouter()

const { error, signup, isPending } = useSignup()

const email = ref('')
const password = ref('')
const displayName = ref('')

const handleSubmit = async () => {
    const response = await signup(email.value, password.value, displayName.value)

    if (!error.value) {
        console.log('user signed up')
        router.push({ name: 'home' })
    }
}
</script>

<template>
    
    <form @submit.prevent="handleSubmit">
        <h3>Sign up</h3>
        <input type="text" placeholder="Display name" v-model="displayName">
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