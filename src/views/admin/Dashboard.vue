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
    const hasUser = userStore.user?.value ?? userStore.user
    if (!hasUser) router.replace({ name: 'home' })
  } catch (e) {
    console.error('Auth check failed:', e)
    router.replace({ name: 'home' })
  }
})
</script>

<template>
    <div class="dashboard">
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