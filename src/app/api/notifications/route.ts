import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { sendNotification, getRecentNotifications } from '@/lib/notifications'

export async function GET() {
    const session = await getServerSession(authOptions)
    if (!(session?.user as any)?.id) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const notifications = getRecentNotifications(20)
    return NextResponse.json(notifications)
}

export async function POST(req: Request) {
    const session = await getServerSession(authOptions)
    if (!(session?.user as any)?.id) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { type, data } = await req.json()
    const email = session!.user?.email || ''
    const result = sendNotification(email, type, data)

    return NextResponse.json({ sent: !!result })
}
