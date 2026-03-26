'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function LoginPage() {
    const router = useRouter()

    // No login required — redirect to dashboard
    useEffect(() => {
        router.replace('/dashboard')
    }, [router])

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="flex flex-col items-center gap-4">
                <div className="w-10 h-10 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
                <p className="text-sm text-gray-400">กำลังเข้าสู่ระบบ...</p>
            </div>
        </div>
    )
}
