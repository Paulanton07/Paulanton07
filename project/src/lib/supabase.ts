import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = () => {
  return Boolean(supabaseUrl && supabaseKey);
};

export const getSupabaseClient = () => {
  if (!isSupabaseConfigured()) {
    throw new Error('Please connect to Supabase using the "Connect to Supabase" button in the top right corner');
  }
  return createClient(supabaseUrl!, supabaseKey!);
};