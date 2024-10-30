import { createSessionDb } from '@/db/utils/session'
import { generateSessionToken, getSessionIdFromToken } from './token'
import { jwtEncrypt } from '../helpers/jwt'
import { getIpAddress, setCookie } from '../helpers/headers'

export async function createSession(userId: string) {
  const token = generateSessionToken()
  const sessionId = await getSessionIdFromToken(token)

  const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30)
  const ipAddress = await getIpAddress().catch(() => null)

  await createSessionDb({ id: sessionId, userId, expiresAt, ipAddress })
  const encryptedSessionId = await jwtEncrypt<{ token: string }>({ token })

  await setCookie('session', encryptedSessionId, {
    httpOnly: true,
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 30,
  })
}
