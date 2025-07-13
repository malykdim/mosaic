import { useStorage } from '../../../stores/useStorage'

const { uploadImage } = useStorage()

export const uploadImg = async (item) => {
  if (!item.file) {
    alert('Please provide a file')
    return
  }

  try {
    const { imageUrl } = await uploadImage(item.file)

    if (imageUrl) {
      item.imageUrl = imageUrl
      console.log('Image uploaded successfully:', imageUrl)
    } else {
      console.error('No image URL returned after upload')
    }
  } catch (error) {
    console.error('Error during uploadImg:', error.message)
  }
}