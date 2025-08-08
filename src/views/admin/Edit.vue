<script setup>
import { ref, computed, onBeforeMount } from 'vue'
import { useRoute } from 'vue-router'

import router from '../../config/router.js'
import { useGalleryListener } from '../../stores/useGalleryListener.js'
import { useItem } from '../../stores/useItem.js'
import { updateMosaicItem } from './functions/updateItem.js'

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

const isValid = computed(() => 
    item?.title?.length >= 3 && 
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
                    await router.push({ name: 'dashboard' })
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
        isPending.value = false
    } finally {
        isPending.value = false
    }
}    

onBeforeMount(async () => {
    try {
        const { data } = await getSingleItem('mosaics', id)
        if (data) {
            singleItem.value = data
            Object.assign(item, data)
        }
    } catch (error) {
        console.error('Error loading item:', error)
    }
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

                <button 
                    v-if="isValid && !isPending" 
                    type="submit"
                >
                    Save Changes
                </button>

                <button 
                    v-if="!isValid" 
                    type="button" 
                    disabled
                >    
                    Invalid Inputs
                </button>    

                <button v-if="isPending" type="button" disabled>Saving...</button> 
                
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

            .info {
                width: 40%;
            }

            .picture {
                width: 40%;
                padding-top: 3rem;

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
                border: 1px solid transparent;
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