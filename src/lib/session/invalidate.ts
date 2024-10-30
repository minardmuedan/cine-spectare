import { deleteSessionDb } from '@/db/utils/session'
import { deleteCookie, getCookie } from '../helpers/headers'
import { jwtDecrypt } from '../helpers/jwt'
import { getSessionIdFromToken } from './token'

export const invalidateSession = async () => {
  try {
    const { token } = await jwtDecrypt<{ token: string }>(`${await getCookie('session')}`)
    const sessionId = await getSessionIdFromToken(token)
    if (sessionId) await deleteSessionDb(sessionId)
  } catch {
  } finally {
    await deleteCookie('session')
  }
}
