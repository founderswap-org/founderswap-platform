'use client';

import { AuthProvider } from '@/context/auth';
import type { User } from '@supabase/supabase-js';

export default function AuthProviderWrapper({
  children,
  user,
}: {
  children: React.ReactNode;
  user: User;
}) {
  return <AuthProvider user={user}>{children}</AuthProvider>;
}
