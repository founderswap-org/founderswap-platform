'use server';

import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';

export async function updateProfile(formData: FormData) {
    const supabase = await createClient();

    const { error } = await supabase
        .from('user_profiles')
        .update({
            role: formData.get('role'),
            experience: formData.get('experience'),
        })
        .eq('id', (await supabase.auth.getUser()).data.user?.id);

    if (error) {
        throw new Error('Failed to update profile');
    }

    revalidatePath('/settings/profile');
} 