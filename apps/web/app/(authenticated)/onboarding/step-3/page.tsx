export const runtime = 'edge';

import { updateOnboardingStep3 } from '@/app/(authenticated)/onboarding/action';
import { Step3Form } from '@/components/forms/profile/step-3';
import { OnboardingCard } from '@/components/onboarding/onboarding-card';

export default function OnboardingStep3() {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-4">
      <OnboardingCard
        title="Almost there!"
        description="Tell us something about you"
        step={3}
        totalSteps={3}
      >
        <Step3Form onSubmit={updateOnboardingStep3} />
      </OnboardingCard>
    </div>
  );
}
