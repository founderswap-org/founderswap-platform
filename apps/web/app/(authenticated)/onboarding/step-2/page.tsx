export const runtime = 'edge';

import { updateOnboardingStep2 } from '@/app/(authenticated)/onboarding/action';
import { Step2Form } from '@/components/forms/profile/step-2';
import { OnboardingCard } from '@/components/onboarding/onboarding-card';

export default function OnboardingStep2() {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-4">
      <OnboardingCard
        title="What are you interested in?"
        description="Tell us about your interests and skills"
        step={2}
        totalSteps={3}
      >
        <Step2Form onSubmit={updateOnboardingStep2} />
      </OnboardingCard>
    </div>
  );
}
