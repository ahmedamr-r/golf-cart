import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

// Replace with your Supabase URL and anon key
const supabaseUrl = 'https://ncdopfiyapudodxuqvqm.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5jZG9wZml5YXB1ZG9keHVxdnFtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ4MzkzMDksImV4cCI6MjA2MDQxNTMwOX0.eAYTV5ugrgmMSuwT2j42BGR803201cQG6bQxXP3bWUo';

// Use AsyncStorage for persisting the session
const supabaseClient = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

export default supabaseClient; 