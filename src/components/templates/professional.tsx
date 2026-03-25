'use client'

import { useState, useEffect, useRef } from 'react'
import { PageConfig, ColorTheme } from '@/lib/types'

interface Props {
    config: PageConfig
    colorTheme: ColorTheme
}

export function ProfessionalTemplate({ config, colorTheme }: Props) {
    const c = colorTheme
    const [activeTestimonial, setActiveTestimonial] = useState(0)
    const containerRef = useRef<HTMLDivElement>(null)

    // Auto-rotate testimonials
    useEffect(() => {
        if (!config.testimonials?.items?.length) return
        const timer = setInterval(() => {
            setActiveTestimonial(prev => (prev + 1) % (config.testimonials?.items?.length || 1))
        }, 5000)
        return () => clearInterval(timer)
    }, [config.testimonials?.items?.length])

    // Scroll-triggered fade-in animations
    useEffect(() => {
        if (!containerRef.current) return
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('kw-visible')
                        observer.unobserve(entry.target)
                    }
                })
            },
            { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
        )
        const elements = containerRef.current.querySelectorAll('.kw-animate')
        elements.forEach(el => observer.observe(el))
        return () => observer.disconnect()
    }, [config])

    const socialIcons: Record<string, string> = {
        facebook: '📘', tiktok: '🎵', instagram: '📷', youtube: '📺', line: '💬', twitter: '🐦',
    }

    return (
        <div ref={containerRef} style={{ fontFamily: "'Prompt', 'Inter', sans-serif", color: c.text, background: c.background }}>
            <link href="https://fonts.googleapis.com/css2?family=Prompt:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
            <style>{`
                /* === ANIMATIONS === */
                @keyframes kw-fadeInUp {
                    from { opacity: 0; transform: translateY(40px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes kw-fadeInLeft {
                    from { opacity: 0; transform: translateX(-40px); }
                    to { opacity: 1; transform: translateX(0); }
                }
                @keyframes kw-fadeInRight {
                    from { opacity: 0; transform: translateX(40px); }
                    to { opacity: 1; transform: translateX(0); }
                }
                @keyframes kw-scaleIn {
                    from { opacity: 0; transform: scale(0.85); }
                    to { opacity: 1; transform: scale(1); }
                }
                @keyframes kw-float {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-10px); }
                }
                @keyframes kw-pulse {
                    0%, 100% { box-shadow: 0 0 0 0 rgba(16,185,129,0.3); }
                    50% { box-shadow: 0 0 0 12px rgba(16,185,129,0); }
                }
                @keyframes kw-countUp {
                    from { opacity: 0; transform: translateY(20px) scale(0.8); }
                    to { opacity: 1; transform: translateY(0) scale(1); }
                }
                @keyframes kw-slideIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }

                .kw-animate { opacity: 0; transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1); }
                .kw-animate.kw-visible { opacity: 1; }
                .kw-animate.kw-visible.kw-up { animation: kw-fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
                .kw-animate.kw-visible.kw-left { animation: kw-fadeInLeft 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
                .kw-animate.kw-visible.kw-right { animation: kw-fadeInRight 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
                .kw-animate.kw-visible.kw-scale { animation: kw-scaleIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards; }

                .kw-stagger-1 { animation-delay: 0.1s !important; }
                .kw-stagger-2 { animation-delay: 0.2s !important; }
                .kw-stagger-3 { animation-delay: 0.3s !important; }
                .kw-stagger-4 { animation-delay: 0.4s !important; }
                .kw-stagger-5 { animation-delay: 0.5s !important; }
                .kw-stagger-6 { animation-delay: 0.6s !important; }

                .kw-float { animation: kw-float 3s ease-in-out infinite; }
                .kw-pulse-btn { animation: kw-pulse 2s ease-in-out infinite; }

                .kw-testimonial-slide { animation: kw-slideIn 0.5s ease forwards; }

                /* === MOBILE FIRST === */
                .kw-container { max-width: 1200px; margin: 0 auto; padding: 0 16px; }
                .kw-section { padding: 48px 16px; }
                .kw-section-title { font-size: 28px; font-weight: 700; line-height: 1.3; }
                .kw-section-subtitle { font-size: 14px; }
                .kw-grid-2 { display: grid; grid-template-columns: 1fr; gap: 16px; }
                .kw-grid-3 { display: grid; grid-template-columns: 1fr; gap: 20px; }
                .kw-stats-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; }
                .kw-hero-profile { width: 200px; height: 200px; }
                .kw-hero-text { text-align: center; }
                .kw-hero-stat-value { font-size: 48px; }
                .kw-nav-links { display: none; }
                .kw-nav-cta { display: none; }
                .kw-service-zigzag { display: flex; flex-direction: column; gap: 12px; }
                .kw-benefits-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; }
                .kw-positions-grid { display: grid; grid-template-columns: 1fr; gap: 16px; }
                .kw-hero-btns { display: flex; flex-direction: column; gap: 12px; }
                .kw-hero-btns a { text-align: center; }

                .kw-btn {
                    display: inline-flex; align-items: center; justify-content: center; gap: 8px;
                    padding: 16px 32px; border-radius: 50px; font-weight: 600; font-size: 16px;
                    text-decoration: none; transition: all 0.3s; border: none; cursor: pointer;
                }
                .kw-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(0,0,0,0.15); }

                .kw-card {
                    padding: 32px 24px; border-radius: 16px;
                    border: 1px solid rgba(0,0,0,0.08);
                    transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1); text-align: center;
                }
                .kw-card:hover { transform: translateY(-4px); box-shadow: 0 12px 32px rgba(0,0,0,0.08); }

                .kw-testimonial-card {
                    padding: 32px; border-radius: 16px;
                    border: 1px solid rgba(0,0,0,0.08);
                    transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
                }

                /* === TABLET (768px+) === */
                @media (min-width: 768px) {
                    .kw-section { padding: 80px 24px; }
                    .kw-section-title { font-size: 36px; }
                    .kw-grid-2 { grid-template-columns: repeat(2, 1fr); }
                    .kw-stats-grid { grid-template-columns: repeat(4, 1fr); }
                    .kw-hero-profile { width: 280px; height: 280px; }
                    .kw-hero-stat-value { font-size: 64px; }
                    .kw-benefits-grid { grid-template-columns: repeat(3, 1fr); }
                    .kw-hero-btns { flex-direction: row; }
                    .kw-hero-btns a { text-align: center; }
                }

                /* === DESKTOP (1024px+) === */
                @media (min-width: 1024px) {
                    .kw-section { padding: 100px 24px; }
                    .kw-section-title { font-size: 40px; }
                    .kw-grid-3 { grid-template-columns: repeat(3, 1fr); }
                    .kw-nav-links { display: flex !important; }
                    .kw-nav-cta { display: inline-flex !important; }
                    .kw-hero-profile { width: 340px; height: 340px; }
                    .kw-hero-text { text-align: left; }
                    .kw-hero-stat-value { font-size: 80px; }
                    .kw-service-zigzag { flex-direction: row; }
                    .kw-service-zigzag.kw-reverse { flex-direction: row-reverse; }
                    .kw-benefits-grid { grid-template-columns: repeat(4, 1fr); }
                    .kw-positions-grid { grid-template-columns: repeat(2, 1fr); }
                }
            `}</style>

            {/* ===== 1. SOCIAL BAR ===== */}
            {config.hero?.socialLinks && config.hero.socialLinks.length > 0 && (
                <div style={{ background: c.surface, padding: '8px 0', textAlign: 'center' }}>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: 12 }}>
                        {config.hero.socialLinks.map((s, i) => (
                            <a key={i} href={s.url} target="_blank" rel="noopener noreferrer"
                                style={{
                                    width: 36, height: 36, borderRadius: 18,
                                    background: s.platform === 'facebook' ? '#1877F2' : s.platform === 'instagram' ? '#E4405F' : s.platform === 'youtube' ? '#FF0000' : s.platform === 'tiktok' ? '#000' : c.primary,
                                    color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    fontSize: 16, textDecoration: 'none', transition: 'transform 0.2s',
                                }}>
                                {socialIcons[s.platform] || '🔗'}
                            </a>
                        ))}
                    </div>
                </div>
            )}

            {/* ===== 2. HERO ===== */}
            <section id="section-hero" style={{ background: `linear-gradient(180deg, ${c.surface}, ${c.background})`, overflow: 'hidden' }}>
                <div className="kw-container" style={{ paddingTop: 48, paddingBottom: 0, textAlign: 'center' }}>
                    {/* Credentials */}
                    <p style={{ color: c.textLight, fontWeight: 500, fontSize: 14, marginBottom: 8, letterSpacing: 0.5 }}>
                        &quot;{config.services?.label || 'Financial Planning | TAX Planning | Insurance | Investment solution'}&quot;
                    </p>

                    {/* Large stat */}
                    <p style={{ color: c.primary, fontWeight: 600, fontSize: 14, marginBottom: 4 }}>
                        {config.navbar?.logo} เบื้องหลังการเงินของลูกค้ากว่า
                    </p>
                    <div className="kw-hero-stat-value" style={{ fontWeight: 800, color: c.primary, lineHeight: 1.1, marginBottom: 4 }}>
                        {config.stats?.items?.[0]?.value || '400 ล้านบาท'}
                    </div>
                    <p style={{ color: c.textLight, fontSize: 13, fontStyle: 'italic', marginBottom: 8 }}>
                        Update : {new Date().toLocaleDateString('th-TH', { month: 'long', year: 'numeric' })}
                    </p>
                    <p style={{ fontWeight: 700, fontSize: 18, color: c.text, marginBottom: 16 }}>
                        {config.hero?.subtitle}
                    </p>

                    {/* Profile image */}
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <div className="kw-hero-profile" style={{
                            borderRadius: '50% 50% 0 0', overflow: 'hidden',
                            background: `linear-gradient(135deg, ${c.primary}20, ${c.accent || c.primary}20)`,
                        }}>
                            {config.hero?.imageUrl ? (
                                <img src={config.hero.imageUrl} alt={config.hero.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            ) : (
                                <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 80, opacity: 0.3 }}>👤</div>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* ===== 3. ABOUT / QUOTE ===== */}
            <section className="kw-section" style={{ background: c.background, textAlign: 'center' }}>
                <div className="kw-container" style={{ maxWidth: 700 }}>
                    <div className="kw-animate kw-up">
                        <p style={{ color: c.primary, fontWeight: 600, fontSize: 14, marginBottom: 4 }}>ก้าวที่มั่นคง คือก้าวไปด้วยกัน</p>
                        <p style={{ fontWeight: 700, fontSize: 18, color: c.text, marginBottom: 8 }}>
                            {config.navbar?.logo} เบื้องหลังการเงินของลูกค้ากว่า
                        </p>
                        <div style={{ fontSize: 48, fontWeight: 800, color: c.primary, marginBottom: 16 }}>
                            {config.stats?.items?.[0]?.value || '400 ล้านบาท'}
                        </div>
                    </div>
                    <div className="kw-animate kw-up kw-stagger-2">
                        <h2 style={{ fontSize: 20, fontWeight: 600, color: c.primary, fontStyle: 'italic', marginBottom: 16 }}>
                            {config.hero?.quote}
                        </h2>
                        <p style={{ fontSize: 14, color: c.textLight, lineHeight: 1.8, marginBottom: 24 }}>
                            {config.hero?.title}
                        </p>
                        <p style={{ fontSize: 16, fontWeight: 600, color: c.primary, fontStyle: 'italic', marginBottom: 24 }}>
                            &quot;การดูแลลูกค้าอย่างยั่งยืน คือสิ่งที่สำคัญกับลูกค้ามากที่สุด&quot;
                        </p>
                    </div>

                    {/* CFP badge */}
                    <div className="kw-animate kw-scale kw-stagger-3" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 24 }}>
                        <div className="kw-float" style={{ width: 48, height: 48, borderRadius: 24, background: `${c.primary}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>🏅</div>
                        <div style={{ textAlign: 'left' }}>
                            <p style={{ fontWeight: 700, fontSize: 16, color: c.text }}>{config.hero?.name}</p>
                            <p style={{ fontSize: 12, color: c.primary }}>{config.hero?.credentials}</p>
                        </div>
                    </div>

                    {/* CTA buttons */}
                    <div className="kw-animate kw-up kw-stagger-4 kw-hero-btns" style={{ justifyContent: 'center' }}>
                        <a href={config.hero?.ctaPrimary?.href} className="kw-btn kw-pulse-btn" style={{ background: c.primary, color: '#fff', width: '100%', maxWidth: 400 }}>
                            {config.hero?.ctaPrimary?.text || 'Booking Consultation'}
                        </a>
                        <a href={config.hero?.ctaSecondary?.href} className="kw-btn" style={{ background: `${c.text}e0`, color: '#fff', width: '100%', maxWidth: 400 }}>
                            {config.hero?.ctaSecondary?.text || 'Join Our Team'}
                        </a>
                    </div>
                </div>
            </section>

            {/* ===== 4. CORE VALUES ===== */}
            <section id="section-values" className="kw-section" style={{ background: c.surface }}>
                <div className="kw-container" style={{ textAlign: 'center' }}>
                    <div className="kw-animate kw-up">
                        <h2 className="kw-section-title" style={{ color: c.text, marginBottom: 8 }}>{config.values?.title || 'Core Values'}</h2>
                        <p className="kw-section-subtitle" style={{ color: c.primary, marginBottom: 48 }}>{config.values?.subtitle}</p>
                    </div>
                    <div className="kw-grid-3">
                        {config.values?.items?.map((v, i) => (
                            <div key={i} className={`kw-card kw-animate kw-up kw-stagger-${i + 1}`} style={{ background: c.background }}>
                                <div className="kw-float" style={{ fontSize: 48, marginBottom: 16 }}>{v.icon}</div>
                                <h3 style={{ fontSize: 20, fontWeight: 600, color: c.primary, marginBottom: 8 }}>{v.title}</h3>
                                <p style={{ fontSize: 14, color: c.textLight, lineHeight: 1.7 }}>{v.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== 5. SERVICES ===== */}
            <section id="section-services" className="kw-section" style={{ background: c.background }}>
                <div className="kw-container" style={{ textAlign: 'center' }}>
                    <div className="kw-animate kw-up">
                        <p style={{ color: c.primary, fontWeight: 600, fontSize: 14, marginBottom: 4 }}>{config.services?.label}</p>
                        <h2 className="kw-section-title" style={{ color: c.text, marginBottom: 48 }}>{config.services?.title}</h2>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                        {config.services?.items?.map((s, i) => (
                            <div key={i} className={`kw-service-zigzag kw-animate ${i % 2 === 0 ? 'kw-left' : 'kw-right'} ${i % 2 === 1 ? 'kw-reverse' : ''} kw-stagger-${i + 1}`}
                                style={{ alignItems: 'center', gap: 24, padding: 24, borderRadius: 16, border: `1px solid ${c.primary}15`, background: c.surface, transition: 'all 0.4s', cursor: 'default' }}>
                                {s.imageUrl ? (
                                    <div style={{ width: 80, height: 80, borderRadius: 40, flexShrink: 0, overflow: 'hidden', border: `2px solid ${c.primary}20` }}>
                                        <img src={s.imageUrl} alt={s.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                    </div>
                                ) : (
                                    <div style={{
                                        width: 80, height: 80, borderRadius: 40, flexShrink: 0,
                                        background: `${c.primary}10`, border: `2px solid ${c.primary}20`,
                                        display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 36,
                                    }}>
                                        {s.icon}
                                    </div>
                                )}
                                <div style={{ textAlign: 'left' }}>
                                    <h3 style={{ fontWeight: 700, fontSize: 18, marginBottom: 4, color: c.text }}>{s.title}</h3>
                                    <p style={{ fontSize: 14, color: c.primary }}>{s.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    {/* CTA after services */}
                    <div className="kw-animate kw-up kw-stagger-3" style={{ marginTop: 40, display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'center' }}>
                        <a href={config.hero?.ctaPrimary?.href} className="kw-btn kw-pulse-btn" style={{ background: c.primary, color: '#fff', width: '100%', maxWidth: 500 }}>
                            {config.hero?.ctaPrimary?.text || 'Booking Consultation'}
                        </a>
                        <a href="#recruitment" className="kw-btn" style={{ background: `${c.text}e0`, color: '#fff', width: '100%', maxWidth: 500 }}>
                            {config.hero?.ctaSecondary?.text || 'Join Our Team'}
                        </a>
                    </div>
                </div>
            </section>

            {/* ===== 6. TESTIMONIALS (Carousel) ===== */}
            <section id="section-testimonials" className="kw-section" style={{ background: c.surface }}>
                <div className="kw-container" style={{ textAlign: 'center', maxWidth: 700 }}>
                    <div className="kw-animate kw-up">
                        <p style={{ color: c.primary, fontWeight: 600, fontSize: 14, marginBottom: 4 }}>เสียงจากลูกค้า</p>
                        <h2 className="kw-section-title" style={{ color: c.text, marginBottom: 32 }}>{config.testimonials?.title || 'Customer Feedback'}</h2>
                    </div>
                    {config.testimonials?.items && config.testimonials.items.length > 0 && (
                        <div className="kw-animate kw-scale kw-stagger-2">
                            <div key={activeTestimonial} className="kw-testimonial-card kw-testimonial-slide" style={{ background: c.background, minHeight: 180 }}>
                                <p style={{ fontSize: 16, lineHeight: 1.8, color: c.text, marginBottom: 20, fontStyle: 'italic' }}>
                                    &ldquo;{config.testimonials.items[activeTestimonial]?.quote}&rdquo;
                                </p>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12 }}>
                                    <div style={{ width: 44, height: 44, borderRadius: 22, background: `${c.primary}20`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600, color: c.primary }}>
                                        {config.testimonials.items[activeTestimonial]?.avatar}
                                    </div>
                                    <div style={{ textAlign: 'left' }}>
                                        <p style={{ fontWeight: 600, fontSize: 14 }}>{config.testimonials.items[activeTestimonial]?.name}</p>
                                        <p style={{ fontSize: 12, color: c.primary }}>{config.testimonials.items[activeTestimonial]?.role}</p>
                                    </div>
                                </div>
                            </div>
                            {/* Dots */}
                            <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 20 }}>
                                {config.testimonials.items.map((_, i) => (
                                    <button key={i} onClick={() => setActiveTestimonial(i)}
                                        style={{
                                            width: activeTestimonial === i ? 24 : 10, height: 10, borderRadius: 5,
                                            background: activeTestimonial === i ? c.primary : `${c.primary}30`,
                                            border: 'none', cursor: 'pointer', transition: 'all 0.4s cubic-bezier(0.16,1,0.3,1)',
                                        }} />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </section>

            {/* ===== 7. COMPANY SHOWCASE ===== */}
            {config.companyShowcase && (
                <section id="section-company" className="kw-section" style={{ background: c.background }}>
                    <div className="kw-container" style={{ textAlign: 'center' }}>
                        <div className="kw-animate kw-up">
                            {config.companyShowcase.companyLogo && (
                                <img src={config.companyShowcase.companyLogo} alt={config.companyShowcase.companyName} style={{ height: 48, marginBottom: 16, objectFit: 'contain' }} />
                            )}
                            <p style={{ color: c.primary, fontWeight: 600, fontSize: 14, marginBottom: 4 }}>ทำไมต้อง {config.companyShowcase.companyName}</p>
                            <h2 className="kw-section-title" style={{ color: c.text, marginBottom: 8 }}>{config.companyShowcase.title}</h2>
                            <p className="kw-section-subtitle" style={{ color: c.textLight, marginBottom: 40 }}>{config.companyShowcase.subtitle}</p>
                        </div>
                        {/* Stats cards */}
                        <div className="kw-grid-3" style={{ marginBottom: 32 }}>
                            {config.companyShowcase.stats?.map((s, i) => (
                                <div key={i} className={`kw-card kw-animate kw-up kw-stagger-${i + 1}`} style={{ background: c.surface }}>
                                    <div className="kw-float" style={{ fontSize: 40, marginBottom: 8 }}>{s.icon}</div>
                                    <div style={{ fontSize: 36, fontWeight: 800, color: c.primary, marginBottom: 4 }}>{s.value}</div>
                                    <p style={{ fontSize: 14, color: c.primary }}>{s.label}</p>
                                </div>
                            ))}
                        </div>
                        {/* Highlights list */}
                        {config.companyShowcase.highlights && (
                            <div style={{ textAlign: 'left', maxWidth: 600, margin: '0 auto' }}>
                                {config.companyShowcase.highlights.map((h, i) => (
                                    <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, padding: '10px 0', borderBottom: `1px solid ${c.primary}10` }}>
                                        <span style={{ color: c.primary, fontSize: 16, flexShrink: 0 }}>✓</span>
                                        <p style={{ fontSize: 14, color: c.text }}>{h}</p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </section>
            )}

            {/* ===== 8. RECRUITMENT ===== */}
            {config.recruitment && (
                <section id="section-recruitment">
                    {/* Hero banner */}
                    <div style={{
                        position: 'relative', minHeight: 300, overflow: 'hidden',
                        backgroundImage: config.recruitment.heroImage ? `url(${config.recruitment.heroImage})` : undefined,
                        backgroundSize: 'cover', backgroundPosition: 'center',
                        background: config.recruitment.heroImage ? undefined : `linear-gradient(135deg, ${c.primary}, ${c.accent || c.primary})`,
                    }}>
                        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(0,0,0,0.7), rgba(0,0,0,0.5))' }} />
                        <div className="kw-container" style={{ position: 'relative', zIndex: 2, padding: '60px 16px', textAlign: 'center' }}>
                            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 14, marginBottom: 8 }}>{config.navbar?.logo} | Careers</p>
                            <h2 style={{ fontSize: 28, fontWeight: 800, color: '#fff', marginBottom: 8 }}>{config.recruitment.tagline}</h2>
                        </div>
                    </div>

                    {/* Benefits grid */}
                    <div className="kw-section" style={{ background: c.surface }}>
                        <div className="kw-container" style={{ textAlign: 'center' }}>
                            <p style={{ color: c.primary, fontWeight: 600, fontSize: 14, marginBottom: 4 }}>เป็นตัวแทนแล้วได้อะไร?</p>
                            <h2 className="kw-section-title" style={{ color: c.text, marginBottom: 40 }}>สิทธิประโยชน์</h2>
                            <div className="kw-benefits-grid">
                                {config.recruitment.benefits?.map((b, i) => (
                                    <div key={i} className="kw-card" style={{ background: c.background, padding: 20 }}>
                                        <div style={{ fontSize: 28, marginBottom: 8 }}>{b.icon}</div>
                                        <h3 style={{ fontWeight: 600, fontSize: 15, marginBottom: 4, color: c.primary }}>{b.title}</h3>
                                        <p style={{ fontSize: 12, color: c.textLight }}>{b.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Positions */}
                    <div className="kw-section" style={{ background: c.background }}>
                        <div className="kw-container" style={{ textAlign: 'center' }}>
                            <p style={{ color: c.primary, fontWeight: 600, fontSize: 14, marginBottom: 4 }}>ตำแหน่งที่เปิดรับ</p>
                            <h2 className="kw-section-title" style={{ color: c.text, marginBottom: 40 }}>{config.recruitment.title}</h2>
                            <div className="kw-positions-grid">
                                {config.recruitment.positions?.map((p, i) => (
                                    <div key={i} className="kw-card" style={{ background: c.surface, textAlign: 'left' }}>
                                        <h3 style={{ fontWeight: 700, fontSize: 18, color: c.primary, marginBottom: 8 }}>{p.title}</h3>
                                        <p style={{ fontSize: 14, color: c.textLight, lineHeight: 1.7, marginBottom: 16 }}>{p.description}</p>
                                        <p style={{ fontSize: 12, fontWeight: 600, color: c.text, marginBottom: 8 }}>คุณสมบัติ:</p>
                                        {p.qualifications?.map((q, j) => (
                                            <div key={j} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, padding: '4px 0' }}>
                                                <span style={{ color: c.primary, fontSize: 12, flexShrink: 0 }}>•</span>
                                                <p style={{ fontSize: 13, color: c.textLight }}>{q}</p>
                                            </div>
                                        ))}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* ===== 9. CTA ===== */}
            <section id="section-cta" className="kw-section" style={{
                background: `linear-gradient(135deg, ${c.primary}, ${c.accent || c.primary}CC)`,
                textAlign: 'center',
            }}>
                <div className="kw-container">
                    <h2 className="kw-section-title" style={{ color: '#fff', marginBottom: 12 }}>{config.cta?.title}</h2>
                    <p style={{ color: 'rgba(255,255,255,0.8)', marginBottom: 32, fontSize: 16 }}>{config.cta?.subtitle}</p>
                    <a href={config.cta?.buttonHref} className="kw-btn" style={{ background: '#fff', color: c.primary, fontWeight: 700 }}>
                        {config.cta?.buttonText}
                    </a>
                </div>
            </section>

            {/* ===== 10. CONTACT ===== */}
            <section id="section-contact" className="kw-section" style={{ background: c.surface }}>
                <div className="kw-container" style={{ maxWidth: 800, textAlign: 'center' }}>
                    <h2 className="kw-section-title" style={{ color: c.primary, marginBottom: 8 }}>{config.contact?.title}</h2>
                    <p className="kw-section-subtitle" style={{ color: c.textLight, marginBottom: 40 }}>{config.contact?.subtitle}</p>
                    <div className="kw-grid-2" style={{ textAlign: 'left' }}>
                        {[
                            { label: '📧 Email', value: config.contact?.email },
                            { label: '📱 โทร', value: config.contact?.phone },
                            { label: '💬 Line', value: config.contact?.line },
                            { label: '📍 ที่อยู่', value: config.contact?.address },
                        ].map((c2, i) => (
                            <div key={i} style={{ padding: 20, borderRadius: 12, background: c.background }}>
                                <p style={{ fontSize: 12, color: c.textLight, marginBottom: 4 }}>{c2.label}</p>
                                <p style={{ fontWeight: 600, fontSize: 14 }}>{c2.value}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== 11. FOOTER ===== */}
            <footer style={{ background: c.primary, color: '#fff', padding: '40px 16px' }}>
                <div className="kw-container" style={{ textAlign: 'center' }}>
                    <p style={{ fontWeight: 700, fontSize: 18, marginBottom: 8 }}>{config.footer?.logo}</p>
                    <p style={{ fontSize: 13, opacity: 0.7, marginBottom: 16 }}>{config.footer?.description}</p>
                    {config.hero?.socialLinks && (
                        <div style={{ display: 'flex', justifyContent: 'center', gap: 12, marginBottom: 16 }}>
                            {config.hero.socialLinks.map((s, i) => (
                                <a key={i} href={s.url} target="_blank" rel="noopener noreferrer"
                                    style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: 20 }}>
                                    {socialIcons[s.platform] || '🔗'}
                                </a>
                            ))}
                        </div>
                    )}
                    <p style={{ fontSize: 11, opacity: 0.5 }}>{config.footer?.copyright}</p>
                </div>
            </footer>
        </div>
    )
}
