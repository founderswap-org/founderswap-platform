export const runtime = 'edge';

import { updateOnboardingStep2 } from '@/app/(authenticated)/onboarding/action';
import { InterestsSkillsForm } from '@/components/forms/profile/interests-skills-form';
import { OnboardingCard } from '@/components/onboarding/onboarding-card';

export default function OnboardingStep2() {
  return (
    <OnboardingCard
      title="What are you interested in?"
      description="Tell us about your interests and skills"
      step={2}
      totalSteps={3}
    >
      <InterestsSkillsForm onSubmit={updateOnboardingStep2} />
    </OnboardingCard>
  );
}
