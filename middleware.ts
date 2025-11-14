// middleware.ts (root level)
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('auth_token')?.value
  const { pathname } = request.nextUrl

  console.log('Middleware:', { pathname, hasToken: !!token })

  // Public paths that don't require authentication
  const publicPaths = ['/', '/login', '/register']
  const isPublicPath = publicPaths.includes(pathname)
  
  // API routes should be handled separately
  const isApiRoute = pathname.startsWith('/api/')
  
  // Static and public assets
  const isPublicAsset = pathname.startsWith('/_next') || 
                        pathname.startsWith('/static') ||
                        pathname.match(/\.(svg|png|jpg|jpeg|gif|webp|ico)$/)

  // Don't process API routes, public assets
  if (isApiRoute || isPublicAsset) {
    return NextResponse.next()
  }

  // ALLOW public paths even with token (so we can access login to re-login)
  if (isPublicPath) {
    // Only redirect to dashboard if on login/register page with valid token
    if (token && (pathname === '/login' || pathname === '/register')) {
      console.log('Middleware: Has token, redirecting from login to dashboard')
      return NextResponse.redirect(new URL('/dashboard/citizen', request.url))
    }
    console.log('Middleware: Public path, allowing access')
    return NextResponse.next()
  }

  // If accessing protected route without token, redirect to login
  if (!token) {
    console.log('Middleware: No token, redirecting to login')
    const loginUrl = new URL('/login', request.url)
    loginUrl.searchParams.set('redirect', pathname)
    return NextResponse.redirect(loginUrl)
  }

  console.log('Middleware: Allowing access to protected route')
  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder files
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}