import { sha256 } from 'oslo/crypto'
import { base32, encodeHex } from 'oslo/encoding'

export const generateSessionToken = () => {
  const bytes = new Uint8Array(20)
  crypto.getRandomValues(bytes)
  const token = base32.encode(bytes, { includePadding: false })

  return token
}

export const getSessionIdFromToken = async (token: string) => encodeHex(await sha256(new TextEncoder().encode(token)))
