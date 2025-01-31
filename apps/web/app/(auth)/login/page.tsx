export const runtime = 'edge';
import { AuthCard } from '@/components/auth/card';
import { LoginForm } from '@/components/auth/login-form';

export default function LoginPage() {
  return (
    <AuthCard
      title="Welcome back on board!"
      description="Let’s get you back to exploring."
    >
      <LoginForm />
    </AuthCard>
  );
}
