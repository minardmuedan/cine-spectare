'use server'

import { renewTokenDb, upgradeTokenPurposeDb } from '@/db/utils/token'
import { codeSchema, tokenIdSchema } from '../schema'
import { rateLimiter } from '@/lib/rate-limiter'
import { generate6DigitCode } from '@/lib/helpers/generate'
import { createServerAction } from 'zsa'
import { verifyAndGetToken } from '../_helpers'

export const verifyTokenAction = createServerAction()
  .input(tokenIdSchema.and(codeSchema))
  .handler(async ({ input: { tokenId, code } }) => {
    const limit = rateLimiter(`verification-${tokenId}`, 10, 60)
    if (limit.isExceed) return limit

    const token = await verifyAndGetToken(tokenId)

    if (token.code !== code) throw 'Incorrect code!'
    await upgradeTokenPurposeDb(token.id, token.purpose === 'change-password-verification' ? 'change-password' : 'create-password')
  })

export const resendVerificationTokenAction = createServerAction()
  .input(tokenIdSchema)
  .handler(async ({ input: { tokenId } }) => {
    const limit = rateLimiter(`resend-${tokenId}`, 1, 30)
    if (limit.isExceed) return limit

    const token = await verifyAndGetToken(tokenId)

    const hasPassed1Minute = Date.now() - token.updatedAt.getTime() > 60 * 1000
    if (hasPassed1Minute) {
      const newCode = generate6DigitCode()
      await renewTokenDb(token.id, newCode)

      // TODO: send to email
      console.log(token.emailPayload, newCode)
    } else {
      await renewTokenDb(token.id, token.code)

      // TODO: send to email
      console.log(token.emailPayload, token.code)
    }
  })
