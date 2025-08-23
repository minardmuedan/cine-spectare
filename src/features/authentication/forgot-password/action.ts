'use server'

import { createTokenDb, deleteTokenByPayloadDb, deleteTokenDb } from '@/db/utils/token'
import { getCredentialsUserByEmailDb, updateUserPasswordDb } from '@/db/utils/users'
import { generate6DigitCode, generateId } from '@/lib/helpers/generate'
import { getIpAddress } from '@/lib/helpers/headers'
import { verifyAndGetToken } from '@/lib/helpers/verify-get-token'
import { rateLimiter } from '@/lib/rate-limiter'
import { tokenIdSchema } from '@/lib/schema'
import { Argon2id } from 'oslo/password'
import { createServerAction, ZSAError } from 'zsa'
import { emailSchema, passwordSchema } from '../schema'
import { sendEmail } from '@/lib/send-email'

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

    await sendEmail(email, code)

    return { id } as { isExceed: undefined; id: string }
  })

export const forgotPasswordChangePasswordAction = createServerAction()
  .input(tokenIdSchema.and(passwordSchema))
  .handler(async ({ input: { tokenId, password } }) => {
    const token = await verifyAndGetToken(tokenId)

    if (token.purpose !== 'change-password') throw new ZSAError('NOT_FOUND', 'Incorrect token purpose')

    const user = await getCredentialsUserByEmailDb(token.emailPayload)
    if (!user) throw new ZSAError('NOT_FOUND', 'User was not found! Please try again')

    const hashedPassword = await new Argon2id().hash(password)
    await deleteTokenDb(tokenId).catch(() => {})
    await updateUserPasswordDb(user.id, hashedPassword)
  })
