import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import supabase from '../config/supabase'

export const useUserStore = defineStore('user', () => {
    const user = ref(null)
    const router = useRouter()

    const checkUser = async () => {
        const { data, error } = await supabase.auth.getSession()
        if (error) {
          console.error('Error fetching session:', error)
        } else if (data.session) {
          user.value = data.session.user;
        } else {
          console.log('No active session found')
        }
    }

    const signUp = async (email, password) => {   
        const { data, error } = await supabase.auth.signUp({ email, password })
        if (data.user) {
          router.push({ name: 'dashboard' })
        }
        return { user: data.user, error }
    }

    const signIn = async (email, password) => {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password })
        if (data.user) {
          router.push({ name: 'dashboard' })
        }
        return { user: data.user, error }
    }

    const logout = async () => {
        const { error } = await supabase.auth.signOut()
        if (error) {
            console.error('Error logging out:', error)
        } else {
            console.log('User logged out successfully')
            user.value = null
            router.push({ name: 'home' })
        }
    }  

    // Subscribe to auth state changes
    supabase.auth.onAuthStateChange((event, session) => {
        if (event === 'SIGNED_IN') {
          user.value = session.user
        } else if (event === 'SIGNED_OUT') {
          user.value = null
        }
    })            

    return { user, checkUser, signUp, signIn, logout }        
})
