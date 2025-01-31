import { Separator } from '@founderswap/design-system/components/ui/separator';
import type React from 'react';

type AuthCardProps = {
  title: string;
  description: string;
  children: React.ReactNode;
};

export const AuthCard = ({ title, description, children }: AuthCardProps) => {
  return (
    <div className="flex flex-col gap-6 bg-elevated shadow-md m-5 sm:m-10 p-6 border border-border rounded-2xl w-screen-md">
      <div className="flex flex-col gap-2">
        <h1 className="font-brand font-semibold text-3xl">{title}</h1>
        <p className="text-description text-sm">{description}</p>
      </div>
      <Separator />
      {children}
    </div>
  );
};
