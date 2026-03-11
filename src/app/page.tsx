'use client'

import { useSession, signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { Check, Sparkles, Zap, Crown, ArrowRight, Star, Layout, Palette, Globe, Shield, Bolt, Users, ChevronRight, Menu, X, Eye } from 'lucide-react'

/* ═══════ DATA ═══════ */

const FEATURES = [
  {
    icon: <Layout size={22} />,
    title: '3 เทมเพลทสวยงาม',
    desc: 'Professional, Premium, Minimal — ออกแบบมาสำหรับนักวางแผนการเงิน, นายหน้าอสังหา และทุกอาชีพ',
    color: 'purple',
    gradient: 'from-purple-500/20 via-purple-500/5 to-transparent',
    border: 'rgba(124,58,237,0.25)',
    iconBg: 'rgba(124,58,237,0.15)',
    iconColor: '#a78bfa',
  },
  {
    icon: <Palette size={22} />,
    title: '10+ สีแบรนด์พร้อมใช้',
    desc: 'สีแบรนด์บริษัทประกันชั้นนำ AIA, FWD, ไทยประกัน และอื่นๆ ปรับได้ตามต้องการ',
    color: 'cyan',
    gradient: 'from-cyan-500/20 via-cyan-500/5 to-transparent',
    border: 'rgba(6,182,212,0.25)',
    iconBg: 'rgba(6,182,212,0.15)',
    iconColor: '#67e8f9',
  },
  {
    icon: <Globe size={22} />,
    title: 'Hosting ฟรีทันที',
    desc: 'เผยแพร่เพจได้เลย มี URL พร้อมใช้ รองรับ Custom Domain สำหรับแพ็กเกจ Premium',
    color: 'pink',
    gradient: 'from-pink-500/20 via-pink-500/5 to-transparent',
    border: 'rgba(236,72,153,0.25)',
    iconBg: 'rgba(236,72,153,0.15)',
    iconColor: '#f472b6',
  },
  {
    icon: <Bolt size={22} />,
    title: 'Auto-Save ทุก 1.5 วินาที',
    desc: 'ระบบบันทึกอัตโนมัติ ไม่ต้องกังวลว่าจะสูญหาย แก้ไขได้อย่างอิสระ',
    color: 'amber',
    gradient: 'from-amber-500/15 via-amber-500/5 to-transparent',
    border: 'rgba(245,158,11,0.2)',
    iconBg: 'rgba(245,158,11,0.12)',
    iconColor: '#fbbf24',
  },
  {
    icon: <Users size={22} />,
    title: 'Content Presets สำเร็จรูป',
    desc: 'เนื้อหาสำเร็จรูปสำหรับนักวางแผนการเงินและนายหน้าอสังหา แก้ไขได้ภายในนาที',
    color: 'green',
    gradient: 'from-green-500/15 via-green-500/5 to-transparent',
    border: 'rgba(34,197,94,0.2)',
    iconBg: 'rgba(34,197,94,0.12)',
    iconColor: '#4ade80',
  },
  {
    icon: <Shield size={22} />,
    title: 'ปลอดภัย ด้วย Google Auth',
    desc: 'เข้าสู่ระบบด้วย Google Account ปลอดภัย ไม่ต้องจำรหัสผ่านเพิ่ม',
    color: 'blue',
    gradient: 'from-blue-500/15 via-blue-500/5 to-transparent',
    border: 'rgba(59,130,246,0.2)',
    iconBg: 'rgba(59,130,246,0.12)',
    iconColor: '#93c5fd',
  },
]

const STEPS = [
  { num: '01', title: 'เข้าสู่ระบบด้วย Google', desc: 'คลิกเดียว เริ่มต้นฟรีทันที ไม่ต้องสมัครสมาชิกซับซ้อน' },
  { num: '02', title: 'เลือกเทมเพลทและสีธีม', desc: 'เลือกจาก 3 เทมเพลทและสีแบรนด์กว่า 10 แบบที่พร้อมใช้งาน' },
  { num: '03', title: 'แก้ไขเนื้อหาของคุณ', desc: 'ใส่ชื่อ รูปโปรไฟล์ บริการ รีวิว และข้อมูลติดต่อ' },
  { num: '04', title: 'เผยแพร่และแชร์', desc: 'กดเผยแพร่ได้ URL ทันที พร้อมแชร์ให้ลูกค้าผ่าน Line, Facebook' },
]

const TEMPLATES = [
  {
    id: 'professional',
    name: 'Professional',
    subtitle: 'นักวางแผนการเงิน',
    icon: '💰',
    color: '#10b981',
    bg: '#ecfdf5',
    features: ['โทนสีเขียว Emerald', 'เน้นความน่าเชื่อถือ', 'แสดงใบรับรอง & สถิติ'],
  },
  {
    id: 'premium',
    name: 'Premium',
    subtitle: 'นายหน้าอสังหาริมทรัพย์',
    icon: '🏠',
    color: '#3b82f6',
    bg: '#eff6ff',
    features: ['โทนสีน้ำเงิน Ocean', 'ดีไซน์สไตล์ Apple', 'เน้นรูปภาพ & Portfolio'],
  },
  {
    id: 'minimal',
    name: 'Minimal',
    subtitle: 'ฟรีแลนซ์ / ทั่วไป',
    icon: '✏️',
    color: '#6366f1',
    bg: '#f5f3ff',
    features: ['โทนสีม่วง Indigo', 'เรียบง่าย ทันสมัย', 'เหมาะกับทุกอาชีพ'],
  },
]

/* ═══════ SCROLL REVEAL HOOK ═══════ */

function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed')
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    )
    const items = el.querySelectorAll('.scroll-reveal, .scroll-reveal-scale')
    items.forEach((item) => observer.observe(item))
    return () => observer.disconnect()
  }, [])
  return ref
}

/* ═══════ COMPONENT ═══════ */

export default function LandingPage() {
  const { data: session } = useSession()
  const router = useRouter()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeTemplate, setActiveTemplate] = useState(0)
  const scrollRef = useScrollReveal()

  const handleGetStarted = () => {
    if (session) {
      router.push('/dashboard')
    } else {
      signIn('google', { callbackUrl: '/dashboard' })
    }
  }

  return (
    <div ref={scrollRef} className="min-h-screen w-full max-w-[100vw] bg-[var(--background)]">

      {/* ===== NAV ===== */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg gradient-bg-primary flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-purple-500/30">S</div>
            <span className="text-base sm:text-lg font-bold tracking-tight">Sale Page <span className="gradient-text">Builder</span></span>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <a href="#features" className="hidden md:block text-sm text-[var(--muted)] hover:text-white transition-colors px-3 py-2">ฟีเจอร์</a>
            <a href="#templates" className="hidden md:block text-sm text-[var(--muted)] hover:text-white transition-colors px-3 py-2">เทมเพลท</a>
            <a href="#pricing" className="hidden md:block text-sm text-[var(--muted)] hover:text-white transition-colors px-3 py-2">Pricing</a>
            {session ? (
              <button onClick={() => router.push('/dashboard')} className="btn-primary px-4 sm:px-5 py-2 sm:py-2.5 text-sm flex items-center gap-1.5">
                Dashboard <ChevronRight size={14} />
              </button>
            ) : (
              <button onClick={() => signIn('google', { callbackUrl: '/dashboard' })} className="hidden sm:block btn-primary px-5 py-2.5 text-sm">
                เริ่มต้นฟรี
              </button>
            )}
            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden p-2 rounded-lg btn-ghost text-[var(--muted)] hover:text-white"
            >
              <Menu size={20} />
            </button>
          </div>
        </div>
      </nav>

      {/* ===== MOBILE BOTTOM SHEET MENU ===== */}
      {mobileMenuOpen && (
        <>
          <div className="bottom-sheet-overlay" onClick={() => setMobileMenuOpen(false)} />
          <div className="bottom-sheet">
            <div className="bottom-sheet-handle" />
            <div className="px-6 pt-4 pb-2 flex items-center justify-between">
              <span className="font-bold text-base">เมนู</span>
              <button onClick={() => setMobileMenuOpen(false)} className="p-2 rounded-lg text-[var(--muted)] hover:text-white">
                <X size={18} />
              </button>
            </div>
            <div className="px-6 pb-6 space-y-1">
              {[
                { label: 'ฟีเจอร์', href: '#features' },
                { label: 'เทมเพลท', href: '#templates' },
                { label: 'Pricing', href: '#pricing' },
              ].map((item) => (
                <a key={item.href} href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-4 py-3.5 rounded-xl text-base font-medium text-[var(--muted-light)] hover:text-white hover:bg-white/5 transition-all">
                  {item.label}
                </a>
              ))}
              <div className="pt-3">
                <button onClick={handleGetStarted}
                  className="btn-primary w-full py-3.5 text-base flex items-center justify-center gap-2">
                  {session ? 'ไปยัง Dashboard' : 'เริ่มสร้างฟรีเลย'} <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* ===== HERO ===== */}
      <section className="pt-28 sm:pt-36 pb-16 sm:pb-24 px-4 sm:px-6 relative overflow-hidden">
        {/* Background layers */}
        <div className="absolute inset-0 grid-pattern opacity-40" />
        <div className="blob-purple w-[300px] sm:w-[600px] h-[300px] sm:h-[600px] top-[-50px] sm:top-[-100px] left-[-80px] sm:left-[-100px] opacity-60" />
        <div className="blob-cyan w-[250px] sm:w-[500px] h-[250px] sm:h-[500px] bottom-0 right-[-60px] sm:right-[-100px] opacity-50" />
        <div className="blob-pink w-[150px] sm:w-[300px] h-[150px] sm:h-[300px] top-[40%] left-[60%] opacity-40" />

        <div className="max-w-5xl mx-auto text-center relative z-10">
          {/* Pill badge */}
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full glass-light text-xs sm:text-sm text-[var(--muted-light)] mb-6 sm:mb-8 animate-fade-in">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            <Sparkles size={13} className="text-purple-400" />
            ทดลองใช้ฟรี 14 วัน — ไม่ต้องใส่บัตรเครดิต
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold mb-4 sm:mb-6 leading-[1.1] tracking-tight animate-slide-up">
            สร้าง<span className="gradient-text"> Sale Page </span><br />
            สวยระดับมืออาชีพ
          </h1>

          <p className="text-sm sm:text-lg md:text-xl text-[var(--muted)] mb-8 sm:mb-10 max-w-2xl mx-auto leading-relaxed animate-slide-up" style={{ animationDelay: '0.15s' }}>
            เลือกเทมเพลท เลือกสีแบรนด์ แก้ไขเนื้อหา แล้วเผยแพร่ได้ทันที<br className="hidden sm:block" />
            <span className="text-[var(--muted-light)]">ไม่ต้องเขียนโค้ด ไม่ต้องจ้างโปรแกรมเมอร์</span>
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 animate-slide-up" style={{ animationDelay: '0.3s' }}>
            <button onClick={handleGetStarted}
              className="btn-primary w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 text-base sm:text-lg flex items-center justify-center gap-2.5 animate-pulse-glow">
              เริ่มสร้างฟรีเลย <ArrowRight size={18} />
            </button>
            <a href="#pricing" className="w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 rounded-2xl glass-light text-white font-semibold text-base sm:text-lg transition-all hover:bg-white/10 flex items-center justify-center gap-2">
              ดูแพ็กเกจ <ChevronRight size={18} />
            </a>
          </div>

          {/* Social proof */}
          <div className="mt-10 sm:mt-14 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 animate-fade-in" style={{ animationDelay: '0.5s' }}>
            <div className="flex items-center gap-2 text-xs sm:text-sm text-[var(--muted)]">
              <div className="flex -space-x-2">
                {['#a78bfa', '#67e8f9', '#f472b6', '#4ade80'].map((c, i) => (
                  <div key={i} className="w-6 sm:w-7 h-6 sm:h-7 rounded-full border-2 border-[var(--background)]" style={{ background: c }} />
                ))}
              </div>
              <span>นักวางแผนการเงิน &amp; นายหน้า ใช้งานอยู่</span>
            </div>
            <div className="hidden sm:block w-px h-4 bg-[var(--border)]" />
            <div className="flex items-center gap-1.5 text-xs sm:text-sm text-[var(--muted)]">
              {[1, 2, 3, 4, 5].map(i => <Star key={i} size={13} className="text-amber-400 fill-amber-400" />)}
              <span>4.9/5 จากผู้ใช้จริง</span>
            </div>
          </div>
        </div>

        {/* Floating cards decoration — desktop only */}
        <div className="hidden lg:block">
          <div className="absolute left-[4%] top-[35%] glass-card p-3 rounded-xl animate-float" style={{ animationDelay: '0s' }}>
            <div className="flex items-center gap-2 text-xs">
              <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center">✓</div>
              <span className="text-[var(--muted-light)]">เผยแพร่แล้ว!</span>
            </div>
          </div>
          <div className="absolute right-[4%] top-[28%] glass-card p-3 rounded-xl animate-float" style={{ animationDelay: '1.5s' }}>
            <div className="text-xs text-[var(--muted-light)]">
              <div className="text-white font-semibold text-sm">Auto-Save ✓</div>
              <div>บันทึกอัตโนมัติแล้ว</div>
            </div>
          </div>
          <div className="absolute left-[6%] top-[62%] glass-card p-3 rounded-xl animate-float" style={{ animationDelay: '3s' }}>
            <div className="flex items-center gap-2 text-xs">
              <div className="w-2 h-2 rounded-full bg-purple-400" />
              <span className="text-[var(--muted-light)]">Live Preview</span>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FEATURES ===== */}
      <section id="features" className="py-16 sm:py-24 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10 sm:mb-16 scroll-reveal">
            <div className="section-label mb-4 sm:mb-5 mx-auto" style={{ width: 'fit-content' }}>
              <Layout size={13} /> ฟีเจอร์ครบครัน
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-3 sm:mb-4">
              ทุกอย่างที่คุณต้องการ<br /><span className="gradient-text">อยู่ในที่เดียว</span>
            </h2>
            <p className="text-[var(--muted)] max-w-xl mx-auto leading-relaxed text-sm sm:text-base">
              สร้างเซลเพจระดับมืออาชีพได้ภายในไม่กี่นาที ไม่ต้องมีความรู้ด้านเทคนิค
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {FEATURES.map((f, i) => (
              <div key={i} className={`scroll-reveal-scale p-5 sm:p-6 rounded-2xl bg-gradient-to-br ${f.gradient} transition-all duration-300 hover:-translate-y-1 hover:shadow-xl`}
                data-delay={String((i % 3) + 1)}
                style={{ border: `1px solid ${f.border}` }}>
                <div className="w-10 sm:w-11 h-10 sm:h-11 rounded-xl flex items-center justify-center mb-3 sm:mb-4" style={{ background: f.iconBg, color: f.iconColor }}>
                  {f.icon}
                </div>
                <h3 className="font-semibold text-sm sm:text-base mb-1.5 sm:mb-2">{f.title}</h3>
                <p className="text-[var(--muted)] text-xs sm:text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TEMPLATE SHOWCASE ===== */}
      <section id="templates" className="py-16 sm:py-24 px-4 sm:px-6 relative overflow-hidden">
        <div className="absolute inset-0 dot-pattern opacity-20" />
        <div className="blob-cyan w-60 sm:w-80 h-60 sm:h-80 top-0 left-0 opacity-30" />

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-10 sm:mb-14 scroll-reveal">
            <div className="section-label mb-4 sm:mb-5 mx-auto" style={{ width: 'fit-content' }}>
              <Eye size={13} /> ดูตัวอย่างเทมเพลท
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-3 sm:mb-4">
              เลือกดีไซน์ที่ใช่<br /><span className="gradient-text">สำหรับคุณ</span>
            </h2>
            <p className="text-[var(--muted)] max-w-xl mx-auto text-sm sm:text-base">
              3 เทมเพลทที่ออกแบบมาเฉพาะสำหรับมืออาชีพ
            </p>
          </div>

          {/* Template tabs */}
          <div className="flex justify-center gap-2 sm:gap-3 mb-8 sm:mb-10 scroll-reveal">
            {TEMPLATES.map((t, i) => (
              <button
                key={t.id}
                onClick={() => setActiveTemplate(i)}
                className={`px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl text-xs sm:text-sm font-semibold transition-all duration-300 ${activeTemplate === i ? 'text-white scale-105 shadow-lg' : 'glass-light text-[var(--muted-light)] hover:text-white'}`}
                style={activeTemplate === i ? { background: t.color, boxShadow: `0 8px 24px ${t.color}40` } : {}}
              >
                <span className="mr-1.5">{t.icon}</span> {t.name}
              </button>
            ))}
          </div>

          {/* Template preview card */}
          <div className="scroll-reveal-scale max-w-3xl mx-auto">
            <div className="rounded-2xl sm:rounded-3xl overflow-hidden transition-all duration-500"
              style={{ border: `1px solid ${TEMPLATES[activeTemplate].color}30`, boxShadow: `0 20px 60px ${TEMPLATES[activeTemplate].color}15, 0 0 0 1px ${TEMPLATES[activeTemplate].color}10` }}>

              {/* Preview header bar */}
              <div className="flex items-center gap-2 px-4 sm:px-5 py-3 sm:py-3.5" style={{ background: TEMPLATES[activeTemplate].color + '15', borderBottom: `1px solid ${TEMPLATES[activeTemplate].color}20` }}>
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-400/60" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/60" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-400/60" />
                </div>
                <div className="flex-1 text-center">
                  <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-md text-[10px] sm:text-xs" style={{ background: 'rgba(255,255,255,0.05)', color: 'var(--muted-light)' }}>
                    <Globe size={9} /> yourname.salepage.app
                  </div>
                </div>
              </div>

              {/* Preview mock */}
              <div className="p-6 sm:p-10" style={{ background: TEMPLATES[activeTemplate].bg }}>
                <div className="max-w-lg mx-auto">
                  {/* Mini wireframe */}
                  <div className="space-y-4 sm:space-y-5">
                    <div className="flex items-center gap-3">
                      <div className="w-14 sm:w-16 h-14 sm:h-16 rounded-2xl flex items-center justify-center text-3xl sm:text-4xl" style={{ background: `${TEMPLATES[activeTemplate].color}15` }}>
                        {TEMPLATES[activeTemplate].icon}
                      </div>
                      <div className="flex-1">
                        <div className="h-3 sm:h-4 rounded-full w-2/3 mb-2" style={{ background: TEMPLATES[activeTemplate].color }} />
                        <div className="h-2 sm:h-2.5 rounded-full w-1/2" style={{ background: '#e2e8f0' }} />
                      </div>
                    </div>
                    <div className="h-2 sm:h-2.5 rounded-full w-5/6" style={{ background: '#e2e8f0' }} />
                    <div className="h-2 sm:h-2.5 rounded-full w-3/4" style={{ background: '#e2e8f0' }} />
                    <div className="grid grid-cols-3 gap-2 sm:gap-3 mt-4">
                      {[0, 1, 2].map(j => (
                        <div key={j} className="rounded-xl p-3 sm:p-4" style={{ background: `${TEMPLATES[activeTemplate].color}10`, border: `1px solid ${TEMPLATES[activeTemplate].color}20` }}>
                          <div className="h-2 rounded-full w-3/4 mb-2" style={{ background: TEMPLATES[activeTemplate].color + '40' }} />
                          <div className="h-1.5 rounded-full w-1/2" style={{ background: '#e2e8f0' }} />
                        </div>
                      ))}
                    </div>
                    <div className="h-10 sm:h-12 rounded-xl w-1/2" style={{ background: TEMPLATES[activeTemplate].color }} />
                  </div>
                </div>
              </div>

              {/* Template info */}
              <div className="px-5 sm:px-8 py-5 sm:py-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4" style={{ background: 'var(--card)' }}>
                <div>
                  <h3 className="font-bold text-base sm:text-lg mb-1">{TEMPLATES[activeTemplate].name} — <span className="text-[var(--muted)]">{TEMPLATES[activeTemplate].subtitle}</span></h3>
                  <div className="flex flex-wrap gap-2 sm:gap-3">
                    {TEMPLATES[activeTemplate].features.map((feat, fi) => (
                      <span key={fi} className="flex items-center gap-1 text-xs text-[var(--muted)]">
                        <Check size={11} style={{ color: TEMPLATES[activeTemplate].color }} /> {feat}
                      </span>
                    ))}
                  </div>
                </div>
                <button onClick={handleGetStarted}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl text-sm font-semibold text-white flex items-center justify-center gap-1.5 transition-all hover:-translate-y-0.5 shrink-0"
                  style={{ background: TEMPLATES[activeTemplate].color }}>
                  ลองใช้เทมเพลทนี้ <ArrowRight size={14} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 relative overflow-hidden">
        <div className="absolute inset-0 dot-pattern opacity-30" />
        <div className="blob-purple w-60 sm:w-80 h-60 sm:h-80 top-0 right-0 opacity-30" />

        <div className="max-w-5xl mx-auto relative z-10">
          <div className="text-center mb-10 sm:mb-16 scroll-reveal">
            <div className="section-label mb-4 sm:mb-5 mx-auto" style={{ width: 'fit-content' }}>
              <Sparkles size={13} /> ขั้นตอนง่ายๆ
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-3 sm:mb-4">
              เริ่มสร้างได้ใน<br /><span className="gradient-text">4 ขั้นตอน</span>
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
            {STEPS.map((s, i) => (
              <div key={i} className="scroll-reveal glass-card p-5 sm:p-6 rounded-2xl flex gap-4 sm:gap-5 group"
                data-delay={String(i + 1)}>
                <div className="shrink-0">
                  <div className="w-11 sm:w-12 h-11 sm:h-12 rounded-xl sm:rounded-2xl gradient-bg-primary flex items-center justify-center text-white font-bold text-base sm:text-lg shadow-lg shadow-purple-500/20 group-hover:scale-110 transition-transform">
                    {s.num}
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-sm sm:text-base mb-1 sm:mb-1.5">{s.title}</h3>
                  <p className="text-[var(--muted)] text-xs sm:text-sm leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10 sm:mt-12 scroll-reveal">
            <button onClick={handleGetStarted} className="btn-primary w-full sm:w-auto px-8 sm:px-10 py-3.5 sm:py-4 text-sm sm:text-base flex items-center justify-center gap-2 mx-auto">
              เริ่มเลย — ฟรี 14 วัน <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </section>

      {/* ===== PRICING ===== */}
      <section id="pricing" className="py-16 sm:py-24 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10 sm:mb-16 scroll-reveal">
            <div className="section-label mb-4 sm:mb-5 mx-auto" style={{ width: 'fit-content' }}>
              <Crown size={13} /> แพ็กเกจราคา
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-3 sm:mb-4">
              ราคาที่เข้าถึงได้<br /><span className="gradient-text">สำหรับทุกคน</span>
            </h2>
            <p className="text-[var(--muted)] max-w-md mx-auto text-sm sm:text-base">เลือกแพ็กเกจที่เหมาะกับธุรกิจของคุณ อัพเกรดหรือดาวน์เกรดได้ทุกเมื่อ</p>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5 sm:gap-6 items-stretch">
            {/* Free */}
            <div className="scroll-reveal-scale glass-card p-6 sm:p-8 rounded-2xl sm:rounded-3xl flex flex-col" data-delay="1">
              <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-xl sm:rounded-2xl bg-white/5 flex items-center justify-center mb-4 sm:mb-5">
                <Zap size={20} className="text-[var(--muted-light)]" />
              </div>
              <div className="mb-5 sm:mb-6">
                <h3 className="text-lg sm:text-xl font-bold mb-1">Free</h3>
                <p className="text-xs sm:text-sm text-[var(--muted)]">สำหรับทดลองใช้</p>
              </div>
              <div className="mb-5 sm:mb-6">
                <span className="text-4xl sm:text-5xl font-bold">฿0</span>
                <span className="text-[var(--muted)] ml-2 text-xs sm:text-sm">/ 14 วัน</span>
              </div>
              <button onClick={handleGetStarted}
                className="w-full py-3 rounded-xl sm:rounded-2xl btn-ghost text-white font-medium mb-6 sm:mb-7">
                เริ่มทดลองฟรี
              </button>
              <ul className="space-y-2.5 sm:space-y-3 mt-auto">
                {['ใช้งาน 1 เทมเพลท', 'ทดลองใช้ 14 วัน', 'Hosting subdomain', 'แก้ไขข้อมูลได้'].map((f, i) => (
                  <li key={i} className="flex items-center gap-2 sm:gap-2.5 text-xs sm:text-sm text-[var(--muted)]">
                    <Check size={14} className="text-green-400 shrink-0" /> {f}
                  </li>
                ))}
              </ul>
            </div>

            {/* Pro — highlighted */}
            <div className="scroll-reveal-scale p-6 sm:p-8 rounded-2xl sm:rounded-3xl relative flex flex-col order-first sm:order-none"
              data-delay="2"
              style={{ background: 'linear-gradient(135deg, rgba(124,58,237,0.18) 0%, rgba(79,70,229,0.12) 50%, rgba(6,182,212,0.08) 100%)', border: '1px solid rgba(124,58,237,0.45)', boxShadow: '0 0 60px rgba(124,58,237,0.15), 0 20px 60px rgba(0,0,0,0.4)' }}>
              <div className="absolute -top-3.5 sm:-top-4 left-1/2 -translate-x-1/2">
                <div className="px-3 sm:px-4 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-bold text-white"
                  style={{ background: 'linear-gradient(135deg, #7c3aed, #06b6d4)', boxShadow: '0 4px 16px rgba(124,58,237,0.4)' }}>
                  ⭐ แนะนำสำหรับมืออาชีพ
                </div>
              </div>
              <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-5"
                style={{ background: 'rgba(124,58,237,0.2)', border: '1px solid rgba(124,58,237,0.3)' }}>
                <Star size={20} className="text-purple-400" />
              </div>
              <div className="mb-5 sm:mb-6">
                <h3 className="text-lg sm:text-xl font-bold mb-1">Pro</h3>
                <p className="text-xs sm:text-sm text-[var(--muted)]">สำหรับมืออาชีพ</p>
              </div>
              <div className="mb-5 sm:mb-6">
                <span className="text-4xl sm:text-5xl font-bold gradient-text">฿199</span>
                <span className="text-[var(--muted)] ml-2 text-xs sm:text-sm">/ เดือน</span>
              </div>
              <button onClick={handleGetStarted} className="btn-primary w-full py-3 sm:py-3.5 rounded-xl sm:rounded-2xl font-semibold mb-6 sm:mb-7 text-sm sm:text-base">
                อัพเกรดเป็น Pro
              </button>
              <ul className="space-y-2.5 sm:space-y-3 mt-auto">
                {['ใช้งานทุกเทมเพลท (3 แบบ)', 'ไม่จำกัดระยะเวลา', 'Hosting subdomain', 'Brand Color Presets', 'Content Presets', 'แก้ไขข้อมูลได้ไม่จำกัด'].map((f, i) => (
                  <li key={i} className="flex items-center gap-2 sm:gap-2.5 text-xs sm:text-sm">
                    <Check size={14} className="text-purple-400 shrink-0" /> {f}
                  </li>
                ))}
              </ul>
            </div>

            {/* Premium */}
            <div className="scroll-reveal-scale glass-card p-6 sm:p-8 rounded-2xl sm:rounded-3xl flex flex-col"
              data-delay="3"
              style={{ border: '1px solid rgba(245,158,11,0.2)' }}>
              <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-5"
                style={{ background: 'rgba(245,158,11,0.12)', border: '1px solid rgba(245,158,11,0.2)' }}>
                <Crown size={20} className="text-amber-400" />
              </div>
              <div className="mb-5 sm:mb-6">
                <h3 className="text-lg sm:text-xl font-bold mb-1">Premium</h3>
                <p className="text-xs sm:text-sm text-[var(--muted)]">ครบทุกฟีเจอร์</p>
              </div>
              <div className="mb-5 sm:mb-6">
                <span className="text-4xl sm:text-5xl font-bold gradient-text-gold">฿299</span>
                <span className="text-[var(--muted)] ml-2 text-xs sm:text-sm">/ เดือน</span>
              </div>
              <button onClick={handleGetStarted}
                className="w-full py-3 rounded-xl sm:rounded-2xl font-medium mb-6 sm:mb-7 transition-all hover:-translate-y-0.5 text-sm sm:text-base"
                style={{ background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.3)', color: '#fbbf24' }}>
                เลือก Premium
              </button>
              <ul className="space-y-2.5 sm:space-y-3 mt-auto">
                {['ทุกอย่างใน Pro', 'Custom Domain', 'Priority Support', 'ไม่มีลายน้ำ'].map((f, i) => (
                  <li key={i} className="flex items-center gap-2 sm:gap-2.5 text-xs sm:text-sm">
                    <Check size={14} className="text-amber-400 shrink-0" /> {f}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CTA BANNER ===== */}
      <section className="py-14 sm:py-20 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          <div className="scroll-reveal relative p-8 sm:p-10 rounded-2xl sm:rounded-3xl text-center overflow-hidden"
            style={{ background: 'linear-gradient(135deg, rgba(124,58,237,0.2), rgba(6,182,212,0.15))', border: '1px solid rgba(124,58,237,0.3)' }}>
            <div className="blob-purple w-48 sm:w-64 h-48 sm:h-64 -top-16 -left-16 opacity-50" />
            <div className="blob-cyan w-48 sm:w-64 h-48 sm:h-64 -bottom-16 -right-16 opacity-40" />
            <div className="relative z-10">
              <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">🚀</div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 sm:mb-3">พร้อมสร้าง Sale Page แรกของคุณหรือยัง?</h2>
              <p className="text-[var(--muted)] mb-6 sm:mb-8 max-w-lg mx-auto text-sm sm:text-base">
                เริ่มต้นฟรีวันนี้ ไม่ต้องใส่บัตรเครดิต ไม่มีเงื่อนไขซ่อนเร้น
              </p>
              <button onClick={handleGetStarted} className="btn-primary w-full sm:w-auto px-8 sm:px-10 py-3.5 sm:py-4 text-base sm:text-lg flex items-center justify-center gap-2 mx-auto animate-bounce-sm">
                เริ่มสร้างฟรีเลย <ArrowRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="py-10 sm:py-14 px-4 sm:px-6 pb-24 sm:pb-14">
        <div className="divider mb-10 sm:mb-14 max-w-6xl mx-auto" />
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg gradient-bg-primary flex items-center justify-center text-white font-bold text-xs">S</div>
            <span className="font-bold text-base">Sale Page Builder</span>
          </div>
          <p className="text-xs sm:text-sm text-[var(--muted)]">© 2026 Sale Page Builder. All rights reserved.</p>
          <div className="flex items-center gap-4 sm:gap-6 text-xs sm:text-sm text-[var(--muted)]">
            <a href="#features" className="hover:text-white transition-colors">ฟีเจอร์</a>
            <a href="#templates" className="hover:text-white transition-colors">เทมเพลท</a>
            <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
          </div>
        </div>
      </footer>

      {/* ===== STICKY BOTTOM CTA (mobile only) ===== */}
      <div className="sticky-cta-bar">
        <button onClick={handleGetStarted}
          className="btn-primary w-full py-3.5 text-base font-semibold flex items-center justify-center gap-2">
          {session ? 'ไปยัง Dashboard' : 'เริ่มสร้างฟรีเลย'} <ArrowRight size={16} />
        </button>
      </div>

    </div>
  )
}
