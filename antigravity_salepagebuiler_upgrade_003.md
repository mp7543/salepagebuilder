# Sale Page Builder — Upgrade 003

# 🏗️ Antigravity Lighthouse Template Integration

> เพิ่ม Template ใหม่สไตล์ Lighthouse Ledger: Mobile-first, Pricing Cards, FAQ Accordion, Sticky CTA

**วันที่อัพเดท:** 23 มีนาคม 2569  
**ผู้พัฒนา:** Antigravity AI + สุธี  
**Reference:** [Lighthouse Ledger (lhl.asp2.space)](https://lhl.asp2.space/)

---

## 📋 สรุปการเปลี่ยนแปลงที่จะทำ

| หมวด | สิ่งที่ทำ | สถานะ |
|:---:|-----------|:-----:|
| Template | สร้าง Lighthouse Template ใหม่ (Mobile-first) | ⏳ |
| Types | เพิ่ม PricingConfig + FaqConfig | ⏳ |
| Content Preset | เพิ่ม accountingPreset สำหรับสำนักงานบัญชี | ⏳ |
| Color Preset | เพิ่ม Lighthouse Blue theme | ⏳ |
| Page Routing | เพิ่ม Lighthouse ใน slug renderer | ⏳ |
| Builder | เพิ่ม Pricing/FAQ editor ใน sidebar | ⏳ |

---

## 🎯 Reference Design: Lighthouse Ledger

### โครงสร้าง 9 Sections

| # | Section | ลักษณะ | Map กับ Config |
|---|---------|--------|---------------|
| 1 | **Hero** | ภาพพื้นหลัง + Dark overlay + คำโปรย + ปุ่ม CTA | ✅ `hero` |
| 2 | **About / Why Us** | รูป Founder + เนื้อหาสร้างความเชื่อมั่น | ✅ `whyChoose` |
| 3 | **Pain Points** | Grid 2x2 — ปัญหาที่ลูกค้าเจอ (พื้นหลังเทาอ่อน) | ✅ `values` |
| 4 | **Value Propositions** | Checklist ✓ สีฟ้า + Blue glow border | ✅ `services` |
| 5 | **Pricing** | 3 Cards — ตรงกลาง (แนะนำ) ใช้พื้นสีน้ำเงิน | 🆕 `pricing` |
| 6 | **Services Hub** | Card สีน้ำเงินเข้ม + ไอคอนวงกลมขาว | ✅ `services` |
| 7 | **Social Proof** | Trust signals (เครื่องหมายถูกสีฟ้า) | ✅ `testimonials` |
| 8 | **FAQ** | Accordion กางได้ | 🆕 `faq` |
| 9 | **Final CTA** | ภาพพื้นหลัง + ปุ่มปรึกษาฟรี + ปุ่ม Line | ✅ `cta` + `contact` |

### Color Palette (LHL Style)

| Token | สี | Hex |
|-------|-----|-----|
| Primary Blue | 🔵 | `#1E69DE` |
| Dark Blue | 🔵 | `#0047AB` |
| Line Green | 🟢 | `#00B900` |
| Background | ⬜ | `#FFFFFF` |
| Surface | 🔲 | `#F0F5FF` (เทาอ่อนอมฟ้า) |
| Text | ⬛ | `#1A1A2E` |
| Text Light | ⬜ | `#6B7280` |

### สไตล์เด่น

- **Mobile-First** — ออกแบบจอมือถือก่อน scale ขึ้น desktop
- Card ขอบมน 12-16px + เงาจาง + **Blue glow effect**
- Hero ใช้ภาพจริง + **gradient dark overlay**
- Pricing card ตัว Recommended เป็น **สีน้ำเงินเต็ม**
- ฟอนต์ Sans-serif (Prompt / Kanit)
- ปุ่ม CTA ขอบมน + สีน้ำเงินเข้ม
- **Sticky CTA** บนมือถือ (ปุ่มโทร/Line ลอยก้นจอ)
- **FAQ Accordion** กดกางได้

---

## 📁 ไฟล์ที่จะเปลี่ยนแปลง

### ไฟล์ใหม่

| ไฟล์ | รายละเอียด |
|------|-----------|
| `components/templates/lighthouse.tsx` | Template ใหม่ mobile-first 9 sections |

### ไฟล์ที่แก้ไข

| ไฟล์ | การเปลี่ยนแปลง | Risk |
|------|---------------|------|
| `lib/types.ts` | เพิ่ม `PricingConfig`, `FaqConfig` (optional fields) | ⬇️ ต่ำ |
| `lib/presets/content.ts` | เพิ่ม `accountingPreset` | ⬇️ ต่ำ |
| `lib/presets/colors.ts` | เพิ่ม `lighthouse` color preset | ⬇️ ต่ำ |
| `app/p/[slug]/page.tsx` | เพิ่ม 1 บรรทัด render `LighthouseTemplate` | ⬇️ ต่ำ |
| `app/dashboard/builder/[pageId]/page.tsx` | เพิ่ม Pricing/FAQ editor ใน sidebar | ⚠️ กลาง |

### ไฟล์ที่ไม่แตะเลย

- ❌ Auth system — ไม่แก้
- ❌ Database / API routes — ไม่แก้
- ❌ Template เดิม 3 ตัว — ไม่กระทบ
- ❌ Dashboard / Subscription — ไม่กระทบ

---

## 🆕 Types ที่จะเพิ่ม

### PricingConfig

```typescript
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
```

### FaqConfig

```typescript
export interface FaqConfig {
    title: string
    items: {
        question: string
        answer: string
    }[]
}
```

---

## 📊 Gap Analysis & ความมั่นใจ

| ส่วนงาน | ความมั่นใจ | เหตุผล |
|----------|-----------|--------|
| Layout 9 sections | 95% | Static React component — ตรงไปตรงมา |
| Mobile-First CSS | 95% | ใช้ scoped class names `tpl-lh-*` |
| Color Scheme | 95% | Map สีตาม reference |
| Pricing Cards | 90% | เพิ่ม type + render — pattern เดียวกับ section อื่น |
| FAQ Accordion | 95% | ใช้ `details/summary` หรือ state toggle |
| Sticky CTA | 95% | `position: fixed` bottom |
| Hero Overlay | 80% | ต้อง generate/placeholder รูปภาพ |
| Builder Integration | 85% | เพิ่ม editor sections — ตาม pattern ที่มี |
| **รวม** | **92%** | |

---

## 🚀 ขั้นตอนการทำงาน

```
Step 1: types.ts        → เพิ่ม PricingConfig + FaqConfig
Step 2: lighthouse.tsx   → สร้าง template ใหม่ mobile-first ← งานหลัก
Step 3: content preset   → เนื้อหาสำนักงานบัญชีแบบ LHL
Step 4: color preset     → สีน้ำเงิน LHL theme
Step 5: page routing     → เพิ่ม lighthouse ใน slug renderer
Step 6: builder sidebar  → เพิ่ม pricing/faq editor
Step 7: ทดสอบ            → รัน dev + ตรวจสอบบนมือถือ
```

---

## 📊 สถานะฟีเจอร์ (อัพเดท Upgrade 003)

| ฟีเจอร์ | สถานะ |
|---------|-------|
| Landing Page | ✅ เสร็จ |
| Google OAuth Login | ✅ เสร็จ |
| Demo Login (Bypass Auth) | ✅ เสร็จ |
| Dashboard (CRUD Pages) | ✅ เสร็จ |
| Page Builder (Real-time) | ✅ เสร็จ |
| 3 Templates (Pro/Premium/Minimal) | ✅ เสร็จ |
| Auto-save + Undo/Redo | ✅ เสร็จ |
| Public Page Hosting | ✅ เสร็จ |
| Mobile-First UI | ✅ เสร็จ |
| **Lighthouse Template (LHL Style)** | ⏳ **UPGRADE 003** |
| **Pricing Section** | ⏳ **UPGRADE 003** |
| **FAQ Accordion Section** | ⏳ **UPGRADE 003** |
| **Sticky CTA (Mobile)** | ⏳ **UPGRADE 003** |
| **Accounting Content Preset** | ⏳ **UPGRADE 003** |
| Payment Gateway | ⏳ ยังไม่ integrate |

---

## 🚀 วิธีรัน

```bash
npm install
npm run dev
# เปิด http://localhost:3000
```

---

> **Note:** ไฟล์นี้เป็น documentation ของ Upgrade 003 (Lighthouse Template Integration)  
> ดู Version 002 ได้ที่ `antigravity_salepagebuilder_ver002.md`  
> ดู Version 001 ได้ที่ `salepage_mockup_with_googleauthen.md`  
> **⚠️ รอคำสั่ง gogogo12345 ก่อนเริ่มเขียนโค้ด**
