import type { TypedSupabaseClient } from '@/types/types';

export async function deleteAvailabilities(supabase: TypedSupabaseClient) {
  try {
    await supabase.from('availabilities').delete().gt('id', 0);
  } catch (error) {
    console.error('Supabase Error:', error);
    throw new Error('Error deleting availabilities');
  }
}
