// import type { TypedSupabaseClient } from '@/types/types';

// export async function sendAvailabilities(
//   supabase: TypedSupabaseClient,
//   slots: {
//     user_id: string;
//     slot: string;
//   }[]
// ) {
//   const { data, error } = await supabase.from('availabilities').insert(slots);

//   if (error) {
//     console.error('Supabase Error:', error.message, error.details);
//     throw new Error('Error sending availabilities');
//   }

//   return data;
// }
