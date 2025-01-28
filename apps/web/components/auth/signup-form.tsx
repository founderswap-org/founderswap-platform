'use client';

import { Button } from '@founderswap/design-system/components/ui/button';
import { Input } from '@founderswap/design-system/components/ui/input';
import Link from 'next/link';

export const SignupForm = () => {
  // const router = useRouter();
  // const submitMutation = useMutation({
  //   mutationFn: signUp,
  //   onSuccess: () => {
  //     router.push('/confirm');
  //   },
  // });

  return (
    <form
      // onSubmit={submitMutation.mutate}
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

      {/* {submitMutation.isError && (
        <p className="text-center text-destructive">
          {submitMutation.error.message}
        </p>
      )} */}
    </form>
  );
};
