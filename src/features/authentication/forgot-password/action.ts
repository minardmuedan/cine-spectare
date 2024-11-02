'use server'

import { createServerAction, ZSAError } from 'zsa'
import { emailSchema, passwordSchema, tokenIdSchema } from '../schema'
import { rateLimiter } from '@/lib/rate-limiter'
import { getIpAddress } from '@/lib/helpers/headers'
import { getCredentialsUserByEmailDb, updateUserPasswordByEmailDb } from '@/db/utils/users'
import { createTokenDb, deleteTokenByPayloadDb, deleteTokenDb } from '@/db/utils/token'
import { generate6DigitCode, generateId } from '@/lib/helpers/generate'
import { verifyAndGetToken } from '../_helpers'
import { Argon2id } from 'oslo/password'

export const forgotPasswordAction = createServerAction()
  .input(emailSchema)
  .handler(async ({ input: { email } }) => {
    const limit = rateLimiter(`forgot-password-${(await getIpAddress()) || email}`, 12, 200)
    if (limit.isExceed) return limit

    const user = await getCredentialsUserByEmailDb(email)
    if (!user || !user.hashedPassword) throw 'No matching user found'

    const id = generateId(20)
    const code = generate6DigitCode()

    await deleteTokenByPayloadDb(email).catch(() => {})
    await createTokenDb({ id, emailPayload: email, code, purpose: 'change-password-verification' })

    // TODO: send to email
    console.log(email, code)

    return { id } as { isExceed: undefined; id: string }
  })

export const changePasswordAction = createServerAction()
  .input(tokenIdSchema.and(passwordSchema))
  .handler(async ({ input: { tokenId, password } }) => {
    const token = await verifyAndGetToken(tokenId)

    if (token.purpose !== 'change-password') throw new ZSAError('NOT_FOUND', 'Incorrect token purpose')

    const hashedPassword = await new Argon2id().hash(password)
    await deleteTokenDb(tokenId).catch(() => {})
    await updateUserPasswordByEmailDb(token.emailPayload, hashedPassword)
  })
