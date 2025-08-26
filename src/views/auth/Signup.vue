<script setup>
import { ref, onBeforeMount } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../../stores/useUserStore'
import { useI18n } from '../../stores/useI18n'

const router = useRouter()
const userStore = useUserStore()
const { translate } = useI18n()

const email = ref('')
const password = ref('')
const error = ref(null)
const isPending = ref(false)

const handleSubmit = async () => {
    if (!email.value || !password.value) {
        error.value = translate('auth.errors.fillAllFields')
        return
    }

    isPending.value = true
    try {
      const { user, error: signUpError} = await userStore.signUp(email.value, password.value)
      
      if (!signUpError) {
        console.log('user logged in: ', user)
        router.push({ name: 'admin-dashboard' })
      } else {
        console.log('error:', signUpError.message)
        error.value = translate('auth.errors.invalidCredentials')
      }
    } catch (err) {
      console.error('Signup failed:', err)
      error.value = translate('auth.errors.networkError')
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
            <h3 class="title">{{ translate('auth.register.title') }}</h3>
            <label>
                {{ translate('auth.register.email') }}
                <input type="email" :placeholder="translate('auth.register.email')" v-model="email" class="input" autocomplete="off">
            </label>
            <label>
                {{ translate('auth.register.password') }}
                <input type="password" :placeholder="translate('auth.register.password')" v-model="password" class="input" autocomplete="off">
            </label>
            <div v-if="error" class="error">
                {{ error }}
            </div>
            <button v-if="!isPending" type="submit" class="button">{{ translate('auth.register.submit') }}</button>
            <button v-if="isPending" disabled>{{ translate('auth.loading') }}</button>
        </form>
    </section>    
</template>