import { NextRequest, NextResponse } from 'next/server'
import { recordPageView, findPageById } from '@/lib/db'

export async function POST(req: NextRequest) {
    try {
        const { pageId } = await req.json()
        if (!pageId) return NextResponse.json({ error: 'Missing pageId' }, { status: 400 })

        // Verify page exists and is published
        const page = findPageById(pageId)
        if (!page || !page.isPublished) {
            return NextResponse.json({ error: 'Page not found' }, { status: 404 })
        }

        // Extract IP and User-Agent
        const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
            || req.headers.get('x-real-ip')
            || 'unknown'
        const userAgent = req.headers.get('user-agent') || ''
        const referrer = req.headers.get('referer') || ''

        const result = recordPageView(pageId, ip, userAgent, referrer)

        return NextResponse.json({
            tracked: !!result,
            deduplicated: !result,
        })
    } catch {
        return NextResponse.json({ error: 'Internal error' }, { status: 500 })
    }
}
