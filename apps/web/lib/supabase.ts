import type { Database } from "@/utils/database";
import type { TypedSupabaseClient } from "@/utils/types";
import { createClient } from "@supabase/supabase-js";
import { useMemo } from "react";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!url || !anonKey) {
	throw new Error("Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY");
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
