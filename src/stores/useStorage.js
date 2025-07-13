import supabase from '../config/supabase'

export const useStorage = () => {
  // Upload the file to the root of the 'mosaics' bucket
  const uploadImage = async (file) => {
    const filePath = `${Date.now()}-${file.name}` // make sure filename is unique
    
    const { data, error } = await supabase
      .storage
      .from('mosaics')
      .upload(filePath, file)

    if (error) {
      console.error("Upload failed:", error)
      throw error
    }

    const imageUrl = getImageUrl(data.path)
    return { path: data.path, imageUrl }
  }

  // Get public URL for a file
  const getImageUrl = (path) => {
    const { data } = supabase
      .storage
      .from('mosaics')
      .getPublicUrl(path)
  
    return data.publicUrl
  }

  return { uploadImage }
}