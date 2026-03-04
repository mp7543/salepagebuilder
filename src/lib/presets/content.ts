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
        imageUrl: '',
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
