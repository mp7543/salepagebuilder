'use client'

import { useEffect, useRef } from 'react'

export function PageTracker({ pageId }: { pageId: string }) {
    const tracked = useRef(false)

    useEffect(() => {
        if (tracked.current) return
        tracked.current = true

        try {
            // Use sendBeacon for non-blocking tracking, fallback to fetch
            const data = JSON.stringify({ pageId })
            if (typeof navigator !== 'undefined' && navigator.sendBeacon) {
                const blob = new Blob([data], { type: 'application/json' })
                navigator.sendBeacon('/api/track', blob)
            } else {
                fetch('/api/track', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: data,
                    keepalive: true,
                }).catch(() => { })
            }
        } catch { }
    }, [pageId])

    return null
}
