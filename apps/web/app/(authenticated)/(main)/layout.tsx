'use server';

import { SidebarProvider } from '@founderswap/design-system/components/ui/sidebar';
import type React from 'react';

import { AppSidebar } from '@/components/layouts/app-sidebar';
import NavMobile from '@/components/layouts/nav-mobile';

export default async function Layout({
  children,
}: { children: React.ReactNode }) {
  return (
    <SidebarProvider defaultOpen={false}>
      <AppSidebar />
      <main className="mt-2 ml-1 h-[calc(100vh-8px)] w-full overflow-auto rounded-tl-3xl border border-t border-l bg-background shadow-sm md:ml-0">
        <NavMobile />
        {children}
      </main>
    </SidebarProvider>
  );
}
