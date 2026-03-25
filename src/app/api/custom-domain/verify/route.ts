import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { findCustomDomainById, findCustomDomainsByUser, verifyCustomDomain } from '@/lib/db'
import dns from 'dns/promises'

const EXPECTED_HOST = process.env.NEXTAUTH_URL
    ? new URL(process.env.NEXTAUTH_URL).hostname
    : 'localhost'

export async function POST(req: NextRequest) {
    const session = await getServerSession(authOptions)
    if (!(session?.user as any)?.id) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { domainId } = await req.json()
    if (!domainId) {
        return NextResponse.json({ error: 'Missing domainId' }, { status: 400 })
    }

    // Find the domain and verify ownership
    const cd = findCustomDomainById(domainId)
    if (!cd) {
        return NextResponse.json({ error: 'Domain not found' }, { status: 404 })
    }

    // Verify user owns the page this domain is attached to
    const userDomains = findCustomDomainsByUser((session!.user as any).id)
    const owned = userDomains.find((d: any) => d.id === domainId)
    if (!owned) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })
    }

    // Perform DNS lookup
    try {
        let verified = false
        let dnsResult: string[] = []

        // Check CNAME records
        try {
            const cnames = await dns.resolveCname(cd.domain)
            dnsResult = cnames
            verified = cnames.some((c: string) =>
                c.toLowerCase().includes(EXPECTED_HOST.toLowerCase())
            )
        } catch {
            // CNAME lookup failed, try A record
        }

        // If CNAME didn't work, try A records (for apex domains)
        if (!verified) {
            try {
                const addresses = await dns.resolve4(cd.domain)
                dnsResult = addresses
                // For local dev, just check if any A record exists
                if (EXPECTED_HOST === 'localhost') {
                    verified = addresses.length > 0
                }
            } catch {
                // A record lookup failed too
            }
        }

        // Update DB
        const updated = verifyCustomDomain(domainId, verified)

        return NextResponse.json({
            verified,
            domain: cd.domain,
            dnsRecords: dnsResult,
            expectedHost: EXPECTED_HOST,
            message: verified
                ? 'DNS verified successfully! ✅'
                : `DNS ยังไม่ได้ชี้มาที่ ${EXPECTED_HOST} กรุณาเพิ่ม CNAME record ชี้มาที่ ${EXPECTED_HOST}`,
        })
    } catch (error) {
        return NextResponse.json({
            verified: false,
            domain: cd.domain,
            message: 'ไม่สามารถตรวจสอบ DNS ได้ กรุณาลองอีกครั้ง',
        })
    }
}
