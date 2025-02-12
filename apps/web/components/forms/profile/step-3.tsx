'use client';

import type { Database } from '@/utils/database.types';
import { Button } from '@founderswap/design-system/components/ui/button';
import { Label } from '@founderswap/design-system/components/ui/label';
import { Separator } from '@founderswap/design-system/components/ui/separator';
import { Textarea } from '@founderswap/design-system/components/ui/textarea';

type ProfileType = Database['public']['Tables']['user_profile']['Row'];

interface Step3Props {
  onSubmit: (formData: FormData) => Promise<void>;
  submitLabel?: string;
  defaultValues?: Pick<ProfileType, 'bio'>;
}

export function Step3Form({
  onSubmit,
  submitLabel = 'Complete',
  defaultValues = { bio: '' },
}: Step3Props) {
  return (
    <form action={onSubmit}>
      <div className="space-y-10">
        <div className="space-y-2">
          <Label className="font-medium text-sm">Chi sei</Label>
          <Textarea
            className="min-h-40"
            placeholder="Racconta la tua storia, le tue esperienze o cosa stai cercando"
            name="bio"
            required
            defaultValue={defaultValues.bio ?? ''}
          />
        </div>
        <Separator />
        <div className="flex justify-end">
          <Button type="submit" className="w-fit">
            {submitLabel}
          </Button>
        </div>
      </div>
    </form>
  );
}
