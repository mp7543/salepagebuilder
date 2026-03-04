'use client'

import { PageConfig, ColorTheme } from '@/lib/types'

interface Props {
    config: PageConfig
    colorTheme: ColorTheme
}

export function PremiumTemplate({ config, colorTheme }: Props) {
    const c = colorTheme
    return (
        <div style={{ fontFamily: "'Inter', sans-serif", color: c.text, background: c.background }}>
            <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />

            {/* Navbar */}
            <nav style={{ position: 'sticky', top: 0, zIndex: 50, padding: '14px 0', background: `${c.background}e6`, backdropFilter: 'blur(20px)', borderBottom: `1px solid ${c.text}10` }}>
                <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: 18, fontWeight: 700, color: c.text }}>{config.navbar?.logo}</span>
                    <div style={{ display: 'flex', gap: 28, alignItems: 'center' }}>
                        {config.navbar?.links?.map((l, i) => (
                            <a key={i} href={l.href} style={{ color: c.textLight, textDecoration: 'none', fontSize: 13, fontWeight: 500 }}>{l.text}</a>
                        ))}
                        <a href={config.navbar?.ctaHref} style={{ background: c.accent, color: '#fff', padding: '8px 20px', borderRadius: 20, fontWeight: 600, textDecoration: 'none', fontSize: 13 }}>
                            {config.navbar?.ctaText}
                        </a>
                    </div>
                </div>
            </nav>

            {/* Hero */}
            <section style={{ minHeight: '85vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '100px 24px 60px', textAlign: 'center', background: `linear-gradient(180deg, ${c.background} 0%, ${c.surface} 100%)` }}>
                <p style={{ color: c.accent, fontWeight: 600, fontSize: 14, marginBottom: 20, letterSpacing: 2, textTransform: 'uppercase' }}>{config.hero?.credentials}</p>
                <h1 style={{ fontSize: 72, fontWeight: 800, lineHeight: 1.05, marginBottom: 20, color: c.text, maxWidth: 900, letterSpacing: -2 }}>
                    {config.hero?.name}
                </h1>
                <p style={{ fontSize: 24, fontWeight: 400, color: c.textLight, marginBottom: 8, maxWidth: 600 }}>{config.hero?.title}</p>
                <p style={{ fontSize: 16, color: c.textLight, marginBottom: 40, maxWidth: 500 }}>{config.hero?.subtitle}</p>
                <div style={{ display: 'flex', gap: 16 }}>
                    <a href={config.hero?.ctaPrimary?.href} style={{ background: c.accent, color: '#fff', padding: '14px 28px', borderRadius: 24, fontWeight: 600, textDecoration: 'none', fontSize: 15 }}>
                        {config.hero?.ctaPrimary?.text}
                    </a>
                    <a href={config.hero?.ctaSecondary?.href} style={{ color: c.accent, padding: '14px 28px', borderRadius: 24, fontWeight: 600, textDecoration: 'none', fontSize: 15 }}>
                        {config.hero?.ctaSecondary?.text} →
                    </a>
                </div>
            </section>

            {/* Stats */}
            <section style={{ padding: '60px 24px', borderTop: `1px solid ${c.text}08`, borderBottom: `1px solid ${c.text}08` }}>
                <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: `repeat(${config.stats?.items?.length || 4}, 1fr)`, gap: 32, textAlign: 'center' }}>
                    {config.stats?.items?.map((s, i) => (
                        <div key={i}>
                            <div style={{ fontSize: 44, fontWeight: 800, color: c.text, letterSpacing: -1 }}>{s.value}</div>
                            <div style={{ fontSize: 13, color: c.textLight, marginTop: 8, letterSpacing: 1, textTransform: 'uppercase' }}>{s.label}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Featured Quote */}
            <section style={{ padding: '100px 24px', textAlign: 'center', background: c.surface }}>
                <div style={{ maxWidth: 800, margin: '0 auto' }}>
                    <blockquote style={{ fontSize: 32, fontWeight: 600, lineHeight: 1.5, color: c.text, fontStyle: 'italic' }}>
                        {config.hero?.quote}
                    </blockquote>
                    <p style={{ marginTop: 24, color: c.textLight, fontSize: 14 }}>— {config.hero?.name}</p>
                </div>
            </section>

            {/* Services Bento Grid */}
            <section style={{ padding: '80px 24px', background: c.background }}>
                <div style={{ maxWidth: 1200, margin: '0 auto' }}>
                    <h2 style={{ fontSize: 44, fontWeight: 800, textAlign: 'center', marginBottom: 12, letterSpacing: -1, color: c.text }}>{config.services?.title}</h2>
                    <p style={{ textAlign: 'center', color: c.textLight, marginBottom: 48, fontSize: 16 }}>{config.services?.label}</p>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
                        {config.services?.items?.map((s, i) => (
                            <div key={i} style={{ padding: 40, borderRadius: 20, background: c.surface, border: `1px solid ${c.text}08`, transition: 'all 0.3s' }}>
                                <div style={{ fontSize: 36, marginBottom: 20 }}>{s.icon}</div>
                                <h3 style={{ fontSize: 22, fontWeight: 700, marginBottom: 10, color: c.text }}>{s.title}</h3>
                                <p style={{ fontSize: 15, color: c.textLight, lineHeight: 1.7 }}>{s.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Values */}
            <section style={{ padding: '80px 24px', background: c.surface }}>
                <div style={{ maxWidth: 1200, margin: '0 auto', textAlign: 'center' }}>
                    <h2 style={{ fontSize: 44, fontWeight: 800, marginBottom: 48, letterSpacing: -1, color: c.text }}>{config.values?.title}</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
                        {config.values?.items?.map((v, i) => (
                            <div key={i} style={{ padding: 36, borderRadius: 20, background: c.background, textAlign: 'center', border: `1px solid ${c.text}08` }}>
                                <div style={{ fontSize: 48, marginBottom: 16 }}>{v.icon}</div>
                                <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8, color: c.text }}>{v.title}</h3>
                                <p style={{ fontSize: 14, color: c.textLight, lineHeight: 1.7 }}>{v.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section style={{ padding: '80px 24px', background: c.background }}>
                <div style={{ maxWidth: 1200, margin: '0 auto', textAlign: 'center' }}>
                    <h2 style={{ fontSize: 44, fontWeight: 800, marginBottom: 48, letterSpacing: -1, color: c.text }}>{config.testimonials?.title}</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
                        {config.testimonials?.items?.map((t, i) => (
                            <div key={i} style={{ padding: 32, borderRadius: 20, background: c.surface, textAlign: 'left', border: `1px solid ${c.text}08` }}>
                                <div style={{ display: 'flex', gap: 4, marginBottom: 16 }}>
                                    {Array.from({ length: t.rating }).map((_, j) => <span key={j} style={{ color: '#F59E0B' }}>★</span>)}
                                </div>
                                <p style={{ fontSize: 16, lineHeight: 1.8, color: c.text, marginBottom: 24 }}>"{t.quote}"</p>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                    <div style={{ width: 40, height: 40, borderRadius: 20, background: `${c.accent}20`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: c.accent, fontSize: 14 }}>{t.avatar}</div>
                                    <div>
                                        <p style={{ fontWeight: 600, fontSize: 14 }}>{t.name}</p>
                                        <p style={{ fontSize: 12, color: c.textLight }}>{t.role}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section style={{ padding: '100px 24px', textAlign: 'center', background: c.surface }}>
                <h2 style={{ fontSize: 44, fontWeight: 800, marginBottom: 16, color: c.text, letterSpacing: -1 }}>{config.cta?.title}</h2>
                <p style={{ color: c.textLight, marginBottom: 40, fontSize: 18 }}>{config.cta?.subtitle}</p>
                <a href={config.cta?.buttonHref} style={{ background: c.accent, color: '#fff', padding: '16px 40px', borderRadius: 28, fontWeight: 700, textDecoration: 'none', fontSize: 17 }}>
                    {config.cta?.buttonText}
                </a>
            </section>

            {/* Contact */}
            <section style={{ padding: '80px 24px', background: c.background }}>
                <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
                    <h2 style={{ fontSize: 36, fontWeight: 800, marginBottom: 8, color: c.text }}>{config.contact?.title}</h2>
                    <p style={{ color: c.textLight, marginBottom: 40 }}>{config.contact?.subtitle}</p>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}>
                        {[
                            { label: 'Email', icon: '📧', value: config.contact?.email },
                            { label: 'Phone', icon: '📱', value: config.contact?.phone },
                            { label: 'Line', icon: '💬', value: config.contact?.line },
                            { label: 'Address', icon: '📍', value: config.contact?.address },
                        ].map((c2, i) => (
                            <div key={i} style={{ padding: 24, borderRadius: 16, background: c.surface, textAlign: 'left', border: `1px solid ${c.text}08` }}>
                                <span style={{ fontSize: 12, color: c.textLight, letterSpacing: 1, textTransform: 'uppercase' }}>{c2.icon} {c2.label}</span>
                                <p style={{ fontWeight: 600, marginTop: 8, fontSize: 15, color: c.text }}>{c2.value}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer style={{ padding: '40px 24px', borderTop: `1px solid ${c.text}08` }}>
                <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontWeight: 700, fontSize: 16, color: c.text }}>{config.footer?.logo}</span>
                    <p style={{ fontSize: 12, color: c.textLight }}>{config.footer?.copyright}</p>
                </div>
            </footer>
        </div>
    )
}
