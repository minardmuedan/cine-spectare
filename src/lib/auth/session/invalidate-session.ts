import { deleteSessionDb } from '@/lib/db/utils/session'
import { deleteCookie, getCookie } from '../helpers/headers'
import { jwtDecrypt } from '../helpers/jwt'
import { getSessionIdFromToken } from './_get-session-id'

export const invalidateSession = async () => {
  try {
    const { token } = await jwtDecrypt<{ token: string }>(`${getCookie('session')}`)
    const sessionId = await getSessionIdFromToken(token)
    if (sessionId) await deleteSessionDb(sessionId)
  } catch {
  } finally {
    deleteCookie('session')
  }
}
