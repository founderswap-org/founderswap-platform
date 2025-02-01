export const runtime = 'edge';

import { updateOnboardingStep1 } from '@/app/(authenticated)/onboarding/action';
import { RoleExperienceForm } from '@/components/forms/profile/role-experience-form';
import { OnboardingCard } from '@/components/onboarding/onboarding-card';

export default function OnboardingStep1() {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-4">
      <OnboardingCard
        title="Let's get to know you better"
        description="Tell us about you, your role and experience"
        step={1}
        totalSteps={3}
      >
        <RoleExperienceForm onSubmit={updateOnboardingStep1} />
      </OnboardingCard>
    </div>
  );
}
