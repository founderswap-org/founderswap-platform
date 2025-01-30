'use client';

import { Card } from '@founderswap/design-system/components/ui/card';

interface OnboardingCardProps {
  title: string;
  description: string;
  children: React.ReactNode;
  step: number;
  totalSteps: number;
}

export function OnboardingCard({
  title,
  description,
  children,
  step,
  totalSteps,
}: OnboardingCardProps) {
  return (
    <Card className="w-full max-w-lg p-8">
      <div className="mb-6">
        <div className="mb-2 text-muted-foreground text-sm">
          Step {step} of {totalSteps}
        </div>
        <h1 className="font-semibold text-2xl">{title}</h1>
        <p className="text-muted-foreground">{description}</p>
      </div>
      {children}
    </Card>
  );
}
