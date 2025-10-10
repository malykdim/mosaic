import { ref, onUnmounted } from 'vue'
import supabase from '../config/supabase'

export const useGalleryListener = () => {
    const mosaics = ref([])
    const error = ref(null)
    const isLoading = ref(true)

    const channel = supabase.channel('mosaics-listener')

    const getAllMosaics = async () => {
        isLoading.value = true
        const { data, error: fetchError } = await supabase.from('mosaics').select('*')
        
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
      } else {
        console.log('success')
        // console.log(data)
      }
    
      return {data, error}
    }

    const startListening = async () => {
        await getAllMosaics()
    
        channel
          .on('postgres_changes', { event: '*', schema: 'public', table: 'mosaics' }, (payload) => {
            const { eventType, new: newItem, old: oldItem } = payload
    
            if (eventType === 'INSERT') {
              mosaics.value.push(newItem)
            }
    
            if (eventType === 'UPDATE') {
              mosaics.value = mosaics.value.map(item =>
                item.id === newItem.id ? newItem : item
              )
            }
    
            if (eventType === 'DELETE') {
              mosaics.value = mosaics.value.filter(item => item.id !== oldItem.id)
            }
    
            console.log(`[Realtime] ${eventType}:`, payload)
          })
          .subscribe()
      }
    
      const stopListening = () => {
        supabase.removeChannel(channel)
        console.log('Stopped listening to mosaics changes')
      }
    
      onUnmounted(stopListening)
    
      return { 
        mosaics, 
        isLoading,
        getAllMosaics, 
        getSingleItem,  
        startListening, 
        stopListening 
      }
}