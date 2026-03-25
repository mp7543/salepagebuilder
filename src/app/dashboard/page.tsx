'use client'

import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Plus, Settings, Trash2, ExternalLink, Crown, LogOut, LayoutGrid, Zap, Star, ArrowRight, Globe, FileText, Clock, Lock, Eye, RefreshCw, Loader2, Info, Shield } from 'lucide-react'

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

interface CustomDomainData {
    id: string
    pageId: string
    domain: string
    isVerified: boolean
    pageTitle?: string
    pageSlug?: string
}

const TEMPLATE_ICONS: Record<string, string> = {
    professional: '🏢',
    premium: '✨',
    minimal: '🍃',
}

const TEMPLATE_LABELS: Record<string, string> = {
    professional: 'Professional',
    premium: 'Premium',
    minimal: 'Minimal',
}

const TEMPLATE_COLORS: Record<string, { primary: string; bg: string; accent: string }> = {
    professional: { primary: '#10b981', bg: 'rgba(16,185,129,0.08)', accent: '#34d399' },
    premium: { primary: '#3b82f6', bg: 'rgba(59,130,246,0.08)', accent: '#60a5fa' },
    minimal: { primary: '#6366f1', bg: 'rgba(99,102,241,0.08)', accent: '#818cf8' },
}

export default function DashboardPage() {
    const { data: session, status } = useSession()
    const router = useRouter()
    const [pages, setPages] = useState<PageData[]>([])
    const [subscription, setSubscription] = useState<SubData | null>(null)
    const [loading, setLoading] = useState(true)
    const [creating, setCreating] = useState(false)
    const [customDomains, setCustomDomains] = useState<CustomDomainData[]>([])
    const [newDomain, setNewDomain] = useState('')
    const [newDomainPageId, setNewDomainPageId] = useState('')
    const [domainAdding, setDomainAdding] = useState(false)
    const [viewCounts, setViewCounts] = useState<Record<string, number>>({})
    const [verifyingDomain, setVerifyingDomain] = useState<string | null>(null)
    const [dnsMessage, setDnsMessage] = useState<string | null>(null)

    useEffect(() => {
        if (status === 'unauthenticated') router.push('/login')
    }, [status, router])

    useEffect(() => {
        if (session) fetchData()
    }, [session])

    const fetchData = async () => {
        try {
            const [pagesRes, subRes, domainsRes] = await Promise.all([
                fetch('/api/pages'),
                fetch('/api/subscription'),
                fetch('/api/custom-domain'),
            ])
            let pagesData: PageData[] = []
            if (pagesRes.ok) {
                pagesData = await pagesRes.json()
                setPages(pagesData)
            }
            if (subRes.ok) setSubscription(await subRes.json())
            if (domainsRes.ok) setCustomDomains(await domainsRes.json())

            // Fetch view counts for all pages
            if (pagesData.length > 0) {
                const counts: Record<string, number> = {}
                await Promise.all(pagesData.map(async (p) => {
                    try {
                        const res = await fetch(`/api/pages/${p.id}/analytics`)
                        if (res.ok) {
                            const data = await res.json()
                            counts[p.id] = data.total || 0
                        }
                    } catch { }
                }))
                setViewCounts(counts)
            }
        } catch (e) {
            console.error(e)
        } finally {
            setLoading(false)
        }
    }

    const createPage = async () => {
        setCreating(true)
        const res = await fetch('/api/pages', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title: 'เพจใหม่ของฉัน' }),
        })
        if (res.ok) {
            const page = await res.json()
            router.push(`/dashboard/builder/${page.id}`)
        }
        setCreating(false)
    }

    const deletePage = async (id: string) => {
        if (!confirm('ลบเพจนี้?')) return
        await fetch(`/api/pages/${id}`, { method: 'DELETE' })
        setPages(pages.filter(p => p.id !== id))
    }

    const addCustomDomain = async () => {
        if (!newDomain || !newDomainPageId) return
        setDomainAdding(true)
        try {
            const res = await fetch('/api/custom-domain', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ pageId: newDomainPageId, domain: newDomain }),
            })
            if (res.ok) {
                const cd = await res.json()
                setCustomDomains([...customDomains, cd])
                setNewDomain('')
                setNewDomainPageId('')
            } else {
                const err = await res.json()
                alert(err.error || 'ไม่สามารถเพิ่มโดเมนได้')
            }
        } catch { alert('เกิดข้อผิดพลาด') }
        setDomainAdding(false)
    }

    const removeCustomDomain = async (id: string) => {
        if (!confirm('ลบ Custom Domain นี้?')) return
        await fetch('/api/custom-domain', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id }),
        })
        setCustomDomains(customDomains.filter(d => d.id !== id))
    }

    const daysLeft = subscription?.tier === 'free' && subscription?.endDate
        ? Math.max(0, Math.ceil((new Date(subscription.endDate).getTime() - Date.now()) / 86400000))
        : null

    const isExpired = subscription?.tier === 'free' && daysLeft !== null && daysLeft <= 0
    const isPremium = subscription?.tier === 'premium'

    const tierIcon = subscription?.tier === 'premium'
        ? <Crown size={16} className="text-amber-400" />
        : subscription?.tier === 'pro'
            ? <Star size={16} className="text-purple-400" />
            : <Zap size={16} className="text-[var(--muted)]" />

    if (status === 'loading' || loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-10 h-10 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
                    <p className="text-sm text-[var(--muted)]">กำลังโหลด...</p>
                </div>
            </div>
        )
    }

    const publishedCount = pages.filter(p => p.isPublished).length
    const publishedPages = pages.filter(p => p.isPublished)

    return (
        <div className="min-h-screen">
            {/* ===== HEADER ===== */}
            <header className="glass sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg gradient-bg-primary flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-purple-500/30">S</div>
                        <div>
                            <span className="text-base font-bold tracking-tight">Sale Page <span className="gradient-text">Builder</span></span>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <button onClick={() => router.push('/')} className="hidden sm:block text-sm text-[var(--muted)] hover:text-white transition-colors px-3 py-1.5">
                            หน้าหลัก
                        </button>
                        <button onClick={() => router.push('/admin')} className="hidden sm:flex items-center gap-1 text-sm text-[var(--muted)] hover:text-purple-400 transition-colors px-3 py-1.5" title="Admin Panel">
                            <Shield size={14} /> Admin
                        </button>
                        {session?.user?.image && (
                            <img src={session.user.image} alt="" className="w-8 h-8 rounded-full ring-2 ring-white/10" />
                        )}
                        <div className="hidden sm:block">
                            <p className="text-sm font-medium leading-tight">{session?.user?.name}</p>
                            <p className="text-[10px] text-[var(--muted)]">{session?.user?.email}</p>
                        </div>
                        <button onClick={() => signOut({ callbackUrl: '/' })} className="p-2 rounded-lg btn-ghost text-[var(--muted)] hover:text-white transition-all" title="ออกจากระบบ">
                            <LogOut size={17} />
                        </button>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">

                {/* ===== SUBSCRIPTION BANNER ===== */}
                {isExpired ? (
                    <div className="p-5 rounded-2xl mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                        style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.25)' }}>
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: 'rgba(239,68,68,0.15)' }}>
                                <Zap size={18} className="text-red-400" />
                            </div>
                            <div>
                                <p className="font-semibold text-red-300">แพ็กเกจหมดอายุแล้ว</p>
                                <p className="text-sm text-red-400/70">อัพเกรดเพื่อสร้างและแก้ไขเพจต่อได้</p>
                            </div>
                        </div>
                        <button onClick={() => router.push('/dashboard/subscription')} className="btn-primary px-5 py-2.5 text-sm flex items-center gap-2 shrink-0">
                            อัพเกรดแพ็กเกจ <ArrowRight size={14} />
                        </button>
                    </div>
                ) : subscription?.tier === 'free' ? (
                    <div className="p-5 rounded-2xl mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                        style={{ background: 'rgba(124,58,237,0.08)', border: '1px solid rgba(124,58,237,0.2)' }}>
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: 'rgba(124,58,237,0.15)' }}>
                                {tierIcon}
                            </div>
                            <div>
                                <div className="flex items-center gap-2">
                                    <p className="font-semibold">Free Trial</p>
                                    <span className="badge-purple">ทดลองใช้</span>
                                </div>
                                <p className="text-sm text-[var(--muted)] mt-0.5">
                                    เหลืออีก <span className="text-white font-medium">{daysLeft} วัน</span> — อัพเกรดเพื่อปลดล็อกฟีเจอร์ทั้งหมด
                                </p>
                            </div>
                        </div>
                        <button onClick={() => router.push('/dashboard/subscription')} className="btn-primary px-5 py-2.5 text-sm flex items-center gap-2 shrink-0">
                            อัพเกรดเป็น Pro <ArrowRight size={14} />
                        </button>
                    </div>
                ) : subscription?.tier === 'pro' ? (
                    <div className="p-5 rounded-2xl mb-8 flex items-center gap-3"
                        style={{ background: 'rgba(124,58,237,0.06)', border: '1px solid rgba(124,58,237,0.15)' }}>
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'rgba(124,58,237,0.15)' }}>
                            <Star size={18} className="text-purple-400" />
                        </div>
                        <div>
                            <div className="flex items-center gap-2">
                                <p className="font-semibold">Pro Plan</p>
                                <span className="badge-purple">Active</span>
                            </div>
                            <p className="text-xs text-[var(--muted)]">ไม่จำกัดระยะเวลา — ใช้งานได้ทุกฟีเจอร์</p>
                        </div>
                    </div>
                ) : subscription?.tier === 'premium' ? (
                    <div className="p-5 rounded-2xl mb-8 flex items-center gap-3"
                        style={{ background: 'rgba(245,158,11,0.06)', border: '1px solid rgba(245,158,11,0.15)' }}>
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'rgba(245,158,11,0.12)' }}>
                            <Crown size={18} className="text-amber-400" />
                        </div>
                        <div>
                            <div className="flex items-center gap-2">
                                <p className="font-semibold">Premium Plan</p>
                                <span className="badge-yellow">Active</span>
                            </div>
                            <p className="text-xs text-[var(--muted)]">ครบทุกฟีเจอร์ — Custom Domain, ไม่มีลายน้ำ</p>
                        </div>
                    </div>
                ) : null}

                {/* ===== STATS ROW ===== */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-8">
                    {[
                        { label: 'เพจทั้งหมด', value: pages.length, icon: <FileText size={16} />, color: 'rgba(124,58,237,0.15)', textColor: '#a78bfa' },
                        { label: 'เผยแพร่แล้ว', value: publishedCount, icon: <Globe size={16} />, color: 'rgba(34,197,94,0.12)', textColor: '#4ade80' },
                        { label: 'แบบร่าง', value: pages.length - publishedCount, icon: <Clock size={16} />, color: 'rgba(245,158,11,0.12)', textColor: '#fbbf24' },
                        { label: 'ยอดเข้าชมรวม', value: Object.values(viewCounts).reduce((a, b) => a + b, 0), icon: <Eye size={16} />, color: 'rgba(6,182,212,0.12)', textColor: '#67e8f9' },
                    ].map((s, i) => (
                        <div key={i} className="glass-card p-3 sm:p-4 rounded-2xl flex items-center gap-3">
                            <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ background: s.color, color: s.textColor }}>
                                {s.icon}
                            </div>
                            <div>
                                <p className="text-xl font-bold">{s.value}</p>
                                <p className="text-xs text-[var(--muted)]">{s.label}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* ===== PAGES HEADER ===== */}
                <div className="flex items-center justify-between mb-5">
                    <h2 className="text-xl font-bold flex items-center gap-2">
                        <LayoutGrid size={20} className="text-[var(--muted)]" />
                        เพจของฉัน
                    </h2>
                    <button
                        onClick={createPage}
                        disabled={isExpired || creating}
                        className="btn-primary flex items-center gap-2 px-4 sm:px-5 py-2.5 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {creating
                            ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            : <Plus size={15} />
                        }
                        <span className="hidden sm:inline">สร้างเพจใหม่</span>
                        <span className="sm:hidden">สร้าง</span>
                    </button>
                </div>

                {/* ===== PAGES GRID ===== */}
                {pages.length === 0 ? (
                    <div className="text-center py-20 rounded-3xl"
                        style={{ border: '1px dashed rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.01)' }}>
                        <div className="w-20 h-20 rounded-3xl gradient-bg-primary flex items-center justify-center text-3xl mx-auto mb-5 shadow-2xl shadow-purple-500/20 animate-float">
                            🚀
                        </div>
                        <h3 className="text-xl font-bold mb-2">ยังไม่มีเพจ</h3>
                        <p className="text-[var(--muted)] mb-7 text-sm max-w-xs mx-auto">
                            เริ่มสร้างเซลเพจแรกของคุณได้เลย เลือกเทมเพลท แก้ไขเนื้อหา เผยแพร่ได้ทันที
                        </p>
                        <button onClick={createPage} disabled={isExpired} className="btn-primary px-7 py-3 text-sm flex items-center gap-2 mx-auto disabled:opacity-50">
                            <Plus size={15} /> สร้างเพจแรก
                        </button>
                    </div>
                ) : (
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                        {pages.map(page => {
                            const tc = TEMPLATE_COLORS[page.template] || TEMPLATE_COLORS.professional
                            return (
                                <div key={page.id} className="group rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                                    style={{ background: 'var(--card)', border: '1px solid var(--border)' }}>
                                    {/* Template preview header */}
                                    <div className="relative p-4 sm:p-5 pb-3" style={{ background: tc.bg }}>
                                        <div className="rounded-xl overflow-hidden p-2.5 sm:p-3" style={{ background: 'rgba(255,255,255,0.06)', border: `1px solid ${tc.primary}20` }}>
                                            <div className="h-2 rounded-full mb-1.5 w-3/4" style={{ background: tc.primary }} />
                                            <div className="h-1.5 rounded-full mb-1 w-1/2" style={{ background: 'rgba(255,255,255,0.1)' }} />
                                            <div className="h-1.5 rounded-full w-2/3" style={{ background: 'rgba(255,255,255,0.08)' }} />
                                            <div className="grid grid-cols-3 gap-1 mt-2">
                                                {[0, 1, 2].map(i => <div key={i} className="h-4 rounded" style={{ background: `${tc.primary}20` }} />)}
                                            </div>
                                        </div>
                                        <div className="absolute top-3 right-3">
                                            <span className={`text-[10px] sm:text-xs font-semibold px-2.5 py-1 rounded-full ${page.isPublished ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'bg-amber-500/15 text-amber-400 border border-amber-500/25'}`}>
                                                {page.isPublished ? '• Live' : 'ร่าง'}
                                            </span>
                                        </div>
                                        <div className="absolute top-3 left-3 text-xl sm:text-2xl">
                                            {TEMPLATE_ICONS[page.template] || '📄'}
                                        </div>
                                    </div>

                                    {/* Card body */}
                                    <div className="p-4 sm:p-5">
                                        <div className="flex items-start justify-between gap-2 mb-2">
                                            <div className="min-w-0">
                                                <h3 className="font-bold text-sm sm:text-base truncate">{page.title}</h3>
                                                <div className="flex items-center gap-2 mt-0.5">
                                                    <span className="text-[10px] sm:text-xs font-medium px-2 py-0.5 rounded-md" style={{ background: tc.bg, color: tc.accent }}>
                                                        {TEMPLATE_LABELS[page.template] || page.template}
                                                    </span>
                                                    <span className="text-[10px] text-[var(--muted)] flex items-center gap-1">
                                                        <Clock size={9} />
                                                        {new Date(page.updatedAt).toLocaleDateString('th-TH', { day: 'numeric', month: 'short' })}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        {page.isPublished && page.slug && (
                                            <div className="mt-3 px-2.5 py-1.5 rounded-lg text-[10px] sm:text-xs text-[var(--muted)] truncate flex items-center gap-1.5"
                                                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                                                <Globe size={9} className="shrink-0 text-green-400" />
                                                /p/{page.slug}
                                            </div>
                                        )}

                                        {/* View count */}
                                        {viewCounts[page.id] !== undefined && (
                                            <div className="mt-2 flex items-center gap-1.5 text-[10px] sm:text-xs text-[var(--muted)]">
                                                <Eye size={10} className="text-cyan-400" />
                                                <span>{viewCounts[page.id].toLocaleString()} ยอดเข้าชม</span>
                                            </div>
                                        )}

                                        <div className="flex items-center gap-2 mt-3 sm:mt-4">
                                            <button onClick={() => router.push(`/dashboard/builder/${page.id}`)} className="flex-1 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-white flex items-center justify-center gap-1.5 transition-all hover:opacity-90"
                                                style={{ background: tc.primary }}>
                                                <Settings size={12} /> แก้ไข
                                            </button>
                                            {page.isPublished && (
                                                <a href={`/p/${page.slug}`} target="_blank" className="p-2 sm:p-2.5 rounded-xl btn-ghost text-[var(--muted)] hover:text-white transition-all" title="ดูเพจสาธารณะ">
                                                    <ExternalLink size={14} />
                                                </a>
                                            )}
                                            <button onClick={() => deletePage(page.id)} className="p-2 sm:p-2.5 rounded-xl btn-ghost text-[var(--muted)] hover:text-red-400 transition-all" title="ลบเพจ">
                                                <Trash2 size={14} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                        {!isExpired && (
                            <button onClick={createPage} disabled={creating}
                                className="rounded-2xl border-dashed transition-all duration-200 hover:border-purple-500/40 hover:bg-purple-500/5 flex flex-col items-center justify-center gap-3 py-12 text-[var(--muted)] hover:text-white group disabled:opacity-50"
                                style={{ border: '1px dashed rgba(255,255,255,0.1)' }}>
                                <div className="w-12 h-12 rounded-2xl bg-white/5 group-hover:bg-purple-500/15 flex items-center justify-center transition-all">
                                    <Plus size={20} className="group-hover:text-purple-400 transition-colors" />
                                </div>
                                <span className="text-sm font-medium">สร้างเพจใหม่</span>
                            </button>
                        )}
                    </div>
                )}

                {/* ===== CUSTOM DOMAIN SECTION ===== */}
                <div className="mt-12">
                    <h2 className="text-xl font-bold flex items-center gap-2 mb-5">
                        <Globe size={20} className="text-[var(--muted)]" />
                        Custom Domain
                        {!isPremium && <Lock size={14} className="text-[var(--muted)]" />}
                    </h2>

                    {isPremium ? (
                        <div className="glass-card rounded-2xl overflow-hidden">
                            <div className="p-5 border-b border-white/5">
                                <p className="text-sm text-[var(--muted)] mb-3">เชื่อมต่อโดเมนของคุณเข้ากับเพจที่เผยแพร่แล้ว</p>
                                <div className="flex flex-col sm:flex-row gap-3">
                                    <input type="text" placeholder="example.com" value={newDomain} onChange={e => setNewDomain(e.target.value)}
                                        className="flex-1 px-4 py-2.5 rounded-xl text-sm input-field" />
                                    <select value={newDomainPageId} onChange={e => setNewDomainPageId(e.target.value)}
                                        className="px-4 py-2.5 rounded-xl text-sm input-field" style={{ minWidth: 160 }}>
                                        <option value="">เลือกเพจ...</option>
                                        {publishedPages.map(p => (<option key={p.id} value={p.id}>{p.title}</option>))}
                                    </select>
                                    <button onClick={addCustomDomain} disabled={!newDomain || !newDomainPageId || domainAdding}
                                        className="btn-primary px-5 py-2.5 text-sm flex items-center gap-2 shrink-0 disabled:opacity-50">
                                        <Plus size={14} /> เพิ่มโดเมน
                                    </button>
                                </div>
                            </div>
                            {customDomains.length === 0 ? (
                                <div className="p-8 text-center">
                                    <Globe size={32} className="text-[var(--muted)] mx-auto mb-3 opacity-30" />
                                    <p className="text-sm text-[var(--muted)]">ยังไม่มี Custom Domain</p>
                                    <p className="text-xs text-[var(--muted)] mt-1">เพิ่มโดเมนของคุณด้านบน เพื่อเชื่อมต่อกับเพจ</p>
                                </div>
                            ) : (
                                <div className="divide-y divide-white/5">
                                    {customDomains.map(cd => (
                                        <div key={cd.id} className="px-5 py-4">
                                            <div className="flex items-center justify-between gap-3">
                                                <div className="flex items-center gap-3 min-w-0">
                                                    <Globe size={16} className={cd.isVerified ? 'text-green-400' : 'text-amber-400'} />
                                                    <div className="min-w-0">
                                                        <p className="text-sm font-medium truncate">{cd.domain}</p>
                                                        <p className="text-xs text-[var(--muted)]">{cd.pageTitle || cd.pageSlug || 'เพจ'}</p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-2 shrink-0">
                                                    {!cd.isVerified && (
                                                        <button
                                                            onClick={async () => {
                                                                setVerifyingDomain(cd.id)
                                                                setDnsMessage(null)
                                                                try {
                                                                    const res = await fetch('/api/custom-domain/verify', {
                                                                        method: 'POST',
                                                                        headers: { 'Content-Type': 'application/json' },
                                                                        body: JSON.stringify({ domainId: cd.id }),
                                                                    })
                                                                    const data = await res.json()
                                                                    setDnsMessage(data.message)
                                                                    if (data.verified) {
                                                                        setCustomDomains(prev => prev.map(d => d.id === cd.id ? { ...d, isVerified: true } : d))
                                                                    }
                                                                } catch {
                                                                    setDnsMessage('ไม่สามารถตรวจสอบได้')
                                                                }
                                                                setVerifyingDomain(null)
                                                            }}
                                                            disabled={verifyingDomain === cd.id}
                                                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-amber-400 transition-all disabled:opacity-50"
                                                            style={{ background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.25)' }}
                                                        >
                                                            {verifyingDomain === cd.id ? <Loader2 size={11} className="animate-spin" /> : <RefreshCw size={11} />}
                                                            ตรวจสอบ DNS
                                                        </button>
                                                    )}
                                                    <span className={cd.isVerified ? 'badge-green' : 'badge-yellow'}>
                                                        {cd.isVerified ? 'ตรวจสอบแล้ว' : 'รอตรวจสอบ'}
                                                    </span>
                                                    <button onClick={() => removeCustomDomain(cd.id)} className="p-1.5 rounded-lg text-[var(--muted)] hover:text-red-400 transition-colors">
                                                        <Trash2 size={13} />
                                                    </button>
                                                </div>
                                            </div>
                                            {!cd.isVerified && (
                                                <div className="mt-3 ml-7 p-3 rounded-lg text-xs text-[var(--muted)] leading-relaxed"
                                                    style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>
                                                    <div className="flex items-start gap-1.5 mb-1">
                                                        <Info size={11} className="text-cyan-400 mt-0.5 shrink-0" />
                                                        <span className="font-medium text-[var(--muted-light)]">วิธีตั้งค่า:</span>
                                                    </div>
                                                    <div className="ml-4 space-y-0.5">
                                                        <p>เข้า DNS Management ของโดเมนคุณ</p>
                                                        <p>เพิ่ม <span className="font-mono text-cyan-400">CNAME</span> record:</p>
                                                        <p className="font-mono text-[var(--muted-light)]">{cd.domain} → {typeof window !== 'undefined' ? window.location.hostname : 'your-app.vercel.app'}</p>
                                                        <p className="mt-1">รอ DNS ประมาณ 1-48 ชั่วโมง แล้วกด "ตรวจสอบ DNS"</p>
                                                    </div>
                                                    {dnsMessage && verifyingDomain === null && (
                                                        <div className="mt-2 p-2 rounded text-xs" style={{ background: 'rgba(245,158,11,0.08)' }}>
                                                            {dnsMessage}
                                                        </div>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="glass-card rounded-2xl p-8 text-center">
                            <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{ background: 'rgba(245,158,11,0.12)' }}>
                                <Crown size={24} className="text-amber-400" />
                            </div>
                            <h3 className="font-bold mb-2">Custom Domain สำหรับ Premium</h3>
                            <p className="text-sm text-[var(--muted)] mb-5 max-w-sm mx-auto">
                                อัพเกรดเป็น Premium เพื่อเชื่อมต่อโดเมนของคุณเอง เช่น yourbrand.com
                            </p>
                            <button onClick={() => router.push('/dashboard/subscription')}
                                className="px-5 py-2.5 rounded-xl text-sm font-semibold inline-flex items-center gap-2 transition-all hover:-translate-y-0.5"
                                style={{ background: 'rgba(245,158,11,0.15)', border: '1px solid rgba(245,158,11,0.35)', color: '#fbbf24' }}>
                                <Crown size={14} /> อัพเกรดเป็น Premium
                            </button>
                        </div>
                    )}
                </div>
            </main>
        </div>
    )
}
