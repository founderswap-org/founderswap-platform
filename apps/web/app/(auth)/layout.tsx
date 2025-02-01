'use client';

import type React from 'react';

import Logo from '@/components/ui/logo';

export default function AuthLayout({
  children,
}: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen w-screen items-center justify-center bg-background py-10">
      <div className="flex flex-col items-center justify-center gap-4">
        <Logo height={24} className="fixed top-6 left-6 z-0 w-fit" />
        {children}
      </div>
    </div>
  );
}
