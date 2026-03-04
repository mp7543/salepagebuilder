import { SubscriptionTier } from './types'

export interface MockPaymentResult {
    success: boolean
    message: string
    tier: SubscriptionTier
}

export async function processMockPayment(tier: SubscriptionTier): Promise<MockPaymentResult> {
    // Simulate payment processing delay
    await new Promise(resolve => setTimeout(resolve, 1500))

    return {
        success: true,
        message: `อัพเกรดเป็น ${tier === 'pro' ? 'Pro' : 'Premium'} สำเร็จ!`,
        tier,
    }
}

export function getTierPrice(tier: SubscriptionTier): number {
    switch (tier) {
        case 'free': return 0
        case 'pro': return 199
        case 'premium': return 299
        default: return 0
    }
}

export function getTierFeatures(tier: SubscriptionTier): string[] {
    switch (tier) {
        case 'free':
            return [
                'ใช้งานได้ 1 เทมเพลท',
                'ทดลองใช้ 14 วัน',
                'Hosting subdomain',
                'แก้ไขข้อมูลได้',
            ]
        case 'pro':
            return [
                'ใช้งานได้ทุกเทมเพลท (3 แบบ)',
                'ไม่จำกัดระยะเวลา',
                'Hosting subdomain',
                'แก้ไขข้อมูลได้',
                'Brand Color Presets',
                'Content Presets',
            ]
        case 'premium':
            return [
                'ทุกอย่างของ Pro',
                'Custom Domain',
                'Priority Support',
                'ไม่มีลายน้ำ',
            ]
        default:
            return []
    }
}
