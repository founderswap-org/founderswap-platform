'use client';
import { signup } from '@/app/(auth)/action';
import { Button } from '@founderswap/design-system/components/ui/button';
import { Input } from '@founderswap/design-system/components/ui/input';
import { Separator } from '@founderswap/design-system/components/ui/separator';
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
    <form
      onSubmit={onSubmit}
      className="flex w-full flex-col gap-6 self-center"
    >
      <div className="flex flex-col gap-3" title="Personal Information">
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
      <Separator />
      <div className="flex flex-col gap-3" title="Access Information">
        <Input type="email" id="email" name="email" placeholder="Email" />
        <Input
          type="password"
          id="password"
          name="password"
          placeholder="Password"
        />
      </div>
      <Button type="submit">Sign Up</Button>
      <Separator />
      <div className="flex flex-col">
        <span className="text-center text-description text-sm">
          Already have an account?
        </span>
        <Button variant="link" asChild>
          <Link href="/login">Login</Link>
        </Button>
      </div>
    </form>
  );
};
