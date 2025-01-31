'use client';

import { Button } from '@founderswap/design-system/components/ui/button';
import { Input } from '@founderswap/design-system/components/ui/input';
import { Label } from '@founderswap/design-system/components/ui/label';

interface ProfileDetailsFormProps {
  onSubmit: (formData: FormData) => Promise<void>;
  submitLabel?: string;
  defaultValues?: {
    languages?: string;
    linkedin?: string;
  };
}

export function ProfileDetailsForm({
  onSubmit,
  submitLabel = 'Continue',
  defaultValues = {},
}: ProfileDetailsFormProps) {
  return (
    <form action={onSubmit}>
      <div className="space-y-4">
        <div className="space-y-2">
          <Label className="font-medium text-sm">Languages</Label>
          <Input
            name="languages"
            placeholder="English, Italian, Spanish..."
            defaultValue={defaultValues.languages}
            required
          />
        </div>

        <div className="space-y-2">
          <Label className="font-medium text-sm">LinkedIn Profile</Label>
          <Input
            name="linkedin"
            type="url"
            placeholder="https://linkedin.com/in/yourprofile"
            defaultValue={defaultValues.linkedin}
            required
          />
        </div>

        <Button type="submit" className="w-full">
          {submitLabel}
        </Button>
      </div>
    </form>
  );
}
