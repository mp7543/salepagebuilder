import { NextRequest, NextResponse } from 'next/server'
import { getMockSession } from '@/lib/auth'
import { findPageByIdAndUser, getPageAnalytics } from '@/lib/db'

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const session = getMockSession()

    const { id } = await params
    const page = findPageByIdAndUser(id, session.user.id)
    if (!page) {
        return NextResponse.json({ error: 'Not found' }, { status: 404 })
    }

    const analytics = getPageAnalytics(id)
    return NextResponse.json(analytics)
}
