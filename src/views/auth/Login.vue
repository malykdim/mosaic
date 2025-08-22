<script setup>
import { ref, onBeforeMount } from 'vue'
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
  try {
	const { user, error: signInError } = await userStore.signIn(email.value, password.value)
	
	if (!signInError) {
	  console.log('user logged in ')
	  router.push({ name: 'admin-dashboard' })
	} else {
	  console.log('error:', signInError.message)
	  error.value = signInError.message
	} 
  } catch (err) {
	console.log('error during auth')
	console.log(`Error: ${err.message}`)
  } finally {
	isPending.value = false
  }
}

onBeforeMount(async () => {
  try {
    await userStore.checkUser()
    const hasUser = userStore.user?.value ?? userStore.user
    if (hasUser) router.replace({ name: 'admin-dashboard' })
  } catch (e) {
    console.error('Auth check failed:', e) // allow guest if check fails
  }
})

</script>

<template>
	<section class="auth-page">
		<form @submit.prevent="handleSubmit" class="form card">
			<h3 class="title">Login</h3>
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
			<button v-if="!isPending" type="submit" class="button">Login</button>
			<button v-if="isPending" disabled>Loading...</button>
		</form>
	</section>
</template>