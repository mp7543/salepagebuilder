'use client'

import { useRouter, useParams } from 'next/navigation'
import { useEffect, useState, useCallback, useRef } from 'react'
import { ArrowLeft, Save, Eye, Palette, Type, Layout, Star, Image, MessageSquare, Phone, Award, BarChart3, Loader2, Globe, ChevronRight, Check, Home, Lock, Crown, Zap, ArrowRight, Menu, X, ChevronUp, Undo2, Redo2, Monitor, Smartphone, Search } from 'lucide-react'
import { brandPresets, templateColorPresets } from '@/lib/presets/colors'
import { financialPreset, realestatePreset, genericPreset, accountingPreset } from '@/lib/presets/content'
import { PageConfig, ColorTheme, TemplateType } from '@/lib/types'
import { ProfessionalTemplate } from '@/components/templates/professional'
import { PremiumTemplate } from '@/components/templates/premium'
import { MinimalTemplate } from '@/components/templates/minimal'
import { LighthouseTemplate } from '@/components/templates/lighthouse'

const TEMPLATE_OPTIONS: { id: TemplateType; name: string; subtitle: string; themeLabel: string; themeColor: string; previewBg: string; previewAccent: string; icon: string }[] = [
    { id: 'professional', name: 'นักวางแผนการเงิน', subtitle: 'Financial Planner', themeLabel: 'Emerald Green', themeColor: '#10b981', previewBg: '#ecfdf5', previewAccent: '#10b981', icon: '💰' },
    { id: 'premium', name: 'นายหน้าอสังหาริมทรัพย์', subtitle: 'Real Estate Agent', themeLabel: 'Ocean Blue', themeColor: '#3b82f6', previewBg: '#eff6ff', previewAccent: '#3b82f6', icon: '🏠' },
    { id: 'minimal', name: 'ฟรีแลนซ์ / ทั่วไป', subtitle: 'Freelancer / General', themeLabel: 'Pure White', themeColor: '#6366f1', previewBg: '#f5f3ff', previewAccent: '#6366f1', icon: '✏️' },
    { id: 'lighthouse', name: 'สำนักงานบัญชี / SME', subtitle: 'Accounting Firm / SME', themeLabel: 'Lighthouse Blue', themeColor: '#1E69DE', previewBg: '#EFF6FF', previewAccent: '#1E69DE', icon: '🏢' },
]

const CONTENT_PRESETS = [
    { id: 'financial', name: 'นักวางแผนการเงิน', icon: '💰', preset: financialPreset },
    { id: 'realestate', name: 'นายหน้าอสังหา', icon: '🏠', preset: realestatePreset },
    { id: 'accounting', name: 'สำนักงานบัญชี', icon: '🏢', preset: accountingPreset },
    { id: 'generic', name: 'กำหนดเอง', icon: '✏️', preset: genericPreset },
]

const SECTIONS = [
    { id: 'hero', name: 'ส่วนหัว (Hero)', icon: <Home size={15} /> },
    { id: 'navbar', name: 'Navbar', icon: <Layout size={15} /> },
    { id: 'stats', name: 'ตัวเลข', icon: <BarChart3 size={15} /> },
    { id: 'values', name: 'คุณค่า', icon: <Award size={15} /> },
    { id: 'services', name: 'บริการ', icon: <Type size={15} /> },
    { id: 'pricing', name: 'แพ็กเกจ', icon: <Star size={15} /> },
    { id: 'testimonials', name: 'รีวิว', icon: <MessageSquare size={15} /> },
    { id: 'faq', name: 'FAQ', icon: <MessageSquare size={15} /> },
    { id: 'cta', name: 'CTA', icon: <Eye size={15} /> },
    { id: 'contact', name: 'ติดต่อ', icon: <Phone size={15} /> },
    { id: 'companyShowcase', name: 'บริษัท/พาร์ทเนอร์', icon: <Award size={15} /> },
    { id: 'recruitment', name: 'รับสมัครทีม', icon: <Star size={15} /> },
    { id: 'seo', name: 'SEO', icon: <Search size={15} /> },
    { id: 'colors', name: 'สีธีม', icon: <Palette size={15} /> },
]

/* ─── Mini template preview card ─── */
function TemplatePreviewCard({ opt, isSelected, onSelect, locked }: {
    opt: typeof TEMPLATE_OPTIONS[0]
    isSelected: boolean
    onSelect: () => void
    locked?: boolean
}) {
    return (
        <div
            onClick={locked ? undefined : onSelect}
            className={`rounded-2xl transition-all duration-200 overflow-hidden ${locked ? 'opacity-70 cursor-not-allowed' : 'cursor-pointer'} ${isSelected ? 'ring-2 ring-offset-2 ring-blue-500 shadow-xl' : locked ? '' : 'hover:shadow-lg hover:-translate-y-1'}`}
            style={{ background: 'white', border: isSelected ? 'none' : '1px solid #e5e7eb', position: 'relative' }}
        >
            {locked && (
                <div className="absolute inset-0 z-10 flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.6)', backdropFilter: 'blur(2px)' }}>
                    <div className="flex flex-col items-center gap-2 text-center px-4">
                        <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background: 'rgba(124,58,237,0.1)', border: '1px solid rgba(124,58,237,0.3)' }}>
                            <Lock size={20} className="text-purple-600" />
                        </div>
                        <span className="text-sm font-bold text-gray-700">Pro / Premium เท่านั้น</span>
                        <span className="text-xs text-gray-500">อัพเกรดเพื่อใช้เทมเพลทนี้</span>
                    </div>
                </div>
            )}
            {/* Preview thumbnail */}
            <div className="relative p-4 sm:p-5 pb-3" style={{ background: opt.previewBg, minHeight: 140 }}>
                <div className="rounded-xl overflow-hidden shadow-sm" style={{ background: 'white', padding: '10px 12px' }}>
                    <div className="h-2 rounded-full mb-2 w-3/4" style={{ background: opt.previewAccent }} />
                    <div className="h-1.5 rounded-full mb-1.5 w-1/2" style={{ background: '#e5e7eb' }} />
                    <div className="h-1.5 rounded-full mb-3 w-2/3" style={{ background: '#e5e7eb' }} />
                    <div className="grid grid-cols-3 gap-1.5 mb-3">
                        {[0, 1, 2].map(i => (
                            <div key={i} className="h-7 sm:h-8 rounded-lg" style={{ background: `${opt.previewAccent}22` }} />
                        ))}
                    </div>
                    <div className="h-6 sm:h-7 rounded-lg w-2/3" style={{ background: opt.previewAccent }} />
                </div>
                <div className="absolute top-3 right-3 text-2xl sm:text-3xl">{opt.icon}</div>
            </div>

            {/* Card info */}
            <div className="p-4 sm:p-5 pt-3 sm:pt-4">
                <div className="flex items-start justify-between gap-2 mb-1.5">
                    <h3 className="font-bold text-gray-900 text-sm sm:text-base leading-snug">{opt.name}</h3>
                    <span className="text-[10px] sm:text-xs px-2 py-0.5 rounded-full shrink-0 font-medium" style={{ background: `${opt.themeColor}18`, color: opt.themeColor }}>
                        {locked ? '🔒 Pro' : opt.themeLabel}
                    </span>
                </div>
                <p className="text-xs sm:text-sm text-gray-400 mb-2 sm:mb-3">{opt.subtitle}</p>

                <div className="flex items-center gap-1.5 mb-3 sm:mb-4">
                    <span className="text-[10px] sm:text-xs text-gray-400">ธีมสีที่รองรับ:</span>
                    {[opt.themeColor, '#f59e0b', '#3b82f6', '#ef4444', '#f97316', '#8b5cf6'].slice(0, 6).map((c, i) => (
                        <div key={i} className="w-3.5 sm:w-4 h-3.5 sm:h-4 rounded-full border border-white shadow-sm" style={{ background: c }} />
                    ))}
                </div>

                <button
                    className={`w-full py-2 sm:py-2.5 rounded-xl font-semibold text-xs sm:text-sm text-white transition-all ${locked ? 'opacity-50' : 'hover:opacity-90'}`}
                    style={{ background: opt.themeColor }}
                    onClick={locked ? undefined : onSelect}
                    disabled={locked}
                >
                    {locked ? '🔒 อัพเกรดเพื่อใช้งาน' : 'เลือกเทมเพลทนี้ →'}
                </button>
            </div>
        </div>
    )
}

/* ─── Toast component ─── */
function Toast({ message, type = 'success', onClose }: { message: string; type?: 'success' | 'error'; onClose: () => void }) {
    useEffect(() => {
        const timer = setTimeout(onClose, 2500)
        return () => clearTimeout(timer)
    }, [onClose])

    return (
        <div className="toast">
            {type === 'success' ? (
                <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center shrink-0">
                    <Check size={11} className="text-green-400" />
                </div>
            ) : (
                <div className="w-5 h-5 rounded-full bg-red-500/20 flex items-center justify-center shrink-0">
                    <X size={11} className="text-red-400" />
                </div>
            )}
            <span className="text-sm">{message}</span>
        </div>
    )
}

/* ─── Confetti component ─── */
function ConfettiOverlay({ onDone }: { onDone: () => void }) {
    useEffect(() => {
        const timer = setTimeout(onDone, 3000)
        return () => clearTimeout(timer)
    }, [onDone])

    const confettiPieces = Array.from({ length: 50 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 0.5,
        duration: 1.5 + Math.random() * 2,
        color: ['#7c3aed', '#06b6d4', '#f472b6', '#4ade80', '#fbbf24', '#3b82f6'][Math.floor(Math.random() * 6)],
        size: 4 + Math.random() * 6,
        rotation: Math.random() * 360,
    }))

    return (
        <div className="fixed inset-0 z-[9999] pointer-events-none overflow-hidden">
            {/* Success message */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 animate-bounce text-center">
                <div className="text-5xl sm:text-6xl mb-3">🎉</div>
                <div className="text-xl sm:text-2xl font-bold text-white drop-shadow-lg">เผยแพร่สำเร็จ!</div>
            </div>
            {confettiPieces.map(p => (
                <div
                    key={p.id}
                    style={{
                        position: 'absolute',
                        left: `${p.left}%`,
                        top: '-10px',
                        width: p.size,
                        height: p.size * 1.6,
                        background: p.color,
                        borderRadius: '2px',
                        animation: `confettiFall ${p.duration}s ease-in ${p.delay}s forwards`,
                        transform: `rotate(${p.rotation}deg)`,
                        opacity: 0.9,
                    }}
                />
            ))}
        </div>
    )
}

interface SubData {
    tier: string
    endDate: string
    isActive: boolean
}

export default function BuilderPage() {
    const router = useRouter()
    const params = useParams()
    const pageId = params.pageId as string

    const [template, setTemplate] = useState<TemplateType>('professional')
    const [config, setConfig] = useState<PageConfig>(genericPreset as PageConfig)
    const [colorTheme, setColorTheme] = useState<ColorTheme>(templateColorPresets.professional[0])
    const [activeSection, setActiveSection] = useState('hero')
    const [showTemplatePicker, setShowTemplatePicker] = useState(true)
    const [saving, setSaving] = useState(false)
    const [pageSlug, setPageSlug] = useState('')
    const [pageTitle, setPageTitle] = useState('')
    const [isPublished, setIsPublished] = useState(false)
    const [subscription, setSubscription] = useState<SubData | null>(null)
    const [showUpgradeHint, setShowUpgradeHint] = useState('')
    const saveTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
    const previewRef = useRef<HTMLDivElement>(null)

    // Mobile-specific state
    const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false)
    const [mobileSectionListOpen, setMobileSectionListOpen] = useState(false)
    const [toastMsg, setToastMsg] = useState<string | null>(null)
    const [toastType, setToastType] = useState<'success' | 'error'>('success')

    // Undo/Redo history
    const [history, setHistory] = useState<PageConfig[]>([])
    const [historyIndex, setHistoryIndex] = useState(-1)
    const isUndoRedo = useRef(false)

    // Preview viewport toggle
    const [previewMode, setPreviewMode] = useState<'desktop' | 'mobile'>('desktop')

    // Confetti
    const [showConfetti, setShowConfetti] = useState(false)

    // Tier helpers
    const tier = (subscription?.tier || 'free') as 'free' | 'pro' | 'premium'
    const daysLeft = tier === 'free' && subscription?.endDate
        ? Math.max(0, Math.ceil((new Date(subscription.endDate).getTime() - Date.now()) / 86400000))
        : null
    const isExpired = tier === 'free' && daysLeft !== null && daysLeft <= 0
    const canUseAllTemplates = tier === 'pro' || tier === 'premium'
    const canUseBrandColors = tier === 'pro' || tier === 'premium'
    const canUseContentPresets = tier === 'pro' || tier === 'premium'

    useEffect(() => {
        if (pageId) {
            loadPage()
            fetch('/api/subscription').then(r => r.ok ? r.json() : null).then(d => d && setSubscription(d)).catch(() => { })
        }
    }, [pageId])

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
                    if (page.config && page.config !== '{}') setShowTemplatePicker(false)
                }
            }
            return
        }
    }

    const showToast = (msg: string, type: 'success' | 'error' = 'success') => {
        setToastMsg(msg)
        setToastType(type)
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
            showToast('บันทึกอัตโนมัติแล้ว ✓')
        }, 1500)
    }, [pageId, template, config, colorTheme, pageTitle, isPublished])

    useEffect(() => { autoSave() }, [config, colorTheme, template])

    const updateConfig = (section: keyof PageConfig, key: string, value: any) => {
        setConfig(prev => ({
            ...prev,
            [section]: { ...prev[section] as any, [key]: value },
        }))
    }

    // Undo/Redo: track config changes in history
    useEffect(() => {
        if (isUndoRedo.current) {
            isUndoRedo.current = false
            return
        }
        setHistory(prev => {
            const newHistory = [...prev.slice(0, historyIndex + 1), config].slice(-30)
            setHistoryIndex(newHistory.length - 1)
            return newHistory
        })
    }, [config])

    const undo = () => {
        if (historyIndex <= 0) return
        isUndoRedo.current = true
        const newIndex = historyIndex - 1
        setHistoryIndex(newIndex)
        setConfig(history[newIndex])
        showToast('Undo สำเร็จ')
    }

    const redo = () => {
        if (historyIndex >= history.length - 1) return
        isUndoRedo.current = true
        const newIndex = historyIndex + 1
        setHistoryIndex(newIndex)
        setConfig(history[newIndex])
        showToast('Redo สำเร็จ')
    }

    const canUndo = historyIndex > 0
    const canRedo = historyIndex < history.length - 1

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
        if (!isPublished) {
            setShowConfetti(true)
        }
        showToast(isPublished ? 'บันทึกเรียบร้อย ✓' : 'เผยแพร่เรียบร้อย 🎉')
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
            case 'lighthouse': return <LighthouseTemplate {...props} />
        }
    }

    /* shared light input style */
    const inp = "w-full px-3 py-2.5 rounded-lg text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
    const inpStyle = { background: '#f8fafc', border: '1px solid #e2e8f0' }

    const renderSectionEditor = () => {
        switch (activeSection) {
            case 'seo':
                const seo = config.seo || { metaTitle: '', metaDescription: '', ogImage: '' }
                return (
                    <div className="space-y-4">
                        <div className="p-3 rounded-xl" style={{ background: '#f0f9ff', border: '1px solid #bae6fd' }}>
                            <p className="text-xs text-blue-600 font-medium mb-1">🔍 SEO Settings</p>
                            <p className="text-[10px] text-blue-500 leading-relaxed">ตั้งค่าให้เพจติดอันดับ Google — ระบุ Title, Description และรูป OG Image</p>
                        </div>
                        <label className="block">
                            <span className="text-xs text-gray-500 mb-1 block font-medium">Meta Title</span>
                            <input type="text" value={seo.metaTitle} onChange={e => {
                                setConfig(prev => ({ ...prev, seo: { ...seo, metaTitle: e.target.value } }))
                            }} className={inp} style={inpStyle} placeholder="ชื่อเพจที่แสดงบน Google" />
                            <span className="text-[10px] text-gray-400 mt-1 block">{seo.metaTitle.length}/60 ตัวอักษร</span>
                        </label>
                        <label className="block">
                            <span className="text-xs text-gray-500 mb-1 block font-medium">Meta Description</span>
                            <textarea value={seo.metaDescription} onChange={e => {
                                setConfig(prev => ({ ...prev, seo: { ...seo, metaDescription: e.target.value } }))
                            }} className={inp} style={{ ...inpStyle, minHeight: 80, resize: 'vertical' as any }} placeholder="คำอธิบายเพจ สำหรับ Google" />
                            <span className="text-[10px] text-gray-400 mt-1 block">{seo.metaDescription.length}/160 ตัวอักษร</span>
                        </label>
                        <label className="block">
                            <span className="text-xs text-gray-500 mb-1 block font-medium">OG Image URL</span>
                            <input type="text" value={seo.ogImage} onChange={e => {
                                setConfig(prev => ({ ...prev, seo: { ...seo, ogImage: e.target.value } }))
                            }} className={inp} style={inpStyle} placeholder="https://example.com/og-image.jpg" />
                            <span className="text-[10px] text-gray-400 mt-1 block">รูปที่แสดงเมื่อแชร์ลิงก์ (1200×630px แนะนำ)</span>
                        </label>
                        {/* Google preview */}
                        <div className="mt-2">
                            <p className="text-xs text-gray-400 font-medium mb-2">ตัวอย่างบน Google</p>
                            <div className="p-3 rounded-lg" style={{ background: 'white', border: '1px solid #e2e8f0' }}>
                                <p className="text-xs text-green-700 truncate">{typeof window !== 'undefined' ? window.location.origin : ''}/p/{pageSlug || 'your-page'}</p>
                                <p className="text-sm font-medium text-blue-700 mt-0.5 truncate">{seo.metaTitle || config.hero?.name || 'Sale Page Title'}</p>
                                <p className="text-xs text-gray-500 mt-0.5 line-clamp-2">{seo.metaDescription || config.hero?.title || 'คำอธิบายเพจ...'}</p>
                            </div>
                        </div>
                    </div>
                )
            case 'colors':
                return (
                    <div className="space-y-5">
                        <div>
                            <h3 className="text-xs font-semibold mb-2.5 text-gray-400 uppercase tracking-wider">ธีมสีเทมเพลท</h3>
                            <div className="grid grid-cols-2 gap-2">
                                {templateColorPresets[template].map((c, i) => (
                                    <button key={i} onClick={() => setColorTheme(c)}
                                        className="p-2.5 rounded-xl text-left transition-all relative"
                                        style={{ border: JSON.stringify(colorTheme) === JSON.stringify(c) ? '2px solid #3b82f6' : '1px solid #e5e7eb', background: JSON.stringify(colorTheme) === JSON.stringify(c) ? '#eff6ff' : 'white' }}>
                                        {JSON.stringify(colorTheme) === JSON.stringify(c) && (
                                            <div className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-blue-500 flex items-center justify-center">
                                                <Check size={9} className="text-white" strokeWidth={3} />
                                            </div>
                                        )}
                                        <div className="flex gap-1 mb-1.5">
                                            <div className="w-4 h-4 rounded-full" style={{ background: c.primary }} />
                                            <div className="w-4 h-4 rounded-full" style={{ background: c.accent }} />
                                            <div className="w-4 h-4 rounded-full border border-gray-200" style={{ background: c.background }} />
                                        </div>
                                        <p className="text-xs text-gray-600 font-medium">{c.name}</p>
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div>
                            <h3 className="text-xs font-semibold mb-2.5 text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
                                สีแบรนด์ {!canUseBrandColors && <Lock size={10} className="text-purple-400" />}
                            </h3>
                            {!canUseBrandColors ? (
                                <div className="p-3 rounded-xl text-center" style={{ background: '#FAF5FF', border: '1px solid #E9D5FF' }}>
                                    <Lock size={14} className="text-purple-500 mx-auto mb-1" />
                                    <p className="text-xs text-gray-600 mb-2">อัพเกรดเป็น Pro เพื่อใช้สีแบรนด์</p>
                                    <button onClick={() => router.push('/dashboard/subscription')} className="text-xs font-semibold text-purple-600 hover:underline">อัพเกรดเลย →</button>
                                </div>
                            ) : (
                                <div className="grid grid-cols-2 gap-2">
                                    {brandPresets.map((b, i) => (
                                        <button key={i} onClick={() => applyBrandColor(b)}
                                            className="p-2 rounded-xl border border-gray-100 hover:border-gray-300 bg-white text-left transition-all flex items-center gap-2">
                                            <div className="w-5 h-5 rounded-full shrink-0" style={{ background: b.primary }} />
                                            <span className="text-xs text-gray-600 truncate">{b.name}</span>
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                        <div>
                            <h3 className="text-xs font-semibold mb-2.5 text-gray-400 uppercase tracking-wider">กำหนดสีเอง</h3>
                            <div className="space-y-2.5">
                                {[
                                    { key: 'primary', label: 'สีหลัก' },
                                    { key: 'accent', label: 'สี Accent' },
                                    { key: 'background', label: 'พื้นหลัง' },
                                ].map(c => (
                                    <label key={c.key} className="flex items-center gap-3">
                                        <input type="color" value={(colorTheme as any)[c.key]} onChange={e => setColorTheme(prev => ({ ...prev, [c.key]: e.target.value }))} className="w-8 h-8 rounded-lg cursor-pointer border border-gray-200" />
                                        <span className="text-sm text-gray-600">{c.label}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>
                )
            case 'hero':
                return (
                    <div className="space-y-3">
                        <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider mb-3">แก้ไขส่วนหัว</p>
                        {[
                            { key: 'name', label: 'ชื่อ' },
                            { key: 'title', label: 'ตำแหน่ง/หัวข้อ' },
                            { key: 'subtitle', label: 'สโลแกน' },
                            { key: 'quote', label: 'Quote' },
                            { key: 'credentials', label: 'ใบรับรอง' },
                            { key: 'imageUrl', label: 'URL รูปโปรไฟล์' },
                        ].map(f => (
                            <label key={f.key} className="block">
                                <span className="text-xs text-gray-500 mb-1 block font-medium">{f.label}</span>
                                <input type="text" value={(config.hero as any)?.[f.key] || ''} onChange={e => updateConfig('hero', f.key, e.target.value)}
                                    className={inp} style={inpStyle} />
                            </label>
                        ))}
                        <label className="block">
                            <span className="text-xs text-gray-500 mb-1 block font-medium">ปุ่ม (CTA) หลัก</span>
                            <input type="text" value={config.hero?.ctaPrimary?.text || ''} onChange={e => updateConfig('hero', 'ctaPrimary', { ...config.hero?.ctaPrimary, text: e.target.value })}
                                className={inp} style={inpStyle} />
                        </label>
                        <label className="block">
                            <span className="text-xs text-gray-500 mb-1 block font-medium">ปุ่ม (CTA) รอง</span>
                            <input type="text" value={config.hero?.ctaSecondary?.text || ''} onChange={e => updateConfig('hero', 'ctaSecondary', { ...config.hero?.ctaSecondary, text: e.target.value })}
                                className={inp} style={inpStyle} />
                        </label>
                    </div>
                )
            case 'navbar':
                return (
                    <div className="space-y-3">
                        <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider mb-3">แก้ไข Navbar</p>
                        <label className="block">
                            <span className="text-xs text-gray-500 mb-1 block font-medium">Logo Text</span>
                            <input type="text" value={config.navbar?.logo || ''} onChange={e => updateConfig('navbar', 'logo', e.target.value)}
                                className={inp} style={inpStyle} />
                        </label>
                        <label className="block">
                            <span className="text-xs text-gray-500 mb-1 block font-medium">CTA Text</span>
                            <input type="text" value={config.navbar?.ctaText || ''} onChange={e => updateConfig('navbar', 'ctaText', e.target.value)}
                                className={inp} style={inpStyle} />
                        </label>
                    </div>
                )
            case 'pricing':
                const pricing = config.pricing || { title: '', items: [] }
                return (
                    <div className="space-y-3">
                        <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider mb-3">แก้ไขแพ็กเกจ</p>
                        <label className="block">
                            <span className="text-xs text-gray-500 mb-1 block font-medium">หัวข้อ</span>
                            <input type="text" value={pricing.title} onChange={e => {
                                setConfig(prev => ({ ...prev, pricing: { ...pricing, title: e.target.value } }))
                            }} className={inp} style={inpStyle} />
                        </label>
                        {pricing.items?.map((pkg: any, i: number) => (
                            <div key={i} className="p-3 rounded-xl space-y-2" style={{ background: pkg.isRecommended ? '#eff6ff' : '#f8fafc', border: `1px solid ${pkg.isRecommended ? '#93c5fd' : '#e2e8f0'}` }}>
                                <span className="text-xs text-gray-400 font-medium">แพ็กเกจ #{i + 1} {pkg.isRecommended && '⭐'}</span>
                                <input type="text" value={pkg.name} onChange={e => {
                                    const items = [...pricing.items]; items[i] = { ...items[i], name: e.target.value }
                                    setConfig(prev => ({ ...prev, pricing: { ...pricing, items } }))
                                }} className={inp} style={inpStyle} placeholder="ชื่อแพ็กเกจ" />
                                <input type="text" value={pkg.price} onChange={e => {
                                    const items = [...pricing.items]; items[i] = { ...items[i], price: e.target.value }
                                    setConfig(prev => ({ ...prev, pricing: { ...pricing, items } }))
                                }} className={inp} style={inpStyle} placeholder="ราคา" />
                                <input type="text" value={pkg.description} onChange={e => {
                                    const items = [...pricing.items]; items[i] = { ...items[i], description: e.target.value }
                                    setConfig(prev => ({ ...prev, pricing: { ...pricing, items } }))
                                }} className={inp} style={inpStyle} placeholder="คำอธิบาย" />
                            </div>
                        ))}
                    </div>
                )
            case 'faq':
                const faq = config.faq || { title: '', items: [] }
                return (
                    <div className="space-y-3">
                        <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider mb-3">แก้ไข FAQ</p>
                        <label className="block">
                            <span className="text-xs text-gray-500 mb-1 block font-medium">หัวข้อ</span>
                            <input type="text" value={faq.title} onChange={e => {
                                setConfig(prev => ({ ...prev, faq: { ...faq, title: e.target.value } }))
                            }} className={inp} style={inpStyle} />
                        </label>
                        {faq.items?.map((item: any, i: number) => (
                            <div key={i} className="p-3 rounded-xl space-y-2" style={{ background: '#f8fafc', border: '1px solid #e2e8f0' }}>
                                <span className="text-xs text-gray-400 font-medium">คำถาม #{i + 1}</span>
                                <input type="text" value={item.question} onChange={e => {
                                    const items = [...faq.items]; items[i] = { ...items[i], question: e.target.value }
                                    setConfig(prev => ({ ...prev, faq: { ...faq, items } }))
                                }} className={inp} style={inpStyle} placeholder="คำถาม" />
                                <textarea value={item.answer} onChange={e => {
                                    const items = [...faq.items]; items[i] = { ...items[i], answer: e.target.value }
                                    setConfig(prev => ({ ...prev, faq: { ...faq, items } }))
                                }} className={inp} style={{ ...inpStyle, minHeight: 60, resize: 'vertical' as any }} placeholder="คำตอบ" />
                            </div>
                        ))}
                    </div>
                )
            default:
                return renderGenericSection(activeSection as keyof PageConfig)
        }
    }

    const renderGenericSection = (section: keyof PageConfig) => {
        const data = config[section] as any
        if (!data) return <p className="text-sm text-gray-400 text-center py-6">ไม่มีข้อมูล</p>

        return (
            <div className="space-y-3">
                <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider mb-3">
                    แก้ไข — {SECTIONS.find(s => s.id === section)?.name || section}
                </p>
                {data.title !== undefined && (
                    <label className="block">
                        <span className="text-xs text-gray-500 mb-1 block font-medium">หัวข้อ</span>
                        <input type="text" value={data.title || ''} onChange={e => updateConfig(section, 'title', e.target.value)}
                            className={inp} style={inpStyle} />
                    </label>
                )}
                {data.subtitle !== undefined && (
                    <label className="block">
                        <span className="text-xs text-gray-500 mb-1 block font-medium">หัวข้อรอง</span>
                        <input type="text" value={data.subtitle || ''} onChange={e => updateConfig(section, 'subtitle', e.target.value)}
                            className={inp} style={inpStyle} />
                    </label>
                )}
                {data.items?.map((item: any, i: number) => (
                    <div key={i} className="p-3 rounded-xl space-y-2" style={{ background: '#f8fafc', border: '1px solid #e2e8f0' }}>
                        <span className="text-xs text-gray-400 font-medium">รายการ #{i + 1}</span>
                        {item.title !== undefined && <input type="text" value={item.title} onChange={e => updateArrayItem(section, i, 'title', e.target.value)} className={inp} style={inpStyle} placeholder="หัวข้อ" />}
                        {item.description !== undefined && <input type="text" value={item.description} onChange={e => updateArrayItem(section, i, 'description', e.target.value)} className={inp} style={inpStyle} placeholder="คำอธิบาย" />}
                        {item.quote !== undefined && <input type="text" value={item.quote} onChange={e => updateArrayItem(section, i, 'quote', e.target.value)} className={inp} style={inpStyle} placeholder="Quote" />}
                        {item.name !== undefined && <input type="text" value={item.name} onChange={e => updateArrayItem(section, i, 'name', e.target.value)} className={inp} style={inpStyle} placeholder="ชื่อ" />}
                        {item.value !== undefined && <input type="text" value={item.value} onChange={e => updateArrayItem(section, i, 'value', e.target.value)} className={inp} style={inpStyle} placeholder="ค่า" />}
                        {item.label !== undefined && <input type="text" value={item.label} onChange={e => updateArrayItem(section, i, 'label', e.target.value)} className={inp} style={inpStyle} placeholder="Label" />}
                    </div>
                ))}
                {data.email !== undefined && (
                    <label className="block"><span className="text-xs text-gray-500 mb-1 block font-medium">Email</span>
                        <input type="text" value={data.email || ''} onChange={e => updateConfig(section, 'email', e.target.value)} className={inp} style={inpStyle} /></label>
                )}
                {data.phone !== undefined && (
                    <label className="block"><span className="text-xs text-gray-500 mb-1 block font-medium">โทร</span>
                        <input type="text" value={data.phone || ''} onChange={e => updateConfig(section, 'phone', e.target.value)} className={inp} style={inpStyle} /></label>
                )}
                {data.line !== undefined && (
                    <label className="block"><span className="text-xs text-gray-500 mb-1 block font-medium">Line</span>
                        <input type="text" value={data.line || ''} onChange={e => updateConfig(section, 'line', e.target.value)} className={inp} style={inpStyle} /></label>
                )}
                {data.buttonText !== undefined && (
                    <label className="block"><span className="text-xs text-gray-500 mb-1 block font-medium">ข้อความปุ่ม</span>
                        <input type="text" value={data.buttonText || ''} onChange={e => updateConfig(section, 'buttonText', e.target.value)} className={inp} style={inpStyle} /></label>
                )}
            </div>
        )
    }

    if (status === 'loading') return (
        <div className="min-h-screen flex items-center justify-center" style={{ background: '#f8fafc' }}>
            <div className="flex flex-col items-center gap-3">
                <Loader2 className="animate-spin text-blue-500" size={28} />
                <p className="text-sm text-gray-400">กำลังโหลด...</p>
            </div>
        </div>
    )

    /* ══════════════════════════════════════════════
       SCREEN 1 — Template Picker (light)
    ══════════════════════════════════════════════ */
    if (showTemplatePicker) {
        const selectedOpt = TEMPLATE_OPTIONS.find(o => o.id === template) || TEMPLATE_OPTIONS[0]
        return (
            <div className="min-h-screen flex flex-col" style={{ background: '#f8fafc' }}>
                {/* Header */}
                <header className="bg-white border-b border-gray-100 px-4 sm:px-6 py-3 flex items-center justify-between shrink-0">
                    <div className="flex items-center gap-3">
                        <button onClick={() => router.push('/dashboard')} className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-all">
                            <ArrowLeft size={15} />
                        </button>
                        <div className="w-8 sm:w-9 h-8 sm:h-9 rounded-xl flex items-center justify-center text-white font-bold text-xs sm:text-sm shadow-md"
                            style={{ background: 'linear-gradient(135deg,#7c3aed,#06b6d4)' }}>SP</div>
                        <div className="hidden sm:block">
                            <p className="text-sm font-bold text-gray-900 leading-tight">SalesPage Builder</p>
                            <p className="text-xs text-gray-400">สร้างเซลเพจสำหรับมืออาชีพ</p>
                        </div>
                    </div>
                    {tier === 'free' && (
                        <div className="flex items-center gap-2 text-xs px-3 py-1.5 rounded-full" style={{ background: '#eff6ff', border: '1px solid #bfdbfe', color: '#3b82f6' }}>
                            <Zap size={12} />
                            <span className="hidden sm:inline">Free Trial</span>{daysLeft !== null && ` · ${daysLeft} วัน`}
                        </div>
                    )}
                </header>

                {/* Expired banner */}
                {isExpired && (
                    <div className="px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between gap-4" style={{ background: '#FEF2F2', borderBottom: '1px solid #FECACA' }}>
                        <div className="flex items-center gap-3">
                            <Zap size={16} className="text-red-500 shrink-0" />
                            <div>
                                <p className="text-xs sm:text-sm font-semibold text-red-700">แพ็กเกจ Free Trial หมดอายุแล้ว</p>
                                <p className="text-[10px] sm:text-xs text-red-500">อัพเกรดเพื่อสร้างและแก้ไขเพจต่อ</p>
                            </div>
                        </div>
                        <button onClick={() => router.push('/dashboard/subscription')} className="px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-white shrink-0" style={{ background: '#7c3aed' }}>
                            อัพเกรด
                        </button>
                    </div>
                )}

                {/* Content */}
                <main className="flex-1 overflow-y-auto px-4 sm:px-6 py-6 sm:py-10 max-w-4xl mx-auto w-full">
                    {/* Hero text */}
                    <div className="text-center mb-6 sm:mb-10">
                        <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium mb-4 sm:mb-5"
                            style={{ background: '#eff6ff', color: '#3b82f6', border: '1px solid #bfdbfe' }}>
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                            เลือกเทมเพลทที่เหมาะกับคุณ
                        </div>
                        <h1 className="text-2xl sm:text-4xl font-bold text-gray-900 mb-2 sm:mb-3">สร้างเซลเพจของคุณ</h1>
                        <p className="text-gray-400 text-xs sm:text-base">เลือกเทมเพลทที่ตรงกับอาชีพของคุณ แล้วปรับแต่งข้อมูลได้ทันที</p>
                    </div>

                    {/* Template cards grid */}
                    <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
                        {TEMPLATE_OPTIONS.map(opt => (
                            <TemplatePreviewCard
                                key={opt.id}
                                opt={opt}
                                isSelected={template === opt.id}
                                locked={!canUseAllTemplates && opt.id !== 'professional' && opt.id !== 'lighthouse'}
                                onSelect={() => {
                                    if (!canUseAllTemplates && opt.id !== 'professional' && opt.id !== 'lighthouse') {
                                        setShowUpgradeHint('template')
                                        return
                                    }
                                    setTemplate(opt.id)
                                    setColorTheme(templateColorPresets[opt.id][0])
                                    const preset = CONTENT_PRESETS.find(p =>
                                        (opt.id === 'professional' && p.id === 'financial') ||
                                        (opt.id === 'premium' && p.id === 'realestate') ||
                                        (opt.id === 'lighthouse' && p.id === 'accounting') ||
                                        p.id === 'generic'
                                    )
                                    if (preset) applyContentPreset(preset.preset)
                                    setShowTemplatePicker(false)
                                }}
                            />
                        ))}
                    </div>

                    {/* Upgrade hint */}
                    {!canUseAllTemplates && (
                        <div className="text-center p-4 sm:p-5 rounded-2xl mb-6" style={{ background: '#FAF5FF', border: '1px solid #E9D5FF' }}>
                            <Crown size={22} className="text-purple-500 mx-auto mb-2" />
                            <p className="text-xs sm:text-sm font-semibold text-gray-700 mb-1">ปลดล็อกเทมเพลททั้งหมด</p>
                            <p className="text-[10px] sm:text-xs text-gray-500 mb-3">อัพเกรดเป็น Pro เพื่อใช้งาน Premium & Minimal เทมเพลท</p>
                            <button onClick={() => router.push('/dashboard/subscription')} className="px-4 sm:px-5 py-2 rounded-xl text-xs sm:text-sm font-semibold text-white inline-flex items-center gap-1.5" style={{ background: '#7c3aed' }}>
                                อัพเกรดเลย <ArrowRight size={13} />
                            </button>
                        </div>
                    )}
                </main>
            </div>
        )
    }

    /* ══════════════════════════════════════════════
       SCREEN 2 — Editor (light theme)
    ══════════════════════════════════════════════ */
    const activeTemplateOpt = TEMPLATE_OPTIONS.find(o => o.id === template) || TEMPLATE_OPTIONS[0]
    const activeSectionInfo = SECTIONS.find(s => s.id === activeSection)

    return (
        <div className="h-screen flex flex-col overflow-hidden" style={{ background: '#f1f5f9' }}>

            {/* ── TOP HEADER ── */}
            <header className="shrink-0 z-50 flex items-center justify-between px-3 sm:px-4 py-2 sm:py-2.5 bg-white"
                style={{ borderBottom: '1px solid #e5e7eb', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
                <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                    <button
                        onClick={() => setShowTemplatePicker(true)}
                        className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-all flex items-center gap-1 sm:gap-1.5 text-xs sm:text-sm shrink-0"
                    >
                        <ArrowLeft size={14} /> <span className="hidden sm:inline">กลับ</span>
                    </button>
                    <div className="w-px h-4 sm:h-5 bg-gray-200 shrink-0" />
                    <div className="flex items-center gap-2 min-w-0">
                        <div className="w-5 sm:w-6 h-5 sm:h-6 rounded-md text-white font-bold text-[10px] sm:text-xs flex items-center justify-center shrink-0"
                            style={{ background: activeTemplateOpt.themeColor }}>S</div>
                        <input
                            type="text"
                            value={pageTitle}
                            onChange={e => setPageTitle(e.target.value)}
                            className="font-semibold text-xs sm:text-sm focus:outline-none text-gray-800 placeholder-gray-300 min-w-0 w-28 sm:w-44 bg-transparent"
                            placeholder="ชื่อเพจ"
                        />
                    </div>
                </div>

                {/* Color theme dots in header — desktop only */}
                <div className="hidden md:flex items-center gap-1.5">
                    <span className="text-xs text-gray-400 mr-1">ธีมสี:</span>
                    {templateColorPresets[template].slice(0, 5).map((c, i) => (
                        <button key={i} onClick={() => setColorTheme(c)}
                            className="transition-all"
                            style={{ width: 22, height: 22, borderRadius: '50%', background: c.primary, border: JSON.stringify(colorTheme) === JSON.stringify(c) ? '2.5px solid #1e293b' : '2px solid white', boxShadow: '0 1px 3px rgba(0,0,0,0.2)' }} />
                    ))}
                </div>

                <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                    {saving && (
                        <span className="text-[10px] sm:text-xs text-gray-400 flex items-center gap-1">
                            <Loader2 size={10} className="animate-spin" /> <span className="hidden sm:inline">บันทึก...</span>
                        </span>
                    )}
                    {/* Undo / Redo */}
                    <div className="hidden sm:flex items-center gap-0.5 border border-gray-200 rounded-lg">
                        <button onClick={undo} disabled={!canUndo}
                            className="p-1.5 sm:p-2 text-gray-400 hover:text-gray-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors" title="Undo">
                            <Undo2 size={14} />
                        </button>
                        <div className="w-px h-4 bg-gray-200" />
                        <button onClick={redo} disabled={!canRedo}
                            className="p-1.5 sm:p-2 text-gray-400 hover:text-gray-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors" title="Redo">
                            <Redo2 size={14} />
                        </button>
                    </div>
                    {/* Preview toggle */}
                    <div className="hidden md:flex items-center gap-0.5 border border-gray-200 rounded-lg">
                        <button onClick={() => setPreviewMode('desktop')}
                            className={`p-1.5 sm:p-2 transition-colors rounded-l-lg ${previewMode === 'desktop' ? 'bg-gray-100 text-gray-800' : 'text-gray-400 hover:text-gray-600'}`} title="Desktop">
                            <Monitor size={14} />
                        </button>
                        <div className="w-px h-4 bg-gray-200" />
                        <button onClick={() => setPreviewMode('mobile')}
                            className={`p-1.5 sm:p-2 transition-colors rounded-r-lg ${previewMode === 'mobile' ? 'bg-gray-100 text-gray-800' : 'text-gray-400 hover:text-gray-600'}`} title="Mobile">
                            <Smartphone size={14} />
                        </button>
                    </div>
                    {isPublished && pageSlug && (
                        <a href={`/p/${pageSlug}`} target="_blank"
                            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs text-gray-500 hover:text-gray-800 hover:bg-gray-100 transition-all border border-gray-200">
                            <Globe size={12} /> ดูตัวอย่าง
                        </a>
                    )}
                    <button
                        onClick={handleSave}
                        className="flex items-center gap-1 sm:gap-1.5 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-white transition-all hover:opacity-90"
                        style={{ background: activeTemplateOpt.themeColor }}
                    >
                        <Save size={12} />
                        <span className="hidden sm:inline">{isPublished ? 'บันทึก' : 'เผยแพร่'}</span>
                    </button>
                </div>
            </header>

            {/* ── BODY ── */}
            <div className="flex-1 flex overflow-hidden relative">

                {/* LEFT: Section list — hidden on mobile */}
                <div className="hidden md:block w-[200px] shrink-0 overflow-y-auto bg-white"
                    style={{ borderRight: '1px solid #e5e7eb' }}>
                    <div className="px-3 pt-4 pb-2">
                        <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider px-2 mb-2">เลือกส่วนที่ต้องแก้ไข</p>
                    </div>
                    {SECTIONS.map(s => (
                        <button
                            key={s.id}
                            onClick={() => {
                                setActiveSection(s.id)
                                if (previewRef.current && s.id !== 'colors') {
                                    const el = previewRef.current.querySelector(`#section-${s.id}`)
                                    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
                                }
                            }}
                            className={`w-full flex items-center gap-2.5 px-4 py-2.5 text-sm transition-all text-left ${activeSection === s.id
                                ? 'font-semibold text-white'
                                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                }`}
                            style={activeSection === s.id ? { background: activeTemplateOpt.themeColor, borderRadius: 0 } : {}}
                        >
                            <span className={activeSection === s.id ? 'text-white/80' : 'text-gray-400'}>{s.icon}</span>
                            {s.name}
                        </button>
                    ))}
                </div>

                {/* MIDDLE: Editor form — hidden on mobile (use drawer instead) */}
                <div className="hidden md:flex w-[280px] shrink-0 flex-col overflow-hidden bg-white"
                    style={{ borderRight: '1px solid #e5e7eb' }}>
                    {/* Panel header */}
                    <div className="px-4 py-3 shrink-0 flex items-center gap-2"
                        style={{ borderBottom: '1px solid #e5e7eb', background: '#f8fafc' }}>
                        <div className="w-1.5 h-4 rounded-full" style={{ background: activeTemplateOpt.themeColor }} />
                        <h2 className="text-sm font-bold text-gray-800">
                            {activeSectionInfo?.name}
                        </h2>
                    </div>
                    <div className="flex-1 overflow-y-auto p-4">
                        {renderSectionEditor()}
                    </div>
                </div>

                {/* RIGHT: Preview */}
                <div ref={previewRef} className="flex-1 overflow-y-auto" style={{ background: '#e2e8f0' }}>
                    <div className="min-h-full shadow-xl transition-all duration-300 ease-in-out" style={{ maxWidth: previewMode === 'mobile' ? '390px' : '100%', margin: '0 auto' }}>
                        {renderTemplatePreview()}
                    </div>
                </div>
            </div>

            {/* ── MOBILE: Floating edit button ── */}
            <div className="md:hidden fixed bottom-5 right-5 z-40 flex flex-col gap-2">
                <button
                    onClick={() => { setMobileDrawerOpen(true); setMobileSectionListOpen(true) }}
                    className="w-14 h-14 rounded-2xl text-white shadow-2xl flex items-center justify-center transition-all active:scale-95"
                    style={{ background: activeTemplateOpt.themeColor, boxShadow: `0 8px 24px ${activeTemplateOpt.themeColor}50` }}
                >
                    <Menu size={22} />
                </button>
            </div>

            {/* ── MOBILE: Bottom Drawer ── */}
            {mobileDrawerOpen && (
                <>
                    <div className="bottom-sheet-overlay" onClick={() => setMobileDrawerOpen(false)} />
                    <div className="bottom-sheet" style={{ background: 'white' }}>
                        <div className="bottom-sheet-handle" style={{ background: '#d1d5db' }} />

                        {/* Drawer header */}
                        <div className="px-5 pt-3 pb-2 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <div className="w-1.5 h-4 rounded-full" style={{ background: activeTemplateOpt.themeColor }} />
                                <span className="text-sm font-bold text-gray-800">
                                    {mobileSectionListOpen ? 'เลือกส่วนที่แก้ไข' : activeSectionInfo?.name}
                                </span>
                            </div>
                            <div className="flex items-center gap-2">
                                {!mobileSectionListOpen && (
                                    <button
                                        onClick={() => setMobileSectionListOpen(true)}
                                        className="px-3 py-1.5 rounded-lg text-xs font-medium text-gray-500 hover:text-gray-800 flex items-center gap-1"
                                        style={{ background: '#f1f5f9' }}
                                    >
                                        <Layout size={12} /> เปลี่ยนส่วน
                                    </button>
                                )}
                                <button onClick={() => { setMobileDrawerOpen(false); setMobileSectionListOpen(false) }} className="p-2 rounded-lg text-gray-400 hover:text-gray-700">
                                    <X size={16} />
                                </button>
                            </div>
                        </div>

                        {/* Drawer content */}
                        <div className="px-5 pb-6 max-h-[60vh] overflow-y-auto">
                            {mobileSectionListOpen ? (
                                <div className="grid grid-cols-3 gap-2">
                                    {SECTIONS.map(s => (
                                        <button
                                            key={s.id}
                                            onClick={() => {
                                                setActiveSection(s.id)
                                                setMobileSectionListOpen(false)
                                                // Scroll preview to the selected section
                                                if (previewRef.current && s.id !== 'colors') {
                                                    setTimeout(() => {
                                                        const el = previewRef.current?.querySelector(`#section-${s.id}`)
                                                        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
                                                    }, 100)
                                                }
                                            }}
                                            className={`flex flex-col items-center gap-1.5 p-3 rounded-xl text-xs font-medium transition-all ${activeSection === s.id ? 'text-white' : 'text-gray-600 hover:bg-gray-50'}`}
                                            style={activeSection === s.id ? { background: activeTemplateOpt.themeColor } : { background: '#f8fafc', border: '1px solid #e5e7eb' }}
                                        >
                                            <span className={activeSection === s.id ? 'text-white/80' : 'text-gray-400'}>{s.icon}</span>
                                            {s.name}
                                        </button>
                                    ))}
                                </div>
                            ) : (
                                renderSectionEditor()
                            )}
                        </div>
                    </div>
                </>
            )}

            {/* ── Toast ── */}
            {toastMsg && (
                <Toast message={toastMsg} type={toastType} onClose={() => setToastMsg(null)} />
            )}

            {/* ── Confetti on first publish ── */}
            {showConfetti && <ConfettiOverlay onDone={() => setShowConfetti(false)} />}
        </div>
    )
}
