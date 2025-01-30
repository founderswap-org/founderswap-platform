'use server';

import { AppSidebar } from '@/components/ui/app-sidebar';
import NavMobile from '@/components/ui/nav-mobile';
import type { CustomUser } from '@/types/user';
import { createClient } from '@/utils/supabase/server';
import { SidebarProvider } from '@founderswap/design-system/components/ui/sidebar';
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
  const firstName = data.user.user_metadata.first_name;
  const lastName = data.user.user_metadata.last_name;

  data.user.user_metadata.initials = firstName[0] + lastName[0];
  data.user.user_metadata.display_name = `${firstName} ${lastName}`;

  return (
    <AuthProviderWrapper user={data.user as CustomUser}>
      <SidebarProvider defaultOpen={false}>
        <AppSidebar />
        <main className="mt-2 ml-1 h-[calc(100vh-8px)] w-full overflow-auto rounded-tl-3xl border border-t border-l bg-background shadow-sm md:ml-0">
          <NavMobile />
          {children}
        </main>
      </SidebarProvider>
    </AuthProviderWrapper>
  );
}
