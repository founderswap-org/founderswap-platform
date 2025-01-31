'use client';

import { updateProfile } from '@/app/(authenticated)/(main)/settings/actions';
import { RoleExperienceForm } from '@/components/forms/profile/role-experience-form';
import { Card } from '@founderswap/design-system/components/ui/card';
import { Separator } from '@founderswap/design-system/components/ui/separator';

export default function SettingsPage() {
  return (
    <div className="mx-auto flex min-h-[calc(100vh-10px)] max-w-screen-xl flex-col gap-10 p-10 lg:flex-row">
      <div className="flex w-full flex-col gap-8">
        <div className="flex flex-col gap-2">
          <h1 className="font-brand font-semibold text-3xl text-brand">
            Settings
          </h1>
          <p className="text-description">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.{' '}
          </p>
        </div>
        <Separator />
        <Card className="p-6">
          <RoleExperienceForm
            onSubmit={updateProfile}
            submitLabel="Save changes"
            defaultValues={{
              role: 'founder',
              experience: '3-5',
            }}
          />
        </Card>
      </div>
    </div>
  );
}
