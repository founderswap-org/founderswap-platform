export const runtime = 'edge';

import { updateOnboardingStep1 } from '@/app/(authenticated)/onboarding/action';
import { Step1Form } from '@/components/forms/profile/step-1';
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
        <Step1Form onSubmit={updateOnboardingStep1} />
      </OnboardingCard>
    </div>
  );
}
