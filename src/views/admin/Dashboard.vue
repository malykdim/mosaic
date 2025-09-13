<script setup>
import { onBeforeMount } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../../stores/useUserStore'
import { useI18n } from '../../stores/useI18n'

import MiniGallery from './components/MiniGallery.vue'

const router = useRouter()
const userStore = useUserStore()
const { translate } = useI18n()

const dashboardLogout = async () => {
    await userStore.logout()
    router.push({ name: 'home' })
}

onBeforeMount(async () => {
  try {
    await userStore.checkUser()
    // await new Promise(resolve => setTimeout(resolve, 100))
    
    console.log('userStore.user after checkUser:', userStore.user.email)
    
    // Try both ways to access the user
    const hasUser = userStore.user?.value || userStore.user
    console.log('hasUser:', hasUser)
    
    if (!hasUser || (!userStore.user?.value && !userStore.user?.id)) {
      console.log('No user found, redirecting to home')
      router.replace({ name: 'home' })
    }
  } catch (e) {
    console.error('Auth check failed:', e)
    router.replace({ name: 'home' })
  }
})
</script>

<template>
    <div class="dashboard">
        <p class="user">{{ userStore.user.email }}</p>
        <nav class="admin-menu">
            <router-link to="/admin/create" class="btn" aria-label="Create mosaic">{{ translate('admin.create') }}</router-link>
            <button v-if="userStore.user" @click="dashboardLogout" class="btn" aria-label="Logout">{{ translate('auth.logout') }}</button>
        </nav>
        <MiniGallery />
    </div>
</template>

<style lang='scss' scoped>
@use '../../assets/partials/admin-dashboard' as *;
</style>