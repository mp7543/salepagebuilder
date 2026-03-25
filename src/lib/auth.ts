import { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'
import { findUserByEmail, createUser, updateUser } from './db'

export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || '',
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
        }),
        CredentialsProvider({
            name: 'Demo Login',
            credentials: {
                email: { label: 'Email', type: 'email', placeholder: 'demo@example.com' },
                name: { label: 'Name', type: 'text', placeholder: 'Demo User' },
            },
            async authorize(credentials) {
                if (!credentials?.email) return null
                const email = credentials.email.trim().toLowerCase()
                const name = credentials.name?.trim() || 'Demo User'

                try {
                    let user = findUserByEmail(email)
                    if (!user) {
                        user = createUser({ email, name, image: '' })
                    } else {
                        updateUser(email, { name })
                        user = findUserByEmail(email)
                    }
                    return { id: user.id, email: user.email, name: user.name, image: user.image }
                } catch (e) {
                    console.error('Demo login error:', e)
                    return null
                }
            },
        }),
    ],
    session: {
        strategy: 'jwt',
    },
    callbacks: {
        async signIn({ user }) {
            if (!user.email) return false
            try {
                const existingUser = findUserByEmail(user.email)
                if (!existingUser) {
                    createUser({
                        email: user.email,
                        name: user.name || '',
                        image: user.image || '',
                    })
                } else {
                    updateUser(user.email, {
                        name: user.name || existingUser.name,
                        image: user.image || existingUser.image,
                    })
                }
            } catch (e) {
                console.error('Error saving user:', e)
            }
            return true
        },
        async session({ session }) {
            if (session.user?.email) {
                try {
                    const dbUser = findUserByEmail(session.user.email)
                    if (dbUser) {
                        (session.user as any).id = dbUser.id
                    }
                } catch (e) {
                    console.error('Error fetching user:', e)
                }
            }
            return session
        },
        async jwt({ token, user }) {
            if (user) token.sub = user.id
            return token
        },
    },
    pages: {
        signIn: '/login',
    },
}
