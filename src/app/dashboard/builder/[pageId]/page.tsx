'use client'

import { useSession } from 'next-auth/react'
import { useRouter, useParams } from 'next/navigation'
import { useEffect, useState, useCallback, useRef } from 'react'
import { ArrowLeft, Save, Eye, Palette, Type, Layout, Star, Image, MessageSquare, Phone, Award, BarChart3, Loader2, Globe, ChevronRight } from 'lucide-react'
import { brandPresets, templateColorPresets } from '@/lib/presets/colors'
import { financialPreset, realestatePreset, genericPreset } from '@/lib/presets/content'
import { PageConfig, ColorTheme, TemplateType } from '@/lib/types'
import { ProfessionalTemplate } from '@/components/templates/professional'
import { PremiumTemplate } from '@/components/templates/premium'
import { MinimalTemplate } from '@/components/templates/minimal'

const TEMPLATE_OPTIONS: { id: TemplateType; name: string; desc: string; icon: string }[] = [
    { id: 'professional', name: 'Professional', desc: 'สไตล์ Karnwealth', icon: '🏢' },
    { id: 'premium', name: 'Premium', desc: 'สไตล์ Apple', icon: '✨' },
    { id: 'minimal', name: 'Minimal', desc: 'สะอาด เรียบง่าย', icon: '🍃' },
]

const CONTENT_PRESETS = [
    { id: 'financial', name: 'นักวางแผนการเงิน', icon: '💰', preset: financialPreset },
    { id: 'realestate', name: 'นายหน้าอสังหา', icon: '🏠', preset: realestatePreset },
    { id: 'generic', name: 'กำหนดเอง', icon: '✏️', preset: genericPreset },
]

const SECTIONS = [
    { id: 'template', name: 'เทมเพลท', icon: <Layout size={16} /> },
    { id: 'colors', name: 'สีธีม', icon: <Palette size={16} /> },
    { id: 'navbar', name: 'Navbar', icon: <Layout size={16} /> },
    { id: 'hero', name: 'Hero', icon: <Star size={16} /> },
    { id: 'stats', name: 'ตัวเลข', icon: <BarChart3 size={16} /> },
    { id: 'values', name: 'คุณค่า', icon: <Award size={16} /> },
    { id: 'services', name: 'บริการ', icon: <Type size={16} /> },
    { id: 'testimonials', name: 'รีวิว', icon: <MessageSquare size={16} /> },
    { id: 'cta', name: 'CTA', icon: <Eye size={16} /> },
    { id: 'contact', name: 'ติดต่อ', icon: <Phone size={16} /> },
]

export default function BuilderPage() {
    const { data: session, status } = useSession()
    const router = useRouter()
    const params = useParams()
    const pageId = params.pageId as string

    const [template, setTemplate] = useState<TemplateType>('professional')
    const [config, setConfig] = useState<PageConfig>(genericPreset as PageConfig)
    const [colorTheme, setColorTheme] = useState<ColorTheme>(templateColorPresets.professional[0])
    const [activeSection, setActiveSection] = useState('template')
    const [saving, setSaving] = useState(false)
    const [pageSlug, setPageSlug] = useState('')
    const [pageTitle, setPageTitle] = useState('')
    const [isPublished, setIsPublished] = useState(false)
    const saveTimeoutRef = useRef<NodeJS.Timeout>()

    useEffect(() => {
        if (status === 'unauthenticated') router.push('/login')
    }, [status, router])

    useEffect(() => {
        if (session && pageId) loadPage()
    }, [session, pageId])

    const loadPage = async () => {
        const res = await fetch(`/api/pages/${pageId}`, { method: 'GET' }).catch(() => null)
        if (!res) {
            const listRes = await fetch('/api/pages')
            if (listRes.ok) {
                const pages = await listRes.json()
                const page = pages.find((p: any) => p.id === pageId)
                if (page) {
                    setTemplate(page.template as TemplateType)
                    setPageSlug(page.slug)
                    setPageTitle(page.title)
                    setIsPublished(page.isPublished)
                    try { setConfig({ ...genericPreset, ...JSON.parse(page.config) } as PageConfig) } catch { }
                    try { setColorTheme({ ...templateColorPresets.professional[0], ...JSON.parse(page.colorTheme) }) } catch { }
                }
            }
            return
        }
        // This path won't normally be reached since GET /api/pages/[id] isn't defined
    }

    const autoSave = useCallback(() => {
        if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current)
        saveTimeoutRef.current = setTimeout(async () => {
            setSaving(true)
            await fetch(`/api/pages/${pageId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ template, config, colorTheme, title: pageTitle, isPublished }),
            })
            setSaving(false)
        }, 1500)
    }, [pageId, template, config, colorTheme, pageTitle, isPublished])

    useEffect(() => { autoSave() }, [config, colorTheme, template])

    const updateConfig = (section: keyof PageConfig, key: string, value: any) => {
        setConfig(prev => ({
            ...prev,
            [section]: { ...prev[section] as any, [key]: value },
        }))
    }

    const updateArrayItem = (section: keyof PageConfig, index: number, key: string, value: any) => {
        setConfig(prev => {
            const sectionData = prev[section] as any
            const items = [...sectionData.items]
            items[index] = { ...items[index], [key]: value }
            return { ...prev, [section]: { ...sectionData, items } }
        })
    }

    const handleSave = async () => {
        setSaving(true)
        await fetch(`/api/pages/${pageId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ template, config, colorTheme, title: pageTitle, isPublished: true, slug: pageSlug }),
        })
        setIsPublished(true)
        setSaving(false)
    }

    const applyContentPreset = (preset: Partial<PageConfig>) => {
        setConfig(prev => ({ ...prev, ...preset } as PageConfig))
    }

    const applyBrandColor = (brand: typeof brandPresets[0]) => {
        const base = templateColorPresets[template][0]
        setColorTheme({ ...base, primary: brand.primary, accent: brand.secondary })
    }

    const renderTemplatePreview = () => {
        const props = { config, colorTheme }
        switch (template) {
            case 'professional': return <ProfessionalTemplate {...props} />
            case 'premium': return <PremiumTemplate {...props} />
            case 'minimal': return <MinimalTemplate {...props} />
        }
    }

    const renderSectionEditor = () => {
        switch (activeSection) {
            case 'template':
                return (
                    <div className="space-y-6">
                        <div>
                            <h3 className="text-sm font-semibold mb-3 text-[var(--muted)]">เลือกเทมเพลท</h3>
                            <div className="space-y-2">
                                {TEMPLATE_OPTIONS.map(t => (
                                    <button key={t.id} onClick={() => { setTemplate(t.id); setColorTheme(templateColorPresets[t.id][0]) }}
                                        className={`w-full p-4 rounded-xl text-left transition-all ${template === t.id ? 'bg-[var(--primary)]/20 border border-purple-500/50' : 'bg-white/5 border border-white/5 hover:border-white/10'}`}>
                                        <span className="text-lg mr-2">{t.icon}</span>
                                        <span className="font-medium">{t.name}</span>
                                        <p className="text-xs text-[var(--muted)] mt-1 ml-7">{t.desc}</p>
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div>
                            <h3 className="text-sm font-semibold mb-3 text-[var(--muted)]">เลือก Preset เนื้อหา</h3>
                            <div className="space-y-2">
                                {CONTENT_PRESETS.map(p => (
                                    <button key={p.id} onClick={() => applyContentPreset(p.preset)}
                                        className="w-full p-3 rounded-xl bg-white/5 border border-white/5 hover:border-white/10 text-left transition-all">
                                        <span className="mr-2">{p.icon}</span> {p.name}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                )
            case 'colors':
                return (
                    <div className="space-y-6">
                        <div>
                            <h3 className="text-sm font-semibold mb-3 text-[var(--muted)]">สีธีม</h3>
                            <div className="grid grid-cols-2 gap-2">
                                {templateColorPresets[template].map((c, i) => (
                                    <button key={i} onClick={() => setColorTheme(c)}
                                        className={`p-3 rounded-xl border transition-all ${JSON.stringify(colorTheme) === JSON.stringify(c) ? 'border-purple-500' : 'border-white/5 hover:border-white/10'}`}>
                                        <div className="flex gap-1 mb-2">
                                            <div className="w-5 h-5 rounded-full" style={{ background: c.primary }} />
                                            <div className="w-5 h-5 rounded-full" style={{ background: c.accent }} />
                                            <div className="w-5 h-5 rounded-full" style={{ background: c.background }} />
                                        </div>
                                        <p className="text-xs">{c.name}</p>
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div>
                            <h3 className="text-sm font-semibold mb-3 text-[var(--muted)]">สีแบรนด์ประกัน</h3>
                            <div className="grid grid-cols-2 gap-2">
                                {brandPresets.map((b, i) => (
                                    <button key={i} onClick={() => applyBrandColor(b)}
                                        className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-left transition-all flex items-center gap-2">
                                        <div className="w-5 h-5 rounded-full shrink-0" style={{ background: b.primary }} />
                                        <span className="text-xs truncate">{b.name}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div>
                            <h3 className="text-sm font-semibold mb-3 text-[var(--muted)]">กำหนดสีเอง</h3>
                            <div className="space-y-3">
                                {[
                                    { key: 'primary', label: 'สีหลัก' },
                                    { key: 'accent', label: 'สี Accent' },
                                    { key: 'background', label: 'พื้นหลัง' },
                                ].map(c => (
                                    <label key={c.key} className="flex items-center gap-3">
                                        <input type="color" value={(colorTheme as any)[c.key]} onChange={e => setColorTheme(prev => ({ ...prev, [c.key]: e.target.value }))} className="w-8 h-8 rounded cursor-pointer border-0" />
                                        <span className="text-sm">{c.label}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>
                )
            case 'hero':
                return (
                    <div className="space-y-4">
                        {[
                            { key: 'name', label: 'ชื่อ' },
                            { key: 'title', label: 'ตำแหน่ง/หัวข้อ' },
                            { key: 'subtitle', label: 'สโลแกน' },
                            { key: 'quote', label: 'Quote' },
                            { key: 'credentials', label: 'ใบรับรอง' },
                            { key: 'imageUrl', label: 'URL รูปโปรไฟล์' },
                        ].map(f => (
                            <label key={f.key} className="block">
                                <span className="text-xs text-[var(--muted)] mb-1 block">{f.label}</span>
                                <input type="text" value={(config.hero as any)?.[f.key] || ''} onChange={e => updateConfig('hero', f.key, e.target.value)}
                                    className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-sm focus:border-purple-500 focus:outline-none transition-all" />
                            </label>
                        ))}
                        <label className="block">
                            <span className="text-xs text-[var(--muted)] mb-1 block">CTA หลัก</span>
                            <input type="text" value={config.hero?.ctaPrimary?.text || ''} onChange={e => updateConfig('hero', 'ctaPrimary', { ...config.hero?.ctaPrimary, text: e.target.value })}
                                className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-sm focus:border-purple-500 focus:outline-none transition-all" />
                        </label>
                        <label className="block">
                            <span className="text-xs text-[var(--muted)] mb-1 block">CTA รอง</span>
                            <input type="text" value={config.hero?.ctaSecondary?.text || ''} onChange={e => updateConfig('hero', 'ctaSecondary', { ...config.hero?.ctaSecondary, text: e.target.value })}
                                className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-sm focus:border-purple-500 focus:outline-none transition-all" />
                        </label>
                    </div>
                )
            case 'navbar':
                return (
                    <div className="space-y-4">
                        <label className="block">
                            <span className="text-xs text-[var(--muted)] mb-1 block">Logo Text</span>
                            <input type="text" value={config.navbar?.logo || ''} onChange={e => updateConfig('navbar', 'logo', e.target.value)}
                                className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-sm focus:border-purple-500 focus:outline-none" />
                        </label>
                        <label className="block">
                            <span className="text-xs text-[var(--muted)] mb-1 block">CTA Text</span>
                            <input type="text" value={config.navbar?.ctaText || ''} onChange={e => updateConfig('navbar', 'ctaText', e.target.value)}
                                className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-sm focus:border-purple-500 focus:outline-none" />
                        </label>
                    </div>
                )
            default:
                return renderGenericSection(activeSection as keyof PageConfig)
        }
    }

    const renderGenericSection = (section: keyof PageConfig) => {
        const data = config[section] as any
        if (!data) return <p className="text-sm text-[var(--muted)]">ไม่มีข้อมูล</p>

        return (
            <div className="space-y-4">
                {data.title !== undefined && (
                    <label className="block">
                        <span className="text-xs text-[var(--muted)] mb-1 block">หัวข้อ</span>
                        <input type="text" value={data.title || ''} onChange={e => updateConfig(section, 'title', e.target.value)}
                            className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-sm focus:border-purple-500 focus:outline-none" />
                    </label>
                )}
                {data.subtitle !== undefined && (
                    <label className="block">
                        <span className="text-xs text-[var(--muted)] mb-1 block">หัวข้อรอง</span>
                        <input type="text" value={data.subtitle || ''} onChange={e => updateConfig(section, 'subtitle', e.target.value)}
                            className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-sm focus:border-purple-500 focus:outline-none" />
                    </label>
                )}
                {data.items?.map((item: any, i: number) => (
                    <div key={i} className="p-3 rounded-lg bg-white/3 border border-white/5 space-y-2">
                        <span className="text-xs text-[var(--muted)]">#{i + 1}</span>
                        {item.title !== undefined && <input type="text" value={item.title} onChange={e => updateArrayItem(section, i, 'title', e.target.value)} className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-sm focus:border-purple-500 focus:outline-none" placeholder="หัวข้อ" />}
                        {item.description !== undefined && <input type="text" value={item.description} onChange={e => updateArrayItem(section, i, 'description', e.target.value)} className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-sm focus:border-purple-500 focus:outline-none" placeholder="คำอธิบาย" />}
                        {item.quote !== undefined && <input type="text" value={item.quote} onChange={e => updateArrayItem(section, i, 'quote', e.target.value)} className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-sm focus:border-purple-500 focus:outline-none" placeholder="Quote" />}
                        {item.name !== undefined && <input type="text" value={item.name} onChange={e => updateArrayItem(section, i, 'name', e.target.value)} className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-sm focus:border-purple-500 focus:outline-none" placeholder="ชื่อ" />}
                        {item.value !== undefined && <input type="text" value={item.value} onChange={e => updateArrayItem(section, i, 'value', e.target.value)} className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-sm focus:border-purple-500 focus:outline-none" placeholder="ค่า" />}
                        {item.label !== undefined && <input type="text" value={item.label} onChange={e => updateArrayItem(section, i, 'label', e.target.value)} className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-sm focus:border-purple-500 focus:outline-none" placeholder="Label" />}
                    </div>
                ))}
                {/* Single fields */}
                {data.email !== undefined && (
                    <label className="block"><span className="text-xs text-[var(--muted)] mb-1 block">Email</span>
                        <input type="text" value={data.email || ''} onChange={e => updateConfig(section, 'email', e.target.value)} className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-sm focus:border-purple-500 focus:outline-none" /></label>
                )}
                {data.phone !== undefined && (
                    <label className="block"><span className="text-xs text-[var(--muted)] mb-1 block">โทร</span>
                        <input type="text" value={data.phone || ''} onChange={e => updateConfig(section, 'phone', e.target.value)} className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-sm focus:border-purple-500 focus:outline-none" /></label>
                )}
                {data.line !== undefined && (
                    <label className="block"><span className="text-xs text-[var(--muted)] mb-1 block">Line</span>
                        <input type="text" value={data.line || ''} onChange={e => updateConfig(section, 'line', e.target.value)} className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-sm focus:border-purple-500 focus:outline-none" /></label>
                )}
                {data.buttonText !== undefined && (
                    <label className="block"><span className="text-xs text-[var(--muted)] mb-1 block">ข้อความปุ่ม</span>
                        <input type="text" value={data.buttonText || ''} onChange={e => updateConfig(section, 'buttonText', e.target.value)} className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-sm focus:border-purple-500 focus:outline-none" /></label>
                )}
            </div>
        )
    }

    if (status === 'loading') return <div className="min-h-screen flex items-center justify-center"><Loader2 className="animate-spin text-purple-500" size={32} /></div>

    return (
        <div className="h-screen flex flex-col overflow-hidden">
            {/* Header */}
            <header className="glass shrink-0 z-50">
                <div className="px-4 py-3 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <button onClick={() => router.push('/dashboard')} className="p-2 rounded-lg hover:bg-white/5"><ArrowLeft size={18} /></button>
                        <input type="text" value={pageTitle} onChange={e => setPageTitle(e.target.value)} className="bg-transparent font-semibold text-sm focus:outline-none border-b border-transparent focus:border-purple-500 pr-4" placeholder="ชื่อเพจ" />
                    </div>
                    <div className="flex items-center gap-2">
                        {saving && <span className="text-xs text-[var(--muted)] flex items-center gap-1"><Loader2 size={12} className="animate-spin" /> กำลังบันทึก...</span>}
                        {isPublished && pageSlug && (
                            <a href={`/p/${pageSlug}`} target="_blank" className="flex items-center gap-1 px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-xs transition-all">
                                <Globe size={12} /> ดูเพจ
                            </a>
                        )}
                        <button onClick={handleSave} className="flex items-center gap-1 px-4 py-2 rounded-lg bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white text-sm font-medium transition-all">
                            <Save size={14} /> เผยแพร่
                        </button>
                    </div>
                </div>
            </header>

            {/* Body */}
            <div className="flex-1 flex overflow-hidden">
                {/* Sidebar Nav */}
                <div className="w-16 shrink-0 border-r border-white/10 bg-[#1a1a2e] flex flex-col py-2 overflow-y-auto">
                    {SECTIONS.map(s => (
                        <button key={s.id} onClick={() => setActiveSection(s.id)}
                            className={`flex flex-col items-center gap-1 px-1 py-3 text-center transition-all border-l-2 ${activeSection === s.id ? 'border-purple-500 bg-purple-500/10 text-white' : 'border-transparent text-gray-400 hover:text-white hover:bg-white/5'}`}>
                            {s.icon}
                            <span className="text-[10px] leading-tight">{s.name}</span>
                        </button>
                    ))}
                </div>
                {/* Sidebar Editor */}
                <div className="w-72 shrink-0 border-r border-white/10 flex flex-col bg-[#12121f]">
                    <div className="p-4 border-b border-white/10 shrink-0">
                        <h2 className="text-base font-bold text-white">{SECTIONS.find(s => s.id === activeSection)?.name}</h2>
                    </div>
                    <div className="flex-1 overflow-y-auto p-4">
                        {renderSectionEditor()}
                    </div>
                </div>

                {/* Preview */}
                <div className="flex-1 overflow-y-auto bg-gray-900">
                    <div className="min-h-full">
                        {renderTemplatePreview()}
                    </div>
                </div>
            </div>
        </div>
    )
}
