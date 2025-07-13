<script setup>
import { ref, onMounted } from 'vue'
import { onBeforeRouteLeave } from 'vue-router'
import router from '../../config/router.js'

import { useUserStore } from '../../stores/useUserStore'

import { useItem } from '../../stores/useItem' 

import validateUserInput from '../admin/functions/validateUserInput.js'

import { useCollection } from '../../stores/useCollection' 

import Title from './components/Title.vue'
import Author from './components/Author.vue'
import Dimensions from './components/Dimensions.vue'
import Materials from './components/Materials.vue'
import Image from './components/Image.vue'
import Notifications from '../../components/Notifications.vue'

const { user, checkUser } = useUserStore()

const { item, resetItem, resetOnLeave, fileToImageUrl } = useItem() 
// {title, author, dimensions, materials, file, imageUrl}

const { addDoc } = useCollection()

const isPending = ref(false)
const handleCreate = async () => {    
    /* 1. Validate item in Pinia */
    validateUserInput(item)      

    /* 2. Save image in Supabase storage */
    /* 3. Update item.imageUrl in Pinia */
    await fileToImageUrl(item)

    /* 4. Add item to Supabase database in bucket mosaics */
    await addDoc('mosaics', item)

    /* 5. Notify the user */ /* TODO */

    resetItem()

    router.push({ name: 'dashboard' })
}

// Reset item when Create page loads to ensure clean slate
onMounted(() => {
    resetItem()
})

</script>

<template>
<div class="page create-container">
    <h3 class="title">Create new panneaux</h3>

    <form @submit.prevent="handleCreate" class="create">
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
                v-if="item.title.length < 3 || !item.author || !item.dimensions || !item.materials | !item.file" 
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

<style lang='scss' scoped>
.create-container {
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

    .create {
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