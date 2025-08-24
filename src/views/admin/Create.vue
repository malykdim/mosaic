<script setup>
import { ref, onMounted, onBeforeMount } from 'vue'
import { useRouter } from 'vue-router'

import { useUserStore } from '../../stores/useUserStore'

import { useItem } from '../../stores/useItem' 

import validateUserInput from '../admin/functions/validateUserInput.js'

import { useCollection } from '../../stores/useCollection' 

import Title from './components/Title.vue'
import Author from './components/Author.vue'
import Dimensions from './components/Dimensions.vue'
import Materials from './components/Materials.vue'
import Image from './components/Image.vue'
// import Notifications from '../../components/Notifications.vue'

const router = useRouter()

const { user, checkUser } = useUserStore()

const { item, resetItem, fileToImageUrl } = useItem() 
// {title, author, dimensions, materials, file, imageUrl}

const { addDoc } = useCollection()

const isPending = ref(false)
const handleCreate = async () => {    
    isPending.value = true

    try {
        /* 1. Validate item in Pinia */
        validateUserInput(item)      
    
        /* 2. Save image in Supabase storage */
        /* 3. Update item.imageUrl in Pinia */
        await fileToImageUrl(item)
    
        /* 4. Add item to Supabase database in bucket mosaics */
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
    <h3 class="title">Create new panneaux</h3>

    <form @submit.prevent="handleCreate" class="create" novalidate>
        <div class="formFields">
            <div class="picture">
                <Image />   
            </div>            
            
            <div class="info">
                <Title />
                <Author />
                <Dimensions />
                <Materials />
            </div>    
        </div>

        <!-- <Notifications /> -->
        
        <div class="submit">
            <button 
                v-if="item.title.length < 3 || !item.author || !item.dimensions || !item.materials || !item.file" 
                type="button" 
                disabled
            >
                Invalid
            </button>
            <button 
                v-if="item.title.length >= 3 && item.author && item.dimensions && item.materials && item.file && !isPending" 
                type="submit"
            >
                Create
            </button>        
            <button v-if="isPending" type="button" disabled>Saving...</button> 
        </div>
    </form>
</div>
</template>