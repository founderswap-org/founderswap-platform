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

interface AvailabilityTimezoneFormProps {
  onSubmit: (formData: FormData) => Promise<void>;
  submitLabel?: string;
  defaultValues?: {
    availability?: string;
    timezone?: string;
  };
}

const AVAILABILITY_OPTIONS = [
  { label: 'Full-time', value: 'full-time' },
  { label: 'Part-time', value: 'part-time' },
  { label: 'Flexible', value: 'flexible' },
];

const TIMEZONE_OPTIONS = [
  { label: 'UTC-8 (PST)', value: 'America/Los_Angeles' },
  { label: 'UTC-5 (EST)', value: 'America/New_York' },
  { label: 'UTC+0 (GMT)', value: 'Europe/London' },
  { label: 'UTC+1 (CET)', value: 'Europe/Paris' },
  { label: 'UTC+2 (EET)', value: 'Europe/Rome' },
];

export function AvailabilityTimezoneForm({
  onSubmit,
  submitLabel = 'Complete',
  defaultValues = {},
}: AvailabilityTimezoneFormProps) {
  return (
    <form action={onSubmit}>
      <div className="space-y-4">
        <div className="space-y-2">
          <Label className="font-medium text-sm">Your Availability</Label>
          <Select
            name="availability"
            required
            defaultValue={defaultValues.availability}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select your availability" />
            </SelectTrigger>
            <SelectContent>
              {AVAILABILITY_OPTIONS.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label className="font-medium text-sm">Your Timezone</Label>
          <Select
            name="timezone"
            required
            defaultValue={defaultValues.timezone}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select your timezone" />
            </SelectTrigger>
            <SelectContent>
              {TIMEZONE_OPTIONS.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
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
