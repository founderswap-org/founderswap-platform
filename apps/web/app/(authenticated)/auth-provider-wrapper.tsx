'use client';

import { AuthProvider } from '@/context/auth';
import type { CustomUser } from '@/types/user';

export default function AuthProviderWrapper({
  children,
  user,
}: {
  children: React.ReactNode;
  user: CustomUser;
}) {
  return <AuthProvider user={user}>{children}</AuthProvider>;
}
