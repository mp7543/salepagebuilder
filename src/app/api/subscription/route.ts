import { NextRequest, NextResponse } from 'next/server'
import { getMockSession } from '@/lib/auth'
import { findSubscription, createSubscription, updateSubscription } from '@/lib/db'
import { processMockPayment } from '@/lib/mock-payment'
import { SubscriptionTier } from '@/lib/types'

export async function GET() {
    const session = getMockSession()
    const userId = session.user.id

    let subscription = findSubscription(userId)
    if (!subscription) {
        subscription = createSubscription(userId, 'free', 14)
    }
    return NextResponse.json(subscription)
}

export async function POST(req: NextRequest) {
    const session = getMockSession()

    const { tier } = await req.json() as { tier: SubscriptionTier }
    if (!['pro', 'premium'].includes(tier)) {
        return NextResponse.json({ error: 'Invalid tier' }, { status: 400 })
    }

    const paymentResult = await processMockPayment(tier)
    if (paymentResult.success) {
        const subscription = updateSubscription(session.user.id, tier)
        return NextResponse.json({ ...paymentResult, subscription })
    }

    return NextResponse.json({ error: 'Payment failed' }, { status: 500 })
}
