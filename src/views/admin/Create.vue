<script setup>
import { ref, onMounted, onBeforeMount } from 'vue'
import { useRouter } from 'vue-router'

import { useUserStore } from '../../stores/useUserStore'
import { useI18n } from '../../stores/useI18n.js'

import { useItem } from '../../stores/useItem' 
import { useCollection } from '../../stores/useCollection' 

import Author from './components/Author.vue'
import Image from './components/Image.vue'
// import Notifications from '../../components/Notifications.vue'

const router = useRouter()

const { user, checkUser } = useUserStore()
const { translate } = useI18n()

const { item, resetItem, fileToImageUrl } = useItem() 
// { author, file, imageUrl}

const { addDoc } = useCollection()

const isPending = ref(false)
const handleCreate = async () => {    
    isPending.value = true

    try {
        await fileToImageUrl(item)
    
        await addDoc('mosaics', item)
        resetItem()        
        router.push({ name: 'admin-dashboard' })
    } catch (err) {
        console.error('Create failed:', err)
        /* 5. Notify the user */ /* TODO */
    } finally {
       isPending.value = false
    }
}

onBeforeMount(async () => {
  try {
    await checkUser()
    const hasUser = user?.value ?? user
    if (!hasUser) router.replace({ name: 'home' })
  } catch (e) {
    console.error('Auth check failed:', e)
    router.replace({ name: 'home' })
  }
})

// Reset item when Create page loads to ensure clean slate
onMounted(() => {
    resetItem()
})

</script>

<template>
<div class="page create-edit-container">
    <h3 class="title">{{ translate('admin.create') }}</h3>

    <form @submit.prevent="handleCreate" class="create" novalidate>
        <div class="formFields">
            <div class="picture">
                <Image />   
            </div>            
            
            <div class="info">
                <Author />
            </div>    
        </div>

        <!-- <Notifications /> -->
        
        <div class="submit">
            <button 
                v-if="!item.author || !item.file" 
                type="button" 
                disabled
            >
                {{ translate('messages.invalid') }}
            </button>
            <button 
                v-if="item.author && item.file && !isPending" 
                type="submit"
            >
                {{ translate('admin.create') }}
            </button>        
            <button v-if="isPending" type="button" disabled>{{ translate('messages.saving') }}</button> 
        </div>
    </form>
</div>
</template>