import 'server-only'
import { Argon2id } from 'oslo/password'

const argon2id = new Argon2id()

export const argonHash = async (input: string) => await argon2id.hash(input)
export const argonVerify = async (hash: string, input: string) => await argon2id.verify(hash, input)
