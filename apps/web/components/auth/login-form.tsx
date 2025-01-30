'use client';
import { login } from '@/app/(auth)/action';
import { Button } from '@founderswap/design-system/components/ui/button';
import { Input } from '@founderswap/design-system/components/ui/input';
import { Separator } from '@founderswap/design-system/components/ui/separator';
import Link from 'next/link';

export const LoginForm = () => {
  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);

    try {
      // Let's try to login!!!
      await login(formData);
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  return (
    <form
      onSubmit={onSubmit}
      className="flex w-full flex-col gap-6 self-center"
    >
      <div className="flex flex-col gap-3">
        <Input type="email" id="email" name="email" placeholder="Email" />
        <Input
          type="password"
          id="password"
          name="password"
          placeholder="Password"
        />
      </div>
      <Button type="submit">Login</Button>
      <Separator />
      <div className="flex flex-col">
        <span className="text-center text-description text-sm">
          Don't you have an account yet?
        </span>
        <Button variant="link" asChild>
          <Link href="/signup">Sign Up</Link>
        </Button>
      </div>
    </form>
  );
};
