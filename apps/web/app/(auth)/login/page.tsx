'use client';
export const runtime = 'edge';
import { AuthCard } from '@/components/auth/card';
import { LoginForm } from '@/components/auth/login-form';
import { Separator } from '@founderswap/design-system/components/ui/separator';

export default function LoginPage() {
  return (
    <>
      <Separator />
      <AuthCard
        title="Welcome back on board!"
        description="Let’s get you back to exploring."
      >
        <LoginForm />
      </AuthCard>
    </>
  );
}
