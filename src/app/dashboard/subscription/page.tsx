'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Check, ArrowLeft, Loader2, Star, Crown, Zap } from 'lucide-react'

export default function SubscriptionPage() {
    const { data: session } = useSession()
    const router = useRouter()
    const [loading, setLoading] = useState<string | null>(null)

    const handleUpgrade = async (tier: 'pro' | 'premium') => {
        setLoading(tier)
        try {
            const res = await fetch('/api/subscription', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ tier }),
            })
            if (res.ok) {
                alert(`อัพเกรดเป็น ${tier === 'pro' ? 'Pro' : 'Premium'} สำเร็จ! 🎉`)
                router.push('/dashboard')
                router.refresh()
            }
        } catch (e) {
            alert('เกิดข้อผิดพลาด กรุณาลองใหม่')
        } finally {
            setLoading(null)
        }
    }

    return (
        <div className="min-h-screen">
            <header className="glass sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center gap-4">
                    <button onClick={() => router.push('/dashboard')} className="p-2 rounded-lg hover:bg-white/5 transition-all">
                        <ArrowLeft size={20} />
                    </button>
                    <span className="text-lg font-bold">อัพเกรดแพ็กเกจ</span>
                </div>
            </header>

            <main className="max-w-4xl mx-auto px-6 py-12">
                <h1 className="text-3xl font-bold text-center mb-2">เลือกแพ็กเกจที่เหมาะกับคุณ</h1>
                <p className="text-center text-[var(--muted)] mb-12">อัพเกรดเพื่อปลดล็อคฟีเจอร์เพิ่มเติม</p>

                <div className="grid md:grid-cols-2 gap-6">
                    {/* Pro */}
                    <div className="p-8 rounded-2xl border-2 border-purple-500/50 bg-gradient-to-b from-purple-500/10 to-transparent relative">
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-purple-500 text-white text-xs font-bold">แนะนำ</div>
                        <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center mb-4">
                            <Star size={24} className="text-purple-400" />
                        </div>
                        <h3 className="text-2xl font-bold mb-1">Pro</h3>
                        <div className="text-4xl font-bold mb-1">฿199<span className="text-base font-normal text-[var(--muted)]">/เดือน</span></div>
                        <p className="text-sm text-[var(--muted)] mb-6">สำหรับมืออาชีพ</p>
                        <button onClick={() => handleUpgrade('pro')} disabled={loading !== null} className="w-full py-3 rounded-xl bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white font-medium transition-all disabled:opacity-50 flex items-center justify-center gap-2 mb-6">
                            {loading === 'pro' ? <Loader2 size={18} className="animate-spin" /> : null}
                            อัพเกรดเป็น Pro
                        </button>
                        <ul className="space-y-3">
                            {['ใช้งานทุกเทมเพลท (3 แบบ)', 'ไม่จำกัดระยะเวลา', 'Hosting subdomain', 'Brand Color Presets', 'Content Presets'].map((f, i) => (
                                <li key={i} className="flex items-center gap-2 text-sm"><Check size={16} className="text-purple-400 shrink-0" /> {f}</li>
                            ))}
                        </ul>
                    </div>

                    {/* Premium */}
                    <div className="p-8 rounded-2xl border border-amber-500/30 bg-gradient-to-b from-amber-500/5 to-transparent">
                        <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center mb-4">
                            <Crown size={24} className="text-amber-400" />
                        </div>
                        <h3 className="text-2xl font-bold mb-1">Premium</h3>
                        <div className="text-4xl font-bold mb-1">฿299<span className="text-base font-normal text-[var(--muted)]">/เดือน</span></div>
                        <p className="text-sm text-[var(--muted)] mb-6">ครบทุกฟีเจอร์</p>
                        <button onClick={() => handleUpgrade('premium')} disabled={loading !== null} className="w-full py-3 rounded-xl border border-amber-500/30 text-amber-400 font-medium hover:bg-amber-500/10 transition-all disabled:opacity-50 flex items-center justify-center gap-2 mb-6">
                            {loading === 'premium' ? <Loader2 size={18} className="animate-spin" /> : null}
                            อัพเกรดเป็น Premium
                        </button>
                        <ul className="space-y-3">
                            {['ทุกอย่างของ Pro', 'Custom Domain', 'Priority Support', 'ไม่มีลายน้ำ'].map((f, i) => (
                                <li key={i} className="flex items-center gap-2 text-sm"><Check size={16} className="text-amber-400 shrink-0" /> {f}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </main>
        </div>
    )
}
