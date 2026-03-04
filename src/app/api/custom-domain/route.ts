import { NextRequest, NextResponse } from 'next/server'
import { findCustomDomainByDomain } from '@/lib/db'

export async function GET(req: NextRequest) {
    const domain = req.nextUrl.searchParams.get('domain')

    if (!domain) {
        return NextResponse.json({ error: 'Domain not specified' }, { status: 400 })
    }

    const customDomain = findCustomDomainByDomain(domain)

    if (!customDomain || !customDomain.isVerified || !customDomain.page?.isPublished) {
        return NextResponse.json({ error: 'Domain not found or not verified' }, { status: 404 })
    }

    return NextResponse.redirect(new URL(`/p/${customDomain.page.slug}`, req.url))
}
