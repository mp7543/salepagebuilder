import { NextRequest, NextResponse } from 'next/server'
import { getMockSession } from '@/lib/auth'
import { findCustomDomainByDomain, findCustomDomainsByUser, createCustomDomain, deleteCustomDomain, findPageByIdAndUser } from '@/lib/db'

export async function GET(req: NextRequest) {
    const domain = req.nextUrl.searchParams.get('domain')

    // If domain param → lookup for middleware redirect
    if (domain) {
        const customDomain = findCustomDomainByDomain(domain)
        if (!customDomain || !customDomain.isVerified || !customDomain.page?.isPublished) {
            return NextResponse.json({ error: 'Domain not found or not verified' }, { status: 404 })
        }
        return NextResponse.redirect(new URL(`/p/${customDomain.page.slug}`, req.url))
    }

    // Otherwise → list user's custom domains
    const session = getMockSession()
    const domains = findCustomDomainsByUser(session.user.id)
    return NextResponse.json(domains)
}

export async function POST(req: NextRequest) {
    const session = getMockSession()

    const { pageId, domain } = await req.json()
    if (!pageId || !domain) return NextResponse.json({ error: 'Missing fields' }, { status: 400 })

    // Verify ownership
    const page = findPageByIdAndUser(pageId, session.user.id)
    if (!page) return NextResponse.json({ error: 'Page not found' }, { status: 404 })

    try {
        const cd = createCustomDomain(pageId, domain.toLowerCase().trim())
        return NextResponse.json(cd, { status: 201 })
    } catch (e: any) {
        return NextResponse.json({ error: 'Domain already in use' }, { status: 409 })
    }
}

export async function DELETE(req: NextRequest) {
    const { id } = await req.json()
    if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 })

    deleteCustomDomain(id)
    return NextResponse.json({ ok: true })
}
