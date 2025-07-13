import supabase from '../config/supabase'

export const useCollection = () => {

  const addDoc = async (collection, item) => {

    // Assemble the new Item
    if (item.title && item.author && item.dimensions && item.materials && item.imageUrl) {
      const newItem = {
        title: item.title,
        author: item.author,
        dimensions: item.dimensions,
        materials: item.materials,
        imageUrl: item.imageUrl
      }

      try {
        const { data, error } = await supabase.from(collection).insert([newItem]).select()
  
        if (data) {
          alert('Mosaic added successfully!', data)
          console.log("Created item:", data)
        }
        
        return { data, error }

      } catch (error) {
        console.error('Error during addDoc: ', error)
      }

    } else {
      console.log('Some item properties are missing', item)
      return { data: null, error }
    }

  }
  
  const updateDoc = async (collection, id, updatedFields) => {
        
    if (!id || typeof id !== 'number') {
      return { data: null, error: 'Invalid ID' }
    }

    try {
      const { data, error } = await supabase
        .from(collection)
        .update(updatedFields)
        .eq('id', id)
        .select()

      if (error) {
        return { data: null, error }
      }
      
      return { data, error: null }
      
    } catch (error) {
      return { data: null, error }
    }    

  }

  const delDoc = async (collection, id) => {
    if (!id) {
      console.error('No ID provided for deletion')
      return { error: 'No ID provided' }
    }
  
    try {
      const { data, error } = await supabase
        .from(collection)
        .delete()
        .eq('id', id)
        .select()

      if (error) {
        console.error('Delete failed:', error)
        return { data: null, error }
      }

      console.log(`Item with id ${id} deleted successfully`)
      alert(`Item with id ${id} deleted successfully`)  
      return { data, error: null }
    } catch (error) {
      console.error('Unexpected error during deletion:', error)
      return { data: null, error }
    }
  }

  return { addDoc, updateDoc, delDoc }
}