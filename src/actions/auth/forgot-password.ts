'use server'

import { argonHash } from '@/lib/auth/helpers/argon'
import { generateCode, generateId } from '@/lib/auth/helpers/generate'
import { rateLimiter } from '@/lib/auth/rate-limiter'
import { getUserByEmailDb, updateUserPasswordByEmailDb } from '@/lib/db/utils/user'
import { createVerificationDb, deleteVerificationByPayloadDb, deleteVerificationDb, getVerificationDb } from '@/lib/db/utils/verifications'
import { createAccountInputSchema, emailSchema } from '@/lib/schema/auth'
import { getIpAddress } from '@/lib/auth/helpers/headers'
import { createServerAction, ZSAError } from 'zsa'

export const forgotPasswordAction = createServerAction()
  .input(emailSchema)
  .handler(async ({ input: { email } }) => {
    const limiter = rateLimiter(`forgot-password-${getIpAddress() || email}`, 12, 200)
    if (limiter.isExceed) return limiter

    const user = await getUserByEmailDb(email)
    if (!user || !user.hashedPassword) throw 'No matching user found'

    const id = generateId(20)
    const code = generateCode()

    await deleteVerificationByPayloadDb(email).catch(() => {})
    await createVerificationDb({ id, emailPayload: email, code, purpose: 'change-password-verification' })

    // TODO: send code to email
    console.log(email, ' : ', code)

    return { id }
  })

export const updatePasswordAction = createServerAction()
  .input(createAccountInputSchema)
  .handler(async ({ input: { tokenId, password } }) => {
    const verification = await getVerificationDb(tokenId)

    if (!verification) throw new ZSAError('NOT_FOUND', 'Verification token not found!')
    if (verification.purpose !== 'change-password') throw new ZSAError('NOT_FOUND', 'Incorrect token purpose')
    if (verification?.updatedAt.getTime() + 30 * 60 * 1000 < Date.now()) throw new ZSAError('NOT_FOUND', 'Verification token is Expired!')

    const hashedPassword = await argonHash(password)

    await deleteVerificationDb(tokenId).catch(() => {})
    await updateUserPasswordByEmailDb(verification.emailPayload, hashedPassword)
  })
