import { NextRequest, NextResponse } from 'next/server'
import { getMockSession } from '@/lib/auth'
import { findPagesByUser, createPage } from '@/lib/db'

export async function GET() {
    const session = getMockSession()

    const pages = findPagesByUser(session.user.id)
    return NextResponse.json(pages)
}

export async function POST(req: NextRequest) {
    const session = getMockSession()

    const body = await req.json()
    const page = createPage({
        userId: session.user.id,
        title: body.title || 'เพจใหม่ของฉัน',
        template: body.template || 'professional',
        config: body.config ? JSON.stringify(body.config) : '{}',
        colorTheme: body.colorTheme ? JSON.stringify(body.colorTheme) : '{}',
    })

    return NextResponse.json(page, { status: 201 })
}
