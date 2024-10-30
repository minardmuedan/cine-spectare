import { deleteSessionDb, getSessionAndUserDb, renewSessionDb } from '@/db/utils/session'
import { TPrettify } from '../utils'
import { cache } from 'react'
import { jwtDecrypt } from '../helpers/jwt'
import { getSessionIdFromToken } from './token'
import { TSession, TSessionUser } from './_type'
import { deleteCookie, getCookie } from '../helpers/headers'

type Session = TPrettify<{ user: TSessionUser | null; session: TSession | null }>

export const validateSession = cache(async (): Promise<Session> => {
  try {
    const { token } = await jwtDecrypt<{ token: string }>(`${await getCookie('session')}`)
    const sessionId = await getSessionIdFromToken(token)

    const result = await getSessionAndUserDb(sessionId)
    if (result.length < 1) return { session: null, user: null }

    const { session } = result[0]

    if (Date.now() >= session.expiresAt.getTime()) {
      await deleteCookie('session')
      await deleteSessionDb(sessionId)
      return { session: null, user: null }
    }

    const isSessionPast15Days = Date.now() >= session.expiresAt.getTime() - 1000 * 60 * 60 * 24 * 15
    if (isSessionPast15Days) {
      const newExpiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30)
      await renewSessionDb(sessionId, newExpiresAt)
    }

    const {
      user: { name, email, avatarUrl, provider },
    } = result[0]
    const user = { name, email, avatarUrl, provider }

    return { session, user }
  } catch {
    return { user: null, session: null }
  }
})
