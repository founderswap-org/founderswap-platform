'use client';
import Pictogram from '@/components/ui/pictogram';
import type React from 'react';

export default function AuthLayout({
  children,
}: { children: React.ReactNode }) {
  // const router = useRouter();
  // const auth = useAuth();

  // useEffect(() => {
  //   if (auth?.session) {
  //     router.push('/');
  //   }
  // }, [auth?.session, router]);

  return (
    <div className="flex min-h-screen w-screen items-center justify-center bg-background py-10">
      <div className="flex flex-col items-center justify-center gap-4">
        <Pictogram size={40} />
        {children}
      </div>
    </div>
  );
}
