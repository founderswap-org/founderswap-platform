'use client';

import { cn } from '@founderswap/design-system/lib/utils';
import { usePathname } from 'next/navigation';

export interface Step {
  name: string;
  href: string;
}

interface StepProgressProps {
  steps: Step[];
}

export const StepProgress = ({ steps }: StepProgressProps) => {
  const pathname = usePathname();
  const currentStepIndex = steps.findIndex((step) =>
    pathname.startsWith(step.href)
  );

  return (
    <div aria-label="Onboarding progress">
      <ol className="mx-auto flex w-fit flex-nowrap gap-1">
        {steps.map((step, index) => (
          <li
            key={step.name}
            className={cn(
              'h-1 w-12 rounded-full',
              index <= currentStepIndex ? 'bg-brand' : 'bg-muted'
            )}
          >
            <span className="sr-only">
              {step.name}{' '}
              {index < currentStepIndex
                ? 'completed'
                : index === currentStepIndex
                  ? 'current'
                  : ''}
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
};
