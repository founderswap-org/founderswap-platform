'use client';
import { Button } from '@founderswap/design-system/components/ui/button';
import { Input } from '@founderswap/design-system/components/ui/input';
import Link from 'next/link';

export const LoginForm = () => {
  // const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();
  //   const formData = new FormData(event.target as HTMLFormElement);
  //   const email = formData.get('email') as string;
  //   const password = formData.get('password') as string;
  //   submitMutation.mutate({ email, password });
  // };

  return (
    <form className="flex flex-col gap-4 self-center">
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
