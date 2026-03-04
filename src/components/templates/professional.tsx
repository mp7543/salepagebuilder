'use client'

import { PageConfig, ColorTheme } from '@/lib/types'

interface Props {
    config: PageConfig
    colorTheme: ColorTheme
}

export function ProfessionalTemplate({ config, colorTheme }: Props) {
    const c = colorTheme
    return (
        <div style={{ fontFamily: "'Prompt', 'Inter', sans-serif", color: c.text, background: c.background }}>
            <link href="https://fonts.googleapis.com/css2?family=Prompt:wght@300;400;500;600;700&display=swap" rel="stylesheet" />

            {/* Navbar */}
            <nav style={{ background: c.primary, color: '#fff', padding: '16px 0', position: 'sticky', top: 0, zIndex: 50 }}>
                <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: 20, fontWeight: 700 }}>{config.navbar?.logo}</span>
                    <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
                        {config.navbar?.links?.map((l, i) => (
                            <a key={i} href={l.href} style={{ color: 'rgba(255,255,255,0.85)', textDecoration: 'none', fontSize: 14, fontWeight: 500 }}>{l.text}</a>
                        ))}
                        <a href={config.navbar?.ctaHref} style={{ background: '#fff', color: c.primary, padding: '8px 20px', borderRadius: 8, fontWeight: 600, textDecoration: 'none', fontSize: 14 }}>
                            {config.navbar?.ctaText}
                        </a>
                    </div>
                </div>
            </nav>

            {/* Hero */}
            <section style={{ background: `linear-gradient(135deg, ${c.background}, ${c.surface})`, position: 'relative', overflow: 'hidden' }}>
                <div style={{ maxWidth: 1200, margin: '0 auto', padding: '80px 24px', display: 'flex', alignItems: 'center', gap: 60 }}>
                    <div style={{ flex: 1 }}>
                        <p style={{ color: c.accent, fontWeight: 600, fontSize: 14, marginBottom: 16, letterSpacing: 1 }}>{config.hero?.credentials}</p>
                        <h1 style={{ fontSize: 48, fontWeight: 700, lineHeight: 1.2, marginBottom: 16, color: c.primary }}>{config.hero?.name}</h1>
                        <h2 style={{ fontSize: 20, fontWeight: 500, color: c.textLight, marginBottom: 24 }}>{config.hero?.title}</h2>
                        <blockquote style={{ fontSize: 18, fontStyle: 'italic', color: c.text, marginBottom: 16, borderLeft: `4px solid ${c.accent}`, paddingLeft: 20, lineHeight: 1.8 }}>
                            {config.hero?.quote}
                        </blockquote>
                        <p style={{ fontSize: 14, color: c.textLight, marginBottom: 32 }}>{config.hero?.subtitle}</p>
                        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                            <a href={config.hero?.ctaPrimary?.href} style={{ background: c.primary, color: '#fff', padding: '14px 32px', borderRadius: 12, fontWeight: 600, textDecoration: 'none', fontSize: 16 }}>
                                {config.hero?.ctaPrimary?.text}
                            </a>
                            <a href={config.hero?.ctaSecondary?.href} style={{ border: `2px solid ${c.primary}`, color: c.primary, padding: '14px 32px', borderRadius: 12, fontWeight: 600, textDecoration: 'none', fontSize: 16 }}>
                                {config.hero?.ctaSecondary?.text}
                            </a>
                        </div>
                    </div>
                    <div style={{ width: 380, height: 460, borderRadius: 24, background: `linear-gradient(135deg, ${c.primary}20, ${c.accent}20)`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, overflow: 'hidden' }}>
                        {config.hero?.imageUrl ? (
                            <img src={config.hero.imageUrl} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        ) : (
                            <div style={{ fontSize: 120, opacity: 0.3 }}>👤</div>
                        )}
                    </div>
                </div>
            </section>

            {/* Stats */}
            <section style={{ background: c.primary, padding: '48px 24px' }}>
                <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: `repeat(${config.stats?.items?.length || 4}, 1fr)`, gap: 32, textAlign: 'center' }}>
                    {config.stats?.items?.map((s, i) => (
                        <div key={i}>
                            <div style={{ fontSize: 40, fontWeight: 700, color: '#fff' }}>{s.value}</div>
                            <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.7)', marginTop: 4 }}>{s.label}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Core Values */}
            <section style={{ padding: '80px 24px', background: c.surface }}>
                <div style={{ maxWidth: 1200, margin: '0 auto', textAlign: 'center' }}>
                    <h2 style={{ fontSize: 36, fontWeight: 700, marginBottom: 8, color: c.primary }}>{config.values?.title}</h2>
                    <p style={{ color: c.textLight, marginBottom: 48, fontSize: 16 }}>{config.values?.subtitle}</p>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
                        {config.values?.items?.map((v, i) => (
                            <div key={i} style={{ padding: 32, borderRadius: 16, border: `1px solid ${c.primary}15`, background: c.background, textAlign: 'center' }}>
                                <div style={{ fontSize: 40, marginBottom: 16 }}>{v.icon}</div>
                                <h3 style={{ fontSize: 20, fontWeight: 600, marginBottom: 8, color: c.primary }}>{v.title}</h3>
                                <p style={{ fontSize: 14, color: c.textLight, lineHeight: 1.7 }}>{v.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Services */}
            <section style={{ padding: '80px 24px', background: c.background }}>
                <div style={{ maxWidth: 1200, margin: '0 auto', textAlign: 'center' }}>
                    <p style={{ color: c.accent, fontWeight: 600, fontSize: 14, marginBottom: 8 }}>{config.services?.label}</p>
                    <h2 style={{ fontSize: 36, fontWeight: 700, marginBottom: 48, color: c.primary }}>{config.services?.title}</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
                        {config.services?.items?.map((s, i) => (
                            <div key={i} style={{ padding: 28, borderRadius: 16, background: c.surface, display: 'flex', alignItems: 'center', gap: 16, textAlign: 'left' }}>
                                <div style={{ width: 56, height: 56, borderRadius: 28, background: `${c.primary}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, flexShrink: 0 }}>{s.icon}</div>
                                <div>
                                    <h3 style={{ fontWeight: 600, fontSize: 16, marginBottom: 4 }}>{s.title}</h3>
                                    <p style={{ fontSize: 13, color: c.textLight }}>{s.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section style={{ padding: '80px 24px', background: c.surface }}>
                <div style={{ maxWidth: 1200, margin: '0 auto', textAlign: 'center' }}>
                    <h2 style={{ fontSize: 36, fontWeight: 700, marginBottom: 48, color: c.primary }}>{config.testimonials?.title}</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
                        {config.testimonials?.items?.map((t, i) => (
                            <div key={i} style={{ padding: 32, borderRadius: 16, background: c.background, textAlign: 'left' }}>
                                <div style={{ display: 'flex', gap: 4, marginBottom: 16 }}>
                                    {Array.from({ length: t.rating }).map((_, j) => <span key={j} style={{ color: '#F59E0B', fontSize: 16 }}>★</span>)}
                                </div>
                                <p style={{ fontSize: 15, lineHeight: 1.8, color: c.text, marginBottom: 20 }}>"{t.quote}"</p>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                    <div style={{ width: 40, height: 40, borderRadius: 20, background: `${c.primary}20`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600, color: c.primary }}>{t.avatar}</div>
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

            {/* Why Choose */}
            <section style={{ padding: '80px 24px', background: c.background }}>
                <div style={{ maxWidth: 1200, margin: '0 auto' }}>
                    <h2 style={{ fontSize: 36, fontWeight: 700, textAlign: 'center', marginBottom: 8, color: c.primary }}>{config.whyChoose?.title}</h2>
                    <p style={{ textAlign: 'center', color: c.textLight, marginBottom: 48 }}>{config.whyChoose?.subtitle}</p>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 20 }}>
                        {config.whyChoose?.items?.map((w, i) => (
                            <div key={i} style={{ padding: 28, borderRadius: 16, background: c.surface, display: 'flex', gap: 16 }}>
                                <div style={{ fontSize: 32 }}>{w.icon}</div>
                                <div>
                                    <h3 style={{ fontWeight: 600, marginBottom: 4, fontSize: 16 }}>{w.title}</h3>
                                    <p style={{ fontSize: 14, color: c.textLight }}>{w.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section style={{ padding: '80px 24px', background: `linear-gradient(135deg, ${c.primary}, ${c.accent || c.primary}CC)`, textAlign: 'center' }}>
                <h2 style={{ fontSize: 32, fontWeight: 700, color: '#fff', marginBottom: 12 }}>{config.cta?.title}</h2>
                <p style={{ color: 'rgba(255,255,255,0.8)', marginBottom: 32, fontSize: 16 }}>{config.cta?.subtitle}</p>
                <a href={config.cta?.buttonHref} style={{ background: '#fff', color: c.primary, padding: '16px 40px', borderRadius: 12, fontWeight: 700, textDecoration: 'none', fontSize: 18 }}>
                    {config.cta?.buttonText}
                </a>
            </section>

            {/* Contact */}
            <section style={{ padding: '80px 24px', background: c.surface }}>
                <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
                    <h2 style={{ fontSize: 32, fontWeight: 700, marginBottom: 8, color: c.primary }}>{config.contact?.title}</h2>
                    <p style={{ color: c.textLight, marginBottom: 40 }}>{config.contact?.subtitle}</p>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16, textAlign: 'left' }}>
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

            {/* Footer */}
            <footer style={{ background: c.primary, color: '#fff', padding: '40px 24px' }}>
                <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                        <p style={{ fontWeight: 700, fontSize: 18, marginBottom: 8 }}>{config.footer?.logo}</p>
                        <p style={{ fontSize: 13, opacity: 0.7 }}>{config.footer?.description}</p>
                    </div>
                    <p style={{ fontSize: 12, opacity: 0.5 }}>{config.footer?.copyright}</p>
                </div>
            </footer>
        </div>
    )
}
