import { ref } from 'vue'
import supabase from '../config/supabase'

export const useStorage = () => {
  const filePath = ref('')
  const url = (path) => supabase.storage.from('mosaics').getPublicUrl(path).publicURL

  const uploadImage = async (file) => {
    const fileName = `${Date.now()}_${file.name}`
    const { data, error } = await supabase.storage.from('mosaics').upload(fileName, file)
    filePath.value = data?.path
    return { filePath: data?.path, error }
  }

  return { filePath, url, uploadImage }
}