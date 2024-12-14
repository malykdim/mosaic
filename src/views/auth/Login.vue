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

/* Supabase Sign in an existing user */
const signIn = async (email, password) => {
    const { user, error } = await supabase.auth.signIn({ email, password })
}

const handleSubmit = async () => {
  if (!email.value || !password.value) {
    error.value = 'Please fill in all fields'
    return
  }

  isPending.value = true
  const { user, error: signInError } = await userStore.signIn(email.value, password.value)
  isPending.value = false

  if (!signInError) {
    console.log('user logged in: ', user)
    router.push({ name: 'dashboard' })
  } else {
    console.log('error:', signInError.message)
    error.value = signInError.message
  }
}
</script>

<template>
    
    <form @submit.prevent="handleSubmit">
        <h3>Login</h3>
        <input type="email" placeholder="Email" v-model="email">
        <input type="password" placeholder="Password" v-model="password">
        <div v-if="error" class="error">
            {{ error }}
        </div>
        <button v-if="!isPending" type="submit">Login</button>
        <button v-if="isPending" type="submit" disabled>Loading...</button>
    </form>
</template>

<style lang='scss' scoped>

</style>