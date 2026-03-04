import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { findPagesByUser, createPage } from '@/lib/db'

export async function GET() {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const pages = findPagesByUser((session.user as any).id)
    return NextResponse.json(pages)
}

export async function POST(req: NextRequest) {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()
    const page = createPage({
        userId: (session.user as any).id,
        title: body.title || 'เพจใหม่ของฉัน',
        template: body.template || 'professional',
        config: body.config ? JSON.stringify(body.config) : '{}',
        colorTheme: body.colorTheme ? JSON.stringify(body.colorTheme) : '{}',
    })

    return NextResponse.json(page, { status: 201 })
}
