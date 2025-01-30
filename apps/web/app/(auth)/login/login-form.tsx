'use client';
import { Button } from '@founderswap/design-system/components/ui/button';
import { Input } from '@founderswap/design-system/components/ui/input';
import Link from 'next/link';
import { login } from './action';

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
    <form onSubmit={onSubmit} className="flex flex-col gap-4 self-center">
      <div>
        <Input type="email" id="email" name="email" placeholder="Email" />
        <Input
          type="password"
          id="password"
          name="password"
          placeholder="Password"
        />
      </div>
      <Button type="submit">Sign In</Button>

      <Button variant="link">
        <Link href="/signup">
          Don't you have an account yet? <p className="underline">Sign Up</p>
        </Link>
      </Button>
    </form>
  );
};
