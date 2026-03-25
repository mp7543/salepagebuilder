import Database from 'better-sqlite3'
import path from 'path'
import { v4 as uuidv4 } from 'uuid'

const dbPath = path.join(process.cwd(), 'prisma', 'dev.db')

let _db: Database.Database | null = null

function getDb(): Database.Database {
    if (!_db) {
        _db = new Database(dbPath)
        _db.pragma('journal_mode = WAL')
        _db.pragma('foreign_keys = ON')
        initTables(_db)
    }
    return _db
}

function initTables(db: Database.Database) {
    db.exec(`
        CREATE TABLE IF NOT EXISTS User (
            id TEXT PRIMARY KEY,
            email TEXT UNIQUE NOT NULL,
            name TEXT DEFAULT '',
            image TEXT DEFAULT '',
            createdAt TEXT DEFAULT (datetime('now'))
        );

        CREATE TABLE IF NOT EXISTS Subscription (
            id TEXT PRIMARY KEY,
            userId TEXT NOT NULL UNIQUE,
            tier TEXT DEFAULT 'free',
            startDate TEXT DEFAULT (datetime('now')),
            endDate TEXT,
            isActive INTEGER DEFAULT 1,
            FOREIGN KEY (userId) REFERENCES User(id) ON DELETE CASCADE
        );

        CREATE TABLE IF NOT EXISTS Page (
            id TEXT PRIMARY KEY,
            userId TEXT NOT NULL,
            slug TEXT UNIQUE NOT NULL,
            title TEXT DEFAULT '',
            template TEXT DEFAULT 'professional',
            config TEXT DEFAULT '{}',
            colorTheme TEXT DEFAULT '{}',
            isPublished INTEGER DEFAULT 0,
            createdAt TEXT DEFAULT (datetime('now')),
            updatedAt TEXT DEFAULT (datetime('now')),
            FOREIGN KEY (userId) REFERENCES User(id) ON DELETE CASCADE
        );

        CREATE TABLE IF NOT EXISTS CustomDomain (
            id TEXT PRIMARY KEY,
            pageId TEXT NOT NULL UNIQUE,
            domain TEXT UNIQUE NOT NULL,
            isVerified INTEGER DEFAULT 0,
            createdAt TEXT DEFAULT (datetime('now')),
            FOREIGN KEY (pageId) REFERENCES Page(id) ON DELETE CASCADE
        );

        CREATE TABLE IF NOT EXISTS PageView (
            id TEXT PRIMARY KEY,
            pageId TEXT NOT NULL,
            ip TEXT DEFAULT '',
            userAgent TEXT DEFAULT '',
            referrer TEXT DEFAULT '',
            createdAt TEXT DEFAULT (datetime('now')),
            FOREIGN KEY (pageId) REFERENCES Page(id) ON DELETE CASCADE
        );

        CREATE INDEX IF NOT EXISTS idx_pageview_page_date ON PageView(pageId, createdAt);

        CREATE TABLE IF NOT EXISTS SystemSettings (
            key TEXT PRIMARY KEY,
            value TEXT NOT NULL
        );
    `)

    // Default settings
    const db2 = getDb()
    const existing = db2.prepare('SELECT key FROM SystemSettings WHERE key = ?').get('admin_emails')
    if (!existing) {
        db2.prepare('INSERT OR IGNORE INTO SystemSettings (key, value) VALUES (?, ?)').run('admin_emails', '')
        db2.prepare('INSERT OR IGNORE INTO SystemSettings (key, value) VALUES (?, ?)').run('trial_days', '14')
        db2.prepare('INSERT OR IGNORE INTO SystemSettings (key, value) VALUES (?, ?)').run('price_pro', '199')
        db2.prepare('INSERT OR IGNORE INTO SystemSettings (key, value) VALUES (?, ?)').run('price_premium', '299')
        db2.prepare('INSERT OR IGNORE INTO SystemSettings (key, value) VALUES (?, ?)').run('maintenance_mode', 'false')
    }
}

// ===== USER =====
export function findUserByEmail(email: string) {
    const db = getDb()
    return db.prepare('SELECT * FROM User WHERE email = ?').get(email) as any
}

export function findUserById(id: string) {
    const db = getDb()
    return db.prepare('SELECT * FROM User WHERE id = ?').get(id) as any
}

export function createUser(data: { email: string; name: string; image: string }) {
    const db = getDb()
    const id = uuidv4().replace(/-/g, '').slice(0, 25)
    const now = new Date().toISOString()
    db.prepare('INSERT INTO User (id, email, name, image, createdAt) VALUES (?, ?, ?, ?, ?)').run(
        id, data.email, data.name, data.image, now
    )
    return { id, ...data, createdAt: now }
}

export function updateUser(email: string, data: { name?: string; image?: string }) {
    const db = getDb()
    const sets: string[] = []
    const values: any[] = []
    if (data.name !== undefined) { sets.push('name = ?'); values.push(data.name) }
    if (data.image !== undefined) { sets.push('image = ?'); values.push(data.image) }
    if (sets.length > 0) {
        values.push(email)
        db.prepare(`UPDATE User SET ${sets.join(', ')} WHERE email = ?`).run(...values)
    }
}

export function deleteUser(id: string) {
    const db = getDb()
    db.prepare('DELETE FROM User WHERE id = ?').run(id)
}

// ===== SUBSCRIPTION =====
export function findSubscription(userId: string) {
    const db = getDb()
    return db.prepare('SELECT * FROM Subscription WHERE userId = ?').get(userId) as any
}

export function createSubscription(userId: string, tier: string = 'free', days: number = 14) {
    const db = getDb()
    const id = uuidv4().replace(/-/g, '').slice(0, 25)
    const now = new Date().toISOString()
    const endDate = new Date()
    endDate.setDate(endDate.getDate() + days)
    db.prepare('INSERT INTO Subscription (id, userId, tier, startDate, endDate, isActive) VALUES (?, ?, ?, ?, ?, ?)').run(
        id, userId, tier, now, endDate.toISOString(), 1
    )
    return { id, userId, tier, startDate: now, endDate: endDate.toISOString(), isActive: true }
}

export function updateSubscription(userId: string, tier: string) {
    const db = getDb()
    const endDate = new Date()
    endDate.setMonth(endDate.getMonth() + 1)
    const existing = findSubscription(userId)
    if (existing) {
        db.prepare('UPDATE Subscription SET tier = ?, endDate = ?, isActive = ? WHERE userId = ?').run(
            tier, endDate.toISOString(), 1, userId
        )
    } else {
        createSubscription(userId, tier, 30)
    }
    return findSubscription(userId)
}

// ===== PAGE =====
export function findPagesByUser(userId: string) {
    const db = getDb()
    return db.prepare('SELECT * FROM Page WHERE userId = ? ORDER BY updatedAt DESC').all(userId) as any[]
}

export function findPageById(id: string) {
    const db = getDb()
    return db.prepare('SELECT * FROM Page WHERE id = ?').get(id) as any
}

export function findPageByIdAndUser(id: string, userId: string) {
    const db = getDb()
    return db.prepare('SELECT * FROM Page WHERE id = ? AND userId = ?').get(id, userId) as any
}

export function findPageBySlug(slug: string) {
    const db = getDb()
    return db.prepare('SELECT * FROM Page WHERE slug = ?').get(slug) as any
}

export function createPage(data: { userId: string; title: string; template?: string; slug?: string; config?: string; colorTheme?: string }) {
    const db = getDb()
    const id = uuidv4().replace(/-/g, '').slice(0, 25)
    const slug = data.slug || uuidv4().slice(0, 8)
    const now = new Date().toISOString()
    db.prepare(
        'INSERT INTO Page (id, userId, slug, title, template, config, colorTheme, isPublished, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
    ).run(
        id, data.userId, slug, data.title || 'My Sale Page', data.template || 'professional',
        data.config || '{}', data.colorTheme || '{}', 0, now, now
    )
    return { id, userId: data.userId, slug, title: data.title, template: data.template || 'professional', config: data.config || '{}', colorTheme: data.colorTheme || '{}', isPublished: false, createdAt: now, updatedAt: now }
}

export function updatePage(id: string, data: { title?: string; template?: string; config?: string; colorTheme?: string; isPublished?: boolean; slug?: string }) {
    const db = getDb()
    const sets: string[] = []
    const values: any[] = []
    if (data.title !== undefined) { sets.push('title = ?'); values.push(data.title) }
    if (data.template !== undefined) { sets.push('template = ?'); values.push(data.template) }
    if (data.config !== undefined) { sets.push('config = ?'); values.push(typeof data.config === 'string' ? data.config : JSON.stringify(data.config)) }
    if (data.colorTheme !== undefined) { sets.push('colorTheme = ?'); values.push(typeof data.colorTheme === 'string' ? data.colorTheme : JSON.stringify(data.colorTheme)) }
    if (data.isPublished !== undefined) { sets.push('isPublished = ?'); values.push(data.isPublished ? 1 : 0) }
    if (data.slug !== undefined) { sets.push('slug = ?'); values.push(data.slug) }
    sets.push('updatedAt = ?'); values.push(new Date().toISOString())
    values.push(id)
    db.prepare(`UPDATE Page SET ${sets.join(', ')} WHERE id = ?`).run(...values)
    return findPageById(id)
}

export function deletePage(id: string) {
    const db = getDb()
    db.prepare('DELETE FROM Page WHERE id = ?').run(id)
}

// ===== PAGE VIEW ANALYTICS =====
export function recordPageView(pageId: string, ip: string, userAgent: string, referrer: string) {
    const db = getDb()
    // Dedup: skip if same IP visited same page within 30 minutes
    const thirtyMinAgo = new Date(Date.now() - 30 * 60 * 1000).toISOString()
    const existing = db.prepare(
        'SELECT id FROM PageView WHERE pageId = ? AND ip = ? AND createdAt > ?'
    ).get(pageId, ip, thirtyMinAgo)
    if (existing) return null

    const id = uuidv4().replace(/-/g, '').slice(0, 25)
    const now = new Date().toISOString()
    db.prepare(
        'INSERT INTO PageView (id, pageId, ip, userAgent, referrer, createdAt) VALUES (?, ?, ?, ?, ?, ?)'
    ).run(id, pageId, ip, userAgent, referrer, now)
    return { id, pageId, createdAt: now }
}

export function getPageViewCount(pageId: string, since?: string): number {
    const db = getDb()
    if (since) {
        const row = db.prepare('SELECT COUNT(*) as count FROM PageView WHERE pageId = ? AND createdAt >= ?').get(pageId, since) as any
        return row?.count || 0
    }
    const row = db.prepare('SELECT COUNT(*) as count FROM PageView WHERE pageId = ?').get(pageId) as any
    return row?.count || 0
}

export function getPageViewCounts(pageIds: string[]): Record<string, number> {
    if (pageIds.length === 0) return {}
    const db = getDb()
    const placeholders = pageIds.map(() => '?').join(',')
    const rows = db.prepare(
        `SELECT pageId, COUNT(*) as count FROM PageView WHERE pageId IN (${placeholders}) GROUP BY pageId`
    ).all(...pageIds) as any[]
    const result: Record<string, number> = {}
    for (const r of rows) result[r.pageId] = r.count
    return result
}

export function getPageAnalytics(pageId: string) {
    const now = new Date()
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate()).toISOString()
    const sevenDaysAgo = new Date(now.getTime() - 7 * 86400000).toISOString()
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 86400000).toISOString()

    return {
        total: getPageViewCount(pageId),
        today: getPageViewCount(pageId, todayStart),
        last7Days: getPageViewCount(pageId, sevenDaysAgo),
        last30Days: getPageViewCount(pageId, thirtyDaysAgo),
    }
}

// ===== CUSTOM DOMAIN =====
export function findCustomDomainByDomain(domain: string) {
    const db = getDb()
    const cd = db.prepare('SELECT * FROM CustomDomain WHERE domain = ?').get(domain) as any
    if (cd) {
        cd.page = findPageById(cd.pageId)
    }
    return cd
}

export function findCustomDomainById(id: string) {
    const db = getDb()
    return db.prepare('SELECT * FROM CustomDomain WHERE id = ?').get(id) as any
}

export function findCustomDomainByPage(pageId: string) {
    const db = getDb()
    return db.prepare('SELECT * FROM CustomDomain WHERE pageId = ?').get(pageId) as any
}

export function findCustomDomainsByUser(userId: string) {
    const db = getDb()
    return db.prepare(`
        SELECT cd.*, p.title as pageTitle, p.slug as pageSlug 
        FROM CustomDomain cd 
        JOIN Page p ON cd.pageId = p.id 
        WHERE p.userId = ?
    `).all(userId) as any[]
}

export function createCustomDomain(pageId: string, domain: string) {
    const db = getDb()
    const id = uuidv4().replace(/-/g, '').slice(0, 25)
    db.prepare('INSERT INTO CustomDomain (id, pageId, domain, isVerified) VALUES (?, ?, ?, ?)').run(
        id, pageId, domain, 0
    )
    return { id, pageId, domain, isVerified: false }
}

export function verifyCustomDomain(id: string, verified: boolean) {
    const db = getDb()
    db.prepare('UPDATE CustomDomain SET isVerified = ? WHERE id = ?').run(verified ? 1 : 0, id)
    return findCustomDomainById(id)
}

export function deleteCustomDomain(id: string) {
    const db = getDb()
    db.prepare('DELETE FROM CustomDomain WHERE id = ?').run(id)
}

// ===== ADMIN QUERIES =====
export function getAllUsers() {
    const db = getDb()
    return db.prepare(`
        SELECT u.*, s.tier, s.endDate, s.isActive as subActive,
            (SELECT COUNT(*) FROM Page WHERE userId = u.id) as pageCount
        FROM User u
        LEFT JOIN Subscription s ON u.id = s.userId
        ORDER BY u.createdAt DESC
    `).all() as any[]
}

export function getAllPages() {
    const db = getDb()
    return db.prepare(`
        SELECT p.*, u.name as ownerName, u.email as ownerEmail,
            (SELECT COUNT(*) FROM PageView WHERE pageId = p.id) as viewCount
        FROM Page p
        LEFT JOIN User u ON p.userId = u.id
        ORDER BY p.updatedAt DESC
    `).all() as any[]
}

export function getAllSubscriptions() {
    const db = getDb()
    return db.prepare(`
        SELECT s.*, u.name, u.email, u.image
        FROM Subscription s
        LEFT JOIN User u ON s.userId = u.id
        ORDER BY s.startDate DESC
    `).all() as any[]
}

export function getAllCustomDomains() {
    const db = getDb()
    return db.prepare(`
        SELECT cd.*, p.title as pageTitle, p.slug as pageSlug, u.email as ownerEmail
        FROM CustomDomain cd
        LEFT JOIN Page p ON cd.pageId = p.id
        LEFT JOIN User u ON p.userId = u.id
        ORDER BY cd.createdAt DESC
    `).all() as any[]
}

export function getSystemStats() {
    const db = getDb()
    const now = new Date()
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate()).toISOString()
    const sevenDaysAgo = new Date(now.getTime() - 7 * 86400000).toISOString()

    const totalUsers = (db.prepare('SELECT COUNT(*) as c FROM User').get() as any)?.c || 0
    const totalPages = (db.prepare('SELECT COUNT(*) as c FROM Page').get() as any)?.c || 0
    const publishedPages = (db.prepare('SELECT COUNT(*) as c FROM Page WHERE isPublished = 1').get() as any)?.c || 0
    const totalViews = (db.prepare('SELECT COUNT(*) as c FROM PageView').get() as any)?.c || 0
    const viewsToday = (db.prepare('SELECT COUNT(*) as c FROM PageView WHERE createdAt >= ?').get(todayStart) as any)?.c || 0
    const views7d = (db.prepare('SELECT COUNT(*) as c FROM PageView WHERE createdAt >= ?').get(sevenDaysAgo) as any)?.c || 0

    const tierCounts = db.prepare(`
        SELECT tier, COUNT(*) as count FROM Subscription GROUP BY tier
    `).all() as any[]

    const trialsExpiringSoon = db.prepare(`
        SELECT s.*, u.email, u.name FROM Subscription s
        LEFT JOIN User u ON s.userId = u.id
        WHERE s.tier = 'free' AND s.endDate <= datetime('now', '+3 days') AND s.endDate > datetime('now')
    `).all() as any[]

    return {
        totalUsers, totalPages, publishedPages, totalViews, viewsToday, views7d,
        tierBreakdown: Object.fromEntries(tierCounts.map((t: any) => [t.tier, t.count])),
        trialsExpiringSoon,
    }
}

export function getDailyViews(days: number = 30) {
    const db = getDb()
    const since = new Date(Date.now() - days * 86400000).toISOString()
    return db.prepare(`
        SELECT date(createdAt) as day, COUNT(*) as count
        FROM PageView WHERE createdAt >= ?
        GROUP BY date(createdAt) ORDER BY day ASC
    `).all(since) as any[]
}

export function getTopPages(limit: number = 10) {
    const db = getDb()
    return db.prepare(`
        SELECT p.id, p.title, p.slug, p.template, p.isPublished, u.name as ownerName,
            COUNT(pv.id) as viewCount
        FROM Page p
        LEFT JOIN PageView pv ON p.id = pv.pageId
        LEFT JOIN User u ON p.userId = u.id
        GROUP BY p.id ORDER BY viewCount DESC LIMIT ?
    `).all(limit) as any[]
}

export function getTemplatePopularity() {
    const db = getDb()
    return db.prepare(`
        SELECT template, COUNT(*) as count FROM Page GROUP BY template ORDER BY count DESC
    `).all() as any[]
}

// ===== SYSTEM SETTINGS =====
export function getSetting(key: string): string | null {
    const db = getDb()
    const row = db.prepare('SELECT value FROM SystemSettings WHERE key = ?').get(key) as any
    return row?.value ?? null
}

export function setSetting(key: string, value: string) {
    const db = getDb()
    db.prepare('INSERT OR REPLACE INTO SystemSettings (key, value) VALUES (?, ?)').run(key, value)
}

export function getAllSettings(): Record<string, string> {
    const db = getDb()
    const rows = db.prepare('SELECT * FROM SystemSettings').all() as any[]
    return Object.fromEntries(rows.map(r => [r.key, r.value]))
}

export function isAdmin(email: string): boolean {
    const envAdmins = process.env.ADMIN_EMAILS || ''
    const dbAdmins = getSetting('admin_emails') || ''
    const allAdmins = [envAdmins, dbAdmins].join(',').split(',').map(e => e.trim().toLowerCase()).filter(Boolean)
    return allAdmins.includes(email.toLowerCase())
}
