import { SidebarProvider } from '@founderswap/design-system/components/ui/sidebar';
import { cookies } from 'next/headers';
import type React from 'react';
import { redirect } from 'next/navigation';

import { AppSidebar } from '@/components/ui/app-sidebar';
import NavMobile from '@/components/ui/nav-mobile';

export default async function DashboardLayout({
  children,
}: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get('sidebar:state')?.value === 'true';
  const session = cookieStore.get('session');

  /*
  if (!session) {
    return redirect('/login');
  }
  */

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <AppSidebar />
      <main className='bg-background shadow-sm mt-2 ml-1 md:ml-0 border border-t border-l rounded-tl-3xl w-full h-[calc(100vh-8px)] overflow-auto'>
        <NavMobile />
        {children}
      </main>
    </SidebarProvider>
  );
}
