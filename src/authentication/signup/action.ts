'use server'

import { createTokenDb, deleteTokenByPayloadDb, deleteTokenDb } from '@/db/utils/token'
import { createUserDb, getCredentialsUserByEmailDb } from '@/db/utils/users'
import { generate6DigitCode, generateId } from '@/lib/helpers/generate'
import { createServerAction, ZSAError } from 'zsa'
import { emailSchema, passwordSchema, tokenIdSchema } from '../schema'
import { redirect } from 'next/navigation'
import { verifyAndGetToken } from '../_helpers'
import { Argon2id } from 'oslo/password'

export const signUpAction = createServerAction()
  .input(emailSchema)
  .handler(async ({ input: { email } }) => {
    const existingUser = await getCredentialsUserByEmailDb(email)
    if (existingUser) throw 'Email already in use'

    const id = generateId(20)
    const code = generate6DigitCode()
    await deleteTokenByPayloadDb(email).catch(() => {})
    await createTokenDb({ id, code, emailPayload: email, purpose: 'email-verification' })

    // TODO: send to email
    console.log(email, code)
    return { id }
  })

export const createPasswordAction = createServerAction()
  .input(tokenIdSchema.and(passwordSchema))
  .handler(async ({ input: { tokenId, password } }) => {
    const token = await verifyAndGetToken(tokenId)
    if (token.purpose !== 'create-password') throw new ZSAError('NOT_FOUND', 'Email is not yet verified! Sign up again')

    const id = generateId()
    const hashedPassword = await new Argon2id().hash(password)
    await createUserDb({ id, email: token.emailPayload, hashedPassword, provider: 'credentials' })
    await deleteTokenDb(token.id).catch(() => {})

    // create session here !

    redirect('/')
  })
