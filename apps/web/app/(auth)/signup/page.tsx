export const runtime = 'edge';

import { AuthCard } from '@/components/auth/card';
import { SignupForm } from '@/components/auth/signup-form';

export default function SignupPage() {
  return (
    <AuthCard
      title="Join the adventure today!"
      description="It’s free and only takes a few seconds."
    >
      <SignupForm />
    </AuthCard>
  );
}
