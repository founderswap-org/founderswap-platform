import type { Database } from '@/utils/database';
import type { SupabaseClient } from '@supabase/supabase-js';

export type TypedSupabaseClient = SupabaseClient<Database>;

export type Table<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Row'];
