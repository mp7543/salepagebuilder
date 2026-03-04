'use client'

import { PageConfig, ColorTheme } from '@/lib/types'

interface Props {
    config: PageConfig
    colorTheme: ColorTheme
}

export function MinimalTemplate({ config, colorTheme }: Props) {
    const c = colorTheme
    return (
        <div style={{ fontFamily: "'Outfit', 'Noto Sans Thai', sans-serif", color: c.text, background: c.background }}>
            <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&family=Noto+Sans+Thai:wght@300;400;500;600;700&display=swap" rel="stylesheet" />

            {/* Navbar */}
            <nav style={{ padding: '24px 0', borderBottom: `1px solid ${c.text}10` }}>
                <div style={{ maxWidth: 900, margin: '0 auto', padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: 20, fontWeight: 700, letterSpacing: -0.5 }}>{config.navbar?.logo}</span>
                    <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
                        {config.navbar?.links?.map((l, i) => (
                            <a key={i} href={l.href} style={{ color: c.textLight, textDecoration: 'none', fontSize: 14, fontWeight: 400 }}>{l.text}</a>
                        ))}
                    </div>
                </div>
            </nav>

            {/* Hero */}
            <section style={{ padding: '120px 24px 80px', textAlign: 'center' }}>
                <div style={{ maxWidth: 700, margin: '0 auto' }}>
                    <p style={{ color: c.accent, fontSize: 13, fontWeight: 500, letterSpacing: 3, textTransform: 'uppercase', marginBottom: 24 }}>{config.hero?.credentials}</p>
                    <h1 style={{ fontSize: 52, fontWeight: 700, lineHeight: 1.15, marginBottom: 24, letterSpacing: -1.5, color: c.text }}>{config.hero?.name}</h1>
                    <div style={{ width: 60, height: 2, background: c.accent, margin: '0 auto 24px' }} />
                    <p style={{ fontSize: 18, color: c.textLight, lineHeight: 1.8, maxWidth: 500, margin: '0 auto 40px' }}>{config.hero?.title}</p>
                    <a href={config.hero?.ctaPrimary?.href} style={{ color: c.accent, textDecoration: 'none', fontSize: 15, fontWeight: 600, borderBottom: `2px solid ${c.accent}`, paddingBottom: 4 }}>
                        {config.hero?.ctaPrimary?.text} →
                    </a>
                </div>
            </section>

            {/* About/Quote */}
            <section style={{ padding: '80px 24px', background: c.surface }}>
                <div style={{ maxWidth: 700, margin: '0 auto', display: 'flex', gap: 60, alignItems: 'center' }}>
                    <div style={{ flex: 1 }}>
                        <blockquote style={{ fontSize: 22, fontWeight: 400, lineHeight: 1.8, color: c.text, fontStyle: 'italic', borderLeft: `3px solid ${c.accent}`, paddingLeft: 24 }}>
                            {config.hero?.quote}
                        </blockquote>
                        <p style={{ marginTop: 20, color: c.textLight, fontSize: 14 }}>— {config.hero?.name}, {config.hero?.subtitle}</p>
                    </div>
                    <div style={{ width: 200, height: 240, borderRadius: 12, background: `${c.accent}10`, flexShrink: 0, overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        {config.hero?.imageUrl ? (
                            <img src={config.hero.imageUrl} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        ) : (
                            <div style={{ fontSize: 64, opacity: 0.2 }}>👤</div>
                        )}
                    </div>
                </div>
            </section>

            {/* Stats */}
            <section style={{ padding: '60px 24px' }}>
                <div style={{ maxWidth: 700, margin: '0 auto', display: 'flex', justifyContent: 'space-around', textAlign: 'center' }}>
                    {config.stats?.items?.map((s, i) => (
                        <div key={i}>
                            <div style={{ fontSize: 36, fontWeight: 700, color: c.accent }}>{s.value}</div>
                            <div style={{ fontSize: 13, color: c.textLight, marginTop: 4 }}>{s.label}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Services */}
            <section style={{ padding: '80px 24px', background: c.surface }}>
                <div style={{ maxWidth: 700, margin: '0 auto' }}>
                    <h2 style={{ fontSize: 32, fontWeight: 700, textAlign: 'center', marginBottom: 48, letterSpacing: -0.5, color: c.text }}>{config.services?.title}</h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                        {config.services?.items?.map((s, i) => (
                            <div key={i} style={{ padding: '24px 0', borderBottom: `1px solid ${c.text}10`, display: 'flex', alignItems: 'center', gap: 20 }}>
                                <span style={{ fontSize: 24 }}>{s.icon}</span>
                                <div style={{ flex: 1 }}>
                                    <h3 style={{ fontWeight: 600, fontSize: 16, marginBottom: 2, color: c.text }}>{s.title}</h3>
                                    <p style={{ fontSize: 14, color: c.textLight }}>{s.description}</p>
                                </div>
                                <span style={{ color: c.accent, fontSize: 18 }}>→</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Values */}
            <section style={{ padding: '80px 24px' }}>
                <div style={{ maxWidth: 700, margin: '0 auto', textAlign: 'center' }}>
                    <h2 style={{ fontSize: 32, fontWeight: 700, marginBottom: 48, letterSpacing: -0.5, color: c.text }}>{config.values?.title}</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32 }}>
                        {config.values?.items?.map((v, i) => (
                            <div key={i} style={{ textAlign: 'center' }}>
                                <div style={{ fontSize: 32, marginBottom: 12 }}>{v.icon}</div>
                                <h3 style={{ fontWeight: 600, fontSize: 15, marginBottom: 6, color: c.text }}>{v.title}</h3>
                                <p style={{ fontSize: 13, color: c.textLight, lineHeight: 1.7 }}>{v.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section style={{ padding: '80px 24px', background: c.surface }}>
                <div style={{ maxWidth: 600, margin: '0 auto', textAlign: 'center' }}>
                    <h2 style={{ fontSize: 32, fontWeight: 700, marginBottom: 48, letterSpacing: -0.5, color: c.text }}>{config.testimonials?.title}</h2>
                    {config.testimonials?.items?.slice(0, 1).map((t, i) => (
                        <div key={i}>
                            <div style={{ display: 'flex', justifyContent: 'center', gap: 4, marginBottom: 20 }}>
                                {Array.from({ length: t.rating }).map((_, j) => <span key={j} style={{ color: c.accent, fontSize: 20 }}>★</span>)}
                            </div>
                            <p style={{ fontSize: 20, lineHeight: 1.8, color: c.text, fontStyle: 'italic', marginBottom: 24 }}>"{t.quote}"</p>
                            <p style={{ fontWeight: 600, fontSize: 15, color: c.text }}>{t.name}</p>
                            <p style={{ fontSize: 13, color: c.textLight }}>{t.role}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA */}
            <section style={{ padding: '100px 24px', textAlign: 'center' }}>
                <h2 style={{ fontSize: 32, fontWeight: 700, marginBottom: 16, letterSpacing: -0.5, color: c.text }}>{config.cta?.title}</h2>
                <p style={{ color: c.textLight, marginBottom: 32, fontSize: 16 }}>{config.cta?.subtitle}</p>
                <a href={config.cta?.buttonHref} style={{ color: c.accent, textDecoration: 'none', fontSize: 16, fontWeight: 600, borderBottom: `2px solid ${c.accent}`, paddingBottom: 6 }}>
                    {config.cta?.buttonText} →
                </a>
            </section>

            {/* Contact */}
            <section style={{ padding: '80px 24px', background: c.surface }}>
                <div style={{ maxWidth: 500, margin: '0 auto', textAlign: 'center' }}>
                    <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 32, color: c.text }}>{config.contact?.title}</h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, textAlign: 'left' }}>
                        {[
                            { icon: '📧', value: config.contact?.email },
                            { icon: '📱', value: config.contact?.phone },
                            { icon: '💬', value: config.contact?.line },
                            { icon: '📍', value: config.contact?.address },
                        ].map((c2, i) => (
                            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 0', borderBottom: `1px solid ${c.text}08` }}>
                                <span>{c2.icon}</span>
                                <span style={{ fontSize: 15, color: c.text }}>{c2.value}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer style={{ padding: '40px 24px', textAlign: 'center', borderTop: `1px solid ${c.text}08` }}>
                <p style={{ fontSize: 12, color: c.textLight }}>{config.footer?.copyright}</p>
            </footer>
        </div>
    )
}
