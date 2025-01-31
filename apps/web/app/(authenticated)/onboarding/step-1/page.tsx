export const runtime = 'edge';

import { updateOnboardingStep1 } from '@/app/(authenticated)/onboarding/action';
import { RoleExperienceForm } from '@/components/forms/profile/role-experience-form';
import { OnboardingCard } from '@/components/onboarding/onboarding-card';

export default function OnboardingStep1() {
  return (
    <OnboardingCard
      title="Let's get to know you better"
      description="Tell us about your role and experience"
      step={1}
      totalSteps={3}
    >
      <RoleExperienceForm onSubmit={updateOnboardingStep1} />
    </OnboardingCard>
  );
}
