'use client';
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
    <div className="flex h-screen w-screen items-center justify-center bg-background">
      {children}
    </div>
  );
}
