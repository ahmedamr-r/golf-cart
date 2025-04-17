import { createClient } from '@supabase/supabase-js';
import { GolfCart } from '@/types/golfCart';

const supabaseUrl = 'https://ncdopfiyapudodxuqvqm.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5jZG9wZml5YXB1ZG9keHVxdnFtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ4MzkzMDksImV4cCI6MjA2MDQxNTMwOX0.eAYTV5ugrgmMSuwT2j42BGR803201cQG6bQxXP3bWUo';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function getGolfCarts(): Promise<GolfCart[]> {
  console.log('Supabase getGolfCarts: Starting request');
  try {
    console.log('Supabase URL:', supabaseUrl);
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