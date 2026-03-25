/**
 * Automated Tests — SalesPage Builder
 * 
 * Run: npx tsx src/__tests__/api.test.ts
 * 
 * This is a simple test runner that can be run without Jest.
 * It tests the core database functions directly.
 */

import {
    createUser, findUserByEmail, findUserById,
    createPage, findPageById, findPageBySlug, findPagesByUser, updatePage, deletePage,
    createSubscription, findSubscription, updateSubscription,
    recordPageView, getPageViewCount, getPageViewCounts, getPageAnalytics,
    createCustomDomain, findCustomDomainByDomain, findCustomDomainsByUser, verifyCustomDomain, deleteCustomDomain,
} from '../lib/db'

let passed = 0
let failed = 0

function assert(condition: boolean, testName: string) {
    if (condition) {
        console.log(`  ✅ ${testName}`)
        passed++
    } else {
        console.error(`  ❌ ${testName}`)
        failed++
    }
}

function section(name: string) {
    console.log(`\n── ${name} ──`)
}

async function runTests() {
    console.log('🧪 Running SalesPage Builder Tests\n')

    // ===== USER TESTS =====
    section('User CRUD')
    const user = createUser({ email: `test-${Date.now()}@test.com`, name: 'Test User', image: '' })
    assert(!!user.id, 'Create user returns ID')
    assert(user.email.includes('test-'), 'Create user sets email')

    const foundByEmail = findUserByEmail(user.email)
    assert(foundByEmail?.id === user.id, 'Find user by email')

    const foundById = findUserById(user.id)
    assert(foundById?.id === user.id, 'Find user by ID')

    // ===== SUBSCRIPTION TESTS =====
    section('Subscription')
    const sub = createSubscription(user.id, 'free', 14)
    assert(sub.tier === 'free', 'Create free subscription')
    assert(!!sub.endDate, 'Subscription has endDate')

    const foundSub = findSubscription(user.id)
    assert(foundSub?.tier === 'free', 'Find subscription')

    const updatedSub = updateSubscription(user.id, 'pro')
    assert(updatedSub?.tier === 'pro', 'Upgrade to pro')

    // ===== PAGE TESTS =====
    section('Page CRUD')
    const page = createPage({ userId: user.id, title: 'Test Page', template: 'professional' })
    assert(!!page.id, 'Create page returns ID')
    assert(page.title === 'Test Page', 'Page has correct title')
    assert(!!page.slug, 'Page has slug')

    const foundPage = findPageById(page.id)
    assert(foundPage?.title === 'Test Page', 'Find page by ID')

    const foundBySlug = findPageBySlug(page.slug)
    assert(foundBySlug?.id === page.id, 'Find page by slug')

    const userPages = findPagesByUser(user.id)
    assert(userPages.length >= 1, 'Find pages by user')

    const updated = updatePage(page.id, { title: 'Updated Page', isPublished: true })
    assert(updated?.title === 'Updated Page', 'Update page title')
    assert(updated?.isPublished === 1, 'Publish page')

    // ===== PAGE VIEW ANALYTICS TESTS =====
    section('Page View Analytics')
    const view1 = recordPageView(page.id, '1.2.3.4', 'Mozilla/5.0', 'https://google.com')
    assert(!!view1, 'Record first page view')

    const view2 = recordPageView(page.id, '1.2.3.4', 'Mozilla/5.0', 'https://google.com')
    assert(view2 === null, 'Dedup same IP within 30 minutes')

    const view3 = recordPageView(page.id, '5.6.7.8', 'Chrome', '')
    assert(!!view3, 'Record view from different IP')

    const totalViews = getPageViewCount(page.id)
    assert(totalViews === 2, `Total views is 2 (got ${totalViews})`)

    const counts = getPageViewCounts([page.id])
    assert(counts[page.id] === 2, 'Batch view count correct')

    const analytics = getPageAnalytics(page.id)
    assert(analytics.total === 2, 'Analytics total correct')
    assert(analytics.today >= 0, 'Analytics today >= 0')
    assert(analytics.last7Days >= 0, 'Analytics 7-day >= 0')
    assert(analytics.last30Days >= 0, 'Analytics 30-day >= 0')

    // ===== CUSTOM DOMAIN TESTS =====
    section('Custom Domain')
    const domain = createCustomDomain(page.id, `test-${Date.now()}.com`)
    assert(!!domain.id, 'Create custom domain')
    assert(!domain.isVerified, 'Domain starts unverified')

    const foundDomain = findCustomDomainByDomain(domain.domain)
    assert(foundDomain?.id === domain.id, 'Find domain by name')

    const userDomains = findCustomDomainsByUser(user.id)
    assert(userDomains.length >= 1, 'Find domains by user')

    const verified = verifyCustomDomain(domain.id, true)
    assert(verified?.isVerified === 1, 'Verify domain')

    deleteCustomDomain(domain.id)
    const deletedDomain = findCustomDomainByDomain(domain.domain)
    assert(!deletedDomain, 'Delete custom domain')

    // ===== CLEANUP =====
    section('Cleanup')
    deletePage(page.id)
    const deletedPage = findPageById(page.id)
    assert(!deletedPage, 'Delete page')

    // ===== RESULTS =====
    console.log(`\n${'═'.repeat(40)}`)
    console.log(`  Results: ${passed} passed, ${failed} failed`)
    console.log(`${'═'.repeat(40)}\n`)

    if (failed > 0) process.exit(1)
}

runTests().catch(err => {
    console.error('Test runner failed:', err)
    process.exit(1)
})
