import { NextRequest, NextResponse } from 'next/server'
import { getMockSession } from '@/lib/auth'
import { findPageByIdAndUser, updatePage, deletePage } from '@/lib/db'
import { sendNotification } from '@/lib/notifications'

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const session = getMockSession()

    const { id } = await params
    const page = findPageByIdAndUser(id, session.user.id)
    if (!page) {
        return NextResponse.json({ error: 'Not found' }, { status: 404 })
    }
    return NextResponse.json(page)
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const session = getMockSession()

    const { id } = await params
    const page = findPageByIdAndUser(id, session.user.id)
    if (!page) {
        return NextResponse.json({ error: 'Not found' }, { status: 404 })
    }

    const body = await req.json()
    const wasPublished = !!page.isPublished
    const updated = updatePage(id, {
        title: body.title,
        template: body.template,
        config: body.config ? JSON.stringify(body.config) : undefined,
        colorTheme: body.colorTheme ? JSON.stringify(body.colorTheme) : undefined,
        isPublished: body.isPublished,
        slug: body.slug,
    })

    // Send notification on first publish
    if (body.isPublished && !wasPublished && session.user.email) {
        const baseUrl = process.env.NEXTAUTH_URL || process.env.RAILWAY_PUBLIC_DOMAIN ? `https://${process.env.RAILWAY_PUBLIC_DOMAIN}` : 'http://localhost:3000'
        sendNotification(session.user.email, 'publish_success', {
            pageTitle: body.title || page.title || 'เพจใหม่',
            pageUrl: `${baseUrl}/p/${updated?.slug || page.slug}`,
        })
    }

    return NextResponse.json(updated)
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const session = getMockSession()

    const { id } = await params
    const page = findPageByIdAndUser(id, session.user.id)
    if (!page) {
        return NextResponse.json({ error: 'Not found' }, { status: 404 })
    }

    deletePage(id)
    return NextResponse.json({ success: true })
}
