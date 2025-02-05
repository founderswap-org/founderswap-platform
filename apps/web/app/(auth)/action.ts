'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'
import type { SignUpWithPasswordCredentials } from '@supabase/supabase-js'

export async function login(formData: FormData) {
  const supabase = await createClient()

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    redirect('/error')
  }

  revalidatePath('/', 'layout')
  redirect('/dashboard')
}

export async function signup(formData: FormData) {
  const supabase = await createClient()

  const data: SignUpWithPasswordCredentials = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
    options: {
      data: {
        firstName: formData.get('first_name') as string,
        lastName: formData.get('last_name') as string,
      }
    }
  }

  const { data: userData, error } = await supabase.auth.signUp(data)

  if (error) {
    console.error('error', error)
    redirect('/error')
  }

  // Add data to user_profile table

  if (userData.user) {
    const { error: profileError } = await supabase
      .from('user_profile')
      .insert([
        {
          first_name: formData.get('first_name') as string,
          last_name: formData.get('last_name') as string,
        }
      ]);

    if (profileError) {
      console.error(profileError.message);
    }

  }

  revalidatePath('/', 'layout')
  redirect('/onboarding/step-1')
}

export async function logout() {
  const supabase = await createClient();

  const { error } = await supabase.auth.signOut();

  if (error) {
    throw new Error('Error logging out');
  }

  revalidatePath('/', 'layout');
  redirect('/login');
} 