<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, onBeforeRouteLeave } from 'vue-router'

import router from '../../config/router.js'
import { useGalleryListener } from '../../stores/useGalleryListener.js'
import { useItem } from '../../stores/useItem.js'
import { useCollection } from '../../stores/useCollection.js'
import validateUserInput from '../admin/functions/validateUserInput.js'
import supabase from '../../config/supabase.js'

import Title from '../admin/components/Title.vue'
import Author from '../admin/components/Author.vue'
import Dimensions from '../admin/components/Dimensions.vue'
import Materials from '../admin/components/Materials.vue'
import Image from '../admin/components/Image.vue'
import Notifications from '../../components/Notifications.vue'


const route = useRoute()
const id = Number(route.params.id)

const singleItem = ref(null)
const error = ref(null)
const isPending = ref(false)

const { item, resetItem, resetOnLeave } = useItem()
const { getSingleItem } = useGalleryListener()

const getExistingItem = async () => {
    try {
        console.log('=== LOADING DATA FROM DATABASE ===')
        isPending.value = true
        const { data, error: fetchError } = await getSingleItem('mosaics', id)
    
        if (fetchError) {
            console.error(`Error during getSingleItem: ${fetchError.message}`)
            error.value = fetchError.message
            console.log('Error: ', error.value)
            isPending.value = false            
        } else {
            console.log('=== RAW DATA FROM DATABASE ===')
            console.log('Raw data:', JSON.stringify(data, null, 2))
            
            // After fetching:
            singleItem.value = data
            
            console.log('=== BEFORE OBJECT.ASSIGN ===')
            console.log('Current item state:', JSON.stringify(item, null, 2))
            
            Object.assign(item, data)
            
            console.log('=== AFTER OBJECT.ASSIGN ===')
            console.log('Updated item in Pinia:', JSON.stringify(item, null, 2))
            console.log('item.materials specifically:', item.materials)
            console.log('Type of item.materials:', typeof item.materials)
            
            isPending.value = false
        }        
    } catch (error) {
        console.error('Unexpected error: ', error.message)
        isPending.value = false
    }
}

// Simple test function to debug Supabase directly
const testDirectUpdate = async () => {
    console.log('🧪 Testing direct Supabase update...')
    try {
        // First, let's check the exact table name and current user
        const { data: user } = await supabase.auth.getUser()
        console.log('Current user:', user?.user?.id)
        
        // Let's check if it's 'mosaics' or 'items' table
        const { data: checkItems, error: itemsError } = await supabase
            .from('items')
            .select('id, title')
            .eq('id', id)
            .single()
        
        const { data: checkMosaics, error: mosaicsError } = await supabase
            .from('mosaics')
            .select('id, title')
            .eq('id', id)
            .single()
        
        console.log('Table check - items:', { checkItems, itemsError })
        console.log('Table check - mosaics:', { checkMosaics, mosaicsError })
        
        // Try updating the table that actually contains the data
        const tableName = checkMosaics && !mosaicsError ? 'mosaics' : 'items'
        console.log('Using table:', tableName)
        
        const { data, error, count } = await supabase
            .from(tableName)
            .update({ title: 'TEST TITLE - ' + Date.now() })
            .eq('id', id)
            .select()
        
        console.log('Direct update result:', { data, error, count, rowsAffected: data?.length || 0 })
        
        if (error) {
            console.error('❌ Direct update error:', error)
        } else if (!data || data.length === 0) {
            console.warn('⚠️ Direct update: 0 rows affected')
        } else {
            console.log('✅ Direct update successful!')
            // Reload the item to see the change
            await getExistingItem()
        }
    } catch (err) {
        console.error('❌ Direct update exception:', err)
    }
}

// singleItem.value = request(id)
const { updateDoc, delDoc } = useCollection()

const debugFormState = () => {
    console.log('=== FORM VALIDATION DEBUG ===')
    console.log('Title length:', item?.title?.length)
    console.log('Title value:', item?.title)
    console.log('Author:', item?.author)
    console.log('Dimensions:', item?.dimensions)
    console.log('Materials:', item?.materials)
    console.log('Materials type:', typeof item?.materials)
    console.log('Materials length:', item?.materials?.length)
    console.log('ImageUrl:', item?.imageUrl)
    
    const isValid = item?.title?.length >= 3 && item?.author && item?.dimensions && item?.materials && item?.imageUrl
    console.log('Form is valid:', isValid)
    console.log('Submit button should be enabled:', isValid && !isPending.value)
}

const handleUpdate = async () => {
    debugFormState() 
    console.log('=== HANDLE UPDATE STARTED ===')
    console.log('Current item state:', JSON.stringify(item, null, 2))
    
    isPending.value = true
    
    // Use the actual item from Pinia which contains all user changes
    const updatedFields = {
        title: item.title,
        author: item.author,
        dimensions: item.dimensions,
        materials: item.materials,
        imageUrl: item.imageUrl
    }
    
    console.log('=== SENDING TO DATABASE ===')
    console.log('ID:', id, 'Type:', typeof id)
    console.log('Updated fields:', JSON.stringify(updatedFields, null, 2))
    
    try {
        const { data, error } = await updateDoc('mosaics', id, updatedFields)
        
        console.log('=== DATABASE RESPONSE ===')
        console.log('Data:', data)
        console.log('Error:', error)
        
        if (error) {
            console.error('Update failed:', error)
            alert('Failed to update item: ' + (error.message || JSON.stringify(error)))
            isPending.value = false
            return
        }
        
        if (data) {
            console.log('Update successful:', data)
            
            // Test: Reload the data from database to verify it was saved
            console.log('=== VERIFYING UPDATE - RELOADING FROM DB ===')
            try {
                const { data: verifyData, error: verifyError } = await getSingleItem('mosaics', id)
                if (verifyData) {
                    console.log('VERIFICATION: Data from DB after update:', JSON.stringify(verifyData, null, 2))
                    // Update the Pinia store with fresh data from DB
                    Object.assign(item, verifyData)
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
                console.log('Attempting to navigate to dashboard...')
                try {
                    await router.push({ name: 'dashboard' })
                    console.log('Navigation successful')
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
                console.log('Staying on edit page - you can verify the changes')
            }
        } else {
            console.warn('No data returned from update')
            alert('Update completed but no data returned')
            isPending.value = false
        }
        
    } catch (error) {
        console.error('Unexpected error during update:', error)
        alert('An unexpected error occurred: ' + error.message)
        isPending.value = false
    }
}    

onMounted(async () => {
    getExistingItem()
})

resetOnLeave()
</script>

<template>
    <div class="page">
        <h3 v-if="singleItem" class="title">Edit {{ singleItem.title }}</h3>
        <p v-else>Loading item...</p>
        <form @submit.prevent="handleUpdate" class="edit form">
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

            <Notifications />

            <div class="submit">
                <!-- Manual refresh button for testing -->
                <!-- Add debug button -->
                <button 
                    type="button" 
                    @click="debugFormState"
                    style="background-color: blue; color: white; margin-right: 1rem;"
                >
                    🐛 Debug Form State
                </button><!-- last -->
                <button 
                    v-if="item?.title?.length >= 3 && item?.author && item?.dimensions && item?.materials && item?.imageUrl && !isPending" 
                    type="submit"
                    @click="() => console.log('Submit button clicked!')"
                >
                    Save Changes
                </button>
                <button 
                    v-if="item?.title?.length >= 3 && item?.author && item?.dimensions && item?.materials?.length > 0 && item?.imageUrl && !isPending" 
                    type="submit"
                >
                    Save Changes
                </button>
                <!-- ****** -->
                <button 
                    type="button" 
                    @click="getExistingItem"
                    style="background-color: orange; margin-right: 1rem;"
                >
                    🔄 Reload from DB
                </button>
                
                <!-- Direct Supabase test button -->
                <button 
                    type="button" 
                    @click="testDirectUpdate"
                    style="background-color: purple; color: white; margin-right: 1rem;"
                >
                    🧪 Test Direct Update
                </button>
                
                <button 
                    v-if="item?.title?.length < 3 || !item?.author || !item?.dimensions || !item?.materials || !item?.imageUrl" 
                    type="button" 
                    disabled
                >
                    Invalid Inputs
                </button>
                <button 
                    v-if="item?.title?.length >= 3 && item?.author && item?.dimensions && item?.materials && item?.imageUrl && !isPending" 
                    type="submit"
                >
                    Save Changes
                </button>        
                <button v-if="isPending" type="button" disabled>Saving...</button> 
                
                <!-- Debug info -->
                <div style="margin-top: 1rem; font-size: 0.8em; color: #666;">
                    <p>Debug - Title: {{ item?.title?.length || 0 }} chars</p>
                    <p>Debug - Author: {{ item?.author || 'None' }}</p>
                    <p>Debug - Materials: {{ item?.materials?.length || 0 }} items</p>
                    <p>Debug - ImageUrl: {{ item?.imageUrl ? 'Yes' : 'No' }}</p>
                    <p>Debug - Current Materials: {{ JSON.stringify(item?.materials) }}</p>
                </div>
            </div>
        </form> 
    </div>
</template>

<style lang='scss' scoped>
.page {
    width: 100%;
    margin: 0 auto;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .title {
        margin: 3rem 0;
    }

    .edit {
        width: 80%;
        margin: 0 auto;
        margin-bottom: 2rem;
        padding: 3rem 2rem;

        background-color: rgba(210,175,93, 0.07);
        border-radius: 4px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);

        .formFields {
            width: 100%;
            margin: 0 auto;

            display: flex;
            justify-content: center;
            align-items: flex-start;
            gap: 2rem;
            border: 1px solid red;

            .info {
                width: 40%;
            }

            .picture {
                width: 40%;
                padding-top: 3rem;
                border: 1px solid blue;

                .file-upload {
                    .display {
                        padding: 1rem;
                    }

                    .file {
                        color: var(--primary);
                        &::before {
                            content: '';
                            display: inline-block;
                            width: 1rem;
                            height: 1rem;
                            background-color: var(--primary);
                            border-radius: 50%;
                            margin-right: 0.5rem;
                        }
                    }
                }
            }

            .info {
                border: 1px solid green;
            }
        }

        .submit {
            margin-top: 2rem;
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 1rem;

            button {
                padding: 0.5rem 1rem;
                border: none;
                border-radius: 4px;
                cursor: pointer;
                background-color: var(--primary);
                color: #fff;

                &:disabled {
                    background-color: #ccc;
                    cursor: not-allowed;
                }
            }
        }

        .display {
            padding: 1rem 0;
        }

        @media screen and (max-width: 1300px) {
            width: 90%;
        }

        @media screen and (max-width: 1023px) {
            .formFields {
                flex-direction: column;
                align-items: center;
                gap: 1rem;
                
                .info, .picture {
                    width: 100%;
                }
            }
        }
    }
}
</style>