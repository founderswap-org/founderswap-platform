'use server'

export const runtime = 'edge';
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

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data: SignUpWithPasswordCredentials = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
    options: {
      data: {
        firstName: formData.get('firstname') as string,
        lastName: formData.get('lastname') as string,
        companyName: formData.get('companyName') as string
      }
    }
  }

  const { error } = await supabase.auth.signUp(data)

  if (error) {
    redirect('/error')
  }

  revalidatePath('/', 'layout')
  redirect('/dashboard')
}