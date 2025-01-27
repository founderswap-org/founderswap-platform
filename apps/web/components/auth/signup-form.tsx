'use client';

import { useAuth } from '@/hooks/useAuth';
import { Button } from '@founderswap/design-system/components/ui/button';
import { Input } from '@founderswap/design-system/components/ui/input';
import { useMutation } from '@tanstack/react-query';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export const SignupForm = () => {
  const auth = useAuth();
  const router = useRouter();
  const submitMutation = useMutation({
    mutationFn: signUp,
    onSuccess: () => {
      router.push('/confirm');
    },
  });

  async function signUp(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!auth) {
      throw new Error('Auth not found');
    }

    const formData = new FormData(event.target as HTMLFormElement);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const firstname = formData.get('firstname') as string;
    const lastname = formData.get('lastname') as string;
    const company = formData.get('company') as string;

    return auth.signUp({
      email,
      password,
      company,
      firstname,
      lastname,
    });
  }

  return (
    <form
      onSubmit={submitMutation.mutate}
      className="flex flex-col gap-4 self-center"
    >
      <div title="Personal Information">
        <Input
          type="text"
          id="firstname"
          name="firstname"
          placeholder="First Name"
        />
        <Input
          type="text"
          id="lastname"
          name="lastname"
          placeholder="Last Name"
        />
        <Input type="text" id="company" name="company" placeholder="Company" />
      </div>
      <div title="Access Information">
        <Input type="email" id="email" name="email" placeholder="Email" />
        <Input
          type="password"
          id="password"
          name="password"
          placeholder="Password"
        />
      </div>
      <Button type="submit">Sign Up</Button>

      <Button variant="link">
        <Link href="/login">
          Already have an account? <p className="underline">Sign In</p>
        </Link>
      </Button>

      {submitMutation.isError && (
        <p className="text-center text-destructive">
          {submitMutation.error.message}
        </p>
      )}
    </form>
  );
};
