'use client'

import { PageConfig, ColorTheme } from '@/lib/types'

interface Props {
    config: PageConfig
    colorTheme: ColorTheme
}

export function MinimalTemplate({ config, colorTheme }: Props) {
    const c = colorTheme
    return (
        <div style={{ fontFamily: "'Inter', sans-serif", color: c.text, background: c.background }}>
            <style>{`
                @media (max-width: 768px) {
                    .tpl-min-hero-wrap { padding: 48px 16px !important; flex-direction: column !important; gap: 32px !important; }
                    .tpl-min-hero-title { font-size: 32px !important; }
                    .tpl-min-hero-img { display: none !important; }
                    .tpl-min-grid-3 { grid-template-columns: 1fr !important; }
                    .tpl-min-grid-2 { grid-template-columns: 1fr !important; }
                    .tpl-min-stats { grid-template-columns: repeat(2, 1fr) !important; }
                    .tpl-min-section { padding: 48px 16px !important; }
                    .tpl-min-section-title { font-size: 24px !important; }
                    .tpl-min-nav-links { display: none !important; }
                    .tpl-min-footer-wrap { flex-direction: column !important; text-align: center !important; gap: 12px !important; }
                    .tpl-min-hero-btns { flex-direction: column !important; align-items: stretch !important; }
                    .tpl-min-hero-btns a { text-align: center !important; }
                    .tpl-min-services-list { max-width: 100% !important; }
                }
            `}</style>

            {/* Navbar */}
            <nav id="section-navbar" style={{ padding: '20px 0', borderBottom: `1px solid ${c.text}08` }}>
                <div style={{ maxWidth: 1000, margin: '0 auto', padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: 18, fontWeight: 600, letterSpacing: '-0.01em' }}>{config.navbar?.logo}</span>
                    <div className="tpl-min-nav-links" style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
                        {config.navbar?.links?.map((l, i) => (
                            <a key={i} href={l.href} style={{ color: c.textLight, textDecoration: 'none', fontSize: 13, fontWeight: 400 }}>{l.text}</a>
                        ))}
                        <a href={config.navbar?.ctaHref} style={{ color: c.accent, fontWeight: 600, textDecoration: 'none', fontSize: 13 }}>
                            {config.navbar?.ctaText} →
                        </a>
                    </div>
                </div>
            </nav>

            {/* Hero */}
            <section id="section-hero">
                <div className="tpl-min-hero-wrap" style={{ maxWidth: 1000, margin: '0 auto', padding: '80px 24px', display: 'flex', alignItems: 'center', gap: 60 }}>
                    <div style={{ flex: 1 }}>
                        <p style={{ fontSize: 12, color: c.textLight, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 16, fontWeight: 500 }}>{config.hero?.credentials}</p>
                        <h1 className="tpl-min-hero-title" style={{ fontSize: 48, fontWeight: 700, lineHeight: 1.15, letterSpacing: '-0.03em', marginBottom: 16 }}>{config.hero?.name}</h1>
                        <p style={{ fontSize: 18, color: c.textLight, lineHeight: 1.6, marginBottom: 20 }}>{config.hero?.title}</p>
                        <blockquote style={{ fontSize: 15, fontStyle: 'italic', color: c.textLight, marginBottom: 32, paddingLeft: 16, borderLeft: `2px solid ${c.accent}`, lineHeight: 1.8 }}>
                            {config.hero?.quote}
                        </blockquote>
                        <div className="tpl-min-hero-btns" style={{ display: 'flex', gap: 12 }}>
                            <a href={config.hero?.ctaPrimary?.href} style={{ background: c.text, color: c.background, padding: '12px 28px', borderRadius: 8, fontWeight: 600, textDecoration: 'none', fontSize: 14 }}>
                                {config.hero?.ctaPrimary?.text}
                            </a>
                            <a href={config.hero?.ctaSecondary?.href} style={{ border: `1px solid ${c.text}25`, color: c.text, padding: '12px 28px', borderRadius: 8, fontWeight: 500, textDecoration: 'none', fontSize: 14 }}>
                                {config.hero?.ctaSecondary?.text}
                            </a>
                        </div>
                    </div>
                    <div className="tpl-min-hero-img" style={{ width: 300, height: 380, borderRadius: 12, background: `${c.text}08`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, overflow: 'hidden' }}>
                        {config.hero?.imageUrl ? (
                            <img src={config.hero.imageUrl} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        ) : (
                            <div style={{ fontSize: 100, opacity: 0.15 }}>👤</div>
                        )}
                    </div>
                </div>
            </section>

            {/* Divider */}
            <div style={{ maxWidth: 1000, margin: '0 auto', padding: '0 24px' }}>
                <div style={{ height: 1, background: `${c.text}08` }} />
            </div>

            {/* Stats */}
            <section id="section-stats" style={{ padding: '40px 24px' }}>
                <div className="tpl-min-stats" style={{ maxWidth: 1000, margin: '0 auto', display: 'grid', gridTemplateColumns: `repeat(${config.stats?.items?.length || 4}, 1fr)`, gap: 24, textAlign: 'center' }}>
                    {config.stats?.items?.map((s, i) => (
                        <div key={i}>
                            <div style={{ fontSize: 32, fontWeight: 700, letterSpacing: '-0.02em' }}>{s.value}</div>
                            <div style={{ fontSize: 13, color: c.textLight, marginTop: 4 }}>{s.label}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Values */}
            <section id="section-values" className="tpl-min-section" style={{ padding: '80px 24px' }}>
                <div style={{ maxWidth: 1000, margin: '0 auto' }}>
                    <h2 className="tpl-min-section-title" style={{ fontSize: 32, fontWeight: 700, textAlign: 'center', marginBottom: 8, letterSpacing: '-0.02em' }}>{config.values?.title}</h2>
                    <p style={{ textAlign: 'center', color: c.textLight, marginBottom: 48, fontSize: 15 }}>{config.values?.subtitle}</p>
                    <div className="tpl-min-grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
                        {config.values?.items?.map((v, i) => (
                            <div key={i} style={{ padding: 28, borderRadius: 12, background: c.surface, textAlign: 'center' }}>
                                <div style={{ fontSize: 32, marginBottom: 12 }}>{v.icon}</div>
                                <h3 style={{ fontWeight: 600, fontSize: 16, marginBottom: 6 }}>{v.title}</h3>
                                <p style={{ fontSize: 13, color: c.textLight, lineHeight: 1.7 }}>{v.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Services */}
            <section id="section-services" className="tpl-min-section" style={{ padding: '80px 24px', background: c.surface }}>
                <div style={{ maxWidth: 1000, margin: '0 auto', textAlign: 'center' }}>
                    <p style={{ color: c.accent, fontWeight: 500, fontSize: 13, marginBottom: 8 }}>{config.services?.label}</p>
                    <h2 className="tpl-min-section-title" style={{ fontSize: 32, fontWeight: 700, marginBottom: 48, letterSpacing: '-0.02em' }}>{config.services?.title}</h2>
                    <div className="tpl-min-services-list" style={{ maxWidth: 700, margin: '0 auto' }}>
                        {config.services?.items?.map((s, i) => (
                            <div key={i} style={{ padding: '20px 0', borderBottom: `1px solid ${c.text}06`, display: 'flex', alignItems: 'center', gap: 16, textAlign: 'left' }}>
                                <span style={{ fontSize: 20 }}>{s.icon}</span>
                                <div>
                                    <h3 style={{ fontWeight: 600, fontSize: 15, marginBottom: 2 }}>{s.title}</h3>
                                    <p style={{ fontSize: 13, color: c.textLight }}>{s.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section id="section-testimonials" className="tpl-min-section" style={{ padding: '80px 24px' }}>
                <div style={{ maxWidth: 1000, margin: '0 auto', textAlign: 'center' }}>
                    <h2 className="tpl-min-section-title" style={{ fontSize: 32, fontWeight: 700, marginBottom: 48, letterSpacing: '-0.02em' }}>{config.testimonials?.title}</h2>
                    <div className="tpl-min-grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
                        {config.testimonials?.items?.map((t, i) => (
                            <div key={i} style={{ padding: 24, borderRadius: 12, background: c.surface, textAlign: 'left' }}>
                                <p style={{ fontSize: 14, lineHeight: 1.8, color: c.text, marginBottom: 20 }}>"{t.quote}"</p>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                    <div style={{ width: 32, height: 32, borderRadius: 16, background: `${c.accent}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600, fontSize: 12, color: c.accent }}>{t.avatar}</div>
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
            <section id="section-cta" className="tpl-min-section" style={{ padding: '80px 24px', textAlign: 'center' }}>
                <div style={{ maxWidth: 500, margin: '0 auto' }}>
                    <h2 className="tpl-min-section-title" style={{ fontSize: 28, fontWeight: 700, marginBottom: 8, letterSpacing: '-0.01em' }}>{config.cta?.title}</h2>
                    <p style={{ color: c.textLight, marginBottom: 32, fontSize: 14 }}>{config.cta?.subtitle}</p>
                    <a href={config.cta?.buttonHref} style={{ background: c.text, color: c.background, padding: '14px 36px', borderRadius: 8, fontWeight: 600, textDecoration: 'none', fontSize: 15, display: 'inline-block' }}>
                        {config.cta?.buttonText}
                    </a>
                </div>
            </section>

            {/* Contact */}
            <section id="section-contact" className="tpl-min-section" style={{ padding: '80px 24px', background: c.surface }}>
                <div style={{ maxWidth: 600, margin: '0 auto', textAlign: 'center' }}>
                    <h2 className="tpl-min-section-title" style={{ fontSize: 28, fontWeight: 700, marginBottom: 8, letterSpacing: '-0.01em' }}>{config.contact?.title}</h2>
                    <p style={{ color: c.textLight, marginBottom: 32, fontSize: 14 }}>{config.contact?.subtitle}</p>
                    <div className="tpl-min-grid-2" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12, textAlign: 'left' }}>
                        {[
                            { label: 'Email', value: config.contact?.email },
                            { label: 'โทร', value: config.contact?.phone },
                            { label: 'Line', value: config.contact?.line },
                            { label: 'ที่อยู่', value: config.contact?.address },
                        ].map((c2, i) => (
                            <div key={i} style={{ padding: 16, borderRadius: 8, background: c.background }}>
                                <p style={{ fontSize: 11, color: c.textLight, marginBottom: 4, textTransform: 'uppercase', letterSpacing: 1, fontWeight: 500 }}>{c2.label}</p>
                                <p style={{ fontWeight: 600, fontSize: 14 }}>{c2.value}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer style={{ borderTop: `1px solid ${c.text}08`, padding: '32px 24px' }}>
                <div className="tpl-min-footer-wrap" style={{ maxWidth: 1000, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                        <p style={{ fontWeight: 600, fontSize: 15, marginBottom: 4 }}>{config.footer?.logo}</p>
                        <p style={{ fontSize: 12, color: c.textLight }}>{config.footer?.description}</p>
                    </div>
                    <p style={{ fontSize: 11, color: c.textLight, opacity: 0.5 }}>{config.footer?.copyright}</p>
                </div>
            </footer>
        </div>
    )
}
