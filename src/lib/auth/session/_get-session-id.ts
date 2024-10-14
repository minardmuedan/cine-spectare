import { sha256 } from 'oslo/crypto'
import { encodeHex } from 'oslo/encoding'

export const getSessionIdFromToken = async (token: string) => {
  const sessionId = encodeHex(await sha256(new TextEncoder().encode(token)))
  return sessionId
}
