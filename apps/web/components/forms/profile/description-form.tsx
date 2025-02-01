'use client';

import { Button } from '@founderswap/design-system/components/ui/button';
import { Label } from '@founderswap/design-system/components/ui/label';
import { Textarea } from '@founderswap/design-system/components/ui/textarea';

interface DescriptionFormProps {
  onSubmit: (formData: FormData) => Promise<void>;
  submitLabel?: string;
  defaultValues?: {
    availability?: string;
    timezone?: string;
    description?: string;
  };
}

export function DescriptionForm({
  onSubmit,
  submitLabel = 'Complete',
  defaultValues = {},
}: DescriptionFormProps) {
  return (
    <form action={onSubmit}>
      <div className="space-y-4">
        <div className="space-y-2">
          <Label className="font-medium text-sm">About you</Label>
          <Textarea
            placeholder="Share your story, experiences, or what you are looking for"
            name="description"
            required
            defaultValue={defaultValues.description}
          />
        </div>

        <div className="flex justify-end">
          <Button type="submit" className="w-fit">
            {submitLabel}
          </Button>
        </div>
      </div>
    </form>
  );
}
