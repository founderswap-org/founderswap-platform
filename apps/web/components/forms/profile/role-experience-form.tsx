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
import { Separator } from '@founderswap/design-system/components/ui/separator';

interface RoleExperienceFormProps {
  onSubmit: (formData: FormData) => Promise<void>;
  submitLabel?: string;
  defaultValues?: {
    role?: string;
    experience?: string;
    gender?: string;
    company_size?: string;
    company_website?: string;
    company_linkedin?: string;
  };
}

export function RoleExperienceForm({
  onSubmit,
  submitLabel = 'Continue',
  defaultValues = {},
}: RoleExperienceFormProps) {
  return (
    <form action={onSubmit}>
      <div className="space-y-10">
        <div className="flex flex-col gap-4">
          <p className="font-semibold text-lg">About you</p>
          <div className="space-y-2">
            <Label className="font-medium text-sm">Your linkedin</Label>
            <Input
              placeholder="https://www.linkedin.com/in/your-name/"
              name="linkedin"
              required
              defaultValue={defaultValues.role}
            />
          </div>
          <div className="space-y-2">
            <Label className="font-medium text-sm">Your phone</Label>
            <Input
              placeholder="+ 3334445566"
              name="phone"
              required
              defaultValue={defaultValues.role}
            />
          </div>
          <div className="space-y-2">
            <Label className="font-medium text-sm">Your gender</Label>
            <Select name="gender" required defaultValue={defaultValues.gender}>
              <SelectTrigger>
                <SelectValue placeholder="Select your gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
                <SelectItem value="non-binary">Non-binary</SelectItem>
                <SelectItem value="prefer-not">Prefer not to say</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <Separator />

        <div className="flex flex-col gap-4">
          <p className="font-semibold text-lg">About your company</p>
          <div className="space-y-2">
            <Label className="font-medium text-sm">Company size</Label>
            <Select
              name="company_size"
              required
              defaultValue={defaultValues.company_size}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select your company size" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1-10">1-10 employees</SelectItem>
                <SelectItem value="11-50">11-50 employees</SelectItem>
                <SelectItem value="51-200">51-200 employees</SelectItem>
              </SelectContent>
            </Select>
          </div>
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
            <Label className="font-medium text-sm">Company website</Label>
            <Input
              placeholder="https://www.yourcompany.com"
              name="company_website"
              required
              defaultValue={defaultValues.company_website}
            />
          </div>
          <div className="space-y-2">
            <Label className="font-medium text-sm">Company Linkedin</Label>
            <Input
              placeholder="https://linkedin.com/company/your-company"
              name="company_linkedin"
              required
              defaultValue={defaultValues.company_linkedin}
            />
          </div>
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
