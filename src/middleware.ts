import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    const hostname = request.headers.get('host') || ''
    const url = request.nextUrl

    // Skip internal paths
    if (
        url.pathname.startsWith('/api') ||
        url.pathname.startsWith('/_next') ||
        url.pathname.startsWith('/login') ||
        url.pathname.startsWith('/dashboard') ||
        url.pathname.startsWith('/p/') ||
        url.pathname === '/' ||
        url.pathname.includes('.')
    ) {
        return NextResponse.next()
    }

    // Check for custom domain (not localhost or main domain)
    const isCustomDomain = !hostname.includes('localhost') &&
        !hostname.includes('salepage') &&
        !hostname.includes('vercel')

    if (isCustomDomain) {
        // Rewrite to custom domain handler
        url.pathname = `/api/custom-domain`
        url.searchParams.set('domain', hostname)
        url.searchParams.set('path', request.nextUrl.pathname)
        return NextResponse.rewrite(url)
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
