# 🚀 Deployment Guide — SalesPage Builder

## Prerequisites

- Node.js 18+
- SQLite3 (bundled with better-sqlite3)
- Google OAuth credentials (Client ID + Secret)

---

## 1. Environment Variables

สร้างไฟล์ `.env.production` ที่ root ของโปรเจกต์:

```env
# Google OAuth
GOOGLE_CLIENT_ID=your_production_google_client_id
GOOGLE_CLIENT_SECRET=your_production_google_client_secret

# NextAuth
NEXTAUTH_SECRET=your_strong_random_secret_here
NEXTAUTH_URL=https://your-domain.com

# Database (SQLite will auto-create)
DATABASE_PATH=./prisma/prod.db
```

> **⚠️ สำคัญ:** `NEXTAUTH_SECRET` ต้องเป็นค่า random ยาว — ใช้ `openssl rand -base64 32` เพื่อสร้าง

---

## 2. Deploy to Vercel (แนะนำ)

```bash
# 1. Install Vercel CLI
npm i -g vercel

# 2. Login
vercel login

# 3. Deploy
vercel --prod

# 4. Set environment variables ใน Vercel Dashboard
# Settings → Environment Variables → เพิ่มทุกตัวจาก .env.production
```

### ข้อจำกัดบน Vercel

- ❌ SQLite ไม่ทำงานบน Vercel (ใช้ serverless functions)
- ✅ ใช้ **Turso**, **PlanetScale**, หรือ **Neon** แทน
- หรือ deploy ที่ VPS/Docker แทน

---

## 3. Deploy to VPS (Railway / DigitalOcean / AWS)

```bash
# 1. Clone repository
git clone https://github.com/your-repo/salepage-builder.git
cd salepage-builder

# 2. Install dependencies
npm install

# 3. Copy environment file
cp .env.example .env.production

# 4. Build production
npm run build

# 5. Start production server
npm start
# หรือใช้ PM2:
pm2 start npm --name "salepage" -- start
```

---

## 4. Build Commands

| Command | Description |
|---------|------------|
| `npm run dev` | Development server + Turbopack |
| `npm run build` | Production build |
| `npm start` | Start production server |
| `npx tsx src/__tests__/api.test.ts` | Run automated tests |

---

## 5. Post-Deploy Checklist

- [ ] ตั้ง Environment Variables ครบทุกตัว
- [ ] Google OAuth redirect URI ชี้ไปที่ production domain
- [ ] ทดสอบ login ผ่าน Google
- [ ] สร้างเพจทดสอบ + publish
- [ ] ตรวจ SEO metadata (ใช้ [metatags.io](https://metatags.io))
- [ ] ตรวจ PWA install prompt บน mobile
- [ ] ตรวจ Custom Domain DNS setup (ถ้าใช้)

---

## 6. Google OAuth Setup (Production)

1. ไปที่ [Google Cloud Console](https://console.cloud.google.com/)
2. เลือกโปรเจกต์ → APIs & Services → Credentials
3. แก้ไข OAuth 2.0 Client ID
4. เพิ่ม **Authorized redirect URI**: `https://your-domain.com/api/auth/callback/google`
5. เพิ่ม **Authorized JavaScript origin**: `https://your-domain.com`

---

## 7. ข้อควรรู้

- **Database:** ไฟล์ SQLite อยู่ที่ `prisma/dev.db` — ควร backup เป็นประจำ
- **PWA:** Service worker cache จะถูก update อัตโนมัติเมื่อ deploy ใหม่
- **Email:** ปัจจุบัน log to console — เชื่อม Resend/SendGrid ในไฟล์ `src/lib/notifications.ts`
