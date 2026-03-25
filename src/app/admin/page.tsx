'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState, useCallback } from 'react'
import {
    LayoutDashboard, Users, FileText, CreditCard, Bell, Globe, BarChart3,
    Settings, ArrowLeft, RefreshCw, Trash2, Crown, Eye, CheckCircle, XCircle,
    Send, AlertTriangle, Loader2, Search, ChevronDown
} from 'lucide-react'

type Tab = 'overview' | 'users' | 'pages' | 'subscriptions' | 'notifications' | 'domains' | 'analytics' | 'settings'

const TABS: { id: Tab; label: string; icon: React.ReactNode }[] = [
    { id: 'overview', label: 'ภาพรวม', icon: <LayoutDashboard size={16} /> },
    { id: 'users', label: 'ผู้ใช้', icon: <Users size={16} /> },
    { id: 'pages', label: 'เพจ', icon: <FileText size={16} /> },
    { id: 'subscriptions', label: 'แพ็กเกจ', icon: <CreditCard size={16} /> },
    { id: 'notifications', label: 'แจ้งเตือน', icon: <Bell size={16} /> },
    { id: 'domains', label: 'โดเมน', icon: <Globe size={16} /> },
    { id: 'analytics', label: 'Analytics', icon: <BarChart3 size={16} /> },
    { id: 'settings', label: 'ตั้งค่า', icon: <Settings size={16} /> },
]

export default function AdminPage() {
    const { data: session, status } = useSession()
    const router = useRouter()
    const [activeTab, setActiveTab] = useState<Tab>('overview')
    const [loading, setLoading] = useState(true)
    const [forbidden, setForbidden] = useState(false)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    // Data states
    const [stats, setStats] = useState<any>(null)
    const [users, setUsers] = useState<any[]>([])
    const [pages, setPages] = useState<any[]>([])
    const [subscriptions, setSubscriptions] = useState<any[]>([])
    const [notifications, setNotifications] = useState<any[]>([])
    const [domains, setDomains] = useState<any[]>([])
    const [analytics, setAnalytics] = useState<any>(null)
    const [settings, setSettings] = useState<any>({})
    const [searchQuery, setSearchQuery] = useState('')
    const [actionLoading, setActionLoading] = useState<string | null>(null)

    useEffect(() => {
        if (status === 'unauthenticated') router.push('/login')
    }, [status, router])

    const fetchData = useCallback(async (tab: Tab) => {
        setLoading(true)
        try {
            const res = await fetch(`/api/admin?action=${tab === 'overview' ? 'stats' : tab}`)
            if (res.status === 403) { setForbidden(true); return }
            const data = await res.json()
            switch (tab) {
                case 'overview': setStats(data); break
                case 'users': setUsers(data); break
                case 'pages': setPages(data); break
                case 'subscriptions': setSubscriptions(data); break
                case 'notifications': setNotifications(data); break
                case 'domains': setDomains(data); break
                case 'analytics': setAnalytics(data); break
                case 'settings': setSettings(data); break
            }
        } catch (e) { console.error(e) }
        setLoading(false)
    }, [])

    useEffect(() => {
        if (session) fetchData(activeTab)
    }, [session, activeTab, fetchData])

    const adminAction = async (action: string, body: any = {}) => {
        setActionLoading(action)
        try {
            const res = await fetch('/api/admin', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ action, ...body }),
            })
            const result = await res.json()
            fetchData(activeTab)
            return result
        } catch (e) { console.error(e) }
        setActionLoading(null)
    }

    if (status === 'loading') return (
        <div className="min-h-screen flex items-center justify-center" style={{ background: '#0a0a0f' }}>
            <Loader2 className="animate-spin text-purple-400" size={32} />
        </div>
    )

    if (forbidden) return (
        <div className="min-h-screen flex flex-col items-center justify-center gap-4" style={{ background: '#0a0a0f', color: 'white' }}>
            <XCircle size={48} className="text-red-400" />
            <h1 className="text-xl font-bold">ไม่มีสิทธิ์เข้าถึง</h1>
            <p className="text-sm text-gray-400">คุณไม่ใช่ Admin — ติดต่อผู้ดูแลระบบ</p>
            <button onClick={() => router.push('/dashboard')} className="mt-4 px-5 py-2.5 rounded-xl text-sm font-semibold text-white"
                style={{ background: 'linear-gradient(135deg,#7c3aed,#06b6d4)' }}>
                กลับ Dashboard
            </button>
        </div>
    )

    const tabLabel = TABS.find(t => t.id === activeTab)?.label || ''

    // =================== RENDER TAB CONTENT ===================
    const renderContent = () => {
        if (loading) return (
            <div className="flex items-center justify-center py-20">
                <Loader2 className="animate-spin text-purple-400" size={24} />
            </div>
        )

        switch (activeTab) {
            // ====== OVERVIEW ======
            case 'overview': {
                if (!stats) return null
                const statCards = [
                    { label: 'ผู้ใช้ทั้งหมด', value: stats.totalUsers, icon: <Users size={18} />, color: '#a78bfa', bg: 'rgba(124,58,237,0.12)' },
                    { label: 'เพจทั้งหมด', value: stats.totalPages, icon: <FileText size={18} />, color: '#67e8f9', bg: 'rgba(6,182,212,0.12)' },
                    { label: 'เผยแพร่แล้ว', value: stats.publishedPages, icon: <Globe size={18} />, color: '#4ade80', bg: 'rgba(34,197,94,0.12)' },
                    { label: 'ยอดเข้าชมรวม', value: stats.totalViews, icon: <Eye size={18} />, color: '#fbbf24', bg: 'rgba(245,158,11,0.12)' },
                    { label: 'วันนี้', value: stats.viewsToday, icon: <BarChart3 size={18} />, color: '#f472b6', bg: 'rgba(244,114,182,0.12)' },
                    { label: '7 วัน', value: stats.views7d, icon: <BarChart3 size={18} />, color: '#60a5fa', bg: 'rgba(96,165,250,0.12)' },
                ]
                return (
                    <div className="space-y-6">
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                            {statCards.map((s, i) => (
                                <div key={i} className="glass-card p-4 rounded-2xl">
                                    <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-2" style={{ background: s.bg, color: s.color }}>
                                        {s.icon}
                                    </div>
                                    <p className="text-2xl font-bold">{s.value?.toLocaleString?.() || 0}</p>
                                    <p className="text-xs text-[var(--muted)] mt-0.5">{s.label}</p>
                                </div>
                            ))}
                        </div>

                        {/* Tier Breakdown */}
                        <div className="glass-card p-5 rounded-2xl">
                            <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
                                <CreditCard size={15} className="text-purple-400" /> Subscription Breakdown
                            </h3>
                            <div className="grid grid-cols-3 gap-3">
                                {['free', 'pro', 'premium'].map(tier => (
                                    <div key={tier} className="p-3 rounded-xl text-center" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                                        <p className="text-lg font-bold">{stats.tierBreakdown?.[tier] || 0}</p>
                                        <p className="text-xs text-[var(--muted)] capitalize">{tier}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Trials Expiring */}
                        {stats.trialsExpiringSoon?.length > 0 && (
                            <div className="glass-card p-5 rounded-2xl border border-amber-500/20">
                                <h3 className="text-sm font-semibold mb-3 flex items-center gap-2 text-amber-400">
                                    <AlertTriangle size={15} /> Trial ใกล้หมดอายุ ({stats.trialsExpiringSoon.length})
                                </h3>
                                <div className="space-y-2">
                                    {stats.trialsExpiringSoon.map((t: any, i: number) => {
                                        const days = Math.max(0, Math.ceil((new Date(t.endDate).getTime() - Date.now()) / 86400000))
                                        return (
                                            <div key={i} className="flex items-center justify-between p-2 rounded-lg text-sm" style={{ background: 'rgba(245,158,11,0.06)' }}>
                                                <span>{t.email} — <span className="text-amber-400">{t.name}</span></span>
                                                <span className="text-xs text-amber-400">{days} วัน</span>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        )}
                    </div>
                )
            }

            // ====== USERS ======
            case 'users': {
                const filtered = searchQuery
                    ? users.filter(u => u.email?.toLowerCase().includes(searchQuery.toLowerCase()) || u.name?.toLowerCase().includes(searchQuery.toLowerCase()))
                    : users
                return (
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="relative flex-1">
                                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                                <input type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                                    placeholder="ค้นหาผู้ใช้..." className="w-full pl-9 pr-4 py-2.5 rounded-xl text-sm input-field" />
                            </div>
                            <span className="text-xs text-[var(--muted)] shrink-0">{filtered.length} คน</span>
                        </div>
                        <div className="glass-card rounded-2xl overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm">
                                    <thead>
                                        <tr className="border-b border-white/5 text-[var(--muted)] text-xs">
                                            <th className="text-left p-3 font-medium">ผู้ใช้</th>
                                            <th className="text-left p-3 font-medium hidden sm:table-cell">Email</th>
                                            <th className="text-center p-3 font-medium">Tier</th>
                                            <th className="text-center p-3 font-medium">เพจ</th>
                                            <th className="text-right p-3 font-medium">จัดการ</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filtered.map(u => (
                                            <tr key={u.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                                                <td className="p-3">
                                                    <div className="flex items-center gap-2">
                                                        {u.image && <img src={u.image} alt="" className="w-7 h-7 rounded-full" />}
                                                        <span className="font-medium text-sm truncate max-w-[120px]">{u.name || '—'}</span>
                                                    </div>
                                                </td>
                                                <td className="p-3 text-[var(--muted)] text-xs hidden sm:table-cell truncate max-w-[180px]">{u.email}</td>
                                                <td className="p-3 text-center">
                                                    <select value={u.tier || 'free'} onChange={e => adminAction('update_subscription', { userId: u.id, tier: e.target.value })}
                                                        className="text-xs px-2 py-1 rounded-lg bg-white/5 border border-white/10 text-white cursor-pointer">
                                                        <option value="free">Free</option>
                                                        <option value="pro">Pro</option>
                                                        <option value="premium">Premium</option>
                                                    </select>
                                                </td>
                                                <td className="p-3 text-center text-[var(--muted)]">{u.pageCount || 0}</td>
                                                <td className="p-3 text-right">
                                                    <button onClick={() => { if (confirm(`ลบผู้ใช้ ${u.email}?`)) adminAction('delete_user', { userId: u.id }) }}
                                                        className="p-1.5 rounded-lg text-[var(--muted)] hover:text-red-400 transition-colors">
                                                        <Trash2 size={13} />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )
            }

            // ====== PAGES ======
            case 'pages': {
                const filtered = searchQuery
                    ? pages.filter(p => p.title?.toLowerCase().includes(searchQuery.toLowerCase()) || p.ownerEmail?.toLowerCase().includes(searchQuery.toLowerCase()))
                    : pages
                return (
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="relative flex-1">
                                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                                <input type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                                    placeholder="ค้นหาเพจ..." className="w-full pl-9 pr-4 py-2.5 rounded-xl text-sm input-field" />
                            </div>
                            <span className="text-xs text-[var(--muted)] shrink-0">{filtered.length} เพจ</span>
                        </div>
                        <div className="glass-card rounded-2xl overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm">
                                    <thead>
                                        <tr className="border-b border-white/5 text-[var(--muted)] text-xs">
                                            <th className="text-left p-3 font-medium">เพจ</th>
                                            <th className="text-left p-3 font-medium hidden sm:table-cell">เจ้าของ</th>
                                            <th className="text-center p-3 font-medium">Template</th>
                                            <th className="text-center p-3 font-medium">สถานะ</th>
                                            <th className="text-center p-3 font-medium">Views</th>
                                            <th className="text-right p-3 font-medium">จัดการ</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filtered.map(p => (
                                            <tr key={p.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                                                <td className="p-3">
                                                    <p className="font-medium text-sm truncate max-w-[150px]">{p.title}</p>
                                                    <p className="text-[10px] text-[var(--muted)]">/p/{p.slug}</p>
                                                </td>
                                                <td className="p-3 text-xs text-[var(--muted)] hidden sm:table-cell truncate max-w-[150px]">{p.ownerEmail}</td>
                                                <td className="p-3 text-center text-xs capitalize">{p.template}</td>
                                                <td className="p-3 text-center">
                                                    {p.isPublished ? (
                                                        <span className="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full bg-green-500/10 text-green-400">
                                                            <CheckCircle size={9} /> เผยแพร่
                                                        </span>
                                                    ) : (
                                                        <span className="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full bg-yellow-500/10 text-yellow-400">
                                                            แบบร่าง
                                                        </span>
                                                    )}
                                                </td>
                                                <td className="p-3 text-center text-xs">{p.viewCount || 0}</td>
                                                <td className="p-3 text-right flex items-center gap-1 justify-end">
                                                    {p.isPublished && (
                                                        <a href={`/p/${p.slug}`} target="_blank" className="p-1.5 rounded-lg text-[var(--muted)] hover:text-cyan-400 transition-colors">
                                                            <Eye size={13} />
                                                        </a>
                                                    )}
                                                    <button onClick={() => { if (confirm(`ลบ "${p.title}"?`)) adminAction('delete_page', { pageId: p.id }) }}
                                                        className="p-1.5 rounded-lg text-[var(--muted)] hover:text-red-400 transition-colors">
                                                        <Trash2 size={13} />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )
            }

            // ====== SUBSCRIPTIONS ======
            case 'subscriptions': {
                return (
                    <div className="space-y-4">
                        <div className="grid grid-cols-3 gap-3 mb-4">
                            {['free', 'pro', 'premium'].map(tier => {
                                const count = subscriptions.filter(s => s.tier === tier).length
                                const colors: Record<string, string> = { free: '#a78bfa', pro: '#60a5fa', premium: '#fbbf24' }
                                return (
                                    <div key={tier} className="glass-card p-4 rounded-2xl text-center">
                                        <p className="text-2xl font-bold" style={{ color: colors[tier] }}>{count}</p>
                                        <p className="text-xs text-[var(--muted)] capitalize">{tier}</p>
                                    </div>
                                )
                            })}
                        </div>
                        <div className="glass-card rounded-2xl overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm">
                                    <thead>
                                        <tr className="border-b border-white/5 text-[var(--muted)] text-xs">
                                            <th className="text-left p-3 font-medium">ผู้ใช้</th>
                                            <th className="text-center p-3 font-medium">Tier</th>
                                            <th className="text-center p-3 font-medium">หมดอายุ</th>
                                            <th className="text-center p-3 font-medium">สถานะ</th>
                                            <th className="text-right p-3 font-medium">จัดการ</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {subscriptions.map(s => {
                                            const days = Math.ceil((new Date(s.endDate).getTime() - Date.now()) / 86400000)
                                            return (
                                                <tr key={s.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                                                    <td className="p-3">
                                                        <p className="text-sm font-medium">{s.name || s.email}</p>
                                                        <p className="text-[10px] text-[var(--muted)]">{s.email}</p>
                                                    </td>
                                                    <td className="p-3 text-center">
                                                        <span className="text-xs px-2 py-0.5 rounded-full capitalize"
                                                            style={{ background: s.tier === 'premium' ? 'rgba(245,158,11,0.12)' : s.tier === 'pro' ? 'rgba(59,130,246,0.12)' : 'rgba(124,58,237,0.12)', color: s.tier === 'premium' ? '#fbbf24' : s.tier === 'pro' ? '#60a5fa' : '#a78bfa' }}>
                                                            {s.tier}
                                                        </span>
                                                    </td>
                                                    <td className="p-3 text-center text-xs text-[var(--muted)]">
                                                        {new Date(s.endDate).toLocaleDateString('th-TH')}
                                                        {days <= 3 && days > 0 && <span className="text-amber-400 ml-1">({days}วัน)</span>}
                                                    </td>
                                                    <td className="p-3 text-center">
                                                        {days > 0 ? (
                                                            <span className="text-[10px] text-green-400">Active</span>
                                                        ) : (
                                                            <span className="text-[10px] text-red-400">Expired</span>
                                                        )}
                                                    </td>
                                                    <td className="p-3 text-right">
                                                        <select value={s.tier} onChange={e => adminAction('update_subscription', { userId: s.userId, tier: e.target.value })}
                                                            className="text-xs px-2 py-1 rounded-lg bg-white/5 border border-white/10 text-white cursor-pointer">
                                                            <option value="free">Free</option>
                                                            <option value="pro">Pro</option>
                                                            <option value="premium">Premium</option>
                                                        </select>
                                                    </td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )
            }

            // ====== NOTIFICATIONS ======
            case 'notifications': {
                return (
                    <div className="space-y-4">
                        <div className="flex flex-wrap gap-2">
                            <button onClick={() => adminAction('check_trials')} disabled={actionLoading === 'check_trials'}
                                className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-medium text-amber-400 transition-all disabled:opacity-50"
                                style={{ background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.25)' }}>
                                {actionLoading === 'check_trials' ? <Loader2 size={12} className="animate-spin" /> : <AlertTriangle size={12} />}
                                ตรวจ Trial ใกล้หมด
                            </button>
                        </div>
                        <div className="glass-card rounded-2xl overflow-hidden">
                            {notifications.length === 0 ? (
                                <div className="p-8 text-center text-[var(--muted)]">
                                    <Bell size={24} className="mx-auto mb-2 opacity-30" />
                                    <p className="text-sm">ยังไม่มีประวัติการแจ้งเตือน</p>
                                </div>
                            ) : (
                                <div className="divide-y divide-white/5">
                                    {notifications.map((n: any, i: number) => (
                                        <div key={i} className="p-4 flex items-start gap-3">
                                            <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                                                style={{ background: n.type === 'publish_success' ? 'rgba(34,197,94,0.12)' : 'rgba(245,158,11,0.12)' }}>
                                                {n.type === 'publish_success' ? <CheckCircle size={14} className="text-green-400" /> :
                                                    n.type === 'welcome' ? <Users size={14} className="text-cyan-400" /> :
                                                        <AlertTriangle size={14} className="text-amber-400" />}
                                            </div>
                                            <div className="min-w-0 flex-1">
                                                <p className="text-sm font-medium">{n.subject}</p>
                                                <p className="text-[10px] text-[var(--muted)] mt-0.5">{n.to} — {new Date(n.sentAt).toLocaleString('th-TH')}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                )
            }

            // ====== DOMAINS ======
            case 'domains': {
                return (
                    <div className="space-y-4">
                        <div className="glass-card rounded-2xl overflow-hidden">
                            {domains.length === 0 ? (
                                <div className="p-8 text-center text-[var(--muted)]">
                                    <Globe size={24} className="mx-auto mb-2 opacity-30" />
                                    <p className="text-sm">ยังไม่มี Custom Domain</p>
                                </div>
                            ) : (
                                <div className="overflow-x-auto">
                                    <table className="w-full text-sm">
                                        <thead>
                                            <tr className="border-b border-white/5 text-[var(--muted)] text-xs">
                                                <th className="text-left p-3 font-medium">โดเมน</th>
                                                <th className="text-left p-3 font-medium hidden sm:table-cell">เพจ</th>
                                                <th className="text-left p-3 font-medium hidden sm:table-cell">เจ้าของ</th>
                                                <th className="text-center p-3 font-medium">สถานะ</th>
                                                <th className="text-right p-3 font-medium">จัดการ</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {domains.map(d => (
                                                <tr key={d.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                                                    <td className="p-3 font-medium">{d.domain}</td>
                                                    <td className="p-3 text-xs text-[var(--muted)] hidden sm:table-cell">{d.pageTitle || d.pageSlug}</td>
                                                    <td className="p-3 text-xs text-[var(--muted)] hidden sm:table-cell">{d.ownerEmail}</td>
                                                    <td className="p-3 text-center">
                                                        {d.isVerified ? (
                                                            <span className="text-[10px] text-green-400">✓ Verified</span>
                                                        ) : (
                                                            <button onClick={() => adminAction('verify_domain', { domainId: d.id })}
                                                                className="text-[10px] px-2 py-0.5 rounded text-amber-400 hover:bg-amber-500/10 transition-colors">
                                                                Verify Manual
                                                            </button>
                                                        )}
                                                    </td>
                                                    <td className="p-3 text-right">
                                                        <button onClick={() => { if (confirm(`ลบโดเมน ${d.domain}?`)) adminAction('delete_domain', { domainId: d.id }) }}
                                                            className="p-1.5 rounded-lg text-[var(--muted)] hover:text-red-400 transition-colors">
                                                            <Trash2 size={13} />
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    </div>
                )
            }

            // ====== ANALYTICS ======
            case 'analytics': {
                if (!analytics) return null
                return (
                    <div className="space-y-6">
                        {/* Views Chart */}
                        <div className="glass-card p-5 rounded-2xl">
                            <h3 className="text-sm font-semibold mb-4 flex items-center gap-2">
                                <BarChart3 size={15} className="text-cyan-400" /> Page Views (30 วัน)
                            </h3>
                            {analytics.dailyViews?.length > 0 ? (
                                <div className="flex items-end gap-1 h-32">
                                    {analytics.dailyViews.map((d: any, i: number) => {
                                        const max = Math.max(...analytics.dailyViews.map((v: any) => v.count), 1)
                                        const h = (d.count / max) * 100
                                        return (
                                            <div key={i} className="flex-1 group relative">
                                                <div className="w-full rounded-t-sm transition-all" style={{ height: `${Math.max(h, 2)}%`, background: 'linear-gradient(to top, #7c3aed, #06b6d4)', opacity: 0.8 }} />
                                                <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-[9px] text-[var(--muted)] opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                                    {d.count}
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            ) : (
                                <p className="text-sm text-[var(--muted)] text-center py-8">ยังไม่มีข้อมูล</p>
                            )}
                        </div>

                        {/* Top Pages */}
                        <div className="glass-card p-5 rounded-2xl">
                            <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
                                <Crown size={15} className="text-amber-400" /> Top 10 Pages
                            </h3>
                            <div className="space-y-2">
                                {analytics.topPages?.map((p: any, i: number) => (
                                    <div key={p.id} className="flex items-center justify-between p-2 rounded-lg hover:bg-white/[0.02] transition-colors">
                                        <div className="flex items-center gap-2 min-w-0">
                                            <span className="text-xs text-[var(--muted)] w-5 text-center font-mono">#{i + 1}</span>
                                            <div className="min-w-0">
                                                <p className="text-sm font-medium truncate">{p.title}</p>
                                                <p className="text-[10px] text-[var(--muted)]">{p.ownerName} · {p.template}</p>
                                            </div>
                                        </div>
                                        <span className="text-sm font-semibold text-cyan-400 shrink-0">{p.viewCount}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Template Popularity */}
                        <div className="glass-card p-5 rounded-2xl">
                            <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
                                <BarChart3 size={15} className="text-green-400" /> Template ยอดนิยม
                            </h3>
                            <div className="space-y-3">
                                {analytics.templatePopularity?.map((t: any) => {
                                    const total = analytics.templatePopularity.reduce((a: number, b: any) => a + b.count, 0) || 1
                                    const pct = Math.round((t.count / total) * 100)
                                    const colors: Record<string, string> = { professional: '#10b981', premium: '#3b82f6', minimal: '#6366f1' }
                                    return (
                                        <div key={t.template}>
                                            <div className="flex items-center justify-between text-sm mb-1">
                                                <span className="capitalize">{t.template}</span>
                                                <span className="text-xs text-[var(--muted)]">{t.count} เพจ ({pct}%)</span>
                                            </div>
                                            <div className="w-full h-2 rounded-full bg-white/5">
                                                <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, background: colors[t.template] || '#a78bfa' }} />
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                )
            }

            // ====== SETTINGS ======
            case 'settings': {
                return (
                    <div className="space-y-4">
                        <div className="glass-card p-5 rounded-2xl space-y-5">
                            <h3 className="text-sm font-semibold flex items-center gap-2">
                                <Settings size={15} className="text-[var(--muted)]" /> System Settings
                            </h3>
                            {[
                                { key: 'admin_emails', label: 'Admin Emails', desc: 'คั่นด้วย comma (,)', placeholder: 'admin@example.com, admin2@example.com' },
                                { key: 'trial_days', label: 'Trial Days', desc: 'จำนวนวัน Free Trial', placeholder: '14' },
                                { key: 'price_pro', label: 'ราคา Pro (บาท/เดือน)', desc: '', placeholder: '199' },
                                { key: 'price_premium', label: 'ราคา Premium (บาท/เดือน)', desc: '', placeholder: '299' },
                            ].map(item => (
                                <label key={item.key} className="block">
                                    <span className="text-xs font-medium text-[var(--muted-light)] mb-1 block">{item.label}</span>
                                    {item.desc && <span className="text-[10px] text-[var(--muted)] mb-1 block">{item.desc}</span>}
                                    <input type="text" value={settings[item.key] || ''} placeholder={item.placeholder}
                                        onChange={e => setSettings((prev: any) => ({ ...prev, [item.key]: e.target.value }))}
                                        className="w-full px-4 py-2.5 rounded-xl text-sm input-field" />
                                </label>
                            ))}
                            <label className="flex items-center gap-3 p-3 rounded-xl cursor-pointer hover:bg-white/[0.02] transition-colors">
                                <input type="checkbox" checked={settings.maintenance_mode === 'true'}
                                    onChange={e => setSettings((prev: any) => ({ ...prev, maintenance_mode: e.target.checked ? 'true' : 'false' }))}
                                    className="w-4 h-4 rounded accent-purple-500" />
                                <div>
                                    <span className="text-sm font-medium">โหมดบำรุงรักษา</span>
                                    <p className="text-[10px] text-[var(--muted)]">ปิดการสร้างเพจใหม่ชั่วคราว</p>
                                </div>
                            </label>
                            <button onClick={() => adminAction('update_settings', { settings })}
                                disabled={actionLoading === 'update_settings'}
                                className="w-full py-2.5 rounded-xl text-sm font-semibold text-white flex items-center justify-center gap-2 transition-all hover:opacity-90 disabled:opacity-50"
                                style={{ background: 'linear-gradient(135deg,#7c3aed,#06b6d4)' }}>
                                {actionLoading === 'update_settings' ? <Loader2 size={14} className="animate-spin" /> : <CheckCircle size={14} />}
                                บันทึกการตั้งค่า
                            </button>
                        </div>
                    </div>
                )
            }

            default: return null
        }
    }

    // =================== MAIN LAYOUT ===================
    return (
        <div className="min-h-screen flex" style={{ background: '#0a0a0f', color: 'white' }}>
            {/* Sidebar - Desktop */}
            <aside className="hidden md:flex flex-col w-60 shrink-0 border-r border-white/5 p-4">
                <div className="flex items-center gap-2 mb-6">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-bold text-sm shadow-md"
                        style={{ background: 'linear-gradient(135deg,#7c3aed,#06b6d4)' }}>A</div>
                    <div>
                        <p className="text-sm font-bold leading-tight">Admin Panel</p>
                        <p className="text-[10px] text-[var(--muted)]">จัดการระบบ</p>
                    </div>
                </div>
                <nav className="flex-1 space-y-1">
                    {TABS.map(tab => (
                        <button key={tab.id} onClick={() => { setActiveTab(tab.id); setSearchQuery('') }}
                            className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${activeTab === tab.id ? 'text-white' : 'text-[var(--muted)] hover:text-white hover:bg-white/[0.03]'}`}
                            style={activeTab === tab.id ? { background: 'rgba(124,58,237,0.15)' } : {}}>
                            {tab.icon}
                            {tab.label}
                        </button>
                    ))}
                </nav>
                <button onClick={() => router.push('/dashboard')} className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm text-[var(--muted)] hover:text-white hover:bg-white/[0.03] transition-all mt-2">
                    <ArrowLeft size={16} /> กลับ Dashboard
                </button>
            </aside>

            {/* Main Content */}
            <main className="flex-1 min-w-0">
                {/* Top bar */}
                <header className="sticky top-0 z-20 flex items-center justify-between px-4 sm:px-6 py-3 border-b border-white/5" style={{ background: 'rgba(10,10,15,0.9)', backdropFilter: 'blur(12px)' }}>
                    <div className="flex items-center gap-3">
                        {/* Mobile menu toggle */}
                        <button className="md:hidden p-2 rounded-lg text-[var(--muted)] hover:text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                            <LayoutDashboard size={18} />
                        </button>
                        <h1 className="text-base sm:text-lg font-bold">{tabLabel}</h1>
                    </div>
                    <button onClick={() => fetchData(activeTab)} className="p-2 rounded-lg text-[var(--muted)] hover:text-white transition-colors">
                        <RefreshCw size={15} />
                    </button>
                </header>

                {/* Mobile tab selector */}
                {mobileMenuOpen && (
                    <div className="md:hidden border-b border-white/5 p-3 grid grid-cols-4 gap-2" style={{ background: 'rgba(10,10,15,0.95)' }}>
                        {TABS.map(tab => (
                            <button key={tab.id} onClick={() => { setActiveTab(tab.id); setMobileMenuOpen(false); setSearchQuery('') }}
                                className={`flex flex-col items-center gap-1 p-2 rounded-xl text-[10px] transition-all ${activeTab === tab.id ? 'text-white bg-purple-500/15' : 'text-[var(--muted)]'}`}>
                                {tab.icon}
                                {tab.label}
                            </button>
                        ))}
                    </div>
                )}

                <div className="p-4 sm:p-6 max-w-5xl">
                    {renderContent()}
                </div>
            </main>
        </div>
    )
}
