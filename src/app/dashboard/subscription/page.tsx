'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Check, X, ArrowLeft, Loader2, Star, Crown, Zap, Sparkles } from 'lucide-react'

const COMPARISON = [
    { feature: 'จำนวนเทมเพลท', free: '1 แบบ', pro: '3 แบบ', premium: '3 แบบ' },
    { feature: 'ระยะเวลา', free: '14 วัน', pro: 'ไม่จำกัด', premium: 'ไม่จำกัด' },
    { feature: 'Hosting', free: 'Subdomain', pro: 'Subdomain', premium: 'Custom Domain' },
    { feature: 'Brand Color Presets', free: false, pro: true, premium: true },
    { feature: 'Content Presets', free: false, pro: true, premium: true },
    { feature: 'Priority Support', free: false, pro: false, premium: true },
    { feature: 'ลายน้ำ', free: 'มี', pro: 'มี', premium: 'ไม่มี' },
]

export default function SubscriptionPage() {
    const { data: session } = useSession()
    const router = useRouter()
    const [loading, setLoading] = useState<string | null>(null)
    const [success, setSuccess] = useState<string | null>(null)

    const handleUpgrade = async (tier: 'pro' | 'premium') => {
        setLoading(tier)
        try {
            const res = await fetch('/api/subscription', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ tier }),
            })
            if (res.ok) {
                setSuccess(tier)
                setTimeout(() => {
                    router.push('/dashboard')
                    router.refresh()
                }, 1500)
            }
        } catch (e) {
            alert('เกิดข้อผิดพลาด กรุณาลองใหม่')
        } finally {
            setLoading(null)
        }
    }

    return (
        <div className="min-h-screen">
            {/* Header */}
            <header className="glass sticky top-0 z-50">
                <div className="max-w-5xl mx-auto px-6 py-3.5 flex items-center gap-4">
                    <button
                        onClick={() => router.push('/dashboard')}
                        className="p-2 rounded-xl btn-ghost text-[var(--muted)] hover:text-white transition-all"
                    >
                        <ArrowLeft size={18} />
                    </button>
                    <div>
                        <span className="text-base font-bold">อัพเกรดแพ็กเกจ</span>
                    </div>
                </div>
            </header>

            <main className="max-w-5xl mx-auto px-6 py-12">
                {/* Hero */}
                <div className="text-center mb-12">
                    <div className="section-label mb-4 mx-auto" style={{ width: 'fit-content' }}>
                        <Sparkles size={13} /> เลือกแพ็กเกจ
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold mb-3">
                        ปลดล็อกทุกฟีเจอร์<br /><span className="gradient-text">เพื่อธุรกิจของคุณ</span>
                    </h1>
                    <p className="text-[var(--muted)] max-w-md mx-auto text-sm">
                        อัพเกรดเพื่อใช้งานเทมเพลทครบทุกแบบ สีแบรนด์ และ Content Presets
                    </p>
                </div>

                {/* Success banner */}
                {success && (
                    <div className="mb-8 p-4 rounded-2xl flex items-center gap-3 animate-fade-in"
                        style={{ background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.25)' }}>
                        <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                            <Check size={16} className="text-green-400" />
                        </div>
                        <div>
                            <p className="font-semibold text-green-300">อัพเกรดสำเร็จ! 🎉</p>
                            <p className="text-xs text-green-400/70">กำลังพาคุณกลับ Dashboard...</p>
                        </div>
                    </div>
                )}

                {/* Pricing Cards */}
                <div className="grid md:grid-cols-2 gap-6 mb-12">
                    {/* Pro */}
                    <div className="rounded-3xl relative overflow-hidden"
                        style={{
                            background: 'linear-gradient(135deg, rgba(124,58,237,0.15) 0%, rgba(79,70,229,0.1) 100%)',
                            border: '1px solid rgba(124,58,237,0.4)',
                            boxShadow: '0 0 40px rgba(124,58,237,0.12)',
                        }}>
                        <div className="absolute top-0 left-0 right-0 h-px"
                            style={{ background: 'linear-gradient(90deg, transparent, rgba(124,58,237,0.6), transparent)' }} />

                        <div className="p-8">
                            <div className="flex items-start justify-between mb-6">
                                <div>
                                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4"
                                        style={{ background: 'rgba(124,58,237,0.2)', border: '1px solid rgba(124,58,237,0.3)' }}>
                                        <Star size={22} className="text-purple-400" />
                                    </div>
                                    <h3 className="text-2xl font-bold mb-1">Pro</h3>
                                    <p className="text-sm text-[var(--muted)]">สำหรับมืออาชีพ</p>
                                </div>
                                <div className="px-3 py-1 rounded-full text-xs font-bold"
                                    style={{ background: 'rgba(124,58,237,0.2)', border: '1px solid rgba(124,58,237,0.3)', color: '#a78bfa' }}>
                                    แนะนำ ⭐
                                </div>
                            </div>

                            <div className="mb-7">
                                <div className="flex items-end gap-2">
                                    <span className="text-5xl font-bold gradient-text">฿199</span>
                                    <span className="text-[var(--muted)] text-sm mb-2">/ เดือน</span>
                                </div>
                                <p className="text-xs text-[var(--muted)] mt-1">ไม่มีสัญญาผูกมัด ยกเลิกได้ทุกเมื่อ</p>
                            </div>

                            <button
                                onClick={() => handleUpgrade('pro')}
                                disabled={loading !== null || success !== null}
                                className="btn-primary w-full py-3.5 rounded-2xl font-semibold flex items-center justify-center gap-2 mb-7 disabled:opacity-60"
                            >
                                {loading === 'pro'
                                    ? <><Loader2 size={18} className="animate-spin" /> กำลังดำเนินการ...</>
                                    : success === 'pro'
                                        ? <><Check size={18} /> อัพเกรดสำเร็จ!</>
                                        : 'อัพเกรดเป็น Pro'
                                }
                            </button>

                            <ul className="space-y-3">
                                {['ใช้งานทุกเทมเพลท (3 แบบ)', 'ไม่จำกัดระยะเวลา', 'Hosting subdomain', 'Brand Color Presets', 'Content Presets'].map((f, i) => (
                                    <li key={i} className="flex items-center gap-2.5 text-sm">
                                        <div className="w-4 h-4 rounded-full flex items-center justify-center shrink-0"
                                            style={{ background: 'rgba(124,58,237,0.2)' }}>
                                            <Check size={10} className="text-purple-400" />
                                        </div>
                                        {f}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Premium */}
                    <div className="rounded-3xl relative overflow-hidden"
                        style={{
                            background: 'linear-gradient(135deg, rgba(245,158,11,0.1) 0%, rgba(217,119,6,0.05) 100%)',
                            border: '1px solid rgba(245,158,11,0.25)',
                        }}>
                        <div className="absolute top-0 left-0 right-0 h-px"
                            style={{ background: 'linear-gradient(90deg, transparent, rgba(245,158,11,0.4), transparent)' }} />

                        <div className="p-8">
                            <div className="mb-6">
                                <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4"
                                    style={{ background: 'rgba(245,158,11,0.15)', border: '1px solid rgba(245,158,11,0.2)' }}>
                                    <Crown size={22} className="text-amber-400" />
                                </div>
                                <h3 className="text-2xl font-bold mb-1">Premium</h3>
                                <p className="text-sm text-[var(--muted)]">ครบทุกฟีเจอร์</p>
                            </div>

                            <div className="mb-7">
                                <div className="flex items-end gap-2">
                                    <span className="text-5xl font-bold gradient-text-gold">฿299</span>
                                    <span className="text-[var(--muted)] text-sm mb-2">/ เดือน</span>
                                </div>
                                <p className="text-xs text-[var(--muted)] mt-1">ไม่มีสัญญาผูกมัด ยกเลิกได้ทุกเมื่อ</p>
                            </div>

                            <button
                                onClick={() => handleUpgrade('premium')}
                                disabled={loading !== null || success !== null}
                                className="w-full py-3.5 rounded-2xl font-semibold flex items-center justify-center gap-2 mb-7 transition-all hover:-translate-y-0.5 disabled:opacity-60"
                                style={{ background: 'rgba(245,158,11,0.15)', border: '1px solid rgba(245,158,11,0.35)', color: '#fbbf24' }}
                            >
                                {loading === 'premium'
                                    ? <><Loader2 size={18} className="animate-spin" /> กำลังดำเนินการ...</>
                                    : success === 'premium'
                                        ? <><Check size={18} /> อัพเกรดสำเร็จ!</>
                                        : 'อัพเกรดเป็น Premium'
                                }
                            </button>

                            <ul className="space-y-3">
                                {['ทุกอย่างใน Pro', 'Custom Domain', 'Priority Support', 'ไม่มีลายน้ำ'].map((f, i) => (
                                    <li key={i} className="flex items-center gap-2.5 text-sm">
                                        <div className="w-4 h-4 rounded-full flex items-center justify-center shrink-0"
                                            style={{ background: 'rgba(245,158,11,0.2)' }}>
                                            <Check size={10} className="text-amber-400" />
                                        </div>
                                        {f}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Comparison Table */}
                <div className="glass-card rounded-3xl overflow-hidden">
                    <div className="p-6 border-b border-white/5">
                        <h2 className="font-bold text-base">เปรียบเทียบแพ็กเกจ</h2>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-white/5">
                                    <th className="text-left p-4 text-[var(--muted)] font-normal w-2/5">ฟีเจอร์</th>
                                    <th className="p-4 text-center text-[var(--muted)] font-normal">
                                        <div className="flex items-center justify-center gap-1">
                                            <Zap size={13} /> Free
                                        </div>
                                    </th>
                                    <th className="p-4 text-center font-semibold text-purple-400">
                                        <div className="flex items-center justify-center gap-1">
                                            <Star size={13} /> Pro
                                        </div>
                                    </th>
                                    <th className="p-4 text-center font-semibold text-amber-400">
                                        <div className="flex items-center justify-center gap-1">
                                            <Crown size={13} /> Premium
                                        </div>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {COMPARISON.map((row, i) => (
                                    <tr key={i} className="border-b border-white/5 last:border-0 hover:bg-white/2 transition-colors">
                                        <td className="p-4 text-[var(--muted-light)]">{row.feature}</td>
                                        {([row.free, row.pro, row.premium] as (string | boolean)[]).map((val, j) => (
                                            <td key={j} className="p-4 text-center">
                                                {typeof val === 'boolean' ? (
                                                    val
                                                        ? <Check size={16} className="text-green-400 mx-auto" />
                                                        : <X size={14} className="text-[var(--muted)] mx-auto opacity-40" />
                                                ) : (
                                                    <span className={j === 1 ? 'text-purple-300' : j === 2 ? 'text-amber-300' : 'text-[var(--muted)]'}>
                                                        {val}
                                                    </span>
                                                )}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <p className="text-center text-xs text-[var(--muted)] mt-8">
                    * Mock payment — ยังไม่มีการเรียกเก็บเงินจริง สำหรับทดสอบเท่านั้น
                </p>
            </main>
        </div>
    )
}
