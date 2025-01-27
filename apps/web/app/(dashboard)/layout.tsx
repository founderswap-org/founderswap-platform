'use client';

import { useAuth } from '@/hooks/useAuth';
import { SidebarProvider } from '@founderswap/design-system/components/ui/sidebar';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import type React from 'react';

import { AppSidebar } from '@/components/ui/app-sidebar';
import NavMobile from '@/components/ui/nav-mobile';

export default function DashboardLayout({
  children,
}: { children: React.ReactNode }) {
  const router = useRouter();
  const auth = useAuth();

  useEffect(() => {
    if (!auth) return;

    const interval = setInterval(async () => {
      const { data: { session } } = await auth.supabase.auth.getSession();
      if (!session) {
        router.push('/login');
      }
    }, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, [auth, router]);

  if (!auth?.session) {
    return null;
  }

  return (
    <SidebarProvider defaultOpen={false}>
      <AppSidebar />
      <main className='mt-2 ml-1 h-[calc(100vh-8px)] w-full overflow-auto rounded-tl-3xl border border-t border-l bg-background shadow-sm md:ml-0'>
        <NavMobile />
        {children}
      </main>
    </SidebarProvider>
  );
}
