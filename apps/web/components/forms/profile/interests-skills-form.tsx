'use client';

import { type Category, CategoryItem } from '@/components/onboarding/interest';
import { Button } from '@founderswap/design-system/components/ui/button';
import {} from '@founderswap/design-system/components/ui/select';
import { Separator } from '@founderswap/design-system/components/ui/separator';
import React from 'react';

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

interface CheckedItems {
  [categoryId: string]: boolean;
}

const categories: Category[] = [
  {
    id: '1',
    title: 'User Analytics',
    subcategories: [
      'User Segmentation',
      'Cohort Analysis',
      'Retention Analysis',
    ],
  },
  {
    id: '2',
    title: 'Event Tracking',
    subcategories: ['Custom Events', 'Automated Events', 'Event Funnels'],
  },
  {
    id: '3',
    title: 'A/B Testing',
    subcategories: ['Experiment Setup', 'Variant Analysis', 'Reporting'],
  },
  {
    id: '4',
    title: 'User Journeys',
    subcategories: ['Journey Mapping', 'Conversion Paths', 'Drop-off Analysis'],
  },
  {
    id: '5',
    title: 'Engagement Tracking',
    subcategories: ['Email Campaigns', 'Push Notifications', 'In-app Messages'],
  },
  {
    id: '6',
    title: 'Data Management',
    subcategories: ['Data Import', 'Data Export', 'Integrations'],
  },
  {
    id: '7',
    title: 'Security & Compliance',
    subcategories: ['Data Encryption', 'User Permissions', 'GDPR Compliance'],
  },
];

export function InterestsSkillsForm({
  onSubmit,
  submitLabel = 'Continue',
}: InterestsSkillsFormProps) {
  const [checkedItems, setCheckedItems] = React.useState<CheckedItems>({});

  const handleCheckedChange = (categoryId: string, isChecked: boolean) => {
    setCheckedItems((prevCheckedItems) => ({
      ...prevCheckedItems,
      [categoryId]: isChecked,
    }));
  };
  return (
    <form action={onSubmit}>
      <div className="space-y-10">
        <div className="flex flex-col gap-4">
          {categories.map((category, index) => (
            <div
              className="motion-safe:animate-revealBottom"
              key={category.id}
              style={{
                animationDuration: '600ms',
                animationDelay: `${100 + index * 50}ms`,
                animationFillMode: 'backwards',
              }}
            >
              <CategoryItem
                key={category.id}
                category={category}
                checked={checkedItems[category.id] || false}
                onCheckedChange={handleCheckedChange}
              />
            </div>
          ))}
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
