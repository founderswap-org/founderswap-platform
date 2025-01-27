import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import type React from 'react';

export default async function AuthLayout({
    children,
}: { children: React.ReactNode }) {
    const cookieStore = await cookies();
    const session = cookieStore.get('session');

    // Se l'utente è già autenticato, reindirizza alla dashboard
    if (session) {
        return redirect('/');
    }

    return (
        <div>
            {children}
        </div>
    );
}
