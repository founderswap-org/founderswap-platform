'use client';

import { Button } from '@founderswap/design-system/components/ui/button';
import { Input } from '@founderswap/design-system/components/ui/input';
import { Label } from '@founderswap/design-system/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@founderswap/design-system/components/ui/select';

interface CompanyFormProps {
  onSubmit: (formData: FormData) => Promise<void>;
  submitLabel?: string;
  growStages: Array<{
    id: number;
    name: string;
  }>;
  defaultValues?: {
    company_name?: string;
    website?: string;
    grow_stage?: number;
  };
}

export function CompanyForm({
  onSubmit,
  submitLabel = 'Continue',
  growStages,
  defaultValues = {},
}: CompanyFormProps) {
  return (
    <form action={onSubmit}>
      <div className="space-y-4">
        <div className="space-y-2">
          <Label className="font-medium text-sm">Company Name</Label>
          <Input
            name="company_name"
            placeholder="Your company name"
            defaultValue={defaultValues.company_name}
            required
          />
        </div>

        <div className="space-y-2">
          <Label className="font-medium text-sm">Website</Label>
          <Input
            name="website"
            type="url"
            placeholder="https://yourcompany.com"
            defaultValue={defaultValues.website}
          />
        </div>

        <div className="space-y-2">
          <Label className="font-medium text-sm">Growth Stage</Label>
          <Select
            name="grow_stage"
            required
            defaultValue={defaultValues.grow_stage?.toString()}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select growth stage" />
            </SelectTrigger>
            <SelectContent>
              {growStages.map((stage) => (
                <SelectItem key={stage.id} value={stage.id.toString()}>
                  {stage.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Button type="submit" className="w-full">
          {submitLabel}
        </Button>
      </div>
    </form>
  );
}
