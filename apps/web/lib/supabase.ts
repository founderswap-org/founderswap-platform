import type { TypedSupabaseClient } from '@/types/types';
import type { Database } from '@/utils/database';
import { createClient } from '@supabase/supabase-js';
import { useMemo } from 'react';

const url = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;

if (!url || !anonKey) {
  throw new Error(
    'Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY'
  );
}

let client: TypedSupabaseClient | undefined;

function getSupabaseClient() {
  if (client) {
    return client;
  }

  client = createClient<Database>(url, anonKey, {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true,
    },
  });

  return client;
}

function useSupabase() {
  return useMemo(getSupabaseClient, []);
}

export default useSupabase;
