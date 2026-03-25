import { findSubscription } from './db'

// Email notification types
export type NotificationType = 'trial_expiring' | 'trial_expired' | 'publish_success' | 'welcome'

interface EmailNotification {
    to: string
    subject: string
    body: string
    type: NotificationType
    sentAt: string
}

// In production, replace this with a real email service (Resend, SendGrid, etc.)
// For now, logs to console and stores in memory for the dashboard
const sentNotifications: EmailNotification[] = []

export function sendNotification(to: string, type: NotificationType, data?: Record<string, string>) {
    const template = getTemplate(type, data)
    if (!template) return

    const notification: EmailNotification = {
        to,
        subject: template.subject,
        body: template.body,
        type,
        sentAt: new Date().toISOString(),
    }

    sentNotifications.push(notification)

    // In production, send via email service here:
    // await resend.emails.send({ from: 'noreply@salepage.app', to, subject, html: body })
    console.log(`📧 [EMAIL] To: ${to} | Subject: ${template.subject}`)

    return notification
}

export function getRecentNotifications(limit: number = 10): EmailNotification[] {
    return sentNotifications.slice(-limit).reverse()
}

function getTemplate(type: NotificationType, data?: Record<string, string>) {
    switch (type) {
        case 'welcome':
            return {
                subject: 'ยินดีต้อนรับสู่ SalesPage Builder! 🎉',
                body: `
                    <h2>ยินดีต้อนรับ ${data?.name || ''}!</h2>
                    <p>ขอบคุณที่สมัครใช้งาน SalesPage Builder</p>
                    <p>คุณได้รับ Free Trial 14 วัน เริ่มสร้างเซลเพจแรกได้เลย!</p>
                    <a href="${data?.url || ''}/dashboard">เริ่มสร้างเพจ →</a>
                `,
            }
        case 'trial_expiring':
            return {
                subject: `⏰ Free Trial เหลืออีก ${data?.daysLeft || '3'} วัน — อัพเกรดเพื่อใช้ต่อ`,
                body: `
                    <h2>Free Trial ใกล้หมดแล้ว!</h2>
                    <p>คุณเหลือเวลาอีก ${data?.daysLeft || '3'} วัน ก่อนที่ Free Trial จะสิ้นสุด</p>
                    <p>อัพเกรดเป็น Pro หรือ Premium เพื่อใช้งานต่อไม่มีสะดุด</p>
                    <a href="${data?.url || ''}/dashboard/subscription">ดูแพ็กเกจ →</a>
                `,
            }
        case 'trial_expired':
            return {
                subject: '❌ Free Trial หมดแล้ว — อัพเกรดวันนี้',
                body: `
                    <h2>Free Trial สิ้นสุดแล้ว</h2>
                    <p>เพจของคุณยังอยู่ แต่ไม่สามารถแก้ไขหรือเผยแพร่ได้</p>
                    <p>อัพเกรดตอนนี้เพื่อกลับมาใช้งานได้ทันที</p>
                    <a href="${data?.url || ''}/dashboard/subscription">อัพเกรดเลย →</a>
                `,
            }
        case 'publish_success':
            return {
                subject: `🎉 เผยแพร่สำเร็จ — ${data?.pageTitle || 'เพจของคุณ'}`,
                body: `
                    <h2>เพจของคุณเผยแพร่แล้ว! 🎉</h2>
                    <p><strong>${data?.pageTitle || 'เพจ'}</strong> พร้อมให้ผู้คนเข้าชมแล้ว</p>
                    <p>ลิงก์: <a href="${data?.pageUrl || '#'}">${data?.pageUrl || '#'}</a></p>
                    <p>แชร์ลิงก์นี้ให้ลูกค้าของคุณได้เลย!</p>
                `,
            }
        default:
            return null
    }
}

// Check if any users have trials expiring soon and send notifications
export function checkTrialNotifications(users: { id: string; email: string }[]) {
    let count = 0
    for (const user of users) {
        const sub = findSubscription(user.id)
        if (!sub || sub.tier !== 'free') continue

        const daysLeft = Math.max(0, Math.ceil(
            (new Date(sub.endDate).getTime() - Date.now()) / 86400000
        ))

        if (daysLeft === 3 || daysLeft === 1) {
            sendNotification(user.email, 'trial_expiring', {
                daysLeft: String(daysLeft),
                url: process.env.NEXTAUTH_URL || 'http://localhost:3000',
            })
            count++
        } else if (daysLeft === 0) {
            sendNotification(user.email, 'trial_expired', {
                url: process.env.NEXTAUTH_URL || 'http://localhost:3000',
            })
            count++
        }
    }
    return count
}
