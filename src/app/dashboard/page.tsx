'use client'

import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Plus, Settings, Trash2, ExternalLink, Crown, LogOut, LayoutGrid, Zap, Star, ArrowRight, Globe, FileText, Clock, Lock } from 'lucide-react'

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
            if (pagesRes.ok) setPages(await pagesRes.json())
            if (subRes.ok) setSubscription(await subRes.json())
            if (domainsRes.ok) setCustomDomains(await domainsRes.json())
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
                <div className="grid grid-cols-3 gap-3 sm:gap-4 mb-8">
                    {[
                        { label: 'เพจทั้งหมด', value: pages.length, icon: <FileText size={16} />, color: 'rgba(124,58,237,0.15)', textColor: '#a78bfa' },
                        { label: 'เผยแพร่แล้ว', value: publishedCount, icon: <Globe size={16} />, color: 'rgba(34,197,94,0.12)', textColor: '#4ade80' },
                        { label: 'แบบร่าง', value: pages.length - publishedCount, icon: <Clock size={16} />, color: 'rgba(245,158,11,0.12)', textColor: '#fbbf24' },
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
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {pages.map(page => (
                            <div key={page.id} className="card group overflow-hidden">
                                <div className="h-1.5 w-full" style={{ background: 'linear-gradient(90deg, #7c3aed, #06b6d4)' }} />
                                <div className="p-5">
                                    <div className="flex items-start justify-between mb-3">
                                        <div className="flex-1 min-w-0 pr-2">
                                            <div className="flex items-center gap-2 mb-0.5">
                                                <span className="text-base">{TEMPLATE_ICONS[page.template] || '📄'}</span>
                                                <h3 className="font-semibold text-sm truncate">{page.title}</h3>
                                            </div>
                                            <p className="text-xs text-[var(--muted)] ml-6">{TEMPLATE_LABELS[page.template] || page.template}</p>
                                        </div>
                                        <span className={page.isPublished ? 'badge-green' : 'badge-yellow'}>
                                            {page.isPublished ? 'เผยแพร่' : 'ร่าง'}
                                        </span>
                                    </div>
                                    <p className="text-xs text-[var(--muted)] mb-4 flex items-center gap-1.5">
                                        <Clock size={10} />
                                        แก้ไขล่าสุด: {new Date(page.updatedAt).toLocaleDateString('th-TH', { day: 'numeric', month: 'short', year: 'numeric' })}
                                    </p>
                                    {page.isPublished && page.slug && (
                                        <div className="mb-4 px-3 py-2 rounded-lg text-xs text-[var(--muted)] truncate flex items-center gap-1.5"
                                            style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                                            <Globe size={10} className="shrink-0 text-green-400" />
                                            /p/{page.slug}
                                        </div>
                                    )}
                                    <div className="flex items-center gap-2">
                                        <button onClick={() => router.push(`/dashboard/builder/${page.id}`)} className="flex-1 py-2 rounded-xl btn-primary text-sm font-medium flex items-center justify-center gap-1.5">
                                            <Settings size={13} /> แก้ไข
                                        </button>
                                        {page.isPublished && (
                                            <a href={`/p/${page.slug}`} target="_blank" className="p-2 rounded-xl btn-ghost text-[var(--muted)] hover:text-white transition-all" title="ดูเพจสาธารณะ">
                                                <ExternalLink size={14} />
                                            </a>
                                        )}
                                        <button onClick={() => deletePage(page.id)} className="p-2 rounded-xl btn-ghost text-[var(--muted)] hover:text-red-400 transition-all" title="ลบเพจ">
                                            <Trash2 size={14} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
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
                                        <div key={cd.id} className="px-5 py-4 flex items-center justify-between gap-3">
                                            <div className="flex items-center gap-3 min-w-0">
                                                <Globe size={16} className={cd.isVerified ? 'text-green-400' : 'text-amber-400'} />
                                                <div className="min-w-0">
                                                    <p className="text-sm font-medium truncate">{cd.domain}</p>
                                                    <p className="text-xs text-[var(--muted)]">{cd.pageTitle || cd.pageSlug || 'เพจ'}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2 shrink-0">
                                                <span className={cd.isVerified ? 'badge-green' : 'badge-yellow'}>
                                                    {cd.isVerified ? 'ตรวจสอบแล้ว' : 'รอตรวจสอบ'}
                                                </span>
                                                <button onClick={() => removeCustomDomain(cd.id)} className="p-1.5 rounded-lg text-[var(--muted)] hover:text-red-400 transition-colors">
                                                    <Trash2 size={13} />
                                                </button>
                                            </div>
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
