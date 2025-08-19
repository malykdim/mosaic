<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../../stores/useUserStore'

const router = useRouter()
const userStore = useUserStore()

const email = ref('')
const password = ref('')
const error = ref(null)
const isPending = ref(false)

const handleSubmit = async () => {
    if (!email.value || !password.value) {
        error.value = 'Please fill in all fields'
        return
    }

    isPending.value = true
    const { user, error: signUpError} = await userStore.signUp(email.value, password.value)
    isPending.value = false

  if (!signUpError) {
    console.log('user logged in: ', user)
    router.push({ name: 'admin-dashboard' })
  } else {
    console.log('error:', signUpError.message)
    error.value = signUpError.message
  }
}
</script>

<template>
    <section class="auth-page">
        <form @submit.prevent="handleSubmit" class="form card">
            <h3 class="title">Sign up</h3>
            <label>
                Email
                <input type="email" placeholder="Email" v-model="email" class="input" autocomplete="off">
            </label>
            <label>
                Password
                <input type="password" placeholder="Password" v-model="password" class="input" autocomplete="off">
            </label>
            <div v-if="error" class="error">
                {{ error }}
            </div>
            <button v-if="!isPending" type="submit" class="button">Sign up</button>
            <button v-if="isPending" disabled>Loading...</button>
        </form>
    </section>    
</template>