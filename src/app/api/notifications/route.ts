import { NextResponse } from 'next/server'
import { getMockSession } from '@/lib/auth'
import { sendNotification, getRecentNotifications } from '@/lib/notifications'

export async function GET() {
    const session = getMockSession()
    if (!session.user.id) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const notifications = getRecentNotifications(20)
    return NextResponse.json(notifications)
}

export async function POST(req: Request) {
    const session = getMockSession()

    const { type, data } = await req.json()
    const email = session.user.email || ''
    const result = sendNotification(email, type, data)

    return NextResponse.json({ sent: !!result })
}
