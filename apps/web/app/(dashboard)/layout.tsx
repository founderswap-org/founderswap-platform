'use client';

import { SidebarProvider } from '@founderswap/design-system/components/ui/sidebar';
import type React from 'react';

import { AppSidebar } from '@/components/ui/app-sidebar';
import NavMobile from '@/components/ui/nav-mobile';

export default function DashboardLayout({
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
