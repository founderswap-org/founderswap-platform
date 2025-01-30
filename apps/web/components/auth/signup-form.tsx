'use client';
import { signup } from '@/app/(auth)/login/action';
import { Button } from '@founderswap/design-system/components/ui/button';
import { Input } from '@founderswap/design-system/components/ui/input';
import Link from 'next/link';

export const SignupForm = () => {
  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);

    try {
      await signup(formData);
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4 self-center">
      <div title="Personal Information">
        <Input
          type="text"
          id="firstname"
          name="first_name"
          placeholder="First Name"
        />
        <Input
          type="text"
          id="lastname"
          name="last_name"
          placeholder="Last Name"
        />
        <Input
          type="text"
          id="company"
          name="company_name"
          placeholder="Company"
        />
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

      {/* {submitMutation.isError && (
        <p className="text-center text-destructive">
          {submitMutation.error.message}
        </p>
      )} */}
    </form>
  );
};
