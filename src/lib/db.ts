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
    `)
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

// ===== CUSTOM DOMAIN =====
export function findCustomDomainByDomain(domain: string) {
    const db = getDb()
    const cd = db.prepare('SELECT * FROM CustomDomain WHERE domain = ?').get(domain) as any
    if (cd) {
        cd.page = findPageById(cd.pageId)
    }
    return cd
}
