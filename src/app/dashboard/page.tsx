'use client'

import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Plus, Settings, Eye, Trash2, ExternalLink, Crown, LogOut, LayoutGrid } from 'lucide-react'

interface PageData {
    id: string
    slug: string
    title: string
    template: string
    isPublished: boolean
    updatedAt: string
}

interface SubData {
    tier: string
    endDate: string
    isActive: boolean
}

export default function DashboardPage() {
    const { data: session, status } = useSession()
    const router = useRouter()
    const [pages, setPages] = useState<PageData[]>([])
    const [subscription, setSubscription] = useState<SubData | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (status === 'unauthenticated') router.push('/login')
    }, [status, router])

    useEffect(() => {
        if (session) {
            fetchData()
        }
    }, [session])

    const fetchData = async () => {
        try {
            const [pagesRes, subRes] = await Promise.all([
                fetch('/api/pages'),
                fetch('/api/subscription'),
            ])
            if (pagesRes.ok) setPages(await pagesRes.json())
            if (subRes.ok) setSubscription(await subRes.json())
        } catch (e) {
            console.error(e)
        } finally {
            setLoading(false)
        }
    }

    const createPage = async () => {
        const res = await fetch('/api/pages', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title: 'เพจใหม่ของฉัน' }),
        })
        if (res.ok) {
            const page = await res.json()
            router.push(`/dashboard/builder/${page.id}`)
        }
    }

    const deletePage = async (id: string) => {
        if (!confirm('ลบเพจนี้?')) return
        await fetch(`/api/pages/${id}`, { method: 'DELETE' })
        setPages(pages.filter(p => p.id !== id))
    }

    const daysLeft = subscription?.tier === 'free' && subscription?.endDate
        ? Math.max(0, Math.ceil((new Date(subscription.endDate).getTime() - Date.now()) / 86400000))
        : null

    const isExpired = subscription?.tier === 'free' && daysLeft !== null && daysLeft <= 0

    if (status === 'loading' || loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
            </div>
        )
    }

    return (
        <div className="min-h-screen">
            {/* Header */}
            <header className="glass sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center text-white font-bold text-sm">S</div>
                        <span className="text-lg font-bold">Dashboard</span>
                    </div>
                    <div className="flex items-center gap-3">
                        {session?.user?.image && (
                            <img src={session.user.image} alt="" className="w-8 h-8 rounded-full" />
                        )}
                        <span className="text-sm text-[var(--muted)] hidden sm:block">{session?.user?.name}</span>
                        <button onClick={() => signOut({ callbackUrl: '/' })} className="p-2 rounded-lg hover:bg-white/5 text-[var(--muted)] hover:text-white transition-all" title="ออกจากระบบ">
                            <LogOut size={18} />
                        </button>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-6 py-8">
                {/* Subscription Status */}
                <div className={`p-6 rounded-2xl mb-8 ${isExpired ? 'bg-red-500/10 border border-red-500/30' : subscription?.tier === 'pro' ? 'bg-purple-500/10 border border-purple-500/30' : subscription?.tier === 'premium' ? 'bg-amber-500/10 border border-amber-500/30' : 'bg-[var(--card)] border border-white/10'}`}>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <div>
                            <div className="flex items-center gap-2 mb-1">
                                <Crown size={18} className={subscription?.tier === 'premium' ? 'text-amber-400' : subscription?.tier === 'pro' ? 'text-purple-400' : 'text-gray-400'} />
                                <span className="font-semibold capitalize">{subscription?.tier || 'Free'}</span>
                                {isExpired && <span className="text-xs px-2 py-0.5 rounded-full bg-red-500 text-white">หมดอายุ</span>}
                            </div>
                            {daysLeft !== null && !isExpired && (
                                <p className="text-sm text-[var(--muted)]">เหลือ {daysLeft} วัน</p>
                            )}
                            {isExpired && (
                                <p className="text-sm text-red-400">แพ็กเกจหมดอายุแล้ว กรุณาอัพเกรด</p>
                            )}
                        </div>
                        {(subscription?.tier === 'free') && (
                            <button onClick={() => router.push('/dashboard/subscription')} className="px-5 py-2.5 rounded-xl bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white font-medium transition-all text-sm">
                                อัพเกรด
                            </button>
                        )}
                    </div>
                </div>

                {/* Pages */}
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold flex items-center gap-2">
                        <LayoutGrid size={24} /> เพจของฉัน
                    </h2>
                    <button
                        onClick={createPage}
                        disabled={isExpired}
                        className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[var(--primary)] hover:bg-[var(--primary-hover)] disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium transition-all text-sm"
                    >
                        <Plus size={16} /> สร้างเพจใหม่
                    </button>
                </div>

                {pages.length === 0 ? (
                    <div className="text-center py-20 rounded-2xl border border-dashed border-white/10">
                        <div className="text-6xl mb-4">🚀</div>
                        <h3 className="text-xl font-semibold mb-2">ยังไม่มีเพจ</h3>
                        <p className="text-[var(--muted)] mb-6">เริ่มสร้างเซลเพจแรกของคุณเลย!</p>
                        <button onClick={createPage} disabled={isExpired} className="px-6 py-3 rounded-xl bg-[var(--primary)] text-white font-medium disabled:opacity-50">
                            <Plus size={16} className="inline mr-2" /> สร้างเพจแรก
                        </button>
                    </div>
                ) : (
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {pages.map(page => (
                            <div key={page.id} className="p-6 rounded-2xl bg-[var(--card)] border border-white/5 hover:border-white/10 transition-all group">
                                <div className="flex items-start justify-between mb-4">
                                    <div>
                                        <h3 className="font-semibold mb-1">{page.title}</h3>
                                        <p className="text-xs text-[var(--muted)] capitalize">{page.template}</p>
                                    </div>
                                    <span className={`text-xs px-2 py-1 rounded-full ${page.isPublished ? 'bg-green-500/10 text-green-400' : 'bg-yellow-500/10 text-yellow-400'}`}>
                                        {page.isPublished ? 'เผยแพร่' : 'แบบร่าง'}
                                    </span>
                                </div>
                                <p className="text-xs text-[var(--muted)] mb-4">
                                    แก้ไขล่าสุด: {new Date(page.updatedAt).toLocaleDateString('th-TH')}
                                </p>
                                <div className="flex items-center gap-2">
                                    <button onClick={() => router.push(`/dashboard/builder/${page.id}`)} className="flex-1 py-2 rounded-lg bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white text-sm font-medium transition-all flex items-center justify-center gap-1">
                                        <Settings size={14} /> แก้ไข
                                    </button>
                                    {page.isPublished && (
                                        <a href={`/p/${page.slug}`} target="_blank" className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-[var(--muted)] hover:text-white transition-all">
                                            <ExternalLink size={14} />
                                        </a>
                                    )}
                                    <button onClick={() => deletePage(page.id)} className="p-2 rounded-lg bg-white/5 hover:bg-red-500/10 text-[var(--muted)] hover:text-red-400 transition-all">
                                        <Trash2 size={14} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    )
}
