import { createClient } from '@supabase/supabase-js';

// Check that environment variables are defined
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

// Create a singleton instance of the Supabase client
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default supabase;
