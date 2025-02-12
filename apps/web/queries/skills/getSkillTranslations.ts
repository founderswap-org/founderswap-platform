import type { Database } from '@/utils/database';
import { createClient } from '@/utils/supabase/server';

type SkillTranslation = Database['public']['Tables']['skill_translations']['Row'];

export async function getSkillTranslations(language = 'it'): Promise<SkillTranslation[]> {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from('skill_translations')
        .select('*')
        .eq('language', language);

    if (error) {
        console.error('Errore nel recupero delle traduzioni delle skill:', error);
        throw new Error('Errore nel recupero delle traduzioni delle skill');
    }

    return data || [];
}

export async function getSkillTranslationsWithSkills(language = 'it') {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from('skill_translations')
        .select(`
            *,
            skills (*)
        `)
        .eq('language', language);

    if (error) {
        console.error('Errore nel recupero delle traduzioni delle skill:', error);
        throw new Error('Errore nel recupero delle traduzioni delle skill');
    }

    return data || [];
} 