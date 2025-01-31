'use server';
import { OnboardingLayout as OnboardingHeader } from '@/components/layouts/onboarding-layout';
import type { Step } from '@/components/onboarding/step-progress';
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

  const steps: Step[] = [
    { name: 'Step 1', href: '/onboarding/step-1' },
    { name: 'Step 2', href: '/onboarding/step-2' },
    { name: 'Step 3', href: '/onboarding/step-3' },
  ];

  return (
    <div className="min-h-screen min-w-screen bg-background">
      <OnboardingHeader steps={steps} />
      <main id="main-content" className="mx-auto min-w-[520px] pt-28 pb-20">
        {children}
      </main>
    </div>
  );
}
