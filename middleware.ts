import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { sessionOptions } from './lib/session';

export async function middleware(request: NextRequest) {
  const isLoginPage = request.nextUrl.pathname === '/login';

  // Check if session cookie exists
  const sessionCookie = request.cookies.get(sessionOptions.cookieName);
  const isAuthenticated = !!sessionCookie;

  if (!isAuthenticated && !isLoginPage) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (isAuthenticated && isLoginPage) {
    return NextResponse.redirect(new URL('/rankings', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
