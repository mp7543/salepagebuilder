import { NextResponse } from 'next/server'

// NextAuth route removed — no login required
export async function GET() {
    return NextResponse.redirect(new URL('/dashboard', 'http://localhost:3000'))
}

export async function POST() {
    return NextResponse.redirect(new URL('/dashboard', 'http://localhost:3000'))
}
