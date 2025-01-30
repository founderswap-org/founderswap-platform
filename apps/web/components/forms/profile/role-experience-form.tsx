'use client';

import { Button } from '@founderswap/design-system/components/ui/button';
import { Label } from '@founderswap/design-system/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@founderswap/design-system/components/ui/select';

interface RoleExperienceFormProps {
  onSubmit: (formData: FormData) => Promise<void>;
  submitLabel?: string;
  defaultValues?: {
    role?: string;
    experience?: string;
  };
}

export function RoleExperienceForm({
  onSubmit,
  submitLabel = 'Continue',
  defaultValues = {},
}: RoleExperienceFormProps) {
  return (
    <form action={onSubmit}>
      <div className="space-y-4">
        <div className="space-y-2">
          <Label className="font-medium text-sm">Your role</Label>
          <Select name="role" required defaultValue={defaultValues.role}>
            <SelectTrigger>
              <SelectValue placeholder="Select your role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="founder">Founder</SelectItem>
              <SelectItem value="investor">Investor</SelectItem>
              <SelectItem value="advisor">Advisor</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label className="font-medium text-sm">Years of experience</Label>
          <Select
            name="experience"
            required
            defaultValue={defaultValues.experience}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select your experience" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0-2">0-2 years</SelectItem>
              <SelectItem value="3-5">3-5 years</SelectItem>
              <SelectItem value="5+">5+ years</SelectItem>
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
