'use client';

import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import type React from 'react';
import { useEffect } from 'react';

export default function AuthLayout({
    children,
}: { children: React.ReactNode }) {
    const router = useRouter();
    const auth = useAuth();

    useEffect(() => {
        if (auth?.session) {
            router.push('/');
        }
    }, [auth?.session, router]);

    return (
        <div className='flex h-screen w-screen items-center justify-center bg-background' >
            {children}
        </div>
    );
}
