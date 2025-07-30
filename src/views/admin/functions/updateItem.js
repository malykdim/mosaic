import { useItem } from '../../../stores/useItem'
import { useCollection } from '../../../stores/useCollection'

export async function updateMosaicItem(id, item) {
    const { updateDoc } = useCollection()
    const { fileToImageUrl } = useItem()

    let imageUrl = item.imageUrl // Preloaded from DB
    
    if (item.file) {
        console.log('New image detected, uploading...', item.file.name)
        imageUrl = await fileToImageUrl(item) // Get NEW URL
        console.log('Image uploaded! New URL:', imageUrl)
    }
  
    const updatedFields = {
        title: item.title,
        author: item.author,
        dimensions: item.dimensions,
        materials: item.materials,  
        imageUrl: imageUrl // Use the correct URL (existing or new)
    }

    return await updateDoc('mosaics', id, updatedFields)
}