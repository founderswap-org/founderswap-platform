import type { User } from "@supabase/supabase-js";

// These custom fields like first_name, last_name, and company_name are added through the signup form.
/**
 * 
 * Check app/(authenticated)/layout.tsx - here props are added
 */
type CustomUserMetadata = User['user_metadata'] & {
    first_name: string;
    last_name: string;
    display_name: string;
    company_name: string;
    initials: string;
};

export type CustomUser = User & {
    user_metadata: CustomUserMetadata;
};

