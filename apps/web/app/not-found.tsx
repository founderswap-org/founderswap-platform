'use client';

import { Button } from '@founderswap/design-system/components/ui/button';
import { useRouter } from 'next/navigation';

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-8">
      <div className="text-center">
        <h1 className="font-brand text-5xl">404</h1>
        <p className="mt-2 text-description">Page not found</p>
      </div>
      <Button onClick={() => router.back()}>Go back</Button>
    </div>
  );
}
