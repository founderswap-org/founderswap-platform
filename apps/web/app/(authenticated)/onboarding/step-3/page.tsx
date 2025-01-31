export const runtime = 'edge';

import { updateOnboardingStep3 } from '@/app/(authenticated)/onboarding/action';
import { AvailabilityTimezoneForm } from '@/components/forms/profile/availability-timezone-form';
import { OnboardingCard } from '@/components/onboarding/onboarding-card';

export default function OnboardingStep3() {
  return (
    <OnboardingCard
      title="Almost there!"
      description="Let us know about your availability"
      step={3}
      totalSteps={3}
    >
      <AvailabilityTimezoneForm onSubmit={updateOnboardingStep3} />
    </OnboardingCard>
  );
}
