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
            <style>{`
                @media (max-width: 768px) {
                    .tpl-pm-hero-wrap { padding: 60px 16px !important; }
                    .tpl-pm-hero-title { font-size: 36px !important; }
                    .tpl-pm-hero-subtitle { font-size: 16px !important; }
                    .tpl-pm-bento { grid-template-columns: 1fr !important; }
                    .tpl-pm-grid-3 { grid-template-columns: 1fr !important; }
                    .tpl-pm-grid-2 { grid-template-columns: 1fr !important; }
                    .tpl-pm-stats { grid-template-columns: repeat(2, 1fr) !important; }
                    .tpl-pm-section { padding: 48px 16px !important; }
                    .tpl-pm-section-title { font-size: 24px !important; }
                    .tpl-pm-cta-title { font-size: 28px !important; }
                    .tpl-pm-nav-links { display: none !important; }
                    .tpl-pm-footer-wrap { flex-direction: column !important; text-align: center !important; gap: 16px !important; }
                    .tpl-pm-hero-btns { flex-direction: column !important; align-items: stretch !important; }
                    .tpl-pm-hero-btns a { text-align: center !important; }
                    .tpl-pm-credentials-row { flex-direction: column !important; gap: 8px !important; }
                }
            `}</style>

            {/* Navbar */}
            <nav id="section-navbar" style={{ background: `${c.surface}E6`, backdropFilter: 'blur(20px)', padding: '16px 0', position: 'sticky', top: 0, zIndex: 50, borderBottom: `1px solid ${c.text}10` }}>
                <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: 20, fontWeight: 700, letterSpacing: '-0.02em' }}>{config.navbar?.logo}</span>
                    <div className="tpl-pm-nav-links" style={{ display: 'flex', gap: 28, alignItems: 'center' }}>
                        {config.navbar?.links?.map((l, i) => (
                            <a key={i} href={l.href} style={{ color: c.textLight, textDecoration: 'none', fontSize: 13, fontWeight: 500, letterSpacing: '0.01em' }}>{l.text}</a>
                        ))}
                        <a href={config.navbar?.ctaHref} style={{ background: c.accent, color: '#fff', padding: '9px 22px', borderRadius: 30, fontWeight: 600, textDecoration: 'none', fontSize: 13 }}>
                            {config.navbar?.ctaText}
                        </a>
                    </div>
                </div>
            </nav>

            {/* Hero */}
            <section id="section-hero" className="tpl-pm-hero-wrap" style={{ padding: '100px 24px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: '20%', left: '50%', transform: 'translateX(-50%)', width: 500, height: 500, borderRadius: '50%', background: `radial-gradient(circle, ${c.accent}15, transparent 70%)`, pointerEvents: 'none' }} />
                <div style={{ maxWidth: 800, margin: '0 auto', position: 'relative' }}>
                    <div className="tpl-pm-credentials-row" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginBottom: 24 }}>
                        <span style={{ fontSize: 12, fontWeight: 500, color: c.textLight, letterSpacing: 2, textTransform: 'uppercase' }}>{config.hero?.credentials}</span>
                    </div>
                    <h1 className="tpl-pm-hero-title" style={{ fontSize: 72, fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.05, marginBottom: 20 }}>{config.hero?.name}</h1>
                    <p className="tpl-pm-hero-subtitle" style={{ fontSize: 22, color: c.textLight, lineHeight: 1.5, marginBottom: 16 }}>{config.hero?.title}</p>
                    <blockquote style={{ fontSize: 16, fontStyle: 'italic', color: c.textLight, marginBottom: 40, opacity: 0.7 }}>{config.hero?.quote}</blockquote>
                    <div className="tpl-pm-hero-btns" style={{ display: 'flex', gap: 16, justifyContent: 'center' }}>
                        <a href={config.hero?.ctaPrimary?.href} style={{ background: c.accent, color: '#fff', padding: '15px 36px', borderRadius: 30, fontWeight: 600, textDecoration: 'none', fontSize: 15 }}>
                            {config.hero?.ctaPrimary?.text}
                        </a>
                        <a href={config.hero?.ctaSecondary?.href} style={{ border: `1px solid ${c.text}30`, color: c.text, padding: '15px 36px', borderRadius: 30, fontWeight: 500, textDecoration: 'none', fontSize: 15 }}>
                            {config.hero?.ctaSecondary?.text}
                        </a>
                    </div>
                </div>
            </section>

            {/* Stats */}
            <section id="section-stats" style={{ padding: '48px 24px', borderTop: `1px solid ${c.text}08`, borderBottom: `1px solid ${c.text}08` }}>
                <div className="tpl-pm-stats" style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: `repeat(${config.stats?.items?.length || 4}, 1fr)`, gap: 24, textAlign: 'center' }}>
                    {config.stats?.items?.map((s, i) => (
                        <div key={i}>
                            <div style={{ fontSize: 36, fontWeight: 700, color: c.accent, letterSpacing: '-0.02em' }}>{s.value}</div>
                            <div style={{ fontSize: 13, color: c.textLight, marginTop: 4 }}>{s.label}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Values — bento-like */}
            <section id="section-values" className="tpl-pm-section" style={{ padding: '80px 24px' }}>
                <div style={{ maxWidth: 1200, margin: '0 auto' }}>
                    <h2 className="tpl-pm-section-title" style={{ fontSize: 36, fontWeight: 700, textAlign: 'center', marginBottom: 8, letterSpacing: '-0.02em' }}>{config.values?.title}</h2>
                    <p style={{ textAlign: 'center', color: c.textLight, marginBottom: 48 }}>{config.values?.subtitle}</p>
                    <div className="tpl-pm-bento" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                        {config.values?.items?.map((v, i) => (
                            <div key={i} style={{ padding: 36, borderRadius: 20, background: c.surface, border: `1px solid ${c.text}08`, gridColumn: i === 0 ? 'span 2' : undefined }}>
                                <div style={{ fontSize: 36, marginBottom: 16 }}>{v.icon}</div>
                                <h3 style={{ fontSize: 20, fontWeight: 600, marginBottom: 8 }}>{v.title}</h3>
                                <p style={{ fontSize: 14, color: c.textLight, lineHeight: 1.7 }}>{v.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Services */}
            <section id="section-services" className="tpl-pm-section" style={{ padding: '80px 24px', background: c.surface }}>
                <div style={{ maxWidth: 1200, margin: '0 auto', textAlign: 'center' }}>
                    <p style={{ color: c.accent, fontWeight: 600, fontSize: 13, marginBottom: 8, letterSpacing: 1, textTransform: 'uppercase' }}>{config.services?.label}</p>
                    <h2 className="tpl-pm-section-title" style={{ fontSize: 36, fontWeight: 700, marginBottom: 48, letterSpacing: '-0.02em' }}>{config.services?.title}</h2>
                    <div className="tpl-pm-grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
                        {config.services?.items?.map((s, i) => (
                            <div key={i} style={{ padding: 28, borderRadius: 16, background: c.background, border: `1px solid ${c.text}08`, textAlign: 'left' }}>
                                <div style={{ fontSize: 28, marginBottom: 12 }}>{s.icon}</div>
                                <h3 style={{ fontWeight: 600, fontSize: 15, marginBottom: 6 }}>{s.title}</h3>
                                <p style={{ fontSize: 13, color: c.textLight, lineHeight: 1.6 }}>{s.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section id="section-testimonials" className="tpl-pm-section" style={{ padding: '80px 24px' }}>
                <div style={{ maxWidth: 1200, margin: '0 auto', textAlign: 'center' }}>
                    <h2 className="tpl-pm-section-title" style={{ fontSize: 36, fontWeight: 700, marginBottom: 48, letterSpacing: '-0.02em' }}>{config.testimonials?.title}</h2>
                    <div className="tpl-pm-grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
                        {config.testimonials?.items?.map((t, i) => (
                            <div key={i} style={{ padding: 28, borderRadius: 20, background: c.surface, border: `1px solid ${c.text}08`, textAlign: 'left' }}>
                                <div style={{ display: 'flex', gap: 3, marginBottom: 16 }}>
                                    {Array.from({ length: t.rating }).map((_, j) => <span key={j} style={{ color: '#F59E0B', fontSize: 14 }}>★</span>)}
                                </div>
                                <p style={{ fontSize: 14, lineHeight: 1.8, color: c.text, marginBottom: 20 }}>"{t.quote}"</p>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                    <div style={{ width: 36, height: 36, borderRadius: 18, background: `${c.accent}20`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600, fontSize: 13, color: c.accent }}>{t.avatar}</div>
                                    <div>
                                        <p style={{ fontWeight: 600, fontSize: 13 }}>{t.name}</p>
                                        <p style={{ fontSize: 11, color: c.textLight }}>{t.role}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section id="section-cta" className="tpl-pm-section" style={{ padding: '80px 24px', textAlign: 'center' }}>
                <div style={{ maxWidth: 600, margin: '0 auto', padding: '48px 32px', borderRadius: 24, background: c.surface, border: `1px solid ${c.text}10` }}>
                    <h2 className="tpl-pm-cta-title" style={{ fontSize: 32, fontWeight: 700, marginBottom: 12, letterSpacing: '-0.02em' }}>{config.cta?.title}</h2>
                    <p style={{ color: c.textLight, marginBottom: 32, fontSize: 15 }}>{config.cta?.subtitle}</p>
                    <a href={config.cta?.buttonHref} style={{ background: c.accent, color: '#fff', padding: '15px 40px', borderRadius: 30, fontWeight: 600, textDecoration: 'none', fontSize: 16, display: 'inline-block' }}>
                        {config.cta?.buttonText}
                    </a>
                </div>
            </section>

            {/* Contact */}
            <section id="section-contact" className="tpl-pm-section" style={{ padding: '80px 24px', background: c.surface }}>
                <div style={{ maxWidth: 700, margin: '0 auto', textAlign: 'center' }}>
                    <h2 className="tpl-pm-section-title" style={{ fontSize: 30, fontWeight: 700, marginBottom: 8, letterSpacing: '-0.01em' }}>{config.contact?.title}</h2>
                    <p style={{ color: c.textLight, marginBottom: 40, fontSize: 14 }}>{config.contact?.subtitle}</p>
                    <div className="tpl-pm-grid-2" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12, textAlign: 'left' }}>
                        {[
                            { label: '📧 Email', value: config.contact?.email },
                            { label: '📱 โทร', value: config.contact?.phone },
                            { label: '💬 Line', value: config.contact?.line },
                            { label: '📍 ที่อยู่', value: config.contact?.address },
                        ].map((c2, i) => (
                            <div key={i} style={{ padding: 20, borderRadius: 12, background: c.background, border: `1px solid ${c.text}06` }}>
                                <p style={{ fontSize: 11, color: c.textLight, marginBottom: 4, textTransform: 'uppercase', letterSpacing: 1 }}>{c2.label}</p>
                                <p style={{ fontWeight: 600, fontSize: 14 }}>{c2.value}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer style={{ borderTop: `1px solid ${c.text}08`, padding: '32px 24px' }}>
                <div className="tpl-pm-footer-wrap" style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                        <p style={{ fontWeight: 700, fontSize: 16, letterSpacing: '-0.01em', marginBottom: 4 }}>{config.footer?.logo}</p>
                        <p style={{ fontSize: 12, color: c.textLight }}>{config.footer?.description}</p>
                    </div>
                    <p style={{ fontSize: 11, color: c.textLight, opacity: 0.5 }}>{config.footer?.copyright}</p>
                </div>
            </footer>
        </div>
    )
}
