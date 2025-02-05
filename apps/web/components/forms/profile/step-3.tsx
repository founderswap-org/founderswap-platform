'use client';

import { Button } from '@founderswap/design-system/components/ui/button';
import { Label } from '@founderswap/design-system/components/ui/label';
import { Separator } from '@founderswap/design-system/components/ui/separator';
import { Textarea } from '@founderswap/design-system/components/ui/textarea';

interface Step3Props {
  onSubmit: (formData: FormData) => Promise<void>;
  submitLabel?: string;
  defaultValues?: {
    availability?: string;
    timezone?: string;
    description?: string;
  };
}

export function Step3Form({
  onSubmit,
  submitLabel = 'Complete',
  defaultValues = {},
}: Step3Props) {
  return (
    <form action={onSubmit}>
      <div className="space-y-10">
        <div className="space-y-2">
          <Label className="font-medium text-sm">About you</Label>
          <Textarea
            className="min-h-40"
            placeholder="Share your story, experiences, or what you are looking for"
            name="description"
            required
            defaultValue={defaultValues.description}
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
