import { reactive } from 'vue'
import { defineStore } from 'pinia'
import { onBeforeRouteLeave } from 'vue-router'

import { useStorage } from './useStorage'
const { uploadImage } = useStorage()

export const useItem = defineStore('newItem', () => {
    let item = reactive({
        author: '',
        file: null,
        imageUrl: null
    })

    const fileToImageUrl = async (item) => {
        if (!item.file) {
          alert('Please provide a file')
          return
        }
      
        try {
          const { imageUrl } = await uploadImage(item.file)
      
          if (imageUrl) {
            item.imageUrl = imageUrl
            console.log('Image uploaded successfully:', imageUrl)
            return imageUrl
          } else {
            console.error('No image URL returned after upload')
          }
        } catch (error) {
          console.error('Error during uploadImg:', error.message)
        }
    }

    const resetItem = () => {
      Object.assign(item, {
        author: '',
        file: null,
        imageUrl: null
      })
    }

    const resetOnLeave = () => {
      onBeforeRouteLeave((to, from, next) => {
        resetItem()
        next()
      })
    }

    return { item, resetItem, resetOnLeave, fileToImageUrl }
}) 