import { createSessionDb } from '@/lib/db/utils/session'
import { generateSessionToken } from '../helpers/generate'
import { getIpAddress, setCookie } from '@/lib/auth/helpers/headers'
import { jwtEncrypt } from '../helpers/jwt'
import { getSessionIdFromToken } from './_get-session-id'

export const createSession = async (userId: string) => {
  const token = generateSessionToken()
  const sessionId = await getSessionIdFromToken(token)

  const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30)

  await createSessionDb({ id: sessionId, userId, expiresAt, ip: getIpAddress() })
  const encryptedSessionId = await jwtEncrypt<{ token: string }>({ token })

  setCookie('session', encryptedSessionId, {
    httpOnly: true,
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 30,
  })
}
