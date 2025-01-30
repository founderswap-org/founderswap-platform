'use client';
import type { CustomUser } from '@/types/user';
import type React from 'react';
import { type ReactNode, createContext, useContext } from 'react';

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

type AuthContextProps = {
  user: CustomUser;
};

export const AuthProvider: React.FC<{
  children: ReactNode;
  user: CustomUser;
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
