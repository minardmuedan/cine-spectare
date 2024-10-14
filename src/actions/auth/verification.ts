'use server'

import { generateCode } from '@/lib/auth/helpers/generate'
import { rateLimiter } from '@/lib/auth/rate-limiter'
import { getVerificationDb, renewVerificationDb, upgradeVerificationPurposeDb } from '@/lib/db/utils/verifications'
import { idSchema, verificationInputSchema } from '@/lib/schema/auth'
import { createServerAction, ZSAError } from 'zsa'

export const verificationAction = createServerAction()
  .input(verificationInputSchema)
  .handler(async ({ input: { tokenId, code } }) => {
    const limiter = rateLimiter(`verification-${tokenId}`, 5, 60)
    if (limiter.isExceed) return limiter

    const verification = await getVerificationDb(tokenId)

    if (!verification) throw new ZSAError('NOT_FOUND', 'Verification token not found!')
    if (verification?.updatedAt.getTime() + 30 * 60 * 1000 < Date.now()) throw new ZSAError('NOT_FOUND', 'Verification token is Expired!')

    if (verification.code !== code) throw 'Incorrect code!'

    if (verification.purpose == 'change-password-verification') await upgradeVerificationPurposeDb(verification.id, 'change-password')
    else await upgradeVerificationPurposeDb(verification.id, 'create-password')
  })

export const resendTokenAction = createServerAction()
  .input(idSchema)
  .handler(async ({ input: tokenId }) => {
    const limiter = rateLimiter(`resend-${tokenId}`, 1, 30)
    if (limiter.isExceed) return limiter

    const verification = await getVerificationDb(tokenId)
    if (!verification) throw new ZSAError('NOT_FOUND', 'Verification token not found!')

    const hasPassed1Minute = Date.now() - verification.updatedAt.getTime() > 60 * 1000
    if (hasPassed1Minute) {
      const newCode = generateCode()
      await renewVerificationDb(tokenId, newCode)

      // TODO: send code to email
      console.log(verification.emailPayload, ' : ', newCode)
    } else {
      await renewVerificationDb(tokenId, verification.code)

      // TODO: send code to email
      console.log(verification.emailPayload, ' : ', verification.code)
    }

    return { isExceed: false as const, remainingSeconds: 30 }
  })
