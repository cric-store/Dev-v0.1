import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY

// Debug log
console.log('Supabase URL:', supabaseUrl ? 'Set' : 'NOT SET')
console.log('Supabase Key:', supabaseAnonKey ? 'Set' : 'NOT SET')

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables:', {
    url: !!supabaseUrl,
    key: !!supabaseAnonKey
  })
}

export const supabase = createClient(
  supabaseUrl || 'https://pbiinzsinhwuiixwavdt.supabase.co',
  supabaseAnonKey || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBiaWluenNpbmh3dWlpeHdhdmR0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc0NzAyOTAsImV4cCI6MjA4MzA0NjI5MH0.0QiQWKcZ_wUsZE9y_UFmCRqF-tG4hqozKt1HMX5EQHI',
  {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true
    }
  }
)
