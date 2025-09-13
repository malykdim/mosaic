import supabase from '../config/supabase'

export const useCollection = () => {

  const addDoc = async (collection, item) => {

    // Validate required fields & Assemble the new Item
    if (item.title && item.author && item.dimensions && item.materials && item.imageUrl) {
      // Prepare the title_translations object
      let titleTranslations = {
        bg: item.title.bg || '',
        en: item.title.en || '',
        de: item.title.de || ''
      }

    const authorTranslation = (authorRaw) => {
      let author = authorRaw
      
      if (!author) {
        alert('Author is required')
        return
      }
      
      if (author === "Владимир Дамянов" || author === "Vladimir Damyanov") {
        author = "Vladimir Damyanov" 
        return author
      } else if (author === "Дамян Дамянов" || author === "Damyan Damyanov") {
        author = "Damyan Damyanov"
        return author
      }
    }


      const newItem = {
        title: titleTranslations, // keep for backward compatibility / fallback
        author: authorTranslation(item.author),
        dimensions: item.dimensions,
        materials: item.materials,
        imageUrl: item.imageUrl
      }

      try {
        const { data, error } = await supabase.from(collection).insert([newItem]).select()
  
        if (error) {
          console.error('Supabase error:', error)
          return { data: null, error }
        }

        if (data) {
          alert('Mosaic added successfully')
          console.log("Created item:", data)
        }
        
        return { data, error }

      } catch (error) {
        console.error('Error during addDoc: ', error)
        return { data: null, error }
      }
    } else {
      const err = 'Some item properties are missing'
      console.log(err, item)
      console.log('Missing check - title.bg:', item.title?.bg, 'author:', item.author, 'dimensions:', item.dimensions, 'materials:', item.materials, 'imageUrl:', item.imageUrl)
      return { data: null, error: err }
    }

  }
  
  const updateDoc = async (collection, id, updatedFields) => {
    let idNum = Number(id)
        
    if (!Number.isInteger(idNum) || idNum <= 0) {
      return { data: null, error: 'Invalid ID' }
    }

    id = idNum

    // normalize title updates: if caller sends title string, convert to translations object
    if (updatedFields && updatedFields.title && !updatedFields.title.bg) {
        updatedFields.title_translations = { 
        bg: updatedFields.title.bg || '', 
        en: updatedFields.title.en || '', 
        de: updatedFields.title.de || '' 
      }
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
      
      return { data, error }
      
    } catch (error) {
      return { data: null, error }
    }    

  }

  const delDoc = async (collection, id) => {
    let idNum = Number(id)
    if (!Number.isInteger(idNum) || idNum <= 0) {
      console.error('Invalid ID provided for deletion')
      return { data: null, error: 'Invalid ID' }
    }
    id = idNum
  
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
      return { data, error }
    } catch (error) {
      console.error('Unexpected error during deletion:', error)
      return { data: null, error }
    }
  }

  return { addDoc, updateDoc, delDoc }
}