import { ref } from 'vue'
import supabase from '../config/supabase'

// Declared OUTSIDE the exported function = created ONCE, shared by every caller
const mosaics = ref([])
const error = ref(null)
const isLoading = ref(true)
const selectedAuthor = ref('all')

const channel = supabase.channel('mosaics-listener')
let isListening = false

const getAllMosaics = async () => {
    isLoading.value = true

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

    if (error) console.error(`Error during getSingleItem: ${error.message}`)
    return { data, error }
}

const setAuthorFilter = async (author) => {
    selectedAuthor.value = author
    await getAllMosaics()
}

const matchesFilter = (item) => {
    if (selectedAuthor.value === 'all') return true
    return item.author === selectedAuthor.value
}

const startListening = async () => {
    if (isListening) return
    isListening = true

    await getAllMosaics()

    channel
        .on('postgres_changes', { event: '*', schema: 'public', table: 'mosaics' }, (payload) => {
            const { eventType, new: newItem, old: oldItem } = payload

            if (eventType === 'INSERT' && matchesFilter(newItem)) {
                mosaics.value.push(newItem)
            }
            if (eventType === 'UPDATE') {
                const existsInList = mosaics.value.some(item => item.id === newItem.id)
                const shouldBeInList = matchesFilter(newItem)
                if (shouldBeInList && existsInList) {
                    mosaics.value = mosaics.value.map(item => item.id === newItem.id ? newItem : item)
                } else if (shouldBeInList && !existsInList) {
                    mosaics.value.push(newItem)
                } else if (!shouldBeInList && existsInList) {
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
    isListening = false
}

export const useGalleryListener = () => {
    return {
        mosaics, isLoading, error, selectedAuthor,
        setAuthorFilter, getAllMosaics, getSingleItem,
        startListening, stopListening
    }
}