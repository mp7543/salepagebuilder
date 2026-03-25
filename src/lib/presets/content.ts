import { PageConfig } from '../types'

export const financialPreset: Partial<PageConfig> = {
    navbar: {
        logo: 'KarnWealth',
        links: [
            { text: 'เกี่ยวกับเรา', href: '#about' },
            { text: 'บริการ', href: '#services' },
            { text: 'รีวิว', href: '#testimonials' },
            { text: 'ติดต่อ', href: '#contact' },
        ],
        ctaText: 'นัดปรึกษา',
        ctaHref: '#contact',
    },
    hero: {
        name: 'กานต์ มุกดาสนิท',
        title: 'นักวางแผนการเงินมืออาชีพ',
        subtitle: 'Smart Planning | Secure Future',
        quote: '"ผมเชื่อว่านักวางแผนการเงินที่ดี...มีอยู่จริง"',
        credentials: 'CFP® Certified Financial Planner',
        imageUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600&q=80',
        ctaPrimary: { text: 'นัดปรึกษาฟรี', href: '#contact' },
        ctaSecondary: { text: 'ดูบริการ', href: '#services' },
        socialLinks: [
            { platform: 'facebook', url: 'https://facebook.com' },
            { platform: 'line', url: 'https://line.me' },
            { platform: 'tiktok', url: 'https://tiktok.com' },
        ],
    },
    stats: {
        items: [
            { value: '400M+', label: 'มูลค่าทรัพย์สินที่ดูแล' },
            { value: '500+', label: 'ลูกค้าที่ไว้วางใจ' },
            { value: '10+', label: 'ปีประสบการณ์' },
            { value: '#1', label: 'MDRT Member' },
        ],
    },
    values: {
        title: 'Core Values',
        subtitle: 'ก้าวที่มั่นคง คือก้าวไปด้วยกัน',
        items: [
            { icon: '🤝', title: 'ความซื่อสัตย์', description: 'มีความซื่อสัตย์จริงใจต่อกัน ทั้งตัวเอง ทีมงาน และลูกค้า' },
            { icon: '🎯', title: 'มุ่งมั่น', description: 'ตั้งเป้าหมายที่ชัดเจน ทำงานอย่างมีประสิทธิภาพเพื่อลูกค้า' },
            { icon: '📈', title: 'พัฒนาตลอด', description: 'เรียนรู้และพัฒนาตนเองอย่างต่อเนื่อง เพื่อบริการที่ดีที่สุด' },
        ],
    },
    services: {
        label: '🛠️ บริการของเรา',
        title: 'Our Services',
        items: [
            { icon: '📊', title: 'Financial Planning', description: 'วางแผนการเงินแบบองค์รวม' },
            { icon: '🏖️', title: 'Retirement Planning', description: 'วางแผนเกษียณอย่างมั่นใจ' },
            { icon: '🛡️', title: 'Insurance Planning', description: 'วางแผนประกันชีวิตที่เหมาะสม' },
            { icon: '🎓', title: 'Education Planning', description: 'วางแผนการศึกษาบุตร' },
            { icon: '💰', title: 'Investment Planning', description: 'วางแผนการลงทุนเพื่ออนาคต' },
            { icon: '🏛️', title: 'Legacy Planning', description: 'วางแผนมรดกและส่งต่อความมั่งคั่ง' },
        ],
    },
    testimonials: {
        title: 'ลูกค้าพูดถึงเราอย่างไร',
        items: [
            { name: 'คุณสมชาย', role: 'ผู้บริหารบริษัท', quote: 'ได้แผนการเงินที่ชัดเจน ทำให้รู้สึกมั่นใจในอนาคตมากขึ้น', avatar: 'S', rating: 5 },
            { name: 'คุณพิมพ์', role: 'แพทย์', quote: 'อธิบายเข้าใจง่าย ไม่กดดัน ตั้งใจดูแลลูกค้าจริงๆ', avatar: 'P', rating: 5 },
            { name: 'คุณวิชัย', role: 'วิศวกร', quote: 'เข้าใจความต้องการของเราดี วางแผนได้ตรงจุด', avatar: 'W', rating: 5 },
        ],
    },
    whyChoose: {
        title: 'ทำไมต้องเลือกเรา',
        subtitle: 'เราให้บริการด้วยใจ',
        items: [
            { icon: '🏆', title: 'ประสบการณ์กว่า 10 ปี', description: 'ผ่านทุกวิกฤตการเงิน พร้อมดูแลคุณ' },
            { icon: '📜', title: 'CFP® Certified', description: 'ได้รับใบรับรองนักวางแผนการเงินสากล' },
            { icon: '🤝', title: 'ดูแลตลอดชีวิต', description: 'ไม่ใช่แค่ขาย แต่ดูแลอย่างยั่งยืน' },
            { icon: '💡', title: 'คำปรึกษาฟรี', description: 'นัดพูดคุยฟรี ไม่มีค่าใช้จ่าย' },
        ],
    },
    cta: {
        title: 'พร้อมวางแผนการเงินแล้วหรือยัง?',
        subtitle: 'นัดปรึกษาฟรี ไม่มีค่าใช้จ่าย',
        buttonText: 'นัดคุยเลย',
        buttonHref: '#contact',
    },
    contact: {
        title: 'ติดต่อเรา',
        subtitle: 'พร้อมให้คำปรึกษาตลอดเวลา',
        email: 'contact@example.com',
        phone: '08X-XXX-XXXX',
        line: '@karnwealth',
        address: 'กรุงเทพมหานคร',
    },
    footer: {
        logo: 'KarnWealth',
        description: 'นักวางแผนการเงินมืออาชีพ ดูแลลูกค้าอย่างยั่งยืน',
        links: [
            { text: 'บริการ', href: '#services' },
            { text: 'รีวิว', href: '#testimonials' },
            { text: 'ติดต่อ', href: '#contact' },
        ],
        copyright: '© 2026 KarnWealth. All rights reserved.',
    },
    companyShowcase: {
        companyName: 'บริษัทของคุณ',
        companyLogo: '',
        title: 'ทำไมต้องเลือกเรา?',
        subtitle: 'บริษัทชั้นนำที่ลูกค้าไว้วางใจ',
        stats: [
            { icon: '📈', value: '+2.5%', label: 'เบี้ยรายใหม่เติบโต' },
            { icon: '📊', value: '+1.0%', label: 'เบี้ยประกันภัยรวมเติบโต' },
            { icon: '🏥', value: '+2%', label: 'แนวโน้ม ค่ารักษาพยาบาลสูงขึ้น' },
        ],
        highlights: [
            'ครองส่วนแบ่งการตลาดมากที่สุดในประเทศไทย',
            'ลูกค้าไว้วางใจนานกว่า 87 ปี',
            'มีจำนวนลูกค้าบุคคลมากกว่า 5 ล้านคน',
            'มีจำนวนตัวแทนกว่า 50,000 คน',
            'มีลูกค้าองค์กรกว่า 13,000 องค์กร',
        ],
    },
    recruitment: {
        title: 'ตำแหน่งที่เปิดรับ',
        subtitle: 'ร่วมทีมกับเราวันนี้',
        heroImage: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80',
        tagline: 'INCOME · INDEPENDENT · IMPACT · IMPROVE',
        positions: [
            {
                title: 'ที่ปรึกษาการเงิน (FA Prime)',
                description: 'ทำอาชีพนี้ให้เติบโตและยั่งยืน อยากท้าทายความสามารถตัวเอง',
                qualifications: ['จบปริญญาตรีขึ้นไป', 'มี License ที่เกี่ยวข้อง', 'ประสบการณ์ด้านการเงิน 2 ปีขึ้นไป'],
            },
            {
                title: 'ที่ปรึกษาการเงิน (Standard)',
                description: 'เรียนลัดการเป็นที่ปรึกษาการเงิน เหมาะสำหรับคนที่อยากเริ่มต้น',
                qualifications: ['จบปริญญาตรีขึ้นไป', 'มีเป้าหมายและวินัยสม่ำเสมอ'],
            },
            {
                title: 'ผู้บริหารทีม',
                description: 'สำหรับผู้ที่ต้องการเป็นผู้บริหารหน่วย และเคยทำงานฝ่ายบริหารระดับสูง',
                qualifications: ['มี License ที่เกี่ยวข้อง', 'ประสบการณ์ด้านการเงิน 8 ปีขึ้นไป', 'เคยเป็นหัวหน้าทีม'],
            },
        ],
        benefits: [
            { icon: '💰', title: 'คอมมิชชัน', description: 'รายได้จากปีแรกและปีต่อๆ ไป' },
            { icon: '🎁', title: 'โบนัส', description: 'โบนัสรายเดือน รายไตรมาส รายปี' },
            { icon: '✈️', title: 'ท่องเที่ยว', description: 'ในประเทศและต่างประเทศ' },
            { icon: '📈', title: 'Career Benefit', description: 'ผลประโยชน์จากอาชีพ' },
            { icon: '🔒', title: 'กองทุนสำรอง', description: 'Security Fund' },
            { icon: '🏢', title: 'สิทธิพิเศษ', description: 'โปรแกรมพิเศษสำหรับตัวแทน' },
        ],
    },
}

export const realestatePreset: Partial<PageConfig> = {
    navbar: {
        logo: 'PropertyPro',
        links: [
            { text: 'อสังหาริมทรัพย์', href: '#services' },
            { text: 'ผลงาน', href: '#gallery' },
            { text: 'รีวิว', href: '#testimonials' },
            { text: 'ติดต่อ', href: '#contact' },
        ],
        ctaText: 'ปรึกษาฟรี',
        ctaHref: '#contact',
    },
    hero: {
        name: 'ชื่อ นามสกุล',
        title: 'นายหน้าอสังหาริมทรัพย์มืออาชีพ',
        subtitle: 'ซื้อ-ขาย-เช่า ครบจบในที่เดียว',
        quote: '"เราช่วยให้คุณพบบ้านในฝันได้จริง"',
        credentials: 'Licensed Real Estate Agent',
        imageUrl: '',
        ctaPrimary: { text: 'ดูอสังหาฯ', href: '#services' },
        ctaSecondary: { text: 'ปรึกษาฟรี', href: '#contact' },
        socialLinks: [
            { platform: 'facebook', url: 'https://facebook.com' },
            { platform: 'line', url: 'https://line.me' },
            { platform: 'instagram', url: 'https://instagram.com' },
        ],
    },
    stats: {
        items: [
            { value: '200+', label: 'อสังหาฯ ที่ปิดการขาย' },
            { value: '1B+', label: 'มูลค่ารวม' },
            { value: '98%', label: 'ลูกค้าพึงพอใจ' },
            { value: '8+', label: 'ปีประสบการณ์' },
        ],
    },
    values: {
        title: 'หลักการทำงาน',
        subtitle: 'ซื่อสัตย์ โปร่งใส มืออาชีพ',
        items: [
            { icon: '🏠', title: 'เข้าใจตลาด', description: 'วิเคราะห์ตลาดอสังหาฯ อย่างลึกซึ้ง' },
            { icon: '🤝', title: 'ซื่อสัตย์', description: 'ให้ข้อมูลตรงไปตรงมา ไม่ปิดบัง' },
            { icon: '⚡', title: 'รวดเร็ว', description: 'ดำเนินการรวดเร็ว ไม่ให้พลาดโอกาส' },
        ],
    },
    services: {
        label: '🏠 บริการของเรา',
        title: 'บริการอสังหาริมทรัพย์',
        items: [
            { icon: '🏡', title: 'ซื้อ-ขาย บ้าน/คอนโด', description: 'บริการซื้อขายอสังหาริมทรัพย์ครบวงจร' },
            { icon: '🔑', title: 'เช่า/ให้เช่า', description: 'บริการจัดหาผู้เช่าและดูแลทรัพย์สิน' },
            { icon: '📊', title: 'ประเมินราคา', description: 'ประเมินมูลค่าทรัพย์สินอย่างแม่นยำ' },
            { icon: '🏦', title: 'จัดหาสินเชื่อ', description: 'ช่วยเรื่องสินเชื่อธนาคารและเอกสาร' },
            { icon: '📋', title: 'ที่ปรึกษาการลงทุน', description: 'แนะนำการลงทุนอสังหาฯ ที่คุ้มค่า' },
            { icon: '🏗️', title: 'โครงการใหม่', description: 'บริการจองโครงการใหม่ราคาพิเศษ' },
        ],
    },
    testimonials: {
        title: 'ลูกค้าพูดถึงเราอย่างไร',
        items: [
            { name: 'คุณนิด', role: 'ซื้อคอนโด', quote: 'ช่วยหาคอนโดที่ตรงใจ ราคาดี ทำเลเยี่ยม', avatar: 'N', rating: 5 },
            { name: 'คุณต้อม', role: 'ขายบ้าน', quote: 'ปิดการขายได้เร็วมาก ราคาดีกว่าที่คาด', avatar: 'T', rating: 5 },
            { name: 'คุณแอน', role: 'นักลงทุน', quote: 'แนะนำทำเลดีๆ ให้เสมอ ได้ผลตอบแทนดี', avatar: 'A', rating: 5 },
        ],
    },
    whyChoose: {
        title: 'ทำไมต้องเลือกเรา',
        subtitle: 'ประสบการณ์ที่คุณไว้วางใจได้',
        items: [
            { icon: '🏆', title: 'ผลงานกว่า 200 รายการ', description: 'ปิดการขายสำเร็จมากมาย' },
            { icon: '📍', title: 'เชี่ยวชาญทุกพื้นที่', description: 'รู้จักทำเลดีๆ ทั่วกรุงเทพฯ' },
            { icon: '💰', title: 'ราคายุติธรรม', description: 'ไม่มีค่าใช้จ่ายแอบแฝง' },
            { icon: '📞', title: 'พร้อมให้บริการ 24/7', description: 'ติดต่อได้ตลอดเวลา' },
        ],
    },
    cta: {
        title: 'พร้อมหาบ้านในฝันแล้วหรือยัง?',
        subtitle: 'ปรึกษาฟรี ไม่มีค่าใช้จ่าย',
        buttonText: 'ติดต่อเลย',
        buttonHref: '#contact',
    },
    contact: {
        title: 'ติดต่อเรา',
        subtitle: 'พร้อมให้คำปรึกษาด้านอสังหาริมทรัพย์',
        email: 'contact@example.com',
        phone: '08X-XXX-XXXX',
        line: '@propertypro',
        address: 'กรุงเทพมหานคร',
    },
    footer: {
        logo: 'PropertyPro',
        description: 'นายหน้าอสังหาริมทรัพย์มืออาชีพ ซื่อสัตย์ โปร่งใส',
        links: [
            { text: 'บริการ', href: '#services' },
            { text: 'รีวิว', href: '#testimonials' },
            { text: 'ติดต่อ', href: '#contact' },
        ],
        copyright: '© 2026 PropertyPro. All rights reserved.',
    },
}

export const genericPreset: Partial<PageConfig> = {
    navbar: {
        logo: 'MyBrand',
        links: [
            { text: 'บริการ', href: '#services' },
            { text: 'เกี่ยวกับเรา', href: '#about' },
            { text: 'รีวิว', href: '#testimonials' },
            { text: 'ติดต่อ', href: '#contact' },
        ],
        ctaText: 'ติดต่อเรา',
        ctaHref: '#contact',
    },
    hero: {
        name: 'ชื่อ-นามสกุล',
        title: 'ตำแหน่งของคุณ',
        subtitle: 'สโลแกนของคุณ',
        quote: '"คำพูดที่สร้างแรงบันดาลใจ"',
        credentials: 'ตำแหน่ง / ใบรับรอง',
        imageUrl: '',
        ctaPrimary: { text: 'เริ่มต้นเลย', href: '#contact' },
        ctaSecondary: { text: 'ดูบริการ', href: '#services' },
        socialLinks: [
            { platform: 'facebook', url: 'https://facebook.com' },
            { platform: 'line', url: 'https://line.me' },
        ],
    },
    stats: {
        items: [
            { value: '100+', label: 'ลูกค้า' },
            { value: '5+', label: 'ปีประสบการณ์' },
            { value: '99%', label: 'ความพึงพอใจ' },
            { value: '24/7', label: 'พร้อมให้บริการ' },
        ],
    },
    values: {
        title: 'คุณค่าของเรา',
        subtitle: 'สิ่งที่เรายึดมั่น',
        items: [
            { icon: '🎯', title: 'มุ่งมั่น', description: 'ทำงานอย่างมุ่งมั่น เพื่อผลลัพธ์ที่ดีที่สุด' },
            { icon: '🤝', title: 'ซื่อสัตย์', description: 'ซื่อสัตย์ต่อลูกค้าและตัวเอง' },
            { icon: '💡', title: 'สร้างสรรค์', description: 'คิดนอกกรอบ หาทางออกที่ดีที่สุด' },
        ],
    },
    services: {
        label: '🛠️ บริการของเรา',
        title: 'สิ่งที่เราทำ',
        items: [
            { icon: '⭐', title: 'บริการที่ 1', description: 'รายละเอียดบริการ' },
            { icon: '🚀', title: 'บริการที่ 2', description: 'รายละเอียดบริการ' },
            { icon: '💎', title: 'บริการที่ 3', description: 'รายละเอียดบริการ' },
            { icon: '🔥', title: 'บริการที่ 4', description: 'รายละเอียดบริการ' },
            { icon: '✨', title: 'บริการที่ 5', description: 'รายละเอียดบริการ' },
            { icon: '🌟', title: 'บริการที่ 6', description: 'รายละเอียดบริการ' },
        ],
    },
    testimonials: {
        title: 'ลูกค้าพูดถึงเรา',
        items: [
            { name: 'ลูกค้า A', role: 'ตำแหน่ง', quote: 'บริการดีมาก ประทับใจ', avatar: 'A', rating: 5 },
            { name: 'ลูกค้า B', role: 'ตำแหน่ง', quote: 'แนะนำเลย คุ้มค่ามาก', avatar: 'B', rating: 5 },
            { name: 'ลูกค้า C', role: 'ตำแหน่ง', quote: 'มืออาชีพ ใส่ใจทุกรายละเอียด', avatar: 'C', rating: 5 },
        ],
    },
    whyChoose: {
        title: 'ทำไมต้องเลือกเรา',
        subtitle: 'เหตุผลที่ลูกค้าเลือกเรา',
        items: [
            { icon: '🏆', title: 'มืออาชีพ', description: 'ทีมงานคุณภาพ' },
            { icon: '⚡', title: 'รวดเร็ว', description: 'ให้บริการรวดเร็วทันใจ' },
            { icon: '💰', title: 'คุ้มค่า', description: 'ราคายุติธรรม' },
            { icon: '🛡️', title: 'มั่นใจ', description: 'รับประกันความพอใจ' },
        ],
    },
    cta: {
        title: 'พร้อมเริ่มต้นแล้วหรือยัง?',
        subtitle: 'ติดต่อเราวันนี้ เพื่อรับข้อเสนอพิเศษ',
        buttonText: 'ติดต่อเรา',
        buttonHref: '#contact',
    },
    contact: {
        title: 'ติดต่อเรา',
        subtitle: 'พร้อมให้บริการ',
        email: 'contact@example.com',
        phone: '08X-XXX-XXXX',
        line: '@mybrand',
        address: 'กรุงเทพมหานคร',
    },
    footer: {
        logo: 'MyBrand',
        description: 'บริการคุณภาพที่คุณไว้วางใจ',
        links: [
            { text: 'บริการ', href: '#services' },
            { text: 'รีวิว', href: '#testimonials' },
            { text: 'ติดต่อ', href: '#contact' },
        ],
        copyright: '© 2026 MyBrand. All rights reserved.',
    },
}

export const accountingPreset: Partial<PageConfig> = {
    navbar: {
        logo: 'Lighthouse Ledger',
        links: [
            { text: 'บริการ', href: '#services' },
            { text: 'แพ็กเกจ', href: '#pricing' },
            { text: 'ทำไมเลือกเรา', href: '#whychoose' },
            { text: 'FAQ', href: '#faq' },
        ],
        ctaText: 'โทร 088-596-3245',
        ctaHref: 'tel:0885963245',
    },
    hero: {
        name: 'ทำบัญชีให้ถูกต้อง เพื่อให้คุณกล้าเติบโตอย่างเต็มศักยภาพ',
        title: 'สำนักงานบัญชีและสอบบัญชีสำหรับธุรกิจ SME',
        subtitle: 'เราเชื่อว่า "การเสียภาษีอย่างถูกต้อง" ไม่ใช่ภาระ แต่คือสัญญาณของความมั่งคั่งและความรับผิดชอบต่อประเทศ',
        quote: '"เราไม่ได้ทำบัญชีเพื่อให้คุณเสียภาษีน้อยที่สุด แต่ทำบัญชีเพื่อให้คุณกล้าหารายได้ให้มากที่สุด"',
        credentials: 'CPA Certified | สำนักงานบัญชีมืออาชีพ',
        imageUrl: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80',
        ctaPrimary: { text: 'ปรึกษาฟรีก่อนจดบริษัท', href: '#contact' },
        ctaSecondary: { text: 'ดูแพ็กเกจ', href: '#pricing' },
        socialLinks: [
            { platform: 'facebook', url: 'https://facebook.com' },
            { platform: 'line', url: 'https://line.me' },
        ],
    },
    stats: {
        items: [
            { value: '500+', label: 'บริษัทที่ดูแล' },
            { value: '10+', label: 'ปีประสบการณ์' },
            { value: 'CPA', label: 'ผู้สอบบัญชีรับอนุญาต' },
            { value: '99%', label: 'ลูกค้าพึงพอใจ' },
        ],
    },
    values: {
        title: 'เริ่มต้นธุรกิจอย่างถูกต้องตั้งแต่วันแรก',
        subtitle: 'ปัญหาที่นักธุรกิจเจอบ่อย',
        items: [
            { icon: '📊', title: 'บัญชีไม่ชัดเจน → ตัดสินใจได้ยาก', description: 'เมื่อข้อมูลทางการเงินไม่ครบ ไม่อัปเดต หรือไม่มีการจัดหมวดหมู่ที่ชัดเจน เจ้าของธุรกิจจะไม่รู้ภาพรวมแท้จริงของบริษัท', imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&q=80' },
            { icon: '😰', title: 'ไม่มั่นใจว่าตัวเลขถูกต้อง → กลัวเสี่ยง', description: 'แม้มีรายงานบัญชี แต่ถ้าเจ้าของไม่เชื่อมั่นในความถูกต้องของข้อมูล ความกลัวจะเข้ามาแทนที่ความกล้า', imageUrl: 'https://images.unsplash.com/photo-1554224154-22dec7ec8818?w=400&q=80' },
            { icon: '🤷', title: 'ไม่รู้ว่าต้องเตรียมอะไรสำหรับการเติบโต', description: 'การเติบโตไม่ใช่แค่ยอดขายเพิ่ม แต่ต้องเตรียมหลายด้าน เมื่อไม่มีใครช่วยวางแผนเชิงโครงสร้าง', imageUrl: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=400&q=80' },
            { icon: '🔢', title: 'ไม่มีใครอธิบายตัวเลขให้เข้าใจจริง ๆ', description: 'หลายธุรกิจมีนักบัญชีทำงานให้ แต่ไม่มีที่ปรึกษาที่ช่วย "แปลตัวเลข" เป็นกลยุทธ์', imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&q=80' },
        ],
    },
    services: {
        label: 'SERVICES HUB',
        title: 'บริการของเรา',
        items: [
            { icon: '📋', title: 'ทำบัญชีรายเดือน', description: 'บันทึกบัญชีเป็นระบบ ยื่นภาษีตรงเวลา รายงานที่ใช้ตัดสินใจได้', imageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&q=80' },
            { icon: '✨', title: 'วางแผนภาษี', description: 'วางแผนภาษีอย่างชาญฉลาดภายใต้กฎหมาย', imageUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=400&q=80' },
            { icon: '🔍', title: 'สอบบัญชี (CPA)', description: 'ตรวจสอบตามมาตรฐาน ยืนยันความน่าเชื่อถือ', imageUrl: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400&q=80' },
        ],
    },
    testimonials: {
        title: 'ทำไมนักธุรกิจรุ่นใหม่เลือก LHL',
        items: [
            { name: 'คุณกมล', role: 'เจ้าของธุรกิจ E-Commerce', quote: 'ทำบัญชีโปร่งใส เข้าใจง่าย ช่วยให้กล้าตัดสินใจขยายธุรกิจ', avatar: 'K', rating: 5 },
            { name: 'คุณพิม', role: 'Startup Founder', quote: 'จัดระบบบัญชีตั้งแต่วันแรก ทำให้ไม่ต้องกลัวเรื่องภาษี', avatar: 'P', rating: 5 },
            { name: 'คุณธน', role: 'ผู้บริหาร SME', quote: 'อธิบายตัวเลขได้เข้าใจง่าย ใช้วางแผนธุรกิจได้จริง', avatar: 'T', rating: 5 },
        ],
    },
    whyChoose: {
        title: 'Value Propositions',
        subtitle: 'LHL คือพาร์ทเนอร์ด้านบัญชีและภาษีของนักธุรกิจที่อยากเติบโตอย่างยั่งยืน',
        items: [
            { icon: '✅', title: 'ทำบัญชีแบบโปร่งใส', description: 'เล่มเดียว เพื่อการตัดสินใจที่แม่นยำ' },
            { icon: '✅', title: 'วางแผนภาษีภายใต้กฎหมาย', description: 'ปลอดภัยระยะยาว' },
            { icon: '✅', title: 'อธิบายตัวเลขให้ CEO เข้าใจ', description: 'ใช้งานได้จริง' },
            { icon: '✅', title: 'มีบริการสอบบัญชีโดยผู้สอบบัญชีรับอนุญาต (CPA)', description: 'ได้มาตรฐาน' },
            { icon: '✅', title: 'วางระบบตั้งแต่ต้น', description: 'เพื่อรองรับการเติบโต' },
            { icon: '✅', title: 'ทำงานแบบระยะยาว', description: 'เป็นทีมเดียวกันกับคุณ' },
        ],
    },
    pricing: {
        title: 'แพ็กเกจจดทะเบียนบริษัท',
        items: [
            {
                name: 'Start Right',
                price: '10,900',
                unit: 'บาท',
                description: 'เหมาะสำหรับ: ผู้เริ่มต้นธุรกิจ',
                features: [
                    'จดทะเบียนบริษัทจำกัด',
                    'แนะนำโครงสร้างเบื้องต้น',
                    'คำแนะนำหน้าที่ด้านบัญชีและภาษีหลังเปิดบริษัท',
                    'ระยะเวลา: 7-14 วันทำการ',
                ],
                isRecommended: false,
                ctaText: 'ปรึกษาฟรี →',
                ctaHref: '#contact',
            },
            {
                name: 'Business Ready',
                price: '13,900',
                unit: 'บาท',
                description: 'เหมาะสำหรับ: นักธุรกิจที่คิดไกลกว่า "เปิดให้ผ่าน"',
                features: [
                    'ทุกอย่างใน Start Right',
                    'จด VAT (ถ้ามี)',
                    'วางโครงสร้างบัญชีเริ่มต้น',
                    'แนะนำระบบบัญชี SME',
                    'เชื่อมต่อกับบริการทำบัญชีรายเดือนได้ทันที',
                    'ระยะเวลา: 10-14 วันทำการ',
                ],
                isRecommended: true,
                ctaText: 'ปรึกษาฟรี →',
                ctaHref: '#contact',
            },
            {
                name: 'Growth Foundation',
                price: '20,000',
                unit: 'ค่าบริการเริ่มต้น',
                description: 'เหมาะสำหรับ: ธุรกิจที่มองการเติบโตจริงจัง',
                features: [
                    'ทุกอย่างใน Business Ready',
                    'วางแผนภาษีเบื้องต้น',
                    'เตรียมระบบรองรับบัญชีและการสอบบัญชี',
                    'ให้คำปรึกษาโครงสร้างธุรกิจเชิงกลยุทธ์',
                    'ระยะเวลา: 14-21 วันทำการ',
                ],
                isRecommended: false,
                ctaText: 'ปรึกษาฟรี →',
                ctaHref: '#contact',
            },
        ],
    },
    faq: {
        title: 'คำถามที่พบบ่อย',
        items: [
            { question: 'ต้องทำบัญชีทันทีหลังจดบริษัทไหม?', answer: 'ใช่ เพราะบริษัทมีหน้าที่ทางบัญชีและภาษีตั้งแต่เดือนแรก แต่ไม่ต้องกังวล เราช่วยคุณจัดระบบตั้งแต่ต้น' },
            { question: 'ถ้ายังไม่มีรายได้ ต้องจด VAT ไหม?', answer: 'ยังไม่จำเป็น แต่ถ้ารายได้เกิน 1.8 ล้านบาท/ปี ต้องจดทะเบียน VAT ตามกฎหมาย' },
            { question: 'ใช้เวลานานแค่ไหนถึงจดบริษัทเสร็จ?', answer: 'โดยปกติ 7-14 วันทำการ ขึ้นอยู่กับแพ็กเกจและความซับซ้อนของธุรกิจ' },
            { question: 'ทำไมต้องมีผู้สอบบัญชี?', answer: 'บริษัทจำกัดทุกแห่งต้องมีผู้สอบบัญชีรับอนุญาต (CPA) ตรวจสอบงบการเงินประจำปีตามกฎหมาย' },
            { question: 'LHL ต่างจากสำนักงานบัญชีทั่วไปอย่างไร?', answer: 'เราไม่ใช่แค่ทำบัญชี แต่เป็นพาร์ทเนอร์ที่ช่วยให้คุณเข้าใจตัวเลข วางแผนภาษี และเติบโตอย่างมั่นใจ' },
        ],
    },
    cta: {
        title: 'ถ้าคุณอยากโฟกัสที่ "การสร้างรายได้" เรื่องบัญชีและภาษี ฝากไว้กับเรา',
        subtitle: 'ปรึกษาฟรีกับ Lighthouse Ledger',
        buttonText: 'ปรึกษาฟรี',
        buttonHref: '#contact',
    },
    contact: {
        title: 'ติดต่อเรา',
        subtitle: 'พร้อมให้คำปรึกษาด้านบัญชีและภาษี',
        email: 'contact@lighthouseledger.co.th',
        phone: '088-596-3245',
        line: '@lighthouseledger',
        address: 'กรุงเทพมหานคร',
    },
    footer: {
        logo: 'Lighthouse Ledger',
        description: 'สำนักงานบัญชีและสอบบัญชีสำหรับธุรกิจ SME ที่อยากเติบโตอย่างถูกต้อง',
        links: [
            { text: 'บริการ', href: '#services' },
            { text: 'แพ็กเกจ', href: '#pricing' },
            { text: 'FAQ', href: '#faq' },
            { text: 'ติดต่อ', href: '#contact' },
        ],
        copyright: '© 2026 Lighthouse Ledger. All rights reserved.',
    },
}

