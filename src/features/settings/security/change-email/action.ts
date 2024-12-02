'use server'

import { createTokenDb } from '@/db/utils/token'
import { getCredentialsUserByEmailDb, getCredentialsUserDb, updateUserEmailDb } from '@/db/utils/users'
import { loginSchema } from '@/features/authentication/schema'
import { authedProcedure } from '@/lib/helpers/authed-procedure'
import { generate6DigitCode, generateId } from '@/lib/helpers/generate'
import { verifyAndGetToken } from '@/lib/helpers/verify-get-token'
import { rateLimiter } from '@/lib/rate-limiter'
import { sendEmail } from '@/lib/resend'
import { codeSchema, tokenIdSchema } from '@/lib/schema'
import { Argon2id } from 'oslo/password'

export const createChangeEmailTokenAction = authedProcedure.input(loginSchema).handler(async ({ input, ctx: { userId } }) => {
  const limit = rateLimiter(`change-email-${userId}`, 10, 60)
  if (limit.isExceed) return limit

  const newEmail = input.email

  const user = await getCredentialsUserDb(userId)
  if (!user || !user.hashedPassword) throw 'User was not found! Please try again'

  const comparePassword = await new Argon2id().verify(user.hashedPassword, input.password)
  if (!comparePassword) throw 'Incorrect credentials! Please try again'

  const existingEmail = await getCredentialsUserByEmailDb(input.email)
  if (existingEmail) throw 'Email is already in use'

  const id = generateId(20)
  const code = generate6DigitCode()

  await createTokenDb({ id, code, emailPayload: newEmail, purpose: 'change-email-verification' })

  await sendEmail(newEmail, code)

  return { id } as { isExceed: undefined; id: string }
})

export const changeEmailAction = authedProcedure
  .input(tokenIdSchema.and(codeSchema))
  .handler(async ({ input: { tokenId, code }, ctx: { userId } }) => {
    const limit = rateLimiter(`change-email-verification-${tokenId}`, 10, 60)
    if (limit.isExceed) return limit

    const token = await verifyAndGetToken(tokenId)
    if (token.code !== code) throw 'Incorrect code!'

    await updateUserEmailDb(userId, token.emailPayload)
  })
