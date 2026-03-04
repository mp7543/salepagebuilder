---
description: กฎการสร้างไฟล์ Markdown — ต้องสร้างในโฟลเดอร์โปรเจกต์เท่านั้น
---

# กฎการสร้างไฟล์ Markdown

## กฎหลัก
เมื่อผู้ใช้ขอให้สร้างไฟล์ Markdown (.md) ต้องสร้างไฟล์ไว้ใน **โฟลเดอร์โปรเจกต์ที่กำลังทำงานอยู่เท่านั้น** ห้ามสร้างใน artifact directory หรือ temp directory

## ขั้นตอน
1. ตรวจสอบ workspace ปัจจุบันของผู้ใช้
2. สร้างไฟล์ .md ไปที่ root ของโปรเจกต์โดยตรง (เช่น `d:\vibecode\salepage-builder\filename.md`)
3. ใช้ `write_to_file` tool แทนการใช้ shell command เพื่อความเร็ว

## ตัวอย่าง
- ✅ ถูก: `d:\vibecode\salepage-builder\document.md`
- ❌ ผิด: `C:\Users\meawp\.gemini\antigravity\brain\...\document.md`
- ❌ ผิด: `/tmp/document.md`
