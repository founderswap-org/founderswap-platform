'use server';

import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function updateOnboardingStep1(formData: FormData) {
    const supabase = await createClient();
    const userId = (await supabase.auth.getUser()).data.user?.id;

    // Prima verifichiamo se il profilo esiste
    const { data: existingProfile, error: fetchError } = await supabase
        .from('profiles')
        .select()
        .eq('id', userId)
        .single();

    if (fetchError) {
        console.error('Error fetching profile:', fetchError);
        throw new Error(`Failed to fetch profile: ${fetchError.message}`);
    }

    if (existingProfile) {
        // Se il profilo esiste, lo aggiorniamo
        const { error: updateError } = await supabase
            .from('profiles')
            .update({
                languages: formData.get('languages') || '',
                linkedin: formData.get('linkedin') || '',
            })
            .eq('id', userId);

        if (updateError) {
            console.error('Error updating profile:', updateError);
            throw new Error(`Failed to update profile: ${updateError.message}`);
        }
    } else {
        // Se il profilo non esiste, lo creiamo
        const { error: insertError } = await supabase
            .from('profiles')
            .insert({
                id: userId,
                email: '', // Questi campi sono richiesti secondo il tipo
                firstname: '',
                lastname: '',
                languages: formData.get('languages') || '',
                linkedin: formData.get('linkedin') || '',
            });

        if (insertError) {
            console.error('Error creating profile:', insertError);
            throw new Error(`Failed to create profile: ${insertError.message}`);
        }
    }

    revalidatePath('/onboarding', 'layout');
    redirect('/onboarding/step-2');
}

export async function updateOnboardingStep2(formData: FormData) {
    const supabase = await createClient();
    const userId = (await supabase.auth.getUser()).data.user?.id;

    const { error: companyError } = await supabase
        .from('company')
        .upsert({
            name: formData.get('company_name'),
            website: formData.get('website'),
            grow_stage_id: Number.parseInt(formData.get('grow_stage') as string),
            user_id: userId,
        });

    if (companyError) {
        console.error('Supabase error:', companyError);
        throw new Error('Failed to update company');
    }

    revalidatePath('/onboarding', 'layout');
    redirect('/onboarding/step-3');
}

export async function updateOnboardingStep3(formData: FormData) {
    const supabase = await createClient();
    const userId = (await supabase.auth.getUser()).data.user?.id;

    // Aggiungiamo le aree di interesse
    const selectedAreas = formData.getAll('areas');
    const areaInserts = selectedAreas.map(areaId => ({
        user_id: userId,
        area_id: Number.parseInt(areaId as string),
    }));

    const { error: areasError } = await supabase
        .from('users_areas')
        .upsert(areaInserts);

    if (areasError) {
        console.error('Supabase error:', areasError);
        throw new Error('Failed to update areas');
    }

    // Aggiungiamo gli obiettivi
    const selectedGoals = formData.getAll('goals');
    const goalInserts = selectedGoals.map(goalId => ({
        user_id: userId,
        goal_id: Number.parseInt(goalId as string),
    }));

    const { error: goalsError } = await supabase
        .from('users_goals')
        .upsert(goalInserts);

    if (goalsError) {
        console.error('Supabase error:', goalsError);
        throw new Error('Failed to update goals');
    }

    revalidatePath('/onboarding', 'layout');
    redirect('/dashboard');
}