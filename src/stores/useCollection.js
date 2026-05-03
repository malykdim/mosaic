import supabase from '../config/supabase'

export const useCollection = () => {
    const addDoc = async (collection, item) => {
        if (!item.author || !item.imageUrl) {
            const err = 'Some item properties are missing'
            console.log(err, item)
            console.log( 'author: ', item.author, 'imageUrl: ', item.imageUrl)
            return { data: null, error: err }
        }

        const newItem = {
            author: item.author, // Store "vladimir" or "damyan" directly
            imageUrl: item.imageUrl
        }

        try {
            const { data, error } = await supabase
            .from(collection)
            .insert([newItem])
            .select()

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
            console.error('Error during addDoc:', error)
            return { data: null, error }
        }
    }

    const updateDoc = async (collection, id, updatedFields) => {
        let idNum = Number(id)
            
        if (!Number.isInteger(idNum) || idNum <= 0) {
            return { data: null, error: 'Invalid ID' }
        }

        id = idNum

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