import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/utils/database";

export type TypedSupabaseClient = SupabaseClient<Database>;

export type Table<T extends keyof Database["public"]["Tables"]> =
	Database["public"]["Tables"][T]["Row"];
