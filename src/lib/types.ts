export type SubscriptionTier = 'free' | 'pro' | 'premium'

export interface PageConfig {
    hero: HeroConfig
    stats: StatsConfig
    values: ValuesConfig
    services: ServicesConfig
    testimonials: TestimonialsConfig
    whyChoose: WhyChooseConfig
    cta: CtaConfig
    contact: ContactConfig
    footer: FooterConfig
    navbar: NavbarConfig
    seo?: SeoConfig
    pricing?: PricingConfig
    faq?: FaqConfig
    companyShowcase?: CompanyShowcaseConfig
    recruitment?: RecruitmentConfig
}

export interface SeoConfig {
    metaTitle: string
    metaDescription: string
    ogImage: string
}

export interface NavbarConfig {
    logo: string
    links: { text: string; href: string }[]
    ctaText: string
    ctaHref: string
}

export interface HeroConfig {
    name: string
    title: string
    subtitle: string
    quote: string
    credentials: string
    imageUrl: string
    ctaPrimary: { text: string; href: string }
    ctaSecondary: { text: string; href: string }
    socialLinks: { platform: string; url: string }[]
}

export interface StatsConfig {
    items: { value: string; label: string }[]
}

export interface ValuesConfig {
    title: string
    subtitle: string
    items: { icon: string; title: string; description: string; imageUrl?: string }[]
}

export interface ServicesConfig {
    label: string
    title: string
    items: { icon: string; title: string; description: string; imageUrl?: string }[]
}

export interface TestimonialsConfig {
    title: string
    items: {
        name: string
        role: string
        quote: string
        avatar: string
        rating: number
    }[]
}

export interface WhyChooseConfig {
    title: string
    subtitle: string
    items: { icon: string; title: string; description: string }[]
}

export interface CtaConfig {
    title: string
    subtitle: string
    buttonText: string
    buttonHref: string
}

export interface ContactConfig {
    title: string
    subtitle: string
    email: string
    phone: string
    line: string
    address: string
}

export interface FooterConfig {
    logo: string
    description: string
    links: { text: string; href: string }[]
    copyright: string
}

export interface PricingConfig {
    title: string
    items: {
        name: string
        price: string
        unit: string
        description: string
        features: string[]
        isRecommended: boolean
        ctaText: string
        ctaHref: string
    }[]
}

export interface FaqConfig {
    title: string
    items: {
        question: string
        answer: string
    }[]
}

export interface CompanyShowcaseConfig {
    companyName: string
    companyLogo: string
    title: string
    subtitle: string
    stats: { icon: string; value: string; label: string }[]
    highlights: string[]
}

export interface RecruitmentConfig {
    title: string
    subtitle: string
    heroImage: string
    tagline: string
    positions: {
        title: string
        description: string
        qualifications: string[]
    }[]
    benefits: { icon: string; title: string; description: string }[]
}

export interface ColorTheme {
    primary: string
    secondary: string
    accent: string
    background: string
    surface: string
    text: string
    textLight: string
}

export interface BrandPreset {
    name: string
    nameEn: string
    primary: string
    secondary: string
    accent: string
}

export interface ContentPreset {
    name: string
    icon: string
    config: Partial<PageConfig>
}

export type TemplateType = 'professional' | 'premium' | 'minimal' | 'lighthouse'

