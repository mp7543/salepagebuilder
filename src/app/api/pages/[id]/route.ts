import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { findPageByIdAndUser, updatePage, deletePage } from '@/lib/db'

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await params
    const page = findPageByIdAndUser(id, (session.user as any).id)
    if (!page) {
        return NextResponse.json({ error: 'Not found' }, { status: 404 })
    }
    return NextResponse.json(page)
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await params
    const page = findPageByIdAndUser(id, (session.user as any).id)
    if (!page) {
        return NextResponse.json({ error: 'Not found' }, { status: 404 })
    }

    const body = await req.json()
    const updated = updatePage(id, {
        title: body.title,
        template: body.template,
        config: body.config ? JSON.stringify(body.config) : undefined,
        colorTheme: body.colorTheme ? JSON.stringify(body.colorTheme) : undefined,
        isPublished: body.isPublished,
        slug: body.slug,
    })

    return NextResponse.json(updated)
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await params
    const page = findPageByIdAndUser(id, (session.user as any).id)
    if (!page) {
        return NextResponse.json({ error: 'Not found' }, { status: 404 })
    }

    deletePage(id)
    return NextResponse.json({ success: true })
}
