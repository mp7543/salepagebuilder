# Sale Page Builder — Version 002

# 🚀 Antigravity Mobile-First UI Overhaul

> อัพเดท UI/UX ครั้งใหญ่: Mobile-first design, Premium animations, Builder enhancements

**วันที่อัพเดท:** 11 มีนาคม 2569  
**ผู้พัฒนา:** Antigravity AI + สุธี

---

## 📋 สรุปการเปลี่ยนแปลงทั้งหมด

| รอบ | จำนวนไฟล์ | สิ่งที่ทำ |
|:---:|:---------:|-----------|
| Round 1 | 4 ไฟล์ | Mobile-first overhaul (navigation, hero, builder, CSS) |
| Round 2 | 5 ไฟล์ | FAQ, Trusted By, Dashboard redesign, Login, Builder UX |

---

## 🎨 Round 1: Mobile-First UI Overhaul

### ไฟล์ที่แก้ไข

| ไฟล์ | การเปลี่ยนแปลง |
|------|---------------|
| `layout.tsx` | เพิ่มฟอนต์ Outfit สำหรับ headings, viewport meta fix |
| `globals.css` | Mobile blur reduction, bottom sheet, sticky CTA, toast, scroll-reveal, prefers-reduced-motion |
| `page.tsx` | Hamburger bottom-sheet menu, sticky CTA, template showcase, responsive sizing |
| `builder/[pageId]/page.tsx` | Mobile bottom drawer, FAB button, toast notifications, responsive header |

### ฟีเจอร์ใหม่ Round 1

#### 🍔 Hamburger Menu → Bottom Sheet

- เมนูบนมือถือเปิดเป็น Bottom Sheet แทน sidebar
- Links: ฟีเจอร์, เทมเพลท, Pricing + ปุ่ม CTA

#### 📌 Sticky Bottom CTA Bar

- ปุ่ม "เริ่มสร้างฟรีเลย" ลอยด้านล่างจอมือถือตลอด
- ซ่อนบน desktop

#### 🎨 Template Showcase Section

- Section ใหม่บน Landing Page แสดงตัวอย่าง 3 เทมเพลท
- Tab switcher: Professional / Premium / Minimal
- แสดงจุดเด่นของแต่ละเทมเพลท

#### ✨ Scroll Reveal Animations

- IntersectionObserver-based animations
- Elements เลื่อนขึ้นมาเมื่อ scroll ถึง
- Support `prefers-reduced-motion`

#### 🔤 Typography Upgrade

- **Headings (H1-H6):** Outfit (Google Font) — ดูพรีเมียม
- **Body text:** Inter — อ่านง่าย

#### 🏗️ Builder Mobile Bottom Drawer

- Sidebar ถูกแปลงเป็น Bottom Drawer บนมือถือ
- ปุ่ม FAB ลอยเปิดหน้า "เลือกส่วนที่แก้ไข" ก่อน
- เลือก section แล้ว scroll preview ไปยังส่วนนั้นอัตโนมัติ

#### ⚡ Mobile Performance

- ลด blur radius บนมือถือ (25px แทน 40px)
- ปิด floating animation บนมือถือ
- `prefers-reduced-motion` support

---

## 🎯 Round 2: UI Improvements

### ไฟล์ที่แก้ไข

| ไฟล์ | การเปลี่ยนแปลง |
|------|---------------|
| `page.tsx` | FAQ accordion (6 Q&A), Trusted By logos (6 แบรนด์), Pricing badge fix |
| `dashboard/page.tsx` | Page cards redesign + template color mapping |
| `login/page.tsx` | Split layout (benefits + login card) |
| `builder/[pageId]/page.tsx` | Undo/Redo, Preview toggle, Publish confetti |
| `globals.css` | confettiFall CSS keyframe |

### ฟีเจอร์ใหม่ Round 2

#### ❓ FAQ Accordion

- 6 คำถามที่พบบ่อย พร้อม smooth expand/collapse animation
- คำถาม: ทดลองฟรี, ยกเลิกสมาชิก, Custom Domain, แก้ไขหลังเผยแพร่, ภาษาไทย, ติดต่อทีมงาน

#### 🏢 Trusted By / Social Proof

- 6 บริษัทชั้นนำ: AIA, FWD, ไทยประกัน, เมืองไทย, กรุงเทพ, แสนสิริ
- แสดงเป็น badge พร้อมสีของแต่ละบริษัท

#### 🏷️ Pricing Badge Fix

- "⭐ แนะนำสำหรับมืออาชีพ" เปลี่ยนจาก `absolute` เป็น inline badge
- ไม่ถูกตัดข้อความบน mobile อีกต่อไป

#### 🃏 Dashboard Cards Redesign

- **Preview thumbnail** จำลองหน้าเพจด้วยสีของ template
  - Professional → เขียว Emerald
  - Premium → น้ำเงิน Ocean Blue
  - Minimal → ม่วง Indigo
- **Status badge** "• Live" / "ร่าง" — ที่มุมบนขวาของ card
- **Template label** เป็นสี badge แทนข้อความธรรมดา
- **ปุ่มแก้ไข** ใช้สีของ template
- **Hover effect** — card ลอยขึ้น + shadow

#### 🔐 Login Page Split Layout

- **Desktop:** Benefits panel (4 ข้อ) ด้านซ้าย + Login card ด้านขวา
- **Mobile:** Benefits แสดงเป็น checklist ภายใน card
- **Social proof:** "1,200+ นักวางแผนการเงินใช้งานแล้ว" พร้อม avatar dots
- **Benefits:**
  - 3 เทมเพลทมืออาชีพ
  - 10+ สีแบรนด์พร้อมใช้
  - เผยแพร่ได้ทันที
  - Auto-Save อัตโนมัติ

#### ↩️ Undo/Redo System

- เก็บ history สูงสุด 30 states
- ปุ่ม Undo/Redo บน header ของ builder (desktop)
- ป้องกัน auto-save ระหว่าง undo/redo ด้วย `isUndoRedo` ref
- Toast notification เมื่อ Undo/Redo สำเร็จ

#### 🖥️📱 Preview Toggle

- ปุ่มสลับ Desktop / Mobile ที่ header ของ builder
- **Desktop mode:** Preview เต็ม width
- **Mobile mode:** Preview ถูกจำกัดที่ `maxWidth: 390px`
- Smooth transition animation (300ms ease)

#### 🎉 Publish Confetti

- Confetti animation เมื่อเผยแพร่เพจ **ครั้งแรก**
- 50 ชิ้น confetti × 6 สี (purple, cyan, pink, green, yellow, blue)
- ข้อความ "🎉 เผยแพร่สำเร็จ!" ตรงกลางจอ
- หายไปอัตโนมัติหลัง 3 วินาที
- ไม่แสดงเมื่อกดบันทึกครั้งถัดไป (เฉพาะครั้งแรก)

---

## 🏗️ Tech Stack (อัพเดท)

| เทคโนโลยี | รายละเอียด |
|-----------|-----------|
| **Framework** | Next.js 16.1.6 (App Router + Turbopack) |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS v4 + Custom CSS |
| **Auth** | NextAuth.js v4 + Google OAuth 2.0 |
| **Database** | SQLite (via better-sqlite3) |
| **ORM** | Prisma 7 |
| **Icons** | Lucide React |
| **Fonts** | **Outfit** (headings) + **Inter** (body) ← NEW |

---

## 📁 โครงสร้างไฟล์ที่เปลี่ยนแปลง

```
src/app/
├── layout.tsx                           # ✏️ เพิ่ม Outfit font, viewport meta
├── globals.css                          # ✏️ Mobile-first CSS, confetti keyframe
├── page.tsx                             # ✏️ Hamburger, FAQ, Trusted By, sticky CTA
├── login/page.tsx                       # ✏️ Split layout login
├── dashboard/
│   ├── page.tsx                         # ✏️ Cards redesign, template colors
│   └── builder/[pageId]/page.tsx        # ✏️ Bottom drawer, Undo/Redo, Preview toggle, Confetti
```

---

## 📊 สถานะฟีเจอร์ทั้งหมด

| ฟีเจอร์ | สถานะ |
|---------|-------|
| Landing Page | ✅ เสร็จ |
| Google OAuth Login | ✅ เสร็จ |
| Dashboard (CRUD Pages) | ✅ เสร็จ |
| Page Builder (Real-time) | ✅ เสร็จ |
| 3 Templates | ✅ เสร็จ |
| Auto-save | ✅ เสร็จ |
| Public Page Hosting | ✅ เสร็จ |
| Subscription System | ✅ เสร็จ (Mock) |
| Brand Color Presets | ✅ เสร็จ |
| Content Presets | ✅ เสร็จ |
| Builder Tier Locking | ✅ เสร็จ |
| Custom Domain UI | ✅ เสร็จ (Premium) |
| Responsive Mobile | ✅ เสร็จ |
| **Mobile Hamburger Menu** | ✅ **NEW** |
| **Sticky Bottom CTA** | ✅ **NEW** |
| **Template Showcase** | ✅ **NEW** |
| **Scroll Reveal Animations** | ✅ **NEW** |
| **Outfit Heading Font** | ✅ **NEW** |
| **Builder Bottom Drawer** | ✅ **NEW** |
| **Mobile Performance Optimization** | ✅ **NEW** |
| **FAQ Section** | ✅ **NEW** |
| **Trusted By Logos** | ✅ **NEW** |
| **Dashboard Cards Redesign** | ✅ **NEW** |
| **Login Split Layout** | ✅ **NEW** |
| **Undo/Redo** | ✅ **NEW** |
| **Desktop/Mobile Preview Toggle** | ✅ **NEW** |
| **Publish Confetti** | ✅ **NEW** |
| Payment Gateway | ⏳ ยังไม่ integrate |

---

## 🚀 วิธีรัน

```bash
npm install
npm run dev
# เปิด http://localhost:3000
```

---

> **Note:** ไฟล์นี้เป็น documentation ของ Version 002 (Mobile-First UI Overhaul)  
> ดู Version 001 ได้ที่ `salepage_mockup_with_googleauthen.md`
