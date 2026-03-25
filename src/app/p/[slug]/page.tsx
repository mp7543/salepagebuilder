import { notFound } from 'next/navigation'
import { findPageBySlug } from '@/lib/db'
import { ProfessionalTemplate } from '@/components/templates/professional'
import { PremiumTemplate } from '@/components/templates/premium'
import { MinimalTemplate } from '@/components/templates/minimal'
import { LighthouseTemplate } from '@/components/templates/lighthouse'
import { PageTracker } from '@/components/PageTracker'
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
            <PageTracker pageId={page.id} />
            {page.template === 'professional' && <ProfessionalTemplate {...props} />}
            {page.template === 'premium' && <PremiumTemplate {...props} />}
            {page.template === 'minimal' && <MinimalTemplate {...props} />}
            {page.template === 'lighthouse' && <LighthouseTemplate {...props} />}
        </>
    )
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const page = findPageBySlug(slug)

    if (!page) return { title: 'Page Not Found' }

    let config: any = {}
    try { config = JSON.parse(page.config) } catch { }

    const seo = config.seo || {}
    const title = seo.metaTitle || config.hero?.name || page.title || 'Sale Page'
    const description = seo.metaDescription || config.hero?.title || 'Sale Page'

    return {
        title,
        description,
        openGraph: {
            title,
            description,
            ...(seo.ogImage ? { images: [{ url: seo.ogImage, width: 1200, height: 630 }] } : {}),
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            ...(seo.ogImage ? { images: [seo.ogImage] } : {}),
        },
    }
}
