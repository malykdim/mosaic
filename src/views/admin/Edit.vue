<script setup>
import { ref, computed, onBeforeMount } from 'vue'
import { useRouter, useRoute } from 'vue-router'

import { useUserStore } from '../../stores/useUserStore'
import { useI18n } from '../../stores/useI18n.js'

import { useGalleryListener } from '../../stores/useGalleryListener.js'
import { useItem } from '../../stores/useItem.js'
import { updateMosaicItem } from './functions/updateItem.js'

import Title from '../admin/components/Title.vue'
import Author from '../admin/components/Author.vue'
import Dimensions from '../admin/components/Dimensions.vue'
import Materials from '../admin/components/Materials.vue'
import Image from '../admin/components/Image.vue'
// import Notifications from '../../components/Notifications.vue'

const router = useRouter()
const route = useRoute()

const { user, checkUser } = useUserStore()
const { translate } = useI18n()

const id = Number(route.params.id)

const singleItem = ref(null)
const loadError = ref(null)
const isPending = ref(false)

const { item, resetItem, resetOnLeave } = useItem()
const { getSingleItem } = useGalleryListener()

const isValid = computed(() => 
    item?.title?.bg?.length >= 3 && 
    item?.author && 
    item?.dimensions && 
    item?.materials && 
    (item?.imageUrl || item?.file)
)

const handleUpdate = async () => {
    
    isPending.value = true    
    
    try {
        // IF USER SELECTED NEW IMAGE - UPLOAD IT FIRST        
        const { data, error } = await updateMosaicItem (id, item)
        console.log('Database updated successfully!')
                
        if (error) {
            console.error('Failed to update item: ' + (error.message || JSON.stringify(error)))
            return
        }
        
        if (data) {            
            try {
                const { data: verifyData, error: verifyError } = await getSingleItem('mosaics', id)
                if (verifyData) {
                    Object.assign(item, verifyData) // Update the Pinia store with fresh data from DB
                    singleItem.value = verifyData
                } else {
                    console.error('VERIFICATION FAILED:', verifyError)
                }
            } catch (verifyErr) {
                console.error('Error verifying update:', verifyErr)
            }
            
            // Give user choice to stay or go
            const shouldNavigate = confirm('Item updated successfully! Database verification complete. Would you like to go to dashboard? (Click Cancel to stay and see the changes)')
            
            if (shouldNavigate) {
                try {
                    await router.push({ name: 'admin-dashboard' })
                } catch (navError) {
                    console.error('Navigation failed:', navError)
                    // Try alternative routes
                    try {
                        await router.push('/admin/dashboard')
                    } catch {
                        window.location.href = '/'
                    }
                }
            } else {
                // Stay on page to verify changes
                isPending.value = false
            }
        } else {
            console.warn('No data returned from update')
            alert('Update completed but no data returned')
        }
        
    } catch (error) {
        console.error('Unexpected error during update:', error.message)
    } finally {
        isPending.value = false
    }
}    

onBeforeMount(async () => {
    isPending.value = true   
    try {
        await checkUser()
        const hasUser = user?.value ?? user
        if (!hasUser) router.replace({ name: 'home' })
    } catch (error) {
        console.error('Auth check failed:', error.message)
        loadError.value = error.message
        router.replace({ name: 'home' })
    }

    // validate id param early
    if (!Number.isFinite(id) || id <= 0) {
        console.error('Invalid or missing id param:', route.params.id)
        router.replace({ name: 'admin-dashboard' })
        return
    }

    try {
        const { data, error } = await getSingleItem('mosaics', id)

        if (error) {
            console.error('Error from getSingleItem:', error)
            router.replace({ name: 'not-found' })
            return
        }

        if (!data) {
            console.warn('No item found for id:', id)
            router.replace({ name: 'not-found' })
            return
        }

        singleItem.value = data
        Object.assign(item, data)

        if (typeof item.title === 'string') {
            console.log('Migrating old title format:', item.title)
            const oldTitle = item.title
            item.title = {
                bg: oldTitle,
                en: '',
                de: ''
            }
            singleItem.value.title = item.title // Also update the display reference
        }
        
        // Ensure title object structure exists
        if (!item.title || typeof item.title !== 'object') {
            item.title = { bg: '', en: '', de: '' }
        }
    } catch (error) {
        console.error('Error loading item:', error)
        router.replace({ name: 'not-found' })
    } finally {
        isPending.value = false
    }
})

resetOnLeave()
</script>

<template>
    <div class="page create-edit-container">
        <h3 v-if="singleItem" class="title">{{ translate('admin.edit') }} {{ singleItem.title.bg }}</h3>
        <p v-else-if="isPending">{{ translate('messages.loadingItem') }}</p>
        <form v-if="singleItem"  @submit.prevent="handleUpdate" class="edit form" novalidate>
            <div class="formFields">
                <!-- LEFT -->
                <div class="picture">
                    <Image />   
                </div>                
                
                <!-- RIGHT -->    
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
                    v-if="isValid && !isPending" 
                    type="submit"
                >
                    {{ translate('messages.saveChanges') }}
                </button>

                <button 
                    v-if="!isValid" 
                    type="button" 
                    disabled
                >    
                    {{ translate('messages.invalid') }}
                </button>    

                <button v-if="isPending" type="button" disabled>{{ translate('messages.saving') }}</button> 
                
            </div>
        </form> 
        <p v-else-if="!isPending">{{ translate('messages.notFound') }}</p>
    </div>
</template>