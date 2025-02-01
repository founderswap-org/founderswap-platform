'use client';

import { Separator } from '@founderswap/design-system/components/ui/separator';
import type React from 'react';

type AuthCardProps = {
  title: string;
  description: string;
  children: React.ReactNode;
};

export const AuthCard = ({ title, description, children }: AuthCardProps) => {
  return (
    <div className="relative z-10 m-5 flex w-screen-md min-w-96 flex-col gap-6 rounded-2xl border border-border bg-elevated p-6 shadow-md sm:m-10">
      <div className="flex flex-col gap-2">
        <h1 className="font-brand font-semibold text-2xl">{title}</h1>
        <p className="text-description text-sm">{description}</p>
      </div>
      <Separator />
      {children}
    </div>
  );
};
