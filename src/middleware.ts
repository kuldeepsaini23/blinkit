import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { logout } from './services/operations/authApi';
 
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isPublicPath = path === '/login' || path === '/verify-email';
  const signupPath = path === '/signup';


  const token = request.cookies.get("token")?.value || "";
  const verified = request.cookies.get("verified")?.value === "true" ? true : false;
  // console.log(signupPath, token, verified);

  if(isPublicPath && token) {
    return NextResponse.redirect(new URL("/",request.nextUrl));
  }

  if(!isPublicPath && !token) {
    return NextResponse.redirect(new URL("/login",request.nextUrl));
  }

  if(signupPath && token && verified) {
    return NextResponse.redirect(new URL("/",request.nextUrl));
  }
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/',
    '/profile',
    '/profile/:path*',
    '/login',
    '/signup',
    '/verify-email',
  ]
}