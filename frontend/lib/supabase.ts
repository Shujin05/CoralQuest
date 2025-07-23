// lib/supabase.ts
import { createClient } from '@supabase/supabase-js';
import Constants from 'expo-constants';

const supabaseUrl=process.env.EXPO_PUBLIC_SUPABASE_URL
const supabaseAnonKey=process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY

console.log("Supabase URL:", supabaseUrl);
console.log("Supabase Key:", supabaseAnonKey?.slice(0, 8));

export const supabase = createClient(
  supabaseUrl, supabaseAnonKey
);