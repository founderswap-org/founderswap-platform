'use client';

import useSupabase from '@/lib/supabase';
import type { Session, User } from '@supabase/supabase-js';
import {
  type ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

type SignUpParam = {
  email: string;
  password: string;
  company: string;
  firstname: string;
  lastname: string;
};

type Context = {
  session: Session | null;
  user: User | null;
  signIn: (email: string, password: string) => Promise<unknown>;
  signOut: () => Promise<void>;
  signUp: (params: SignUpParam) => Promise<unknown>;
  supabase: ReturnType<typeof useSupabase>;
};

export const AuthContext = createContext<Context | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const supabase = useSupabase();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);

      if (session && event === 'TOKEN_REFRESHED') {
        const { data, error } = await supabase.auth.refreshSession();
        if (!error && data.session) {
          setSession(data.session);
          setUser(data.session.user);
        } else {
          await signOut();
        }
      }
    });

    return () => subscription.unsubscribe();
  }, [supabase]);

  async function signIn(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      throw error;
    }
    setUser(data.user);
    setSession(data.session);

    return data;
  }

  async function signOut() {
    await supabase.auth.signOut();
    setSession(null);
  }

  async function signUp({
    email,
    password,
    company,
    firstname,
    lastname,
  }: SignUpParam) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          firstname,
          lastname,
          company,
        },
      },
    });
    if (error) {
      throw new Error(error.message);
    }

    setUser(data.user);

    return data;
  }

  const value = { session, signIn, signOut, signUp, user, supabase };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
