import { ref, onUnmounted } from 'vue'
import supabase from '../config/supabase'

export const useGalleryListener = () => {
    const mosaics = ref([])
    const error = ref(null)
    const isLoading = ref(true)
    const selectedAuthor = ref('all') // Track the active filter

    const channel = supabase.channel('mosaics-listener')

    const getAllMosaics = async () => {
        isLoading.value = true

        // Query with optional author filter
        let query = supabase.from('mosaics').select('*')
        
        if (selectedAuthor.value !== 'all') {
            query = query.eq('author', selectedAuthor.value)
        }

        const { data, error: fetchError } = await query
        
        if (!fetchError) {
          mosaics.value = data
        } else {
          console.error('Initial fetch failed:', fetchError)
          error.value = fetchError
        } 

        isLoading.value = false
    }

    const getSingleItem = async (collection, id) => {
        const { data, error } = await supabase
        .from(collection)
        .select('*')
        .eq('id', id)
        .single()
    
        if (error) {
            console.error(`Error during getSingleItem: ${error.message}`)
        } 
        
        return {data, error}
    }

    // Change the filter
    const setAuthorFilter = async (author) => {
        selectedAuthor.value = author
        await getAllMosaics() // Refetch with new filter
    }

    // Helper to check if an item matches current filter
    const matchesFilter = (item) => {
        if (selectedAuthor.value === 'all') return true
        return item.author === selectedAuthor.value
    }

    const startListening = async () => {
        await getAllMosaics()
    
        channel
          .on('postgres_changes', { event: '*', schema: 'public', table: 'mosaics' }, (payload) => {
            const { eventType, new: newItem, old: oldItem } = payload
    
            if (eventType === 'INSERT') {
              // Only add if it matches the current filter
              if (matchesFilter(newItem)) {
                mosaics.value.push(newItem)
              }
            }
    
            if (eventType === 'UPDATE') {
              // Check if item should be added, removed, or updated based on filter
              const existsInList = mosaics.value.some(item => item.id === newItem.id)
              const shouldBeInList = matchesFilter(newItem)
              
              if (shouldBeInList && existsInList) {
                // Update existing item
                mosaics.value = mosaics.value.map(item =>
                  item.id === newItem.id ? newItem : item
                )
              } else if (shouldBeInList && !existsInList) {
                // Add item (author changed to match filter)
                mosaics.value.push(newItem)
              } else if (!shouldBeInList && existsInList) {
                // Remove item (author changed to not match filter)
                mosaics.value = mosaics.value.filter(item => item.id !== newItem.id)
              }
            }
    
            if (eventType === 'DELETE') {
              mosaics.value = mosaics.value.filter(item => item.id !== oldItem.id)
            }    
          })
          .subscribe()
      }
    
    const stopListening = () => {
        supabase.removeChannel(channel)
    }
    
    onUnmounted(stopListening)
    
    return { 
        mosaics, 
        isLoading,
        selectedAuthor, 
        setAuthorFilter, 
        getAllMosaics, 
        getSingleItem,  
        startListening, 
        stopListening 
    }
}