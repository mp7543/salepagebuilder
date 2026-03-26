import { findUserByEmail, createUser } from './db'

// Mock user for no-login mode
const DEMO_EMAIL = 'demo@salepage.app'
const DEMO_NAME = 'Demo User'

export function getOrCreateDemoUser() {
    let user = findUserByEmail(DEMO_EMAIL)
    if (!user) {
        user = createUser({ email: DEMO_EMAIL, name: DEMO_NAME, image: '' })
    }
    return user
}

export function getMockSession() {
    const user = getOrCreateDemoUser()
    return {
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
            image: user.image || '',
        },
    }
}
