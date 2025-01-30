'use client';

import { Button } from '@founderswap/design-system/components/ui/button';
import { Checkbox } from '@founderswap/design-system/components/ui/checkbox';
import { Label } from '@founderswap/design-system/components/ui/label';

interface AreasGoalsFormProps {
  onSubmit: (formData: FormData) => Promise<void>;
  submitLabel?: string;
  areas: Array<{
    id: number;
    name: string;
  }>;
  goals: Array<{
    id: number;
    description: string;
  }>;
  defaultValues?: {
    areas?: number[];
    goals?: number[];
  };
}

export function AreasGoalsForm({
  onSubmit,
  submitLabel = 'Complete',
  areas,
  goals,
  defaultValues = {},
}: AreasGoalsFormProps) {
  return (
    <form action={onSubmit}>
      <div className="space-y-6">
        <div className="space-y-4">
          <Label className="text-base">Areas of Interest</Label>
          <div className="grid grid-cols-2 gap-4">
            {areas.map((area) => (
              <div key={area.id} className="flex items-center space-x-2">
                <Checkbox
                  id={`area-${area.id}`}
                  name="areas"
                  value={area.id.toString()}
                  defaultChecked={defaultValues.areas?.includes(area.id)}
                />
                <Label htmlFor={`area-${area.id}`}>{area.name}</Label>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <Label className="text-base">Your Goals</Label>
          <div className="grid grid-cols-2 gap-4">
            {goals.map((goal) => (
              <div key={goal.id} className="flex items-center space-x-2">
                <Checkbox
                  id={`goal-${goal.id}`}
                  name="goals"
                  value={goal.id.toString()}
                  defaultChecked={defaultValues.goals?.includes(goal.id)}
                />
                <Label htmlFor={`goal-${goal.id}`}>{goal.description}</Label>
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
