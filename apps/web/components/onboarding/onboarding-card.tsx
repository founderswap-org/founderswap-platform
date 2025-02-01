'use client';

import { Separator } from '@founderswap/design-system/components/ui/separator';
import type React from 'react';

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
}: OnboardingCardProps) {
  return (
    <div className="relative z-10 flex min-w-[520px] flex-col gap-6 sm:m-10">
      <div className="flex flex-col gap-2">
        <h1 className="font-brand font-semibold text-2xl">{title}</h1>
        <p className="text-description text-sm">{description}</p>
      </div>
      <Separator />
      {children}
    </div>
  );
}
/*
gender;
company;
size;
industry?
role
company
website;
company;
linkedin;

i;
'm interested in

my skills

areas of interest
*/
