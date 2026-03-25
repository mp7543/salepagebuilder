'use client'

import { useState } from 'react'
import { PageConfig, ColorTheme } from '@/lib/types'

interface Props {
    config: PageConfig
    colorTheme: ColorTheme
}

export function LighthouseTemplate({ config, colorTheme }: Props) {
    const c = colorTheme
    const [openFaq, setOpenFaq] = useState<number | null>(null)

    return (
        <div style={{ fontFamily: "'Prompt', 'Inter', sans-serif", color: c.text, background: c.background }}>
            <link href="https://fonts.googleapis.com/css2?family=Prompt:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
            <style>{`
                /* === MOBILE FIRST (base = mobile) === */
                .tpl-lh-container { max-width: 1200px; margin: 0 auto; padding: 0 16px; }
                .tpl-lh-section { padding: 48px 16px; }

                .tpl-lh-hero-title { font-size: 28px; line-height: 1.3; }
                .tpl-lh-hero-subtitle { font-size: 15px; line-height: 1.7; }
                .tpl-lh-section-title { font-size: 24px; font-weight: 700; line-height: 1.3; }
                .tpl-lh-section-subtitle { font-size: 14px; }

                .tpl-lh-grid-2 { display: grid; grid-template-columns: 1fr; gap: 16px; }
                .tpl-lh-grid-3 { display: grid; grid-template-columns: 1fr; gap: 20px; }
                .tpl-lh-stats-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; }

                .tpl-lh-nav-links { display: none; }
                .tpl-lh-nav-cta-desktop { display: none; }



                .tpl-lh-pricing-card { border-radius: 16px; padding: 28px 24px; }
                .tpl-lh-pricing-recommended { transform: none; }

                .tpl-lh-sticky-cta {
                    position: fixed; bottom: 0; left: 0; right: 0; z-index: 100;
                    padding: 12px 16px; display: flex; gap: 8px;
                    background: rgba(255,255,255,0.95); backdrop-filter: blur(12px);
                    border-top: 1px solid rgba(0,0,0,0.08);
                    box-shadow: 0 -4px 20px rgba(0,0,0,0.08);
                }

                .tpl-lh-faq-item { cursor: pointer; padding: 20px; border-radius: 12px; margin-bottom: 8px; transition: all 0.2s; }
                .tpl-lh-faq-item:hover { background: ${c.surface}; }
                .tpl-lh-faq-answer { overflow: hidden; transition: all 0.3s ease; }

                .tpl-lh-btn-primary {
                    display: inline-flex; align-items: center; justify-content: center; gap: 8px;
                    padding: 14px 28px; border-radius: 12px; font-weight: 600; font-size: 15px;
                    text-decoration: none; transition: all 0.2s; border: none; cursor: pointer;
                    min-height: 48px;
                }
                .tpl-lh-btn-primary:hover { transform: translateY(-1px); box-shadow: 0 8px 24px rgba(0,0,0,0.15); }
                .tpl-lh-btn-primary:active { transform: translateY(0); }

                .tpl-lh-service-card {
                    padding: 0; border-radius: 16px; transition: all 0.2s; overflow: hidden;
                }
                .tpl-lh-service-card:hover { transform: translateY(-2px); box-shadow: 0 8px 32px rgba(0,0,0,0.12); }
                .tpl-lh-service-img { width: 100%; height: 160px; object-fit: cover; }
                .tpl-lh-service-body { padding: 20px 24px; }

                .tpl-lh-value-card { border-radius: 12px; overflow: hidden; transition: all 0.2s; }
                .tpl-lh-value-card:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(0,0,0,0.06); }
                .tpl-lh-value-img { width: 100%; height: 140px; object-fit: cover; }

                .tpl-lh-check-item { display: flex; align-items: flex-start; gap: 12px; padding: 8px 0; }

                .tpl-lh-glow-card {
                    border-radius: 16px; padding: 32px 24px;
                    box-shadow: 0 0 40px rgba(30,105,222,0.08), 0 4px 16px rgba(0,0,0,0.04);
                    border: 1px solid rgba(30,105,222,0.12);
                }

                /* === TABLET (768px+) === */
                @media (min-width: 768px) {
                    .tpl-lh-section { padding: 64px 24px; }
                    .tpl-lh-hero-title { font-size: 36px; }
                    .tpl-lh-section-title { font-size: 32px; }
                    .tpl-lh-grid-2 { grid-template-columns: repeat(2, 1fr); }
                    .tpl-lh-stats-grid { grid-template-columns: repeat(4, 1fr); }
                    .tpl-lh-sticky-cta { display: none; }
                }

                /* === DESKTOP (1024px+) === */
                @media (min-width: 1024px) {
                    .tpl-lh-section { padding: 80px 24px; }
                    .tpl-lh-hero-title { font-size: 44px; }
                    .tpl-lh-hero-subtitle { font-size: 17px; }
                    .tpl-lh-section-title { font-size: 36px; }
                    .tpl-lh-grid-3 { grid-template-columns: repeat(3, 1fr); }
                    .tpl-lh-nav-links { display: flex !important; }
                    .tpl-lh-nav-cta-desktop { display: inline-flex !important; }
                    .tpl-lh-pricing-recommended { transform: scale(1.05); }
                    .tpl-lh-pricing-card { padding: 36px 32px; }
                }
            `}</style>

            {/* ===== 1. NAVBAR ===== */}
            <nav style={{ background: c.background, padding: '12px 0', position: 'sticky', top: 0, zIndex: 50, borderBottom: '1px solid rgba(0,0,0,0.06)', backdropFilter: 'blur(12px)' }}>
                <div className="tpl-lh-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: 18, fontWeight: 700, color: c.primary }}>{config.navbar?.logo}</span>
                    <div className="tpl-lh-nav-links" style={{ display: 'none', gap: 28, alignItems: 'center' }}>
                        {config.navbar?.links?.map((l, i) => (
                            <a key={i} href={l.href} style={{ color: c.textLight, textDecoration: 'none', fontSize: 14, fontWeight: 500, transition: 'color 0.2s' }}>{l.text}</a>
                        ))}
                    </div>
                    <a href={config.navbar?.ctaHref} className="tpl-lh-nav-cta-desktop tpl-lh-btn-primary" style={{ display: 'none', background: c.primary, color: '#fff', padding: '10px 24px', fontSize: 14 }}>
                        {config.navbar?.ctaText}
                    </a>
                </div>
            </nav>

            {/* ===== 2. HERO ===== */}
            <section id="section-hero" style={{ position: 'relative', overflow: 'hidden', minHeight: 500 }}>
                {/* Background image */}
                <div style={{
                    position: 'absolute', inset: 0,
                    backgroundImage: config.hero?.imageUrl ? `url(${config.hero.imageUrl})` : `linear-gradient(135deg, ${c.primary}, ${c.secondary})`,
                    backgroundSize: 'cover', backgroundPosition: 'center',
                }} />
                {/* Dark overlay */}
                <div style={{
                    position: 'absolute', inset: 0,
                    background: 'linear-gradient(135deg, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.45) 100%)',
                }} />
                {/* Content */}
                <div className="tpl-lh-container tpl-lh-section" style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', justifyContent: 'center', minHeight: 500 }}>
                    <p style={{ color: 'rgba(255,255,255,0.7)', fontWeight: 600, fontSize: 13, marginBottom: 16, letterSpacing: 0.5 }}>{config.hero?.credentials}</p>
                    <h1 className="tpl-lh-hero-title" style={{ fontWeight: 800, marginBottom: 16, color: '#fff' }}>
                        {config.hero?.name}
                    </h1>
                    <p className="tpl-lh-hero-subtitle" style={{ color: 'rgba(255,255,255,0.8)', marginBottom: 12, maxWidth: 600 }}>
                        {config.hero?.subtitle}
                    </p>
                    <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 13, marginBottom: 28, maxWidth: 500, lineHeight: 1.6, fontStyle: 'italic' }}>
                        {config.hero?.quote}
                    </p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
                        <a href={config.hero?.ctaPrimary?.href} className="tpl-lh-btn-primary" style={{ background: c.primary, color: '#fff' }}>
                            {config.hero?.ctaPrimary?.text}
                        </a>
                        <a href={config.hero?.ctaSecondary?.href} className="tpl-lh-btn-primary" style={{ border: '2px solid rgba(255,255,255,0.4)', color: '#fff', background: 'transparent' }}>
                            {config.hero?.ctaSecondary?.text}
                        </a>
                    </div>
                </div>
            </section>

            {/* ===== 3. STATS ===== */}
            <section style={{ background: c.primary, padding: '36px 16px' }}>
                <div className="tpl-lh-container tpl-lh-stats-grid" style={{ textAlign: 'center' }}>
                    {config.stats?.items?.map((s, i) => (
                        <div key={i} style={{ padding: '12px 0' }}>
                            <div style={{ fontSize: 32, fontWeight: 800, color: '#fff' }}>{s.value}</div>
                            <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)', marginTop: 4 }}>{s.label}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ===== 4. WHY US / ABOUT ===== */}
            <section className="tpl-lh-section" style={{ background: c.background }}>
                <div className="tpl-lh-container" style={{ textAlign: 'center' }}>
                    <p style={{ color: c.primary, fontWeight: 600, fontSize: 13, marginBottom: 8 }}>Why Us</p>
                    <h2 className="tpl-lh-section-title" style={{ color: c.primary, marginBottom: 16 }}>
                        {config.hero?.quote}
                    </h2>
                    <p className="tpl-lh-section-subtitle" style={{ color: c.textLight, maxWidth: 600, margin: '0 auto 8px' }}>
                        {config.hero?.title}
                    </p>
                </div>
            </section>

            {/* ===== 5. PAIN POINTS / VALUES ===== */}
            <section className="tpl-lh-section" style={{ background: c.surface }}>
                <div className="tpl-lh-container">
                    <h2 className="tpl-lh-section-title" style={{ textAlign: 'center', color: c.primary, marginBottom: 8 }}>
                        {config.values?.title}
                    </h2>
                    <p className="tpl-lh-section-subtitle" style={{ textAlign: 'center', color: c.textLight, marginBottom: 32 }}>
                        {config.values?.subtitle}
                    </p>
                    <div className="tpl-lh-grid-2">
                        {config.values?.items?.map((v, i) => (
                            <div key={i} className="tpl-lh-value-card" style={{ background: c.background }}>
                                {v.imageUrl && (
                                    <img src={v.imageUrl} alt={v.title} className="tpl-lh-value-img" />
                                )}
                                <div style={{ padding: 20 }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                                        <span style={{ fontSize: 20 }}>{v.icon}</span>
                                        <h3 style={{ fontWeight: 600, fontSize: 15, color: c.primary }}>{v.title}</h3>
                                    </div>
                                    <p style={{ fontSize: 13, color: c.textLight, lineHeight: 1.7 }}>{v.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== 6. VALUE PROPOSITIONS / WHY CHOOSE ===== */}
            <section id="section-whychoose" className="tpl-lh-section" style={{ background: c.background }}>
                <div className="tpl-lh-container">
                    <div className="tpl-lh-glow-card" style={{ background: c.background, textAlign: 'center' }}>
                        <p style={{ color: c.primary, fontWeight: 600, fontSize: 13, marginBottom: 8 }}>{config.whyChoose?.title}</p>
                        <h2 className="tpl-lh-section-title" style={{ color: c.primary, marginBottom: 32, fontSize: 20 }}>
                            {config.whyChoose?.subtitle}
                        </h2>
                        <div style={{ textAlign: 'left', maxWidth: 600, margin: '0 auto' }}>
                            {config.whyChoose?.items?.map((w, i) => (
                                <div key={i} className="tpl-lh-check-item">
                                    <span style={{ color: c.primary, fontSize: 18, flexShrink: 0 }}>{w.icon}</span>
                                    <div>
                                        <span style={{ fontWeight: 600, fontSize: 14, color: c.text }}>{w.title}</span>
                                        {w.description && <span style={{ fontSize: 13, color: c.textLight }}> — {w.description}</span>}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ===== 7. PRICING ===== */}
            {config.pricing && (
                <section id="section-pricing" className="tpl-lh-section" style={{ background: c.surface }}>
                    <div className="tpl-lh-container">
                        <h2 className="tpl-lh-section-title" style={{ textAlign: 'center', color: c.primary, marginBottom: 32 }}>
                            {config.pricing.title}
                        </h2>
                        <div className="tpl-lh-grid-3">
                            {config.pricing.items?.map((pkg, i) => (
                                <div key={i}
                                    className={`tpl-lh-pricing-card ${pkg.isRecommended ? 'tpl-lh-pricing-recommended' : ''}`}
                                    style={{
                                        background: pkg.isRecommended ? c.primary : c.background,
                                        color: pkg.isRecommended ? '#fff' : c.text,
                                        border: pkg.isRecommended ? 'none' : `1px solid ${c.primary}15`,
                                        position: 'relative',
                                    }}
                                >
                                    {pkg.isRecommended && (
                                        <div style={{
                                            position: 'absolute', top: 16, right: 16,
                                            background: 'rgba(255,255,255,0.2)', padding: '4px 12px',
                                            borderRadius: 20, fontSize: 11, fontWeight: 600,
                                        }}>
                                            แนะนำ
                                        </div>
                                    )}
                                    <h3 style={{ fontWeight: 700, fontSize: 22, marginBottom: 12 }}>{pkg.name}</h3>
                                    <div style={{ marginBottom: 8 }}>
                                        <span style={{ fontSize: 36, fontWeight: 800 }}>{pkg.price}</span>
                                        <span style={{ fontSize: 14, marginLeft: 4, opacity: 0.7 }}>{pkg.unit}</span>
                                    </div>
                                    <p style={{ fontSize: 13, opacity: 0.7, marginBottom: 20 }}>{pkg.description}</p>
                                    <a href={pkg.ctaHref} className="tpl-lh-btn-primary" style={{
                                        background: pkg.isRecommended ? '#fff' : c.primary,
                                        color: pkg.isRecommended ? c.primary : '#fff',
                                        width: '100%', marginBottom: 20,
                                    }}>
                                        {pkg.ctaText}
                                    </a>
                                    <div>
                                        {pkg.features?.map((f, j) => (
                                            <div key={j} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, padding: '6px 0', fontSize: 13 }}>
                                                <span style={{ color: pkg.isRecommended ? 'rgba(255,255,255,0.8)' : c.primary, flexShrink: 0 }}>✓</span>
                                                <span style={{ opacity: 0.85 }}>{f}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* ===== 8. SERVICES ===== */}
            <section id="section-services" className="tpl-lh-section" style={{ background: c.background }}>
                <div className="tpl-lh-container">
                    <p style={{ color: c.primary, fontWeight: 600, fontSize: 13, marginBottom: 8 }}>{config.services?.label}</p>
                    <h2 className="tpl-lh-section-title" style={{ color: c.primary, marginBottom: 8 }}>{config.services?.title}</h2>
                    <p className="tpl-lh-section-subtitle" style={{ color: c.textLight, marginBottom: 32 }}>
                        {config.hero?.title}
                    </p>
                    <div className="tpl-lh-grid-3">
                        {config.services?.items?.map((s, i) => (
                            <div key={i} className="tpl-lh-service-card" style={{ background: c.primary, color: '#fff' }}>
                                {s.imageUrl ? (
                                    <img src={s.imageUrl} alt={s.title} className="tpl-lh-service-img" style={{ filter: 'brightness(0.7)' }} />
                                ) : (
                                    <div style={{ height: 120, background: `${c.secondary}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 40 }}>
                                        {s.icon}
                                    </div>
                                )}
                                <div className="tpl-lh-service-body">
                                    <h3 style={{ fontWeight: 700, fontSize: 18, marginBottom: 8 }}>{s.title}</h3>
                                    <p style={{ fontSize: 13, opacity: 0.8, lineHeight: 1.6 }}>{s.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== 9. TESTIMONIALS ===== */}
            <section id="section-testimonials" className="tpl-lh-section" style={{ background: c.surface }}>
                <div className="tpl-lh-container" style={{ textAlign: 'center' }}>
                    <h2 className="tpl-lh-section-title" style={{ color: c.primary, marginBottom: 32 }}>
                        {config.testimonials?.title}
                    </h2>
                    <div style={{ maxWidth: 600, margin: '0 auto', textAlign: 'left' }}>
                        {config.testimonials?.items?.map((t, i) => (
                            <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, padding: '16px 0', borderBottom: i < (config.testimonials?.items?.length || 0) - 1 ? `1px solid ${c.primary}10` : 'none' }}>
                                <span style={{ color: c.primary, fontSize: 18, flexShrink: 0 }}>✅</span>
                                <div>
                                    <p style={{ fontSize: 14, fontWeight: 600, color: c.text, marginBottom: 2 }}>{t.quote}</p>
                                    <p style={{ fontSize: 12, color: c.textLight }}>— {t.name}, {t.role}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== 10. FAQ ===== */}
            {config.faq && (
                <section id="section-faq" className="tpl-lh-section" style={{ background: c.background }}>
                    <div className="tpl-lh-container" style={{ maxWidth: 700 }}>
                        <p style={{ color: c.primary, fontWeight: 600, fontSize: 13, marginBottom: 8, textAlign: 'center' }}>FAQ</p>
                        <h2 className="tpl-lh-section-title" style={{ textAlign: 'center', color: c.primary, marginBottom: 32 }}>
                            {config.faq.title}
                        </h2>
                        {config.faq.items?.map((item, i) => (
                            <div key={i}
                                className="tpl-lh-faq-item"
                                style={{ border: `1px solid ${c.primary}15`, background: openFaq === i ? c.surface : 'transparent' }}
                                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                            >
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
                                    <h3 style={{ fontWeight: 600, fontSize: 15, color: c.text, margin: 0 }}>
                                        {openFaq === i ? '▼' : '►'} {item.question}
                                    </h3>
                                </div>
                                <div className="tpl-lh-faq-answer" style={{
                                    maxHeight: openFaq === i ? 200 : 0,
                                    opacity: openFaq === i ? 1 : 0,
                                    marginTop: openFaq === i ? 12 : 0,
                                }}>
                                    <p style={{ fontSize: 14, color: c.textLight, lineHeight: 1.7, margin: 0 }}>{item.answer}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* ===== 11. FINAL CTA ===== */}
            <section id="section-cta" className="tpl-lh-section" style={{
                background: `linear-gradient(rgba(0,0,0,0.65), rgba(0,0,0,0.75)), linear-gradient(135deg, ${c.primary}, ${c.secondary})`,
                textAlign: 'center', color: '#fff',
            }}>
                <div className="tpl-lh-container">
                    <h2 className="tpl-lh-section-title" style={{ color: '#fff', marginBottom: 16 }}>
                        {config.cta?.title}
                    </h2>
                    <p style={{ fontSize: 14, opacity: 0.8, marginBottom: 28 }}>{config.cta?.subtitle}</p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center' }}>
                        <a href={config.cta?.buttonHref} className="tpl-lh-btn-primary" style={{ background: c.primary, color: '#fff' }}>
                            {config.cta?.buttonText}
                        </a>
                        {config.contact?.line && (
                            <a href={`https://line.me/R/ti/p/${config.contact.line}`} className="tpl-lh-btn-primary" style={{ background: '#00B900', color: '#fff' }}>
                                เพิ่มเพื่อน Line
                            </a>
                        )}
                    </div>
                </div>
            </section>

            {/* ===== 12. CONTACT ===== */}
            <section id="section-contact" className="tpl-lh-section" style={{ background: c.surface }}>
                <div className="tpl-lh-container" style={{ maxWidth: 600, textAlign: 'center' }}>
                    <h2 className="tpl-lh-section-title" style={{ color: c.primary, marginBottom: 8 }}>{config.contact?.title}</h2>
                    <p className="tpl-lh-section-subtitle" style={{ color: c.textLight, marginBottom: 28 }}>{config.contact?.subtitle}</p>
                    <div className="tpl-lh-grid-2" style={{ textAlign: 'left' }}>
                        {[
                            { label: '📧 Email', value: config.contact?.email },
                            { label: '📱 โทร', value: config.contact?.phone },
                            { label: '💬 Line', value: config.contact?.line },
                            { label: '📍 ที่อยู่', value: config.contact?.address },
                        ].map((c2, i) => (
                            <div key={i} style={{ padding: 16, borderRadius: 12, background: c.background, border: `1px solid ${c.primary}10` }}>
                                <p style={{ fontSize: 11, color: c.textLight, marginBottom: 4 }}>{c2.label}</p>
                                <p style={{ fontWeight: 600, fontSize: 14, color: c.text }}>{c2.value}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== 13. FOOTER ===== */}
            <footer style={{ background: c.primary, color: '#fff', padding: '32px 16px' }}>
                <div className="tpl-lh-container" style={{ textAlign: 'center' }}>
                    <p style={{ fontWeight: 700, fontSize: 16, marginBottom: 6 }}>{config.footer?.logo}</p>
                    <p style={{ fontSize: 12, opacity: 0.7, marginBottom: 16 }}>{config.footer?.description}</p>
                    <div style={{ display: 'flex', gap: 20, justifyContent: 'center', marginBottom: 16 }}>
                        {config.footer?.links?.map((l, i) => (
                            <a key={i} href={l.href} style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: 13 }}>{l.text}</a>
                        ))}
                    </div>
                    <p style={{ fontSize: 11, opacity: 0.5 }}>{config.footer?.copyright}</p>
                </div>
            </footer>

            {/* ===== STICKY CTA (MOBILE ONLY) ===== */}
            <div className="tpl-lh-sticky-cta">
                <a href={config.contact?.phone ? `tel:${config.contact.phone.replace(/-/g, '')}` : '#contact'}
                    className="tpl-lh-btn-primary"
                    style={{ background: c.primary, color: '#fff', flex: 1, padding: '12px', fontSize: 14 }}>
                    📱 โทรเลย
                </a>
                {config.contact?.line && (
                    <a href={`https://line.me/R/ti/p/${config.contact.line}`}
                        className="tpl-lh-btn-primary"
                        style={{ background: '#00B900', color: '#fff', flex: 1, padding: '12px', fontSize: 14 }}>
                        💬 Line
                    </a>
                )}
            </div>

            {/* Bottom padding for sticky CTA on mobile */}
            <div style={{ height: 70 }} className="tpl-lh-sticky-cta-spacer" />
            <style>{`
                @media (min-width: 768px) {
                    .tpl-lh-sticky-cta-spacer { display: none; }
                }
            `}</style>
        </div>
    )
}
