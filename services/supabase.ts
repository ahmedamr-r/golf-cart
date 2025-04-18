import { createClient } from '@supabase/supabase-js';
import { GolfCart } from '@/types/golfCart';
import Constants from 'expo-constants';

// Get environment variables from Expo's Constants
const supabaseUrl = Constants.expoConfig?.extra?.supabaseUrl || process.env.EXPO_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = Constants.expoConfig?.extra?.supabaseAnonKey || process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables. Check your .env file.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function getGolfCarts(): Promise<GolfCart[]> {
  console.log('Supabase getGolfCarts: Starting request');
  try {
    console.log('Supabase URL:', supabaseUrl.replace(/https:\/\/|\.supabase\.co/g, '***'));
    const { data, error } = await supabase
      .from('golf_carts')
      .select('*')
      .order('price', { ascending: true });

    if (error) {
      console.error('Error fetching golf carts:', error.message);
      console.error('Error details:', error);
      return [];
    }

    console.log('Supabase getGolfCarts: Got response. Items:', data ? data.length : 0);
    return data || [];
  } catch (e) {
    console.error('Exception fetching golf carts:', e);
    return [];
  }
}

export async function getGolfCartById(id: string): Promise<GolfCart | null> {
  console.log('Supabase getGolfCartById: Starting request for ID:', id);
  try {
    const { data, error } = await supabase
      .from('golf_carts')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching golf cart:', error.message);
      return null;
    }

    console.log('Supabase getGolfCartById: Got response:', data ? 'Found cart' : 'No cart found');
    return data;
  } catch (e) {
    console.error('Exception fetching golf cart:', e);
    return null;
  }
} 