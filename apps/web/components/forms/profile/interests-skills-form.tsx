'use client';

import { Button } from '@founderswap/design-system/components/ui/button';
import { Checkbox } from '@founderswap/design-system/components/ui/checkbox';
import { Label } from '@founderswap/design-system/components/ui/label';
import {} from '@founderswap/design-system/components/ui/select';

interface InterestsSkillsFormProps {
  onSubmit: (formData: FormData) => Promise<void>;
  submitLabel?: string;
  defaultValues?: {
    interests?: string[];
    skills?: string[];
  };
}

const INTERESTS_OPTIONS = [
  { label: 'Startup', value: 'startup' },
  { label: 'Technology', value: 'technology' },
  { label: 'Business', value: 'business' },
  { label: 'Marketing', value: 'marketing' },
  { label: 'Finance', value: 'finance' },
];

const SKILLS_OPTIONS = [
  { label: 'Programming', value: 'programming' },
  { label: 'Design', value: 'design' },
  { label: 'Marketing', value: 'marketing' },
  { label: 'Sales', value: 'sales' },
  { label: 'Finance', value: 'finance' },
];

export function InterestsSkillsForm({
  onSubmit,
  submitLabel = 'Continue',
  defaultValues = {},
}: InterestsSkillsFormProps) {
  return (
    <form action={onSubmit}>
      <div className="space-y-6">
        <div className="space-y-4">
          <Label className="text-base">Your Interests</Label>
          <div className="grid grid-cols-2 gap-4">
            {INTERESTS_OPTIONS.map((interest) => (
              <div key={interest.value} className="flex items-center space-x-2">
                <Checkbox
                  id={`interest-${interest.value}`}
                  name="interests"
                  value={interest.value}
                  defaultChecked={defaultValues.interests?.includes(
                    interest.value
                  )}
                />
                <Label htmlFor={`interest-${interest.value}`}>
                  {interest.label}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <Label className="text-base">Your Skills</Label>
          <div className="grid grid-cols-2 gap-4">
            {SKILLS_OPTIONS.map((skill) => (
              <div key={skill.value} className="flex items-center space-x-2">
                <Checkbox
                  id={`skill-${skill.value}`}
                  name="skills"
                  value={skill.value}
                  defaultChecked={defaultValues.skills?.includes(skill.value)}
                />
                <Label htmlFor={`skill-${skill.value}`}>{skill.label}</Label>
              </div>
            ))}
          </div>
        </div>

        <Button type="submit" className="w-full">
          {submitLabel}
        </Button>
      </div>
    </form>
  );
}
