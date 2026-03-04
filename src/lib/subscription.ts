import { findSubscription, createSubscription, updateSubscription } from './db'
import { SubscriptionTier } from './types'

export async function getUserSubscription(userId: string) {
    let subscription = findSubscription(userId)
    if (!subscription) {
        subscription = createSubscription(userId, 'free', 14)
    }
    return subscription
}

export function isSubscriptionExpired(endDate: string, tier: string): boolean {
    if (tier !== 'free') return false
    return new Date() > new Date(endDate)
}

export function canUseTemplate(tier: SubscriptionTier, template: string): boolean {
    if (tier === 'pro' || tier === 'premium') return true
    return template === 'professional'
}

export function canUseCustomDomain(tier: SubscriptionTier): boolean {
    return tier === 'premium'
}

export async function upgradeTier(userId: string, newTier: SubscriptionTier) {
    return updateSubscription(userId, newTier)
}
