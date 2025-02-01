export const runtime = 'edge';

import { updateOnboardingStep3 } from '@/app/(authenticated)/onboarding/action';
import { DescriptionForm } from '@/components/forms/profile/description-form';
import { OnboardingCard } from '@/components/onboarding/onboarding-card';

export default function OnboardingStep3() {
  return (
    <div className="flex flex-col justify-center items-center gap-4 w-full">
      <OnboardingCard
        title="Almost there!"
        description="Tell us something about you"
        step={3}
        totalSteps={3}
      >
        <DescriptionForm onSubmit={updateOnboardingStep3} />
      </OnboardingCard>
    </div>
  );
}
