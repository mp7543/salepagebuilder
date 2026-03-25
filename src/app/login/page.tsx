'use client'

import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Shield, Sparkles, Check, Layout, Palette, Globe, Zap, ArrowRight } from 'lucide-react'

const BENEFITS = [
    { icon: <Layout size={18} />, title: '3 เทมเพลทมืออาชีพ', desc: 'ออกแบบมาเฉพาะสำหรับนักวางแผนการเงินและนายหน้า' },
    { icon: <Palette size={18} />, title: '10+ สีแบรนด์พร้อมใช้', desc: 'สีของ AIA, FWD, ไทยประกัน และอื่นๆ' },
    { icon: <Globe size={18} />, title: 'เผยแพร่ได้ทันที', desc: 'ได้ URL พร้อมใช้แชร์ผ่าน Line, Facebook' },
    { icon: <Zap size={18} />, title: 'Auto-Save อัตโนมัติ', desc: 'ไม่ต้องกลัวข้อมูลหาย บันทึกทุก 1.5 วินาที' },
]

export default function LoginPage() {
    const { data: session } = useSession()
    const router = useRouter()
    const [demoEmail, setDemoEmail] = useState('demo@example.com')
    const [demoName, setDemoName] = useState('Demo User')
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        if (session) {
            router.push('/dashboard')
        }
    }, [session, router])

    const handleDemoLogin = async () => {
        setIsLoading(true)
        await signIn('credentials', {
            email: demoEmail,
            name: demoName,
            callbackUrl: '/dashboard',
        })
        setIsLoading(false)
    }

    return (
        <div className="min-h-screen relative overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 grid-pattern opacity-25" />
            <div className="blob-purple w-[500px] h-[500px] top-[-100px] left-[-150px] opacity-60" />
            <div className="blob-cyan w-[400px] h-[400px] bottom-[-80px] right-[-100px] opacity-50" />
            <div className="blob-pink w-[300px] h-[300px] top-[50%] right-[10%] opacity-30" />

            <div className="relative z-10 min-h-screen flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16 px-4 sm:px-8 py-12">

                {/* Left side — Benefits (hidden on mobile, shown on lg+) */}
                <div className="hidden lg:block w-full max-w-md">
                    <div className="mb-8">
                        <div className="flex items-center gap-2.5 mb-6">
                            <div className="w-9 h-9 rounded-xl gradient-bg-primary flex items-center justify-center text-white font-bold text-sm shadow-lg">S</div>
                            <span className="text-lg font-bold tracking-tight">Sale Page <span className="gradient-text">Builder</span></span>
                        </div>
                        <h2 className="text-3xl font-bold mb-3 leading-tight">
                            สร้าง Sale Page<br />
                            <span className="gradient-text">สวยระดับมืออาชีพ</span>
                        </h2>
                        <p className="text-[var(--muted)] text-sm leading-relaxed">
                            เครื่องมือสร้างเซลเพจสำหรับนักวางแผนการเงินและนายหน้า ไม่ต้องเขียนโค้ด
                        </p>
                    </div>

                    <div className="space-y-4">
                        {BENEFITS.map((b, i) => (
                            <div key={i} className="flex items-start gap-3.5 p-3 rounded-xl transition-all group hover:bg-white/3">
                                <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 text-purple-400"
                                    style={{ background: 'rgba(124,58,237,0.12)', border: '1px solid rgba(124,58,237,0.2)' }}>
                                    {b.icon}
                                </div>
                                <div>
                                    <p className="text-sm font-semibold mb-0.5">{b.title}</p>
                                    <p className="text-xs text-[var(--muted)]">{b.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-8 flex items-center gap-3 text-xs text-[var(--muted)]">
                        <div className="flex -space-x-2">
                            {['#a78bfa', '#67e8f9', '#f472b6', '#4ade80'].map((c, i) => (
                                <div key={i} className="w-6 h-6 rounded-full border-2 border-[var(--background)]" style={{ background: c }} />
                            ))}
                        </div>
                        <span>1,200+ นักวางแผนการเงินใช้งานแล้ว</span>
                    </div>
                </div>

                {/* Right side — Login Card */}
                <div className="w-full max-w-md animate-scale-in">
                    <div className="p-7 sm:p-8 rounded-3xl"
                        style={{
                            background: 'rgba(12, 12, 20, 0.85)',
                            backdropFilter: 'blur(24px)',
                            border: '1px solid rgba(255,255,255,0.08)',
                            boxShadow: '0 32px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.04), inset 0 1px 0 rgba(255,255,255,0.06)',
                        }}>

                        {/* Logo + Brand */}
                        <div className="text-center mb-7">
                            <div className="relative inline-block mb-4">
                                <div className="w-[64px] h-[64px] rounded-2xl gradient-bg-primary flex items-center justify-center text-white font-bold text-2xl mx-auto shadow-2xl animate-pulse-glow">
                                    S
                                </div>
                                <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-green-400 border-2 border-[var(--background)] flex items-center justify-center">
                                    <Check size={10} className="text-white" strokeWidth={3} />
                                </div>
                            </div>
                            <h1 className="text-xl sm:text-2xl font-bold mb-1.5 tracking-tight">ยินดีต้อนรับ</h1>
                            <p className="text-[var(--muted)] text-sm">เข้าสู่ระบบเพื่อเริ่มสร้าง Sale Page ของคุณ</p>
                        </div>

                        {/* Google Button */}
                        <button
                            onClick={() => signIn('google', { callbackUrl: '/dashboard' })}
                            className="w-full flex items-center justify-center gap-3 py-3.5 sm:py-4 px-6 rounded-2xl font-semibold text-gray-800 text-sm sm:text-base transition-all duration-200 hover:scale-[1.02] hover:shadow-xl active:scale-[0.98]"
                            style={{ background: 'white', boxShadow: '0 4px 20px rgba(0,0,0,0.3)' }}
                        >
                            <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
                                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
                                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                            </svg>
                            เข้าสู่ระบบด้วย Google
                        </button>

                        {/* Divider */}
                        <div className="flex items-center gap-3 my-5">
                            <div className="flex-1 h-px bg-white/10" />
                            <span className="text-xs text-[var(--muted)]">หรือ Demo Login</span>
                            <div className="flex-1 h-px bg-white/10" />
                        </div>

                        {/* Demo Login Form */}
                        <div className="space-y-3">
                            <input
                                type="email"
                                value={demoEmail}
                                onChange={(e) => setDemoEmail(e.target.value)}
                                placeholder="Email"
                                className="w-full px-4 py-3 rounded-xl text-sm bg-white/5 border border-white/10 text-white placeholder-white/30 outline-none focus:border-purple-500/50 focus:bg-white/8 transition-all"
                            />
                            <input
                                type="text"
                                value={demoName}
                                onChange={(e) => setDemoName(e.target.value)}
                                placeholder="ชื่อ"
                                className="w-full px-4 py-3 rounded-xl text-sm bg-white/5 border border-white/10 text-white placeholder-white/30 outline-none focus:border-purple-500/50 focus:bg-white/8 transition-all"
                            />
                            <button
                                onClick={handleDemoLogin}
                                disabled={isLoading || !demoEmail}
                                className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl font-semibold text-sm transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none"
                                style={{
                                    background: 'linear-gradient(135deg, #7c3aed, #6d28d9)',
                                    boxShadow: '0 4px 20px rgba(124,58,237,0.3)',
                                }}
                            >
                                {isLoading ? (
                                    <span className="animate-spin w-4 h-4 border-2 border-white/30 border-t-white rounded-full" />
                                ) : (
                                    <>
                                        <Zap size={16} />
                                        เข้าสู่ระบบ Demo
                                    </>
                                )}
                            </button>
                        </div>

                        {/* Trust signals */}
                        <div className="mt-5 flex items-center justify-center gap-1.5 text-xs text-[var(--muted)]">
                            <Shield size={11} className="text-green-500" />
                            <span>ปลอดภัย — ไม่เก็บรหัสผ่าน ใช้ Google OAuth</span>
                        </div>

                        <div className="mt-5 pt-5 border-t border-white/5">
                            <div className="grid grid-cols-3 gap-2 sm:gap-3 text-center">
                                {[
                                    { icon: '🆓', label: 'ฟรี 14 วัน' },
                                    { icon: '💳', label: 'ไม่ต้องบัตรเครดิต' },
                                    { icon: '⚡', label: 'เริ่มได้ทันที' },
                                ].map((item, i) => (
                                    <div key={i} className="p-2 sm:p-2.5 rounded-xl bg-white/3 border border-white/5 flex flex-col items-center gap-1">
                                        <span className="text-base sm:text-lg">{item.icon}</span>
                                        <span className="text-[9px] sm:text-[10px] text-[var(--muted)] leading-tight">{item.label}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Mobile-only benefits */}
                        <div className="mt-5 pt-5 border-t border-white/5 lg:hidden">
                            <div className="space-y-2.5">
                                {BENEFITS.slice(0, 3).map((b, i) => (
                                    <div key={i} className="flex items-center gap-2.5 text-xs text-[var(--muted)]">
                                        <Check size={12} className="text-green-400 shrink-0" />
                                        <span>{b.title}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Below card */}
                    <div className="flex items-center justify-center gap-1.5 mt-5 text-xs text-[var(--muted)]">
                        <Sparkles size={11} className="text-purple-400" />
                        <span>Sale Page Builder — สร้างเพจมืออาชีพได้ในไม่กี่นาที</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
