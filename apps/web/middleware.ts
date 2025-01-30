import type { NextRequest } from 'next/server';
import { updateSession } from './utils/supabase/middleware';

export async function middleware(request: NextRequest) {
  return await updateSession(request);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for quelle che iniziano con:
     * - _next/static (file statici)
     * - _next/image (file per l'ottimizzazione immagini)
     * - favicon.ico
     * Puoi modificare lo pattern come preferisci.
     */
    '/((?!_next/static|_next/image|favicon.ico|icon(?:\\?.*)?|.*\\.(?:ico|svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
