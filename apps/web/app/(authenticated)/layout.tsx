'use server';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import type React from 'react';
import AuthProviderWrapper from './auth-provider-wrapper'; // Importiamo il nuovo wrapper

export default async function Layout({
  children,
}: { children: React.ReactNode }) {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect('/login');
  }

  return <AuthProviderWrapper user={data.user}>{children}</AuthProviderWrapper>;
}
