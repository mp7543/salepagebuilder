import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import {
    isAdmin, getSystemStats, getAllUsers, getAllPages, getAllSubscriptions,
    getAllCustomDomains, getDailyViews, getTopPages, getTemplatePopularity,
    getAllSettings, setSetting, updateSubscription, deletePage, deleteUser,
    verifyCustomDomain, deleteCustomDomain,
} from '@/lib/db'
import { sendNotification, getRecentNotifications, checkTrialNotifications } from '@/lib/notifications'

async function checkAdmin() {
    const session = await getServerSession(authOptions)
    const email = session?.user?.email
    if (!email) return null

    // Allow first user as admin if no admin_emails configured
    const settings = getAllSettings()
    const adminEmails = settings.admin_emails || ''
    const envAdmins = process.env.ADMIN_EMAILS || ''
    const allAdmins = [adminEmails, envAdmins].join(',').split(',').map(e => e.trim()).filter(Boolean)

    // If no admins configured, allow logged-in user (first-time setup)
    if (allAdmins.length === 0 || isAdmin(email)) {
        return { email, id: (session.user as any).id }
    }
    return null
}

// GET /api/admin?action=stats|users|pages|subscriptions|domains|analytics|settings|notifications
export async function GET(req: NextRequest) {
    const admin = await checkAdmin()
    if (!admin) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

    const action = req.nextUrl.searchParams.get('action') || 'stats'

    switch (action) {
        case 'stats':
            return NextResponse.json(getSystemStats())
        case 'users':
            return NextResponse.json(getAllUsers())
        case 'pages':
            return NextResponse.json(getAllPages())
        case 'subscriptions':
            return NextResponse.json(getAllSubscriptions())
        case 'domains':
            return NextResponse.json(getAllCustomDomains())
        case 'analytics':
            return NextResponse.json({
                dailyViews: getDailyViews(30),
                topPages: getTopPages(10),
                templatePopularity: getTemplatePopularity(),
            })
        case 'settings':
            return NextResponse.json(getAllSettings())
        case 'notifications':
            return NextResponse.json(getRecentNotifications(50))
        default:
            return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
    }
}

// POST /api/admin
export async function POST(req: NextRequest) {
    const admin = await checkAdmin()
    if (!admin) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

    const body = await req.json()
    const { action } = body

    switch (action) {
        case 'update_subscription': {
            const { userId, tier } = body
            const result = updateSubscription(userId, tier)
            return NextResponse.json(result)
        }
        case 'delete_page': {
            deletePage(body.pageId)
            return NextResponse.json({ success: true })
        }
        case 'delete_user': {
            deleteUser(body.userId)
            return NextResponse.json({ success: true })
        }
        case 'verify_domain': {
            const result = verifyCustomDomain(body.domainId, true)
            return NextResponse.json(result)
        }
        case 'delete_domain': {
            deleteCustomDomain(body.domainId)
            return NextResponse.json({ success: true })
        }
        case 'update_settings': {
            const { settings } = body
            for (const [key, value] of Object.entries(settings)) {
                setSetting(key, value as string)
            }
            return NextResponse.json(getAllSettings())
        }
        case 'send_notification': {
            const { email, type, data } = body
            const result = sendNotification(email, type, data)
            return NextResponse.json({ sent: !!result })
        }
        case 'check_trials': {
            const users = getAllUsers().map((u: any) => ({ id: u.id, email: u.email }))
            const count = checkTrialNotifications(users)
            return NextResponse.json({ notified: count })
        }
        default:
            return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
    }
}
