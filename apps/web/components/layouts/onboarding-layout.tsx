'use client';

import useScroll from '@/lib/useScroll';
import { cn } from '@founderswap/design-system/lib/utils';
import { type Step, StepProgress } from '../onboarding/step-progress';

export const OnboardingLayout = ({ steps }: { steps: Step[] }) => {
  const scrolled = useScroll(15);
  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 isolate z-50 flex items-center justify-center border-border border-b bg-elevated shadow-sm transition-all md:px-6',
        scrolled ? 'h-12' : 'h-20'
      )}
    >
      <StepProgress steps={steps} />
    </header>
  );
};
