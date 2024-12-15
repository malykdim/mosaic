import { ref } from 'vue'
import supabase from '../config/supabase'

export const useCollection = (collection) => {
  const error = ref(null)

  const addDoc = async (doc) => {
    const { data, error: addError } = await supabase.from(collection).insert([doc])
    error.value = addError
    return { data, error: addError }
  }

  return { error, addDoc }
}