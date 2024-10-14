import { base32 } from 'oslo/encoding'
import { alphabet, generateRandomString } from 'oslo/crypto'

export const generateId = (length = 10) => generateRandomString(length, alphabet('a-z', 'A-Z', '0-9'))
export const generateCode = () => generateRandomString(6, alphabet('0-9'))

export const generateSessionToken = () => {
  const bytes = new Uint8Array(20)
  crypto.getRandomValues(bytes)
  const token = base32.encode(bytes, { includePadding: false })

  return token
}
