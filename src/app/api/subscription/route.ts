import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { findSubscription, createSubscription, updateSubscription } from '@/lib/db'
import { processMockPayment } from '@/lib/mock-payment'
import { SubscriptionTier } from '@/lib/types'

export async function GET() {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const userId = (session.user as any).id
    if (!userId) {
        // User might not be in DB yet (stale session) — try to create
        const email = session.user?.email
        if (email) {
            const { findUserByEmail, createUser } = await import('@/lib/db')
            let dbUser = findUserByEmail(email)
            if (!dbUser) {
                dbUser = createUser({ email, name: session.user?.name || '', image: session.user?.image || '' })
            }
            let subscription = findSubscription(dbUser.id)
            if (!subscription) subscription = createSubscription(dbUser.id, 'free', 14)
            return NextResponse.json(subscription)
        }
        return NextResponse.json({ tier: 'free', isActive: true, endDate: new Date(Date.now() + 14 * 86400000).toISOString() })
    }
    let subscription = findSubscription(userId)
    if (!subscription) {
        subscription = createSubscription(userId, 'free', 14)
    }
    return NextResponse.json(subscription)
}

export async function POST(req: NextRequest) {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { tier } = await req.json() as { tier: SubscriptionTier }
    if (!['pro', 'premium'].includes(tier)) {
        return NextResponse.json({ error: 'Invalid tier' }, { status: 400 })
    }

    const paymentResult = await processMockPayment(tier)
    if (paymentResult.success) {
        const subscription = updateSubscription((session.user as any).id, tier)
        return NextResponse.json({ ...paymentResult, subscription })
    }

    return NextResponse.json({ error: 'Payment failed' }, { status: 500 })
}
