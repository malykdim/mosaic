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
  const { user, error: signInError } = await userStore.signIn(email.value, password.value)
  isPending.value = false

  if (!signInError) {
    console.log('user logged in: ', user)
    router.push({ name: 'admin-dashboard' })
  } else {
    console.log('error:', signInError.message)
    error.value = signInError.message
  }
}
</script>

<template>
	<section class="login">
		<form @submit.prevent="handleSubmit" class="form card">
			<h3 class="title">Login</h3>
			<input type="email" placeholder="Email" v-model="email" class="input">
			<input type="password" placeholder="Password" v-model="password" class="input">
			<div v-if="error" class="error">
				{{ error }}
			</div>
			<button v-if="!isPending" type="submit" class="btn">Login</button>
			<button v-if="isPending" type="submit" disabled>Loading...</button>
		</form>
	</section>
</template>

<style lang='scss' scoped>
.login {
	width: 100%;

	display: flex;
	flex-direction: column;
	align-items: center;	
	
	.form {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		width: 100%;
		max-width: 400px;
		margin: 3rem auto;
		z-index: 100;
		.title {
			text-align: center;
			margin-bottom: 1rem;
			color: var(--primary);
		}
		
		.input {
			padding: 0.5rem;
			border: 1px solid #ccc;
			border-radius: 4px;
			font-size: 1rem;
		}
		
		button {
			padding: 0.5rem;
			background-color: var(--primary);
			font-size: 1.1em;
			color: white;
			border: none;
			border-radius: 4px;
			cursor: pointer;
			
			&:disabled {
				background-color: #ccc;
				cursor: not-allowed;
			}
		}
		
		.error {
			color: red;
			font-size: 0.9rem;
			text-align: center;
		}
	}
	
	.card {
		padding: 5rem;
		border-radius: 4px;
		background-color: rgba(210,175,93, 0.2);
		box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
		margin: 5rem 0 50rem 0;
	}

	@media screen and (max-width: 500px) {
		.form {
			max-width: 80%;
			
			.title, .btn {
				font-size: 1.4em;
			}
		}
		.card	 {
			padding: 1rem;
			margin: 3rem 0 50rem 0;
		}
	}
}
</style>