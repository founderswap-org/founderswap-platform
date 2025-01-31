'use server';
import type { CustomUser } from '@/types/user';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import type React from 'react';
import AuthProviderWrapper from './auth-provider-wrapper';

export default async function Layout({
  children,
}: { children: React.ReactNode }) {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect('/login');
  }
  const firstName = data.user.user_metadata.first_name;
  const lastName = data.user.user_metadata.last_name;

  data.user.user_metadata.initials = firstName[0] + lastName[0];
  data.user.user_metadata.display_name = `${firstName} ${lastName}`;

  return (
    <AuthProviderWrapper user={data.user as CustomUser}>
      {children}
    </AuthProviderWrapper>
  );
}
