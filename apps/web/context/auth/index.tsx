'use client';

import type { User } from '@supabase/supabase-js';
import type React from 'react';
import { type ReactNode, createContext, useContext } from 'react';

interface AuthContextProps {
  user: User;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{
  children: ReactNode;
  user: User;
}> = ({ children, user }) => {
  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
