import { ref } from 'vue'
import supabase from '../config/supabase'

export const useCreateItem = () => {
    const item = ref({
        title: '',
        author: '',
        image: '',
        dimensions: {w: 0, h: 0},
        materials: [],
    })	

    const error = ref(null)

    const resetForm = () => {
        item.value = {
            title: '',
            author: '',
            image: '',
            dimensions: {w: 0, h: 0},
            materials: []
        }
    }

    return { item, error, resetForm }
}