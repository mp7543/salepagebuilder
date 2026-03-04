'use client'

import { useSession, signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Check, Sparkles, Zap, Crown, ArrowRight, Star, Layout, Palette, Globe } from 'lucide-react'

export default function LandingPage() {
  const { data: session } = useSession()
  const router = useRouter()

  const handleGetStarted = () => {
    if (session) {
      router.push('/dashboard')
    } else {
      signIn('google', { callbackUrl: '/dashboard' })
    }
  }

  return (
    <div className="min-h-screen w-full max-w-[100vw] bg-[var(--background)]">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center text-white font-bold text-sm">S</div>
            <span className="text-lg font-bold">Sale Page <span className="gradient-text">Builder</span></span>
          </div>
          <div className="flex items-center gap-4">
            {session ? (
              <button onClick={() => router.push('/dashboard')} className="px-5 py-2.5 rounded-xl bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white font-medium transition-all">
                Dashboard
              </button>
            ) : (
              <button onClick={() => signIn('google', { callbackUrl: '/dashboard' })} className="px-5 py-2.5 rounded-xl bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white font-medium transition-all">
                เริ่มต้นฟรี
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-50" />
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-light text-sm text-[var(--muted)] mb-8 animate-fade-in">
            <Sparkles size={14} className="text-purple-400" />
            สร้างเซลเพจ ฟรี 14 วัน
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight animate-slide-up">
            สร้าง<span className="gradient-text"> Sale Page </span>
            <br />สวยระดับมืออาชีพ
          </h1>

          <p className="text-lg md:text-xl text-[var(--muted)] mb-10 max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: '0.2s' }}>
            เลือกเทมเพลท เลือกสี แก้ไขข้อมูล พร้อมใช้ทันที
            <br />ไม่ต้องเขียนโค้ด ไม่ต้องจ้างโปรแกรมเมอร์
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up" style={{ animationDelay: '0.4s' }}>
            <button onClick={handleGetStarted} className="px-8 py-4 rounded-2xl bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white font-semibold text-lg transition-all hover:scale-105 flex items-center gap-2 shadow-lg shadow-purple-500/20">
              เริ่มสร้างฟรี <ArrowRight size={20} />
            </button>
            <a href="#pricing" className="px-8 py-4 rounded-2xl glass-light text-white font-semibold text-lg transition-all hover:bg-white/10">
              ดู Pricing
            </a>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">ทำไมต้องเลือก <span className="gradient-text">Sale Page Builder</span></h2>
          <p className="text-[var(--muted)] mb-12 max-w-2xl mx-auto">สร้างเซลเพจที่ดูดีสำหรับทุกอาชีพ ไม่ว่าจะเป็นนักวางแผนการเงิน นายหน้าอสังหา หรืออาชีพใดก็ตาม</p>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: <Layout size={28} />, title: '3 เทมเพลทสวย', desc: 'Professional, Premium, Minimal ออกแบบมาสำหรับทุกอาชีพ', color: 'from-purple-500/20 to-purple-500/5' },
              { icon: <Palette size={28} />, title: '10+ สีพร้อมใช้', desc: 'สีแบรนด์บริษัทประกันชั้นนำ AIA, FWD, ไทยประกัน และอื่นๆ', color: 'from-cyan-500/20 to-cyan-500/5' },
              { icon: <Globe size={28} />, title: 'Hosting ฟรี', desc: 'ระบบ host ให้ทันที พร้อม custom domain สำหรับ Premium', color: 'from-pink-500/20 to-pink-500/5' },
            ].map((f, i) => (
              <div key={i} className={`p-8 rounded-2xl bg-gradient-to-b ${f.color} border border-white/5 hover:border-white/10 transition-all hover:-translate-y-1 text-center`}>
                <div className="w-14 h-14 rounded-xl bg-white/5 flex items-center justify-center text-purple-400 mb-5 mx-auto">
                  {f.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{f.title}</h3>
                <p className="text-[var(--muted)] text-sm">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Pricing</h2>
          <p className="text-[var(--muted)] mb-12">เลือกแพ็กเกจที่เหมาะกับคุณ</p>

          <div className="grid md:grid-cols-3 gap-6 items-stretch">
            {/* Free */}
            <div className="p-8 rounded-2xl border border-white/10 bg-[var(--card)] hover:border-white/20 transition-all text-center">
              <div className="w-14 h-14 rounded-xl bg-gray-500/10 flex items-center justify-center mb-5 mx-auto">
                <Zap size={28} className="text-gray-400" />
              </div>
              <h3 className="text-2xl font-bold mb-1">Free</h3>
              <p className="text-sm text-[var(--muted)] mb-4">ทดลองใช้</p>
              <div className="text-5xl font-bold mb-1">฿0</div>
              <p className="text-sm text-[var(--muted)] mb-6">14 วัน</p>
              <button onClick={handleGetStarted} className="w-full py-3 rounded-xl border border-white/20 text-white font-medium hover:bg-white/5 transition-all mb-6">
                เริ่มทดลองฟรี
              </button>
              <ul className="space-y-3 text-left">
                {['ใช้งาน 1 เทมเพลท', 'ทดลองใช้ 14 วัน', 'Hosting subdomain', 'แก้ไขข้อมูลได้'].map((f, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-[var(--muted)]">
                    <Check size={16} className="text-green-500 shrink-0" /> {f}
                  </li>
                ))}
              </ul>
            </div>

            {/* Pro */}
            <div className="p-8 rounded-2xl border-2 border-purple-500/50 bg-gradient-to-b from-purple-500/10 to-transparent relative hover:border-purple-500/70 transition-all md:scale-105 text-center">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-purple-500 text-white text-xs font-bold">
                แนะนำ
              </div>
              <div className="w-14 h-14 rounded-xl bg-purple-500/10 flex items-center justify-center mb-5 mx-auto">
                <Star size={28} className="text-purple-400" />
              </div>
              <h3 className="text-2xl font-bold mb-1">Pro</h3>
              <p className="text-sm text-[var(--muted)] mb-4">สำหรับมืออาชีพ</p>
              <div className="text-5xl font-bold mb-1">฿199</div>
              <p className="text-sm text-[var(--muted)] mb-6">ต่อเดือน</p>
              <button onClick={handleGetStarted} className="w-full py-3 rounded-xl bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white font-medium transition-all mb-6">
                อัพเกรดเป็น Pro
              </button>
              <ul className="space-y-3 text-left">
                {['ใช้งานทุกเทมเพลท (3 แบบ)', 'ไม่จำกัดระยะเวลา', 'Hosting subdomain', 'Brand Color Presets', 'Content Presets', 'แก้ไขข้อมูลได้'].map((f, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm">
                    <Check size={16} className="text-purple-400 shrink-0" /> {f}
                  </li>
                ))}
              </ul>
            </div>

            {/* Premium */}
            <div className="p-8 rounded-2xl border border-amber-500/30 bg-gradient-to-b from-amber-500/5 to-transparent hover:border-amber-500/50 transition-all text-center">
              <div className="w-14 h-14 rounded-xl bg-amber-500/10 flex items-center justify-center mb-5 mx-auto">
                <Crown size={28} className="text-amber-400" />
              </div>
              <h3 className="text-2xl font-bold mb-1">Premium</h3>
              <p className="text-sm text-[var(--muted)] mb-4">ครบทุกฟีเจอร์</p>
              <div className="text-5xl font-bold mb-1">฿299</div>
              <p className="text-sm text-[var(--muted)] mb-6">ต่อเดือน</p>
              <button onClick={handleGetStarted} className="w-full py-3 rounded-xl border border-amber-500/30 text-amber-400 font-medium hover:bg-amber-500/10 transition-all mb-6">
                เลือก Premium
              </button>
              <ul className="space-y-3 text-left">
                {['ทุกอย่างของ Pro', 'Custom Domain', 'Priority Support', 'ไม่มีลายน้ำ'].map((f, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm">
                    <Check size={16} className="text-amber-400 shrink-0" /> {f}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-white/5">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-6 h-6 rounded-md bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center text-white font-bold text-xs">S</div>
            <span className="font-bold">Sale Page Builder</span>
          </div>
          <p className="text-sm text-[var(--muted)]">© 2026 Sale Page Builder. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
