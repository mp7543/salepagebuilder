import { notFound } from 'next/navigation'
import { findPageBySlug } from '@/lib/db'
import { ProfessionalTemplate } from '@/components/templates/professional'
import { PremiumTemplate } from '@/components/templates/premium'
import { MinimalTemplate } from '@/components/templates/minimal'
import { templateColorPresets } from '@/lib/presets/colors'
import { genericPreset } from '@/lib/presets/content'

export default async function PublicPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const page = findPageBySlug(slug)

    if (!page || !page.isPublished) {
        notFound()
    }

    let config
    try {
        config = { ...genericPreset, ...JSON.parse(page.config) }
    } catch {
        config = genericPreset
    }

    let colorTheme
    try {
        const templatePresets = templateColorPresets[page.template as keyof typeof templateColorPresets] || templateColorPresets.professional
        colorTheme = { ...templatePresets[0], ...JSON.parse(page.colorTheme) }
    } catch {
        colorTheme = templateColorPresets.professional[0]
    }

    const props = { config: config as any, colorTheme }

    return (
        <>
            {page.template === 'professional' && <ProfessionalTemplate {...props} />}
            {page.template === 'premium' && <PremiumTemplate {...props} />}
            {page.template === 'minimal' && <MinimalTemplate {...props} />}
        </>
    )
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const page = findPageBySlug(slug)

    if (!page) return { title: 'Page Not Found' }

    let config: any = {}
    try { config = JSON.parse(page.config) } catch { }

    return {
        title: config.hero?.name || page.title,
        description: config.hero?.title || 'Sale Page',
    }
}
