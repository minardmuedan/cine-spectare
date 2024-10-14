import 'server-only'
import { createJWT, validateJWT } from 'oslo/jwt'

const alg = 'HS256'
const key = new TextEncoder().encode(process.env.JWT_KEY)

export const jwtEncrypt = async <T extends Record<string, string>>(payload: T) => await createJWT(alg, key, payload)
export const jwtDecrypt = async <T>(jwt: string) => (await validateJWT(alg, key, jwt)).payload as T
