import { createJWT, validateJWT } from 'oslo/jwt'

const alg = 'HS256'
const key = new TextEncoder().encode('inamers')

export const jwtEncrypt = async <T extends Record<string, string>>(payload: T) => await createJWT(alg, key, payload)
export const jwtDecrypt = async <T>(jwt: string) => (await validateJWT(alg, key, jwt)).payload as T
