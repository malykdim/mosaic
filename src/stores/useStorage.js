import { ref } from 'vue'
import supabase from '../config/supabase'

export const useStorage = () => {
  const uploadImage = async (file) => {
    const { data, error } = await supabase.storage
      .from('mosaics')
      .upload(`public/${file.name}`, file)
    if (error) throw error
    return data
  }

  const getImageUrl = (path) => {
    return supabase.storage.from('mosaics').getPublicUrl(path).publicURL
  }

  return { uploadImage, getImageUrl }
}