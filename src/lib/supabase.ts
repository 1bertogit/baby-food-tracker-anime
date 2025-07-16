import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Supabase config
const supabaseUrl = 'https://erknfpzjtrcpvcyatnzx.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVya25mcHpqdHJjcHZjeWF0bnp4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDk4NDIxNzksImV4cCI6MjAyNTQxODE3OX0.PYsOiTmkrq1TlgAzDj4vmRV-KvOxXA3L0lrHquRs26M';

// Create a single supabase client for interacting with your database
export const supabase: SupabaseClient = createClient(supabaseUrl, supabaseAnonKey); 