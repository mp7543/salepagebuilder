import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { findPageByIdAndUser, getPageAnalytics } from '@/lib/db'

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

    const analytics = getPageAnalytics(id)
    return NextResponse.json(analytics)
}
