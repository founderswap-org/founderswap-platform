'use server';

import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import type React from 'react';

export default async function OnboardingLayout({
  children,
}: { children: React.ReactNode }) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  // Qui puoi aggiungere logica per verificare lo step corrente
  // e reindirizzare l'utente allo step appropriato

  return (
    <div className="flex min-h-screen w-screen items-center justify-center bg-background py-10">
      {children}
    </div>
  );
}
